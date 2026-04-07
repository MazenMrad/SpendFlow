# NextAuth API Route (app/api/auth/[...nextauth]/route.ts)

## File Location
`app/api/auth/[...nextauth]/route.ts`

## Purpose
This file creates the API endpoints required for NextAuth.js authentication. It handles all authentication-related HTTP requests including sign in, sign out, session management, and callback handling.

## Route Structure

### Dynamic Route Segment
- `[...nextauth]` - Catch-all route segment that handles multiple auth endpoints
- Maps to: `/api/auth/*` (signin, signout, session, callback, etc.)

## Implementation

```typescript
import { authOptions } from "@/lib/auth";
import NextAuth from "next-auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
```

## HTTP Methods

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | /api/auth/signin | Display sign-in page |
| POST | /api/auth/signin | Process credentials sign-in |
| GET | /api/auth/signout | Handle sign-out |
| GET | /api/auth/session | Get current session |
| GET | /api/auth/callback/* | OAuth callbacks |
| GET | /api/auth/csrf | Get CSRF token |
| POST | /api/auth/callback/credentials | Credentials callback |

## Endpoints Generated

NextAuth automatically creates these endpoints based on the configuration:

### Authentication Flow Endpoints
```
/api/auth/signin          - Sign in page/form
/api/auth/signout         - Sign out handler
/api/auth/session         - Session data (JSON)
/api/auth/csrf            - CSRF token endpoint
/api/auth/providers       - Available providers list
```

### Credentials Provider Endpoint
```
/api/auth/callback/credentials
  - POST: Validates credentials
  - Returns: JWT token (if using JWT strategy)
```

## Configuration Source

The `authOptions` imported from `@/lib/auth` includes:
- Credentials provider configuration
- Session strategy (JWT)
- Custom pages (signIn: "/login")
- Session and JWT callbacks

## Request Flow

### Sign In Request
```
1. POST to /api/auth/callback/credentials
2. NextAuth validates credentials via authorize() callback
3. JWT token created with user data
4. Session cookie set in response
5. User redirected to callback URL or dashboard
```

### Session Request
```
1. GET to /api/auth/session
2. NextAuth validates session cookie
3. JWT decoded and session callback executed
4. Returns session data (user info, expiry)
```

## Dependencies

| Dependency | Purpose |
|------------|---------|
| `next-auth` | NextAuth handler factory |
| `@/lib/auth` | Authentication configuration |

## Middleware Integration

This route works with Next.js middleware for route protection:

```typescript
// middleware.ts example
import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
  },
});

export const config = {
  matcher: ["/dashboard/:path*", "/account/:path*"],
};
```

## Client-Side Usage

Components interact with these endpoints via NextAuth React hooks:

```typescript
import { signIn, signOut, useSession } from "next-auth/react";

// Trigger sign-in (POST to /api/auth/signin)
await signIn("credentials", { email, password });

// Get session (GET to /api/auth/session)
const { data: session } = useSession();

// Sign out (GET to /api/auth/signout)
await signOut();
```

## Security

- CSRF protection on all state-changing requests
- Secure session cookies (HttpOnly, Secure in production)
- JWT tokens signed with NEXTAUTH_SECRET
- Rate limiting should be implemented at middleware/proxy level

## Troubleshooting

### Common Issues

1. **404 on auth endpoints**
   - Verify file is at `app/api/auth/[...nextauth]/route.ts`
   - Check that both GET and POST are exported

2. **Session not persisting**
   - Verify NEXTAUTH_SECRET is set
   - Check cookie settings in authOptions
   - Ensure SessionProvider wraps app

3. **Credentials not working**
   - Verify credentials provider is configured in lib/auth.ts
   - Check authorize() function returns user object
   - Ensure user exists in database with correct password hash

## Related Files

- `lib/auth.ts` - NextAuth configuration
- `app/components/Providers.tsx` - Session provider setup
- `middleware.ts` - Route protection (if exists)
