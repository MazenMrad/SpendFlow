# Authentication Configuration

## File Location
`lib/auth.ts`

## Purpose
Configures NextAuth.js authentication with credentials provider for email/password login using Prisma and bcrypt.

## Configuration Object

```typescript
export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  providers: [...],
  pages: { signIn: "/login" },
  callbacks: { ... }
};
```

## Providers

### CredentialsProvider
- **Name**: "credentials"
- **Fields**:
  - `email` (type: email)
  - `password` (type: password)

### Authorization Flow
1. Validates credentials exist
2. Finds user by email in database
3. Verifies user exists and has password
4. Compares password with bcrypt
5. Returns user object (id, email, name) if valid

## Session Configuration

### Strategy
- **Type**: JWT
- **Storage**: Encrypted JWT in cookie
- **User ID**: Added to session via callbacks

## Callbacks

### session
```typescript
async session({ session, token }) {
  if (token && session.user) {
    (session.user as any).id = token.id;
  }
  return session;
}
```
- Adds user ID from JWT token to session

### jwt
```typescript
async jwt({ token, user }) {
  if (user) {
    token.id = user.id;
  }
  return token;
}
```
- Adds user ID to JWT token on sign in

## Pages

| Page | Path |
|------|------|
| Sign In | `/login` |

## Environment Variables

| Variable | Purpose |
|----------|---------|
| NEXTAUTH_SECRET | JWT encryption secret |

## Dependencies

| Dependency | Purpose |
|------------|---------|
| `next-auth` | NextAuth.js core |
| `@/lib/prisma` | Database client |
| `bcryptjs` | Password verification |

## API Route

### File
`app/api/auth/[...nextauth]/route.ts`

### Implementation
```typescript
import { authOptions } from "@/lib/auth";
import NextAuth from "next-auth";

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
```

## Security

1. **Password Verification**: bcrypt.compare for secure password check
2. **JWT Strategy**: Stateless sessions with encrypted tokens
3. **Secret**: Required for JWT encryption
4. **Error Messages**: Generic to prevent user enumeration

## Usage

### In Components
```typescript
import { useSession, signIn, signOut } from "next-auth/react";

const { data: session } = useSession();
const userId = session?.user?.id;
```

### Server Actions
```typescript
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const session = await getServerSession(authOptions);
```
