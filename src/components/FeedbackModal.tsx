import { useEffect, useRef, useCallback } from 'react';
import { FeedbackForm } from './FeedbackForm';
import { useFeedback } from '../hooks/useFeedback';
import {
  type FeedbackData,
  type FeedbackWidgetProps,
} from '../types';
import { SUCCESS_AUTO_CLOSE_DELAY, DEFAULT_MODAL_Z_INDEX } from '../utils/constants';

interface FeedbackModalProps {
  /** Whether the modal is open */
  isOpen: boolean;
  /** Callback when modal should be closed */
  onClose: () => void;
  /** Callback function for form submission */
  onSubmit?: (data: FeedbackData) => void | Promise<void>;
  /** API endpoint URL for direct submission */
  apiEndpoint?: string;
  /** Field configuration */
  fields?: FeedbackWidgetProps['fields'];
  /** Custom labels */
  labels?: FeedbackWidgetProps['labels'];
  /** Available categories */
  categories?: FeedbackWidgetProps['categories'];
  /** Theme configuration */
  theme?: FeedbackWidgetProps['theme'];
  /** Custom CSS classes */
  customStyles?: FeedbackWidgetProps['customStyles'];
  /** Z-index for the modal */
  zIndex?: number;
}

/**
 * FeedbackModal component displays a modal dialog for collecting user feedback.
 * Handles form state, submission, keyboard navigation, and focus management.
 * 
 * @param props - FeedbackModal component props
 * @returns JSX element representing the feedback modal, or null if not open
 */
export function FeedbackModal({
  isOpen,
  onClose,
  onSubmit,
  apiEndpoint,
  fields,
  labels,
  categories,
  theme,
  customStyles,
  zIndex = DEFAULT_MODAL_Z_INDEX,
}: FeedbackModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Memoize onClose to prevent unnecessary re-renders
  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const {
    formData,
    updateField,
    resetForm,
    submitFeedback,
    isSubmitting,
    error,
    success,
  } = useFeedback({
    onSubmit,
    apiEndpoint,
    fields,
    onSuccess: () => {
      // Auto-close after delay on success
      timeoutRef.current = setTimeout(() => {
        resetForm();
        handleClose();
      }, SUCCESS_AUTO_CLOSE_DELAY);
    },
    onError: () => {
      // Keep modal open on error
    },
  });

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      resetForm();
      // Clear any pending timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    }
  }, [isOpen, resetForm]);

  // Handle keyboard events and body scroll lock
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && !isSubmitting) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleClose, isSubmitting]);

  // Focus management: focus the modal when it opens
  useEffect(() => {
    if (isOpen && modalRef.current) {
      // Focus the modal container for accessibility
      modalRef.current.focus();
    }
  }, [isOpen]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && !isSubmitting) {
      handleClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="feedback-widget-modal"
      style={{ zIndex }}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="feedback-form-title"
    >
      <div
        className="feedback-widget-backdrop"
        style={{ zIndex: zIndex - 1 }}
        aria-hidden="true"
      />
      <div
        ref={modalRef}
        className={`feedback-widget-modal-content ${customStyles?.modal || ''}`}
        style={
          theme?.background
            ? { backgroundColor: theme.background }
            : undefined
        }
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          disabled={isSubmitting}
          aria-label="Close feedback modal"
          type="button"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <FeedbackForm
          formData={formData}
          updateField={updateField}
          onSubmit={submitFeedback}
          onCancel={handleClose}
          isSubmitting={isSubmitting}
          error={error}
          success={success}
          fields={fields}
          labels={labels}
          categories={categories}
          theme={theme}
          customStyles={customStyles}
        />
      </div>
    </div>
  );
}

