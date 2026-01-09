import type { FeedbackData, FeedbackFieldsConfig } from '../types';

/**
 * Validation error types for form validation.
 */
export interface ValidationError {
  field: keyof FeedbackData;
  message: string;
}

/**
 * Validates email format.
 * 
 * @param email - Email address to validate
 * @returns True if email is valid, false otherwise
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validates feedback form data based on field configuration.
 * 
 * @param data - Feedback data to validate
 * @param fields - Field configuration indicating which fields are required
 * @returns Array of validation errors, empty if validation passes
 */
export function validateFeedbackData(
  data: FeedbackData,
  fields?: FeedbackFieldsConfig
): ValidationError[] {
  const errors: ValidationError[] = [];
  const fieldConfig = fields || { rating: true, text: true };

  // Validate rating if required
  if (fieldConfig.rating) {
    if (!data.rating || data.rating < 1 || data.rating > 5) {
      errors.push({
        field: 'rating',
        message: 'Please provide a rating from 1 to 5 stars',
      });
    }
  }

  // Validate text if required
  if (fieldConfig.text) {
    if (!data.text || data.text.trim().length === 0) {
      errors.push({
        field: 'text',
        message: 'Please provide feedback text',
      });
    } else if (data.text.trim().length < 3) {
      errors.push({
        field: 'text',
        message: 'Feedback text must be at least 3 characters long',
      });
    }
  }

  // Validate email format if provided
  if (data.email && data.email.trim().length > 0) {
    if (!isValidEmail(data.email)) {
      errors.push({
        field: 'email',
        message: 'Please provide a valid email address',
      });
    }
  }

  // Validate category if required
  if (fieldConfig.category && !data.category) {
    errors.push({
      field: 'category',
      message: 'Please select a category',
    });
  }

  return errors;
}

