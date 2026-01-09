# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.1.0] - 2026-01-10

### Added
- Comprehensive JSDoc documentation for all components and functions
- Form validation with detailed error messages
- StarRating component extracted for reusability
- Utility functions for position mapping and constants
- Improved accessibility with ARIA attributes and focus management
- Performance optimizations with React.memo
- Type safety improvements (removed `any` types)
- MIT LICENSE file
- CONTRIBUTING.md with contribution guidelines
- CHANGELOG.md following Keep a Changelog format
- GitHub Actions CI workflow
- OPEN_SOURCE_GUIDE.md

### Changed
- Refactored code structure for better maintainability
- Improved error handling in useFeedback hook
- Enhanced modal focus management
- Better keyboard navigation support
- Updated package.json with repository metadata
- Enhanced README.md with badges and additional sections
- Improved .gitignore file

### Fixed
- Memory leak in FeedbackModal (timeout cleanup)
- Missing dependency in useEffect hooks
- Improved error messages for API submissions

## [1.0.2] - 2026-XX-XX

### Added
- Initial release
- Feedback widget with floating icon
- Modal form with customizable fields
- Star rating system
- Text, email, name, and category fields
- Theme customization
- Position customization
- API endpoint and callback submission support

[Unreleased]: https://github.com/farukomer58/react-collect-feedback-widget/compare/v1.1.0...HEAD
[1.1.0]: https://github.com/farukomer58/react-collect-feedback-widget/compare/v1.0.2...v1.1.0
[1.0.2]: https://github.com/farukomer58/react-collect-feedback-widget/releases/tag/v1.0.2