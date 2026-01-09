import { useState, useCallback } from 'react';
import type { FeedbackData, FeedbackFieldsConfig } from '../types';
import { validateFeedbackData, type ValidationError } from '../utils/validation';

interface UseFeedbackOptions {
  /** Callback function called when feedback is submitted */
  onSubmit?: (data: FeedbackData) => void | Promise<void>;
  /** API endpoint URL for direct submission */
  apiEndpoint?: string;
  /** Field configuration for validation */
  fields?: FeedbackFieldsConfig;
  /** Callback called on successful submission */
  onSuccess?: () => void;
  /** Callback called on submission error */
  onError?: (error: Error) => void;
}

/**
 * Custom hook for managing feedback form state and submission.
 * Handles form data, validation, submission, and error states.
 * 
 * @param options - Configuration options for the feedback hook
 * @returns Object containing form state and control functions
 */
export function useFeedback({
  onSubmit,
  apiEndpoint,
  fields,
  onSuccess,
  onError,
}: UseFeedbackOptions) {
  const [formData, setFormData] = useState<FeedbackData>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>(
    []
  );

  /**
   * Updates a specific field in the form data.
   * Clears any existing errors when a field is updated.
   * 
   * @param field - The field name to update
   * @param value - The new value for the field
   */
  const updateField = useCallback(
    (field: keyof FeedbackData, value: string | number | undefined) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      setError(null);
      setValidationErrors([]);
    },
    []
  );

  /**
   * Resets the form to its initial state.
   * Clears all form data, errors, and success state.
   */
  const resetForm = useCallback(() => {
    setFormData({});
    setError(null);
    setSuccess(false);
    setValidationErrors([]);
  }, []);

  /**
   * Validates and submits the feedback form.
   * Performs client-side validation before submission.
   * Supports both callback and API endpoint submission methods.
   * 
   * @throws Error if validation fails or submission fails
   */
  const submitFeedback = useCallback(async () => {
    // Validate form data
    const errors = validateFeedbackData(formData, fields);
    if (errors.length > 0) {
      const firstError = errors[0];
      setValidationErrors(errors);
      setError(firstError.message);
      return;
    }

    setIsSubmitting(true);
    setError(null);
    setValidationErrors([]);
    setSuccess(false);

    try {
      if (apiEndpoint) {
        const response = await fetch(apiEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          const errorText = await response.text().catch(() => response.statusText);
          throw new Error(
            `Failed to submit feedback: ${response.status} ${errorText}`
          );
        }

        // Try to parse JSON response, but don't fail if it's not JSON
        let result;
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          result = await response.json();
        }

        setSuccess(true);
        onSuccess?.();
        return result;
      } else if (onSubmit) {
        await onSubmit(formData);
        setSuccess(true);
        onSuccess?.();
      } else {
        throw new Error('No submission method provided. Please provide either onSubmit callback or apiEndpoint.');
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error occurred');
      setError(error.message);
      onError?.(error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, apiEndpoint, onSubmit, fields, onSuccess, onError]);

  return {
    formData,
    updateField,
    resetForm,
    submitFeedback,
    isSubmitting,
    error,
    success,
    validationErrors,
  };
}

