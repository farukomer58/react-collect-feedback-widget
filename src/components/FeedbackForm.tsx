import {
  type FeedbackData,
  type FeedbackFieldsConfig,
  type FeedbackLabels,
  type FeedbackCategory,
  type FeedbackTheme,
} from '../types';
import { StarRating } from './StarRating';
import { DEFAULT_ERROR_BG_COLOR, DEFAULT_ERROR_TEXT_COLOR } from '../utils/constants';

interface FeedbackFormProps {
  /** Current form data values */
  formData: FeedbackData;
  /** Callback to update a form field */
  updateField: (field: keyof FeedbackData, value: string | number | undefined) => void;
  /** Callback when form is submitted */
  onSubmit: () => void;
  /** Callback when form is cancelled */
  onCancel: () => void;
  /** Whether the form is currently submitting */
  isSubmitting: boolean;
  /** Error message to display, if any */
  error: string | null;
  /** Whether submission was successful */
  success: boolean;
  /** Field configuration */
  fields?: FeedbackFieldsConfig;
  /** Custom labels for form elements */
  labels?: FeedbackLabels;
  /** Available categories for selection */
  categories?: FeedbackCategory[];
  /** Theme configuration */
  theme?: FeedbackTheme;
  /** Custom CSS classes */
  customStyles?: {
    form?: string;
    button?: {
      submit?: string;
      cancel?: string;
    };
  };
}

/**
 * FeedbackForm component renders the feedback collection form.
 * Supports rating, text, email, name, and category fields with full customization.
 * 
 * @param props - FeedbackForm component props
 * @returns JSX element representing the feedback form
 */
export function FeedbackForm({
  formData,
  updateField,
  onSubmit,
  onCancel,
  isSubmitting,
  error,
  success,
  fields = {},
  labels = {},
  categories = [],
  theme,
  customStyles,
}: FeedbackFormProps) {
  const defaultFields: FeedbackFieldsConfig = {
    rating: true,
    text: true,
    email: false,
    name: false,
    category: false,
    ...fields,
  };

  const defaultLabels: Required<FeedbackLabels> = {
    title: 'Share Your Feedback',
    rating: 'Rating',
    text: 'What can we improve?',
    email: 'Email (optional)',
    name: 'Name (optional)',
    category: 'Category',
    submit: 'Submit',
    cancel: 'Cancel',
    placeholder: {
      text: 'Tell us what you think...',
      email: 'your.email@example.com',
      name: 'Your name',
      category: 'Select a category',
    },
    success: 'Thank you for your feedback!',
    error: 'Something went wrong. Please try again.',
    ...labels,
  };

  if (success) {
    return (
      <div className="p-6 text-center">
        <div
          className="text-4xl mb-4"
          style={theme?.success ? { color: theme.success } : undefined}
        >
          ✓
        </div>
        <p
          className="text-lg font-medium"
          style={theme?.text ? { color: theme.text } : undefined}
        >
          {defaultLabels.success}
        </p>
        <button
          onClick={onCancel}
          className={`feedback-widget-button feedback-widget-button-primary mt-4 ${
            customStyles?.button?.submit || ''
          }`}
          style={
            theme?.primary
              ? {
                  backgroundColor: theme.primary,
                }
              : undefined
          }
        >
          Close
        </button>
      </div>
    );
  }

  return (
    <form
      className={`p-6 ${customStyles?.form || ''}`}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      aria-labelledby="feedback-form-title"
      noValidate
    >
      <h2
        className="text-2xl font-bold mb-6"
        style={theme?.text ? { color: theme.text } : undefined}
        id="feedback-form-title"
      >
        {defaultLabels.title}
      </h2>

      {defaultFields.rating && (
        <div className="mb-4">
          <label className="feedback-widget-label" htmlFor="rating">
            {defaultLabels.rating}
          </label>
          <StarRating
            rating={formData.rating || 0}
            onRatingChange={(rating) => updateField('rating', rating)}
            theme={theme}
            disabled={isSubmitting}
          />
        </div>
      )}

      {defaultFields.category && categories.length > 0 && (
        <div className="mb-4">
          <label htmlFor="category" className="feedback-widget-label">
            {defaultLabels.category}
          </label>
          <select
            id="category"
            value={formData.category || ''}
            onChange={(e) => updateField('category', e.target.value)}
            className="feedback-widget-input"
            disabled={isSubmitting}
          >
            <option value="">
              {defaultLabels.placeholder?.category || 'Select a category'}
            </option>
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>
      )}

      {defaultFields.text && (
        <div className="mb-4">
          <label htmlFor="text" className="feedback-widget-label">
            {defaultLabels.text}
          </label>
          <textarea
            id="text"
            value={formData.text || ''}
            onChange={(e) => updateField('text', e.target.value)}
            className="feedback-widget-textarea"
            placeholder={defaultLabels.placeholder?.text}
            disabled={isSubmitting}
            required={defaultFields.text}
          />
        </div>
      )}

      {defaultFields.name && (
        <div className="mb-4">
          <label htmlFor="name" className="feedback-widget-label">
            {defaultLabels.name}
          </label>
          <input
            id="name"
            type="text"
            value={formData.name || ''}
            onChange={(e) => updateField('name', e.target.value)}
            className="feedback-widget-input"
            placeholder={defaultLabels.placeholder?.name}
            disabled={isSubmitting}
          />
        </div>
      )}

      {defaultFields.email && (
        <div className="mb-4">
          <label htmlFor="email" className="feedback-widget-label">
            {defaultLabels.email}
          </label>
          <input
            id="email"
            type="email"
            value={formData.email || ''}
            onChange={(e) => updateField('email', e.target.value)}
            className="feedback-widget-input"
            placeholder={defaultLabels.placeholder?.email}
            disabled={isSubmitting}
          />
        </div>
      )}

      {error && (
        <div
          className="mb-4 p-3 rounded-md text-sm"
          role="alert"
          aria-live="polite"
          style={
            theme?.error
              ? { backgroundColor: `${theme.error}20`, color: theme.error }
              : {
                  backgroundColor: DEFAULT_ERROR_BG_COLOR,
                  color: DEFAULT_ERROR_TEXT_COLOR,
                }
          }
        >
          {error || defaultLabels.error}
        </div>
      )}

      <div className="flex gap-3 justify-end">
        <button
          type="button"
          onClick={onCancel}
          className={`feedback-widget-button feedback-widget-button-secondary ${
            customStyles?.button?.cancel || ''
          }`}
          disabled={isSubmitting}
        >
          {defaultLabels.cancel}
        </button>
        <button
          type="submit"
          className={`feedback-widget-button feedback-widget-button-primary ${
            customStyles?.button?.submit || ''
          }`}
          style={
            theme?.primary
              ? {
                  backgroundColor: theme.primary,
                }
              : undefined
          }
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : defaultLabels.submit}
        </button>
      </div>
    </form>
  );
}

