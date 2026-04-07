# Authentication Configuration (lib/auth.ts)

## File Location
`lib/auth.ts`

## Purpose
This file contains the core NextAuth.js configuration including credentials provider setup, session management, JWT handling, and authentication callbacks for the SpendFlow application.

## Configuration Object

```typescript
export const authOptions: NextAuthOptions
```

## Configuration Structure

### 1. Secret Configuration
```typescript
secret: process.env.NEXTAUTH_SECRET
```
- Used for encrypting JWT tokens and session cookies
- Debug logging shows first 5 characters for verification

### 2. Session Strategy
```typescript
session: {
  strategy: "jwt"
}
```
- Uses JWT-based sessions (stateless)
- No database session storage required

### 3. Credentials Provider

Provider Name: `credentials`

#### Credentials Schema
| Field | Label | Type |
|-------|-------|------|
| email | Email | email |
| password | Password | password |

#### Authorization Flow

```
1. Validate credentials presence
2. Query user by email from Prisma
3. Verify user exists and has password
4. Compare password using bcrypt
5. Return user object or throw error
```

#### Error Handling
| Error | Condition |
|-------|-----------|
| "Invalid credentials" | Missing email or password |
| "No user found" | User doesn't exist or has no password |
| "Invalid password" | Password mismatch |

#### Returned User Object
```typescript
{
  id: user.id,      // MongoDB ObjectId
  email: user.email,
  name: user.name
}
```

### 4. Custom Pages
```typescript
pages: {
  signIn: "/login"
}
```
- Redirects unauthenticated users to custom login page

### 5. Callbacks

#### Session Callback
```typescript
async session({ session, token })
```
- Adds user ID to session object from JWT token
- Enables `session.user.id` access in client components

#### JWT Callback
```typescript
async jwt({ token, user })
```
- Persists user ID in JWT token on initial sign in
- Token is used for subsequent session verification

## Dependencies

| Dependency | Purpose |
|------------|---------|
| `next-auth` | NextAuthOptions type |
| `next-auth/providers/credentials` | Credentials provider |
| `@/lib/prisma` | Database client for user lookup |
| `bcryptjs` | Password hashing/comparison |

## Security Implementation

### Password Verification
```typescript
const isPasswordCorrect = await bcrypt.compare(
  credentials.password,
  user.password
);
```

### Token Structure
The JWT token contains:
- Standard JWT claims (exp, iat, etc.)
- Custom `id` field for user identification

## Environment Variables Required

| Variable | Purpose |
|----------|---------|
| `NEXTAUTH_SECRET` | JWT signing secret (generate with `openssl rand -base64 32`) |
| `DATABASE_URL` | MongoDB connection string (via Prisma) |

## Usage Examples

### Server-Side (API Routes)
```typescript
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";

const session = await getServerSession(authOptions);
```

### Client-Side
```typescript
import { signIn, signOut } from "next-auth/react";

// Login
await signIn("credentials", { email, password, redirect: false });

// Logout
await signOut();
```

## Related Files

- `app/api/auth/[...nextauth]/route.ts` - API route handler
- `app/actions/auth.ts` - Server actions for user management
- `app/components/Providers.tsx` - Session provider wrapper
- `prisma/schema.prisma` - User model definition
