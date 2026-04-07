# User Profile API Route

## Overview
API endpoint for fetching the currently authenticated user's profile information.

**File:** `app/api/me/route.ts`  
**HTTP Method:** `GET`  
**Authentication:** Required (via NextAuth session)

## Endpoint

```
GET /api/me
```

## Request

### Headers
- `Content-Type: application/json`
- Authentication is handled via NextAuth session cookie

### Parameters
None required.

## Response

### Success (200 OK)

```typescript
{
  id: string;           // User ID from session
  email: string | null; // User email
  name: string | null;  // User name
}
```

**Example:**
```json
{
  "id": "65a1b2c3d4e5f6g7h8i9j0k1",
  "email": "user@example.com",
  "name": "John Doe"
}
```

### Error Response (401 Unauthorized)

```json
{
  "error": "Not logged in"
}
```

## Dependencies

### Imports
- `next/server` - Next.js server utilities
- `next-auth/next` - NextAuth server-side session utilities
- `@/lib/auth` - Auth configuration (`authOptions`)

### Related Functions
- `getServerSession()` from next-auth - Retrieves the current session
- `authOptions` from `@/lib/auth` - Authentication configuration

## Error Handling

| Error Type | HTTP Status | Description |
|------------|-------------|-------------|
| Unauthorized | 401 | User is not authenticated (no session or user data) |

## Usage Example

```typescript
// Client-side fetch
const fetchUserProfile = async () => {
  const response = await fetch('/api/me');
  
  if (!response.ok) {
    if (response.status === 401) {
      // Redirect to login or show auth required message
      window.location.href = '/login';
      return;
    }
    throw new Error('Failed to fetch user profile');
  }
  
  const user = await response.json();
  return user;
};

// Using SWR
import useSWR from 'swr';

const { data: user, error } = useSWR('/api/me', fetch);
```

## Implementation Notes

1. Simple endpoint that returns basic user profile information
2. Session is validated via `getServerSession(authOptions)`
3. User ID is cast to `any` due to type limitations in NextAuth session
4. Returns only safe, non-sensitive user information (excludes password, etc.)
5. Typically used for displaying user info in UI or verifying authentication status
