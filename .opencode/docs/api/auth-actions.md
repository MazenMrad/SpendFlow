# Authentication Server Actions

## Overview
Server actions for user authentication including registration and password management.

**File:** `app/actions/auth.ts`  
**Directive:** `"use server"`  
**Authentication:** Some actions require active session

## Actions

### 1. signUp

Register a new user account.

#### Signature

```typescript
async function signUp(formData: FormData): Promise<
  | { success: true }
  | { error: string }
>
```

#### Parameters

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| name | string | Yes | User's display name |
| email | string | Yes | User's email address (unique) |
| password | string | Yes | User's password (will be hashed) |

#### FormData Usage

```typescript
const formData = new FormData();
formData.append('name', 'John Doe');
formData.append('email', 'john@example.com');
formData.append('password', 'securePassword123');

const result = await signUp(formData);
```

#### Response

**Success:**
```typescript
{ success: true }
```

**Errors:**
```typescript
{ error: "Name, email and password are required" }
{ error: "User already exists" }
{ error: "Something went wrong" }
```

#### Implementation Details

1. Validates all fields are present
2. Checks for existing user by email
3. Hashes password with bcrypt (12 rounds)
4. Creates user record in database with default values
5. Returns success or appropriate error

---

### 2. changePassword

Update the authenticated user's password.

#### Signature

```typescript
async function changePassword(formData: FormData): Promise<
  | { success: true; message: string }
  | { error: string }
>
```

#### Parameters

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| currentPassword | string | Yes | User's current password |
| newPassword | string | Yes | New password to set |

#### FormData Usage

```typescript
const formData = new FormData();
formData.append('currentPassword', 'oldPassword123');
formData.append('newPassword', 'newSecurePassword456');

const result = await changePassword(formData);
```

#### Response

**Success:**
```typescript
{ success: true, message: "Password updated successfully" }
```

**Errors:**
```typescript
{ error: "Unauthorized" }                    // No active session
{ error: "Current and new password are required" }
{ error: "User not found" }
{ error: "Incorrect current password" }
{ error: "Failed to update password" }
```

#### Implementation Details

1. Requires active session
2. Validates both passwords are provided
3. Fetches user from database
4. Verifies current password with bcrypt
5. Hashes new password with bcrypt (12 rounds)
6. Updates user record

## Dependencies

### Imports
- `@/lib/prisma` - Prisma client for database operations
- `bcryptjs` - Password hashing library
- `next-auth` - Session management
- `@/lib/auth` - Auth configuration

### Related Functions
- `prisma.user.findUnique()` - Find user by email/ID
- `prisma.user.create()` - Create new user
- `prisma.user.update()` - Update user password
- `bcrypt.hash()` - Hash passwords
- `bcrypt.compare()` - Verify passwords
- `getServerSession()` - Get current session

## Error Handling

| Error Type | Description |
|------------|-------------|
| Validation Error | Missing required fields |
| Conflict Error | User already exists (signUp) |
| Auth Error | Unauthorized access or incorrect password |
| Server Error | Database or hashing failures |

## Usage Examples

### Registration Form

```typescript
'use client';

import { signUp } from '@/app/actions/auth';

export default function RegisterForm() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const result = await signUp(formData);
    
    if ('error' in result) {
      // Handle error
      console.error(result.error);
    } else {
      // Redirect to login or dashboard
      window.location.href = '/login';
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" type="text" required />
      <input name="email" type="email" required />
      <input name="password" type="password" required />
      <button type="submit">Register</button>
    </form>
  );
}
```

### Password Change Form

```typescript
'use client';

import { changePassword } from '@/app/actions/auth';

export default function ChangePasswordForm() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const result = await changePassword(formData);
    
    if ('error' in result) {
      alert(result.error);
    } else {
      alert(result.message);
      e.currentTarget.reset();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="currentPassword" type="password" required />
      <input name="newPassword" type="password" required />
      <button type="submit">Change Password</button>
    </form>
  );
}
```

## Security Considerations

1. Passwords are hashed with bcrypt (12 rounds) before storage
2. Session validation required for password changes
3. Current password verification prevents unauthorized changes
4. No sensitive data returned in responses
5. Generic error messages to prevent user enumeration (except duplicate email check)
