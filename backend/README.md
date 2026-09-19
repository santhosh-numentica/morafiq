# Morafiq Backend API

NestJS backend with Prisma ORM for Morafiq app authentication.

## Features

- **Email/OTP Authentication**: Send and verify OTP codes via email
- **Google OAuth**: Sign in with Google account
- **Passkey/WebAuthn**: Passwordless authentication using passkeys
- **JWT Authentication**: Secure token-based authentication
- **Session Management**: Track user sessions

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

Update the following variables:
- `DATABASE_URL`: Your PostgreSQL connection string
- `JWT_SECRET`: A secure random string for JWT signing
- `GOOGLE_CLIENT_ID` & `GOOGLE_CLIENT_SECRET`: From Google Cloud Console
- SMTP settings for email delivery

### 3. Set up Database

```bash
# Generate Prisma client
npm run prisma:generate

# Run migrations
npm run prisma:migrate
```

### 4. Start the Server

```bash
# Development mode
npm run start:dev

# Production mode
npm run build
npm run start:prod
```

The API will be available at `http://localhost:3000`

## API Endpoints

### Email/OTP Authentication

- `POST /auth/send-otp` - Send OTP to email
  - Body: `{ "email": "user@example.com" }`
  
- `POST /auth/verify-otp` - Verify OTP and get token
  - Body: `{ "email": "user@example.com", "code": "123456" }`

### Google OAuth

- `GET /auth/google` - Initiate Google OAuth flow
- `GET /auth/google/callback` - Google OAuth callback

### Passkey/WebAuthn

- `POST /auth/passkey/register/options` - Get passkey registration options
  - Body: `{ "email": "user@example.com" }`
  
- `POST /auth/passkey/register/verify` - Verify passkey registration
  - Body: `{ "email": "user@example.com", "response": {...} }`
  
- `POST /auth/passkey/authenticate/options` - Get passkey authentication options
  - Body: `{ "email": "user@example.com" }`
  
- `POST /auth/passkey/authenticate/verify` - Verify passkey authentication
  - Body: `{ "response": {...} }`

### Protected Routes

- `GET /auth/profile` - Get current user profile (requires JWT token)

## Database Schema

### User
- `id`: Unique identifier
- `email`: User email (optional)
- `emailVerified`: Email verification status
- `googleId`: Google OAuth ID (optional)
- `googleEmail`: Google email (optional)
- `passkeys`: Associated passkeys
- `sessions`: User sessions

### Passkey
- `credentialId`: WebAuthn credential ID
- `publicKey`: Credential public key
- `counter`: Signature counter
- `transports`: Allowed transports
- `userId`: Associated user

### Session
- `token`: JWT token
- `userId`: Associated user
- `expiresAt`: Token expiration

### OTP
- `email`: Recipient email
- `code`: OTP code
- `expiresAt`: Expiration timestamp
- `used`: Usage status

## Development

```bash
# Run Prisma Studio (database GUI)
npm run prisma:studio

# Type checking
npm run build

# Linting
npm run lint
```

## Security Notes

- Change `JWT_SECRET` in production
- Use environment-specific database URLs
- Implement rate limiting for OTP endpoints
- Enable HTTPS in production
- Use proper CORS settings for your frontend domain
