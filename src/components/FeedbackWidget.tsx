import { useState } from 'react';
import { FeedbackModal } from './FeedbackModal';
import { FeedbackIcon } from './FeedbackIcon';
import { FeedbackWidgetProps } from '../types';

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
  zIndex = 50,
}: FeedbackWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (!show) return null;

  return (
    <>
      <FeedbackIcon
        onClick={() => setIsOpen(true)}
        position={position}
        icon={icon}
        theme={theme}
        customStyles={customStyles}
        zIndex={zIndex - 20}
      />
      <FeedbackModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
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

