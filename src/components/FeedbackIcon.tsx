import { memo, ReactNode } from 'react';
import { FeedbackPosition, FeedbackTheme } from '../types';
import { getPositionClasses } from '../utils/position';
import { DEFAULT_ICON_Z_INDEX, DEFAULT_PRIMARY_COLOR } from '../utils/constants';

interface FeedbackIconProps {
  /** Click handler to open the feedback modal */
  onClick: () => void;
  /** Position of the icon on the screen */
  position?: FeedbackPosition;
  /** Custom icon component to replace the default */
  icon?: ReactNode;
  /** Theme configuration for custom colors */
  theme?: FeedbackTheme;
  /** Custom CSS classes */
  customStyles?: {
    icon?: string;
  };
  /** Z-index for the icon */
  zIndex?: number;
}

/**
 * Default feedback icon (info circle with exclamation mark).
 * This is used when no custom icon is provided.
 */
const defaultIcon = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z"
      fill="currentColor"
    />
  </svg>
);

/**
 * FeedbackIcon component displays a floating button that opens the feedback modal.
 * The icon can be positioned in any corner and supports custom icons and theming.
 * 
 * @param props - FeedbackIcon component props
 * @returns JSX element representing the feedback icon button
 */
export const FeedbackIcon = memo(function FeedbackIcon({
  onClick,
  position = 'bottom-right',
  icon,
  theme,
  customStyles,
  zIndex = DEFAULT_ICON_Z_INDEX,
}: FeedbackIconProps) {
  const positionClasses = getPositionClasses(position);

  return (
    <button
      onClick={onClick}
      className={`feedback-widget-icon ${positionClasses} ${customStyles?.icon || ''}`}
      style={{
        zIndex,
        color: theme?.primary || DEFAULT_PRIMARY_COLOR,
      }}
      aria-label="Open feedback form"
    >
      <div
        className="bg-white rounded-full p-3 shadow-lg flex items-center justify-center"
        style={
          theme?.background
            ? { backgroundColor: theme.background }
            : undefined
        }
      >
        {icon || defaultIcon}
      </div>
    </button>
  );
});