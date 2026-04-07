# LoginForm Component

## File Location
`app/components/LoginForm.tsx`

## Purpose
The LoginForm component provides the user interface for authenticating existing users into the SpendFlow application. It handles email/password input, form submission, password visibility toggle, and error display.

## Component Structure

### State Interface
```typescript
interface LoginFormState {
  showPassword: boolean;      // Controls password visibility
  error: string | null;       // Error message display
  loading: boolean;          // Loading state during authentication
}
```

### Props
This component accepts no props as it's a self-contained authentication form.

## Authentication Flow

1. **User Input**: User enters email and password
2. **Form Submission**: Form data is captured using `FormData` API
3. **NextAuth SignIn**: Credentials are sent to NextAuth using `signIn("credentials", {...})`
4. **Error Handling**: If authentication fails, error message is displayed
5. **Success Redirect**: On successful login, user is redirected to `/dashboard`

## Dependencies

| Dependency | Purpose |
|------------|---------|
| `react` | useState hook for state management |
| `next-auth/react` | signIn function for authentication |
| `next/navigation` | useRouter for navigation after login |
| `@/app/icons/eye-icon.svg` | Password visibility toggle icon |

## Form Fields

| Field | Type | Validation | Styling |
|-------|------|------------|---------|
| Email | email | required | Blue border (#d1e9ff), rounded-lg |
| Password | password | required | Gray border (#d0d5dd), visibility toggle |

## UI Features

- **Password Visibility Toggle**: Eye icon button to show/hide password
- **Forgot Password Link**: Placeholder link (functionality not implemented)
- **Error Display**: Red alert box for authentication errors
- **Loading State**: Button shows "Logging in..." during submission
- **Sign Up Link**: Navigation to registration page

## Design System

- **Container**: White card with custom shadow (40px blur, rgba(228, 230, 234, 0.74))
- **Primary Button**: Blue (#1570ef) with hover state (#1d4ed8)
- **Typography**: Gilroy font family throughout
- **Border Radius**: 20px for container, 8px for inputs

## Security Considerations

- Password is never logged or stored client-side
- Form submission uses POST method
- Credentials are validated server-side via NextAuth
- Error messages are generic to prevent user enumeration
