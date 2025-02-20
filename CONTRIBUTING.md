# Contributing to PurrKit

First off, thank you for considering contributing to PurrKit! It's people like you that make PurrKit such a great tool.

## 🤝 Code of Conduct

By participating in this project, you are expected to uphold our Code of Conduct:

- Use welcoming and inclusive language
- Be respectful of differing viewpoints and experiences
- Gracefully accept constructive criticism
- Focus on what is best for the community
- Show empathy towards other community members

## 🚀 Getting Started

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/your-username/purrkit.git
   ```
3. Add the upstream repository:
   ```bash
   git remote add upstream https://github.com/original-owner/purrkit.git
   ```
4. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## 💻 Development Process

1. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

2. Create your `.env.development`:
   ```env
   NEXT_PUBLIC_PRIVY_APP_ID=your_privy_app_id
   NEXT_PUBLIC_HYPERLIQUID_RPC_URL=your_rpc_url
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

## 📝 Coding Guidelines

### General

- Use TypeScript for all new code
- Follow the existing code style
- Keep components small and focused
- Write self-documenting code with clear variable/function names
- Add comments for complex logic

### Component Structure

```typescript
// Imports
import { useState } from 'react'
import type { ComponentProps } from 'types'

// Types
interface Props {
  // ...
}

// Component
export function ComponentName({ prop1, prop2 }: Props) {
  // State/hooks
  const [state, setState] = useState()

  // Handlers
  const handleEvent = () => {
    // ...
  }

  // Render
  return (
    // JSX
  )
}
```

### Styling

- Use Tailwind CSS classes
- Follow the project's color scheme
- Keep responsive design in mind
- Use semantic HTML elements

## 🧪 Testing

- Add tests for new features
- Update tests for modified features
- Run tests before submitting PR:
  ```bash
  npm run test
  # or
  yarn test
  ```

## 📦 Pull Request Process

1. Update the README.md with details of changes if needed
2. Update the documentation if you're changing functionality
3. Make sure your code lints:
   ```bash
   npm run lint
   # or
   yarn lint
   ```
4. Create a Pull Request with a clear title and description

### PR Title Format
- `feat: Add new feature`
- `fix: Fix specific issue`
- `docs: Update documentation`
- `style: Update styling`
- `refactor: Refactor code`
- `test: Add tests`

## 🐛 Bug Reports

When filing an issue, make sure to answer these questions:

1. What version of the project are you using?
2. What operating system and processor architecture are you using?
3. What did you do?
4. What did you expect to see?
5. What did you see instead?

## 💡 Feature Requests

Feature requests are welcome! Please provide:

1. Clear description of the feature
2. Use cases for the feature
3. Any technical details or considerations
4. Mock-ups or examples if applicable

## 🔧 Working with Tools

### Creating a New Tool

1. Create a new directory in `app/tools/[tool-name]`
2. Add the tool to the grid in `components/tool-grid.tsx`
3. Follow the existing pattern for tool pages
4. Add necessary components in `components/[tool-name]`

### Modifying Existing Tools

1. Maintain backward compatibility
2. Update documentation
3. Add migration guide if needed
4. Update tests

## 📚 Documentation

- Keep README.md up to date
- Document new features
- Add JSDoc comments for functions
- Update type definitions

## 🙏 Thank You!

Your contributions to PurrKit help make it better for everyone. Thank you for your time and effort! 