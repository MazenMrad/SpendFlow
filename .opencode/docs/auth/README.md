# Authentication System Documentation

## Overview
This directory contains comprehensive documentation for the SpendFlow authentication system, built with NextAuth.js, Prisma, and bcrypt.

## Architecture

The authentication system consists of the following layers:

```
┌─────────────────────────────────────────────────────────┐
│                  UI Components                           │
│  LoginForm.tsx    RegisterForm.tsx                     │
│  LoginHeader.tsx  RegisterHeader.tsx                   │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│              NextAuth React Integration                │
│  Providers.tsx (SessionProvider wrapper)              │
│  useSession() hook in components                       │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│              NextAuth API Routes                         │
│  /api/auth/[...nextauth]/route.ts                      │
│  - Sign in/out endpoints                               │
│  - Session management                                    │
│  - Callback handlers                                     │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│              Authentication Configuration              │
│  lib/auth.ts                                           │
│  - Credentials provider setup                          │
│  - JWT session strategy                                │
│  - Callbacks (session, jwt)                            │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│              Server Actions                              │
│  app/actions/auth.ts                                   │
│  - signUp(): User registration                         │
│  - changePassword(): Password update                   │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│              Database Layer (Prisma)                   │
│  prisma/schema.prisma -> User model                    │
└─────────────────────────────────────────────────────────┘
```

## Components Documentation

### UI Components
- **[LoginForm.md](./LoginForm.md)** - Login form with email/password
- **[LoginHeader.md](./LoginHeader.md)** - Navigation header for login page
- **[RegisterForm.md](./RegisterForm.md)** - Registration form with validation
- **[RegisterHeader.md](./RegisterHeader.md)** - Navigation header for registration page
- **[Providers.md](./Providers.md)** - NextAuth SessionProvider wrapper

### Backend Components
- **[lib-auth.md](./lib-auth.md)** - NextAuth configuration (authOptions)
- **[actions-auth.md](./actions-auth.md)** - Server actions for auth operations
- **[route-nextauth.md](./route-nextauth.md)** - NextAuth API route handler

## Authentication Flow

### Login Flow
```
User submits form
    ↓
LoginForm calls signIn("credentials", {...})
    ↓
POST /api/auth/callback/credentials
    ↓
lib/auth.ts authorize() callback
    ↓
Prisma user lookup + bcrypt.compare()
    ↓
JWT token created
    ↓
Session cookie set
    ↓
Redirect to /dashboard
```

### Registration Flow
```
User submits form
    ↓
RegisterForm calls signUp() server action
    ↓
app/actions/auth.ts signUp()
    ↓
Validate inputs + check existing user
    ↓
bcrypt.hash(password, 12)
    ↓
Prisma user.create()
    ↓
Redirect to /login
```

## Security Features

- **Password Hashing**: bcrypt with 12 rounds
- **JWT Sessions**: Stateless authentication tokens
- **CSRF Protection**: Built into NextAuth
- **Secure Cookies**: HttpOnly, Secure in production
- **Input Validation**: Server-side validation on all inputs
- **Generic Error Messages**: Prevents user enumeration

## Environment Variables

```env
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
DATABASE_URL=mongodb+srv://...
```

## Quick Reference

| Operation | Method | Location |
|-----------|--------|----------|
| Login | `signIn("credentials")` | LoginForm.tsx |
| Logout | `signOut()` | Any component |
| Get Session | `useSession()` | Any client component |
| Server Session | `getServerSession()` | Server actions/API |
| Register | `signUp(formData)` | app/actions/auth.ts |
| Change Password | `changePassword(formData)` | app/actions/auth.ts |

## Related Documentation

- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Next.js Authentication](https://nextjs.org/docs/app/building-your-application/authentication)
- See `../context.md` for project-wide context
