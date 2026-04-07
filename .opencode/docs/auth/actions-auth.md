# Authentication Server Actions (app/actions/auth.ts)

## File Location
`app/actions/auth.ts`

## Purpose
This file contains Next.js Server Actions for user authentication operations including user registration and password change functionality.

## Directive
```typescript
"use server";
```
All functions in this file run exclusively on the server.

## Functions

### 1. signUp

Creates a new user account in the database.

#### Signature
```typescript
export async function signUp(formData: FormData): Promise<AuthResult>
```

#### Input Fields (FormData)
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| name | string | Yes | User's full name |
| email | string | Yes | User's email address |
| password | string | Yes | Plain text password |

#### Return Type
```typescript
interface AuthResult {
  success?: boolean;
  error?: string;
  message?: string;
}
```

#### Flow
```
1. Extract form fields from FormData
2. Validate all fields present
3. Check for existing user by email
4. Hash password with bcrypt (12 rounds)
5. Create user record in database
6. Return success or error
```

#### Error Responses
| Error | Condition |
|-------|-----------|
| "Name, email and password are required" | Missing any required field |
| "User already exists" | Email already registered |
| "Something went wrong" | Database or server error |

#### Usage Example
```typescript
// In client component
const result = await signUp(formData);
if (result.error) {
  // Handle error
} else {
  // Redirect to login
  router.push("/login");
}
```

---

### 2. changePassword

Allows authenticated users to change their password.

#### Signature
```typescript
export async function changePassword(formData: FormData): Promise<AuthResult>
```

#### Input Fields (FormData)
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| currentPassword | string | Yes | User's current password |
| newPassword | string | Yes | Desired new password |

#### Authentication
- Requires active session via `getServerSession(authOptions)`
- Returns "Unauthorized" error if no session exists

#### Flow
```
1. Verify user session
2. Extract current and new passwords
3. Validate both passwords provided
4. Fetch user from database
5. Verify current password with bcrypt
6. Hash new password with bcrypt (12 rounds)
7. Update user record
8. Return success message
```

#### Error Responses
| Error | Condition |
|-------|-----------|
| "Unauthorized" | No active session |
| "Current and new password are required" | Missing password fields |
| "User not found" | User ID not in database |
| "Incorrect current password" | Current password doesn't match |
| "Failed to update password" | Database error |

#### Usage Example
```typescript
// In client component
const result = await changePassword(formData);
if (result.error) {
  // Show error to user
} else {
  // Show success message
  toast.success(result.message);
}
```

## Dependencies

| Dependency | Purpose |
|------------|---------|
| `@/lib/prisma` | Database client |
| `bcryptjs` | Password hashing |
| `next-auth` | getServerSession for authentication |
| `@/lib/auth` | authOptions configuration |

## Security Considerations

1. **Password Hashing**
   - Uses bcrypt with 12 salt rounds
   - Never stores plain text passwords

2. **Session Validation**
   - `changePassword` requires valid session
   - Prevents unauthorized password changes

3. **Duplicate Prevention**
   - Email uniqueness check before registration
   - Prevents multiple accounts with same email

4. **Error Handling**
   - Generic error messages for security
   - Detailed errors logged server-side only

## Database Operations

### User Creation
```typescript
await prisma.user.create({
  data: {
    name,
    email,
    password: hashedPassword,
  },
});
```

### Password Update
```typescript
await prisma.user.update({
  where: { id: userId },
  data: { password: hashedPassword }
});
```

## Related Files

- `lib/auth.ts` - NextAuth configuration
- `app/components/RegisterForm.tsx` - Registration UI
- `prisma/schema.prisma` - User model definition
