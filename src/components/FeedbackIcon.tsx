import { ReactNode } from 'react';
import { FeedbackPosition, FeedbackTheme } from '../types';

interface FeedbackIconProps {
  onClick: () => void;
  position?: FeedbackPosition;
  icon?: ReactNode;
  theme?: FeedbackTheme;
  customStyles?: {
    icon?: string;
  };
  zIndex?: number;
}

const defaultIcon = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z"
      fill="currentColor"
    />
  </svg>
);

const getPositionClasses = (position: FeedbackPosition = 'bottom-right') => {
  const positions = {
    'top-left': 'top-4 left-4',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-right': 'bottom-4 right-4',
  };
  return positions[position];
};

export function FeedbackIcon({
  onClick,
  position = 'bottom-right',
  icon,
  theme,
  customStyles,
  zIndex = 30,
}: FeedbackIconProps) {
  const positionClasses = getPositionClasses(position);

  return (
    <button
      onClick={onClick}
      className={`feedback-widget-icon ${positionClasses} ${customStyles?.icon || ''}`}
      style={{
        zIndex,
        color: theme?.primary || '#3b82f6',
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
}

