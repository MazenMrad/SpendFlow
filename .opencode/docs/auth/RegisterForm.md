# RegisterForm Component

## File Location
`app/components/RegisterForm.tsx`

## Purpose
The RegisterForm component provides the user interface for creating new accounts in the SpendFlow application. It handles user registration with name, email, and password, and includes Google OAuth placeholder.

## Component Structure

### State Interface
```typescript
interface RegisterFormState {
  showPassword: boolean;      // Controls password visibility
  error: string | null;       // Error message display
  loading: boolean;          // Loading state during registration
}
```

### Props
This component accepts no props as it's a self-contained registration form.

## Registration Flow

1. **User Input**: User enters full name, email, and password
2. **Form Submission**: Uses React's form action pattern with `handleSubmit`
3. **Server Action**: Calls `signUp` server action from `@/app/actions/auth`
4. **Error Handling**: Displays server-side validation errors
5. **Success Redirect**: On successful registration, redirects to `/login`

## Dependencies

| Dependency | Purpose |
|------------|---------|
| `react` | useState hook for state management |
| `next/navigation` | useRouter for navigation after registration |
| `@/app/actions/auth` | signUp server action |
| `@/app/icons/eye-icon.svg` | Password visibility toggle |
| `@/app/icons/google-icon.svg` | Google OAuth button icon |

## Form Fields

| Field | Type | Validation | Styling |
|-------|------|------------|---------|
| Full Name | text | required | Blue border (#d1e9ff) |
| Email | email | required | Blue border (#d1e9ff) |
| Password | password | required | Gray border, visibility toggle |

## UI Features

- **Welcome Section**: Displays "Welcome back" subtitle and "Create an account" title
- **Password Visibility Toggle**: Eye icon to show/hide password
- **Forgot Password Link**: Placeholder (not functional in registration)
- **Error Display**: Red alert for validation/server errors
- **Loading State**: Shows "Creating account..." during submission
- **Google OAuth Button**: Light blue button with Google icon (placeholder functionality)
- **Login Link**: Navigation to login page for existing users

## Design System

- **Container**: White card with custom shadow (same as LoginForm)
  - Border-radius: 20px
  - Padding: 48px (p-12)
  - Max-width: 28rem (max-w-md)
- **Primary Button**: Blue (#1570ef) background
- **Secondary Button (Google)**: Light blue (#d1e9ff) with blue text
- **Typography**: Gilroy font family, medium weight for subtitle

## Comparison with LoginForm

| Feature | LoginForm | RegisterForm |
|---------|-----------|--------------|
| Fields | Email, Password | Name, Email, Password |
| Server Action | next-auth signIn | Custom signUp action |
| OAuth Button | No | Yes (Google placeholder) |
| Welcome Text | Simple title | Subtitle + title |
| Redirect on Success | /dashboard | /login |

## Security Considerations

- Password is hashed server-side using bcrypt (12 rounds)
- Duplicate email check performed before creation
- Client-side validation for required fields
- Generic error messages to prevent information leakage
