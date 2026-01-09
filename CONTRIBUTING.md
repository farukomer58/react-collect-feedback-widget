# Contributing to React Feedback Widget

Thank you for your interest in contributing to React Feedback Widget! This document provides guidelines and instructions for contributing.

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for all contributors.

## How to Contribute

### Reporting Bugs

If you find a bug, please open an issue with:
- A clear, descriptive title
- Steps to reproduce the issue
- Expected behavior
- Actual behavior
- Your environment (browser, OS, React version)
- Any relevant screenshots or code examples

### Suggesting Features

Feature suggestions are welcome! Please open an issue with:
- A clear description of the feature
- Use cases and examples
- Any potential implementation ideas

### Pull Requests

1. **Fork the repository** and create a branch from `main`
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Set up the development environment**
   ```bash
   npm install
   ```

3. **Make your changes**
   - Follow the code style guidelines below
   - Add tests if applicable
   - Update documentation as needed

4. **Test your changes**
   ```bash
   npm run type-check
   npm run build
   ```

5. **Commit your changes**
   - Use clear, descriptive commit messages
   - Follow conventional commits format when possible

6. **Push and create a Pull Request**
   - Provide a clear description of your changes
   - Reference any related issues
   - Ensure all CI checks pass

## Development Setup

### Prerequisites

- Node.js 16+ and npm
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/react-collect-feedback-widget.git
cd react-collect-feedback-widget

# Install dependencies
npm install
```

### Available Scripts

- `npm run build` - Build the package for production
- `npm run dev` - Build in watch mode for development
- `npm run type-check` - Run TypeScript type checking
- `npm run build:css` - Build CSS styles
- `npm run build:types` - Copy type definition files

### Project Structure

```
src/
  components/     # React components
  hooks/          # Custom React hooks
  types.ts        # TypeScript type definitions
  utils/          # Utility functions
  styles/         # CSS styles
  index.ts        # Main entry point
```

## Code Style Guidelines

### TypeScript

- Use TypeScript for all new code
- Avoid `any` types - use proper types or `unknown`
- Add JSDoc comments for exported functions and components
- Use meaningful variable and function names

### React

- Use functional components with hooks
- Use `React.memo` for components that don't need frequent re-renders
- Keep components focused and single-purpose
- Extract reusable logic into custom hooks

### Code Formatting

- Use consistent indentation (2 spaces)
- Use single quotes for strings
- Add trailing commas in multi-line objects/arrays
- Keep lines under 100 characters when possible

### Accessibility

- Always include ARIA labels where appropriate
- Ensure keyboard navigation works
- Test with screen readers when possible
- Maintain proper semantic HTML

## Testing

While automated tests are not yet set up, please manually test your changes:

1. Test in different browsers (Chrome, Firefox, Safari, Edge)
2. Test with keyboard navigation
3. Test with screen readers if possible
4. Test responsive behavior on different screen sizes

## Documentation

- Update README.md if you add new features or change behavior
- Add JSDoc comments for new functions/components
- Update examples if the API changes

## Release Process

Releases are managed by maintainers. Version numbers follow [Semantic Versioning](https://semver.org/).

## Questions?

If you have questions, feel free to:
- Open an issue for discussion
- Check existing issues and discussions

Thank you for contributing! 🎉

