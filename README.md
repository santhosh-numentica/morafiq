# Enterprise React Native App

A production-grade React Native application built with TypeScript, featuring a scalable feature-first architecture, multi-method authentication, and comprehensive error handling.

## 🏗️ Architecture

This project follows a **feature-first architecture** with clear separation of concerns:

```
src/
├── app/                    # App-level configuration and navigation
│   ├── config/            # Environment and feature flags
│   ├── navigation/        # Navigation setup and types
│   ├── providers/         # React context providers
│   └── bootstrap/         # App initialization
├── core/                   # Core infrastructure
│   ├── api/              # API client and interceptors
│   ├── errors/           # Error handling system
│   ├── logging/          # Logging with sanitization
│   ├── security/         # Token management and data sanitization
│   ├── storage/          # Secure and regular storage
│   ├── network/          # Network status monitoring
│   └── types/            # Core type definitions
├── features/              # Feature modules
│   └── auth/             # Authentication feature
│       ├── api/         # Auth API calls
│       ├── providers/   # Auth providers (Email, Google, Apple, Passkey)
│       ├── services/    # Auth business logic
│       ├── store/       # Zustand auth store
│       ├── hooks/       # Custom React hooks
│       ├── schemas/     # Zod validation schemas
│       ├── components/  # Auth-specific components
│       ├── screens/     # Auth screens
│       └── types/       # Auth type definitions
└── shared/               # Shared utilities
    ├── components/      # Reusable UI components
    ├── theme/           # Theme system
    └── store/           # Shared Zustand stores
```

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18.0.0
- pnpm >= 8.0.0
- React Native CLI
- Android Studio / Xcode (for mobile development)

### Installation

1. Install pnpm (if not already installed):
```bash
npm install -g pnpm
```

2. Install dependencies:
```bash
pnpm install
```

2. Configure environment variables:
```bash
cp .env.example .env.development
# Edit .env.development with your configuration
```

3. Run the app:
```bash
# iOS
npm run ios

# Android
npm run android
```

## 🔐 Authentication

The app supports multiple authentication methods:

- **Email/Password**: Traditional email-based authentication
- **Google Sign-In**: OAuth integration with Google
- **Apple Sign-In**: OAuth integration with Apple
- **Passkeys**: FIDO2/WebAuthn support for passwordless authentication

### Account Linking

Users can link multiple authentication methods to their account for flexible login options.

## 📦 Key Features

### Core Infrastructure

- **API Client**: Axios-based HTTP client with interceptors for auth, logging, and token refresh
- **Error Handling**: Centralized error system with typed error classes and user-friendly messages
- **Logging**: Configurable logging with sensitive data sanitization
- **Storage**: Secure token storage using React Native Keychain
- **Network**: Network status monitoring with offline detection
- **Security**: Token management, data masking, and sanitization

### State Management

- **Zustand**: Lightweight state management for auth, theme, and UI preferences
- **TanStack Query**: Server state management with caching and optimistic updates

### UI Components

- **Design System**: Consistent theme with light/dark mode support
- **Reusable Components**: Button, Input, PasswordInput, Loader, Skeleton, EmptyState, ErrorState, Screen

### Navigation

- **React Navigation**: Type-safe navigation with separate Auth and App navigators
- **Protected Routes**: Automatic redirection based on auth status

## 🧪 Testing

```bash
pnpm test
```

## 📝 Scripts

- `pnpm android` - Run on Android
- `pnpm ios` - Run on iOS
- `pnpm dev` - Start Metro bundler
- `pnpm test` - Run tests
- `pnpm lint` - Run ESLint
- `pnpm lint:fix` - Fix ESLint issues
- `pnpm format` - Format code with Prettier
- `pnpm type-check` - TypeScript type checking

## 🔧 Configuration

### Environment Variables

See `.env.example` for available configuration options:

- `API_BASE_URL` - Backend API endpoint
- `API_TIMEOUT` - Request timeout in milliseconds
- `ENABLE_API_LOGGING` - Enable/disable API request logging
- `GOOGLE_CLIENT_ID` - Google OAuth client ID
- `APPLE_CLIENT_ID` - Apple OAuth client ID
- `PASSKEY_RP_ID` - Passkey relying party ID

### Feature Flags

Feature flags can be toggled in `src/app/config/featureFlags.ts`:

- `googleLogin` - Enable/disable Google Sign-In
- `appleLogin` - Enable/disable Apple Sign-In
- `passkeyLogin` - Enable/disable Passkey authentication

## 🛡️ Security

- **Token Storage**: Secure storage using React Native Keychain
- **Data Sanitization**: Automatic redaction of sensitive data in logs
- **Token Refresh**: Automatic token refresh with retry logic
- **Error Handling**: No sensitive data exposed in error messages

## 📱 Accessibility

- Screen reader support
- Proper color contrast ratios
- Touch target sizes (minimum 44x44)
- Semantic component structure

## 🚀 Performance

- Code splitting with React Navigation
- Image optimization
- Lazy loading of features
- Optimistic UI updates
- Request deduplication with TanStack Query

## 📚 Documentation

- `ARCHITECTURE.md` - Detailed architecture documentation
- `AUTHENTICATION.md` - Authentication system documentation
- `ERROR_HANDLING.md` - Error handling guide
- `API_GUIDE.md` - API usage guide
- `SECURITY.md` - Security best practices

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

Proprietary - All rights reserved
