import { useEffect, useRef } from 'react';
import { FeedbackForm } from './FeedbackForm';
import { useFeedback } from '../hooks/useFeedback';
import {
  FeedbackData,
  FeedbackWidgetProps,
} from '../types';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: FeedbackData) => void | Promise<void>;
  apiEndpoint?: string;
  fields?: FeedbackWidgetProps['fields'];
  labels?: FeedbackWidgetProps['labels'];
  categories?: FeedbackWidgetProps['categories'];
  theme?: FeedbackWidgetProps['theme'];
  customStyles?: FeedbackWidgetProps['customStyles'];
  zIndex?: number;
}

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
  zIndex = 50,
}: FeedbackModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

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
    onSuccess: () => {
      // Auto-close after 2 seconds on success
      setTimeout(() => {
        resetForm();
        onClose();
      }, 2000);
    },
    onError: () => {
      // Keep modal open on error
    },
  });

  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen, resetForm]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
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
  }, [isOpen, onClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && !isSubmitting) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="feedback-widget-modal"
      style={{ zIndex }}
      onClick={handleBackdropClick}
    >
      <div
        className="feedback-widget-backdrop"
        style={{ zIndex: zIndex - 1 }}
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
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          disabled={isSubmitting}
          aria-label="Close"
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
          onCancel={onClose}
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

