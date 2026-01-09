import { memo } from 'react';
import type { FeedbackTheme } from '../types';
import { MAX_RATING, MIN_RATING } from '../utils/constants';

interface StarRatingProps {
  /** Current rating value (1-5) */
  rating: number;
  /** Callback when a star is clicked */
  onRatingChange: (rating: number) => void;
  /** Theme configuration for custom colors */
  theme?: FeedbackTheme;
  /** Whether the rating is disabled */
  disabled?: boolean;
}

/**
 * StarRating component displays an interactive 5-star rating system.
 * Users can click on stars to set their rating from 1 to 5.
 * 
 * @param props - StarRating component props
 * @returns JSX element representing the star rating
 */
export const StarRating = memo(function StarRating({
  rating,
  onRatingChange,
  theme,
  disabled = false,
}: StarRatingProps) {
  const stars = [];

  for (let i = MIN_RATING; i <= MAX_RATING; i++) {
    const isFilled = i <= rating;
    stars.push(
      <button
        key={i}
        type="button"
        onClick={() => !disabled && onRatingChange(i)}
        className={`feedback-widget-star ${
          isFilled
            ? 'feedback-widget-star-filled'
            : 'feedback-widget-star-empty'
        }`}
        style={
          theme?.primary && isFilled
            ? { color: theme.primary }
            : undefined
        }
        disabled={disabled}
        aria-label={`Rate ${i} out of ${MAX_RATING} stars`}
        aria-pressed={isFilled}
      >
        ★
      </button>
    );
  }

  return (
    <div
      className="feedback-widget-star-rating"
      role="radiogroup"
      aria-label="Rating"
    >
      {stars}
    </div>
  );
});

