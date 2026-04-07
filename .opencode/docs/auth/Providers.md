# Providers Component

## File Location
`app/components/Providers.tsx`

## Purpose
The Providers component wraps the application with NextAuth's SessionProvider, enabling authentication state management throughout the React component tree via React Context.

## Component Structure

### Props Interface
```typescript
interface ProvidersProps {
  children: React.ReactNode;  // Child components to wrap with auth context
}
```

### Component Definition
```typescript
export function Providers({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
```

## Functionality

This is a thin wrapper around NextAuth.js's `SessionProvider` that:

1. **Provides Session Context**: Makes authentication state available to all child components
2. **Manages Session State**: Handles session refresh, token management, and user state
3. **Enables Auth Hooks**: Allows use of `useSession()` hook in child components

## Dependencies

| Dependency | Purpose |
|------------|---------|
| `next-auth/react` | SessionProvider for authentication context |

## Usage in Application

The Providers component should be used in the root layout to wrap all pages:

```typescript
// app/layout.tsx
import { Providers } from "@/app/components/Providers";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
```

## Child Components Benefits

Any component wrapped by Providers can use NextAuth hooks:

```typescript
"use client";
import { useSession } from "next-auth/react";

function MyComponent() {
  const { data: session, status } = useSession();
  
  if (status === "loading") return <div>Loading...</div>;
  if (status === "unauthenticated") return <div>Not logged in</div>;
  
  return <div>Welcome, {session.user.name}!</div>;
}
```

## Session States

| Status | Description |
|--------|-------------|
| `"loading"` | Session is being fetched |
| `"authenticated"` | User is logged in |
| `"unauthenticated"` | User is not logged in |

## Related Configuration

This component works in conjunction with:
- `lib/auth.ts` - NextAuth configuration options
- `app/api/auth/[...nextauth]/route.ts` - API route handler
- NextAuth session callbacks for JWT management

## Note

The component must be marked with `"use client"` directive as it uses React Context which requires client-side rendering.
