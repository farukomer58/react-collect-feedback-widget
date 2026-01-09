import type { ReactNode } from 'react';

/**
 * Feedback data structure containing user feedback information.
 * All fields are optional to allow flexible form configurations.
 */
export interface FeedbackData {
  /** Star rating from 1 to 5 */
  rating?: number;
  /** Text feedback content */
  text?: string;
  /** User email address (optional) */
  email?: string;
  /** User name (optional) */
  name?: string;
  /** Feedback category/type */
  category?: string;
}

/**
 * Position options for the feedback widget icon.
 * The icon can be placed in any of the four corners of the screen.
 */
export type FeedbackPosition =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right';

/**
 * Theme configuration for customizing widget colors.
 * All color values should be valid CSS color strings (hex, rgb, named colors, etc.).
 */
export interface FeedbackTheme {
  /** Primary color used for buttons, icons, and accents */
  primary?: string;
  /** Secondary color for additional UI elements */
  secondary?: string;
  /** Background color for modal and icon container */
  background?: string;
  /** Text color for content */
  text?: string;
  /** Success message color */
  success?: string;
  /** Error message color */
  error?: string;
}

/**
 * Configuration object to control which form fields are displayed.
 * Set a field to `true` to show it, `false` to hide it.
 */
export interface FeedbackFieldsConfig {
  /** Show/hide star rating field */
  rating?: boolean;
  /** Show/hide text feedback field */
  text?: boolean;
  /** Show/hide email input field */
  email?: boolean;
  /** Show/hide name input field */
  name?: boolean;
  /** Show/hide category selection field */
  category?: boolean;
}

/**
 * Customizable text labels for all form elements and messages.
 * Use this to localize or customize the widget text.
 */
export interface FeedbackLabels {
  /** Modal title */
  title?: string;
  /** Rating field label */
  rating?: string;
  /** Text feedback field label */
  text?: string;
  /** Email field label */
  email?: string;
  /** Name field label */
  name?: string;
  /** Category field label */
  category?: string;
  /** Submit button text */
  submit?: string;
  /** Cancel button text */
  cancel?: string;
  /** Placeholder texts for input fields */
  placeholder?: {
    text?: string;
    email?: string;
    name?: string;
    category?: string;
  };
  /** Success message text */
  success?: string;
  /** Error message text */
  error?: string;
}

/**
 * Category option for feedback type selection.
 * Used when the category field is enabled.
 */
export interface FeedbackCategory {
  /** Category value (used as form value) */
  value: string;
  /** Category display label */
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

