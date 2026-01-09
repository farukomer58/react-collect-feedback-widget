import { useState, useCallback } from 'react';
import { FeedbackData } from '../types';

interface UseFeedbackOptions {
  onSubmit?: (data: FeedbackData) => void | Promise<void>;
  apiEndpoint?: string;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export function useFeedback({
  onSubmit,
  apiEndpoint,
  onSuccess,
  onError,
}: UseFeedbackOptions) {
  const [formData, setFormData] = useState<FeedbackData>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const updateField = useCallback((field: keyof FeedbackData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError(null);
  }, []);

  const resetForm = useCallback(() => {
    setFormData({});
    setError(null);
    setSuccess(false);
  }, []);

  const submitFeedback = useCallback(async () => {
    setIsSubmitting(true);
    setError(null);
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
          throw new Error(`Failed to submit feedback: ${response.statusText}`);
        }

        const result = await response.json();
        setSuccess(true);
        onSuccess?.();
        return result;
      } else if (onSubmit) {
        await onSubmit(formData);
        setSuccess(true);
        onSuccess?.();
      } else {
        throw new Error('No submission method provided');
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      setError(error.message);
      onError?.(error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, apiEndpoint, onSubmit, onSuccess, onError]);

  return {
    formData,
    updateField,
    resetForm,
    submitFeedback,
    isSubmitting,
    error,
    success,
  };
}

