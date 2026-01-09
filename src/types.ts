import type { ReactNode } from 'react';

export interface FeedbackData {
  rating?: number;
  text?: string;
  email?: string;
  name?: string;
  category?: string;
}

export type FeedbackPosition =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right';

export interface FeedbackTheme {
  primary?: string;
  secondary?: string;
  background?: string;
  text?: string;
  success?: string;
  error?: string;
}

export interface FeedbackFieldsConfig {
  rating?: boolean;
  text?: boolean;
  email?: boolean;
  name?: boolean;
  category?: boolean;
}

export interface FeedbackLabels {
  title?: string;
  rating?: string;
  text?: string;
  email?: string;
  name?: string;
  category?: string;
  submit?: string;
  cancel?: string;
  placeholder?: {
    text?: string;
    email?: string;
    name?: string;
    category?: string;
  };
  success?: string;
  error?: string;
}

export interface FeedbackCategory {
  value: string;
  label: string;
}

export interface FeedbackWidgetProps {
  /** Callback function called when feedback is submitted */
  onSubmit?: (data: FeedbackData) => void | Promise<void>;
  /** API endpoint URL for direct submission */
  apiEndpoint?: string;
  /** Configuration for which fields to show */
  fields?: FeedbackFieldsConfig;
  /** Position of the feedback icon */
  position?: FeedbackPosition;
  /** Custom theme colors */
  theme?: FeedbackTheme;
  /** Custom CSS classes for styling */
  customStyles?: {
    icon?: string;
    modal?: string;
    form?: string;
    button?: {
      submit?: string;
      cancel?: string;
    };
  };
  /** Custom icon component */
  icon?: ReactNode;
  /** Customizable text labels */
  labels?: FeedbackLabels;
  /** Categories for feedback type selection */
  categories?: FeedbackCategory[];
  /** Show/hide the widget */
  show?: boolean;
  /** Custom z-index for the widget */
  zIndex?: number;
}

