# React Feedback Widget

[![npm version](https://img.shields.io/npm/v/react-collect-feedback-widget.svg)](https://www.npmjs.com/package/react-collect-feedback-widget)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

A fully customizable React feedback widget component with a floating icon and modal form. Collect user feedback including ratings, text comments, email, name, and categories.

## Features

- 🎨 Fully customizable styling with Tailwind CSS
- ⭐ Star rating system
- 📝 Text feedback collection
- 📧 Optional email and name fields
- 🏷️ Category/type selection
- 🔄 Flexible submission (callback or API endpoint)
- 📱 Responsive design
- ♿ Accessible (keyboard navigation, ARIA labels)
- 🎯 TypeScript support
- 🎭 Customizable themes and positions

## Installation

```bash
npm install react-collect-feedback-widget
```

## Quick Start

```tsx
import { FeedbackWidget } from 'react-collect-feedback-widget';
import 'react-collect-feedback-widget/styles';

function App() {
  return (
    <FeedbackWidget
      onSubmit={(data) => {
        console.log('Feedback received:', data);
        // Handle feedback submission
      }}
    />
  );
}
```

## Basic Usage

### With Callback Function

```tsx
import { FeedbackWidget } from 'react-collect-feedback-widget';

function App() {
  const handleFeedback = async (data) => {
    // Send to your backend
    await fetch('/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  };

  return <FeedbackWidget onSubmit={handleFeedback} />;
}
```

### With API Endpoint

```tsx
import { FeedbackWidget } from 'react-collect-feedback-widget';

function App() {
  return <FeedbackWidget apiEndpoint="/api/feedback" />;
}
```

## Customization

### Field Configuration

Control which fields are displayed:

```tsx
<FeedbackWidget
  fields={{
    rating: true,
    text: true,
    email: true,
    name: true,
    category: true,
  }}
  onSubmit={handleFeedback}
/>
```

### Custom Position

```tsx
<FeedbackWidget
  position="top-left" // 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  onSubmit={handleFeedback}
/>
```

### Custom Theme

```tsx
<FeedbackWidget
  theme={{
    primary: '#6366f1',
    secondary: '#8b5cf6',
    background: '#ffffff',
    text: '#1f2937',
    success: '#10b981',
    error: '#ef4444',
  }}
  onSubmit={handleFeedback}
/>
```

### Custom Labels

```tsx
<FeedbackWidget
  labels={{
    title: 'We value your feedback',
    rating: 'How would you rate us?',
    text: 'Tell us what you think',
    submit: 'Send Feedback',
    success: 'Thanks! We received your feedback.',
  }}
  onSubmit={handleFeedback}
/>
```

### Custom Categories

```tsx
<FeedbackWidget
  fields={{ category: true }}
  categories={[
    { value: 'bug', label: 'Bug Report' },
    { value: 'feature', label: 'Feature Request' },
    { value: 'improvement', label: 'Improvement' },
    { value: 'other', label: 'Other' },
  ]}
  onSubmit={handleFeedback}
/>
```

### Custom Icon

```tsx
<FeedbackWidget
  icon={
    <svg width="24" height="24" viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
    </svg>
  }
  onSubmit={handleFeedback}
/>
```

### Custom Styles

```tsx
<FeedbackWidget
  customStyles={{
    icon: 'hover:scale-125',
    modal: 'rounded-xl',
    form: 'p-8',
    button: {
      submit: 'px-6 py-3',
      cancel: 'px-6 py-3',
    },
  }}
  onSubmit={handleFeedback}
/>
```

### Show/Hide Widget

```tsx
<FeedbackWidget
  show={isVisible}
  onSubmit={handleFeedback}
/>
```

### Custom Z-Index

```tsx
<FeedbackWidget
  zIndex={9999}
  onSubmit={handleFeedback}
/>
```

## Complete Example

```tsx
import { FeedbackWidget } from 'react-collect-feedback-widget';
import 'react-collect-feedback-widget/styles';

function App() {
  const handleFeedback = async (data) => {
    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) throw new Error('Failed to submit');
      
      console.log('Feedback submitted:', data);
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  return (
    <FeedbackWidget
      onSubmit={handleFeedback}
      fields={{
        rating: true,
        text: true,
        email: true,
        name: false,
        category: true,
      }}
      position="bottom-right"
      theme={{
        primary: '#3b82f6',
        success: '#10b981',
      }}
      labels={{
        title: 'Share Your Thoughts',
        rating: 'Rate your experience',
        text: 'What can we improve?',
      }}
      categories={[
        { value: 'bug', label: 'Bug' },
        { value: 'feature', label: 'Feature Request' },
        { value: 'feedback', label: 'General Feedback' },
      ]}
      zIndex={1000}
    />
  );
}
```

## API Reference

### FeedbackWidget Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onSubmit` | `(data: FeedbackData) => void \| Promise<void>` | - | Callback function called when feedback is submitted |
| `apiEndpoint` | `string` | - | API endpoint URL for direct submission |
| `fields` | `FeedbackFieldsConfig` | `{ rating: true, text: true }` | Configuration for which fields to show |
| `position` | `'top-left' \| 'top-right' \| 'bottom-left' \| 'bottom-right'` | `'bottom-right'` | Position of the feedback icon |
| `theme` | `FeedbackTheme` | - | Custom theme colors |
| `customStyles` | `object` | - | Custom CSS classes for styling |
| `icon` | `ReactNode` | - | Custom icon component |
| `labels` | `FeedbackLabels` | - | Customizable text labels |
| `categories` | `FeedbackCategory[]` | - | Categories for feedback type selection |
| `show` | `boolean` | `true` | Show/hide the widget |
| `zIndex` | `number` | `50` | Custom z-index for the widget |

### FeedbackData

```typescript
interface FeedbackData {
  rating?: number;      // 1-5 star rating
  text?: string;       // Text feedback
  email?: string;      // User email (optional)
  name?: string;       // User name (optional)
  category?: string;   // Feedback category
}
```

### FeedbackFieldsConfig

```typescript
interface FeedbackFieldsConfig {
  rating?: boolean;
  text?: boolean;
  email?: boolean;
  name?: boolean;
  category?: boolean;
}
```

### FeedbackTheme

```typescript
interface FeedbackTheme {
  primary?: string;    // Primary color (buttons, icons)
  secondary?: string;  // Secondary color
  background?: string; // Background color
  text?: string;       // Text color
  success?: string;    // Success message color
  error?: string;     // Error message color
}
```

### FeedbackLabels

```typescript
interface FeedbackLabels {
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
```

## Styling

The component uses Tailwind CSS for styling. Make sure to import the styles:

```tsx
import 'react-collect-feedback-widget/styles.css';
```

If you're using Tailwind in your project, you may need to configure it to include the widget's styles. The component uses utility classes that should work out of the box.

## TypeScript

Full TypeScript support is included. Import types as needed:

```tsx
import { FeedbackWidget, FeedbackData, FeedbackWidgetProps } from 'react-collect-feedback-widget';
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development

### Prerequisites

- Node.js 16+ and npm 8+

### Setup

```bash
# Clone the repository
git clone https://github.com/farukomer58/react-collect-feedback-widget.git
cd react-collect-feedback-widget

# Install dependencies
npm install

# Build the package
npm run build

# Run type checking
npm run type-check

# Watch mode for development
npm run dev
```

### Project Structure

```
src/
  components/     # React components
  hooks/          # Custom React hooks
  utils/          # Utility functions
  types.ts        # TypeScript definitions
  styles/         # CSS styles
  index.ts        # Main entry point
```

## Troubleshooting

### Styles not appearing

Make sure you've imported the CSS file:

```tsx
import 'react-collect-feedback-widget/styles.css';
```

### Modal not opening

- Check that the `show` prop is not set to `false`
- Verify that there are no z-index conflicts with other elements
- Ensure React and React-DOM are installed as peer dependencies

### Form validation errors

The widget includes built-in validation:
- Rating must be between 1-5 if the rating field is enabled
- Text feedback must be at least 3 characters if the text field is enabled
- Email must be valid format if provided
- Category must be selected if the category field is enabled

### TypeScript errors

Ensure you're using TypeScript 4.5+ and have `@types/react` and `@types/react-dom` installed.

## FAQ

**Q: Can I use this without Tailwind CSS?**  
A: The component uses Tailwind CSS classes, but the compiled CSS is included in the package. You don't need Tailwind in your project.

**Q: How do I customize the appearance?**  
A: Use the `theme` prop for colors and `customStyles` prop for additional CSS classes.

**Q: Can I submit feedback to multiple endpoints?**  
A: Use the `onSubmit` callback to handle multiple submissions or custom logic.

**Q: Is the widget accessible?**  
A: Yes! The widget includes ARIA labels, keyboard navigation, and focus management for screen readers.

## Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for a list of changes and version history.

