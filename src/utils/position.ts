import type { FeedbackPosition } from '../types';

/**
 * Maps position values to Tailwind CSS classes.
 * 
 * @param position - The position of the feedback icon
 * @returns Tailwind CSS classes for positioning
 */
export function getPositionClasses(
  position: FeedbackPosition = 'bottom-right'
): string {
  const positions: Record<FeedbackPosition, string> = {
    'top-left': 'top-4 left-4',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-right': 'bottom-4 right-4',
  };
  return positions[position];
}

