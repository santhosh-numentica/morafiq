# Architecture Documentation

## Overview

This application follows a **feature-first architecture** designed for scalability, maintainability, and testability. The architecture emphasizes separation of concerns, dependency injection, and type safety.

## Core Principles

1. **Feature-First Structure**: Code is organized by features rather than technical layers
2. **Dependency Injection**: Services are injected for testability and flexibility
3. **Type Safety**: Comprehensive TypeScript usage with strict mode enabled
4. **Single Responsibility**: Each module has a clear, focused purpose
5. **Security First**: Secure defaults and no shortcuts with sensitive data

## Directory Structure

```
src/
├── app/                    # Application-level code
│   ├── config/            # Configuration management
│   ├── navigation/        # Navigation setup
│   ├── providers/         # React context providers
│   └── bootstrap/         # App initialization
├── core/                   # Core infrastructure (shared across features)
│   ├── api/              # HTTP client and API utilities
│   ├── errors/           # Error handling system
│   ├── logging/          # Logging infrastructure
│   ├── security/         # Security utilities
│   ├── storage/          # Storage abstractions
│   ├── network/          # Network monitoring
│   └── types/            # Shared core types
├── features/              # Feature modules
│   └── auth/             # Authentication feature
│       ├── api/         # Feature-specific API
│       ├── providers/   # Auth provider implementations
│       ├── services/    # Business logic
│       ├── store/       # Feature state
│       ├── hooks/       # Custom hooks
│       ├── schemas/     # Validation schemas
│       ├── components/  # Feature components
│       ├── screens/     # Feature screens
│       └── types/       # Feature types
└── shared/               # Shared utilities
    ├── components/      # Reusable UI components
    ├── theme/           # Design system
    └── store/           # Shared state stores
```

## Core Infrastructure

### API Layer (`core/api/`)

- **apiClient**: Singleton Axios instance with interceptors
- **interceptors**: Request/response handling for auth, logging, and errors
- **apiConfig**: Centralized API endpoint definitions

### Error Handling (`core/errors/`)

- **ErrorCode**: Enum of application-specific error codes
- **AppError**: Base error class with metadata
- **Specific Errors**: ApiError, NetworkError, TimeoutError, etc.
- **errorMapper**: Maps external errors to internal error types
- **errorHandler**: Centralized error processing

### Logging (`core/logging/`)

- **logger**: Centralized logging with multiple levels
- **logSanitizer**: Redacts sensitive information from logs
- **logTypes**: Type definitions for log entries

### Security (`core/security/`)

- **tokenManager**: Token storage and lifecycle management
- **secureData**: Data masking and sanitization utilities

### Storage (`core/storage/`)

- **storageService**: AsyncStorage wrapper with singleton pattern
- **secureStorage**: Keychain wrapper for sensitive data
- **storageKeys**: Centralized storage key constants

### Network (`core/network/`)

- **networkService**: Network status monitoring
- **networkTypes**: Network state type definitions

## Feature Structure

Each feature follows a consistent structure:

```
features/[feature-name]/
├── api/              # API calls specific to the feature
├── providers/        # External service integrations
├── services/         # Business logic layer
├── store/            # Zustand state management
├── hooks/            # Custom React hooks
├── schemas/          # Zod validation schemas
├── components/       # Feature-specific components
├── screens/          # Feature screens
└── types/            # TypeScript type definitions
```

## State Management

### Zustand Stores

- **Auth Store** (`features/auth/store/`): Authentication state
- **Theme Store** (`shared/store/`): Theme preferences
- **UI Store** (`shared/store/`): UI preferences

### TanStack Query

- Server state management
- Caching and invalidation
- Optimistic updates
- Background refetching

## Navigation

### Navigation Structure

- **RootNavigator**: Main navigation container
- **AuthNavigator**: Authentication flow screens
- **AppNavigator**: Main app screens

### Navigation Types

Type-safe navigation using TypeScript generics for route parameters.

## Providers

- **QueryProvider**: TanStack Query setup
- **ThemeProvider**: Theme context
- **ErrorBoundary**: Error boundary for React component tree

## Bootstrap

- **bootstrapApp**: Application initialization
- **dependencyContainer**: Service container for dependency injection

## Type Safety

- Strict TypeScript configuration
- No `any` types allowed
- Comprehensive type definitions
- Generic types for reusability

## Security Considerations

1. **Token Storage**: Never store tokens in AsyncStorage - use Keychain
2. **Logging**: Never log sensitive data - use sanitization
3. **Error Messages**: Never expose internal details in user-facing errors
4. **API Keys**: Never hardcode - use environment variables
5. **Password Storage**: Never store passwords - use secure hashing

## Performance Optimizations

1. **Code Splitting**: Navigation-based code splitting
2. **Memoization**: React.memo for expensive components
3. **Lazy Loading**: Lazy load features when possible
4. **Request Deduplication**: TanStack Query automatic deduplication
5. **Image Optimization**: Proper image sizing and formats

## Testing Strategy

- Unit tests for pure functions
- Component tests for UI components
- Integration tests for feature flows
- E2E tests for critical user journeys

## Scalability Considerations

1. **Feature Isolation**: Features can be developed independently
2. **Shared Infrastructure**: Core services are reusable
3. **Dependency Injection**: Easy to swap implementations
4. **Type Safety**: Refactoring is safe with TypeScript
5. **Clear Boundaries**: Well-defined module interfaces
