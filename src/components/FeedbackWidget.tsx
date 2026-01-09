import { useState, useCallback } from 'react';
import { FeedbackModal } from './FeedbackModal';
import { FeedbackIcon } from './FeedbackIcon';
import type { FeedbackWidgetProps } from '../types';
import { DEFAULT_MODAL_Z_INDEX, Z_INDEX_OFFSET } from '../utils/constants';

/**
 * FeedbackWidget is the main component for collecting user feedback.
 * It displays a floating icon that opens a modal form when clicked.
 * 
 * Features:
 * - Customizable fields (rating, text, email, name, category)
 * - Flexible submission (callback or API endpoint)
 * - Full theming support
 * - Accessible and keyboard navigable
 * - Responsive design
 * 
 * @param props - FeedbackWidget component props
 * @returns JSX element representing the feedback widget, or null if hidden
 * 
 * @example
 * ```tsx
 * <FeedbackWidget
 *   onSubmit={(data) => console.log(data)}
 *   position="bottom-right"
 * />
 * ```
 */
export function FeedbackWidget({
  onSubmit,
  apiEndpoint,
  fields,
  position = 'bottom-right',
  theme,
  customStyles,
  icon,
  labels,
  categories,
  show = true,
  zIndex = DEFAULT_MODAL_Z_INDEX,
}: FeedbackWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  if (!show) return null;

  return (
    <>
      <FeedbackIcon
        onClick={handleOpen}
        position={position}
        icon={icon}
        theme={theme}
        customStyles={customStyles}
        zIndex={zIndex - Z_INDEX_OFFSET}
      />
      <FeedbackModal
        isOpen={isOpen}
        onClose={handleClose}
        onSubmit={onSubmit}
        apiEndpoint={apiEndpoint}
        fields={fields}
        labels={labels}
        categories={categories}
        theme={theme}
        customStyles={customStyles}
        zIndex={zIndex}
      />
    </>
  );
}

