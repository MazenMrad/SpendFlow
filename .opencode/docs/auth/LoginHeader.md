# LoginHeader Component

## File Location
`app/components/LoginHeader.tsx`

## Purpose
The LoginHeader component provides the navigation header for the login page. It displays the brand logo, main navigation links, and authentication action buttons (Sign In/Sign Up).

## Component Structure

### Props
This component accepts no props.

### State
No internal state - purely presentational component.

## Layout Structure

```
┌─────────────────────────────────────────────────────────────┐
│ [Logo] SpendFlow    Home  Features  Showcase    [Sign In] [Sign Up] │
└─────────────────────────────────────────────────────────────┘
```

## Navigation Links

| Link | Target | Styling |
|------|--------|---------|
| Logo | `/` | Brand logo + "SpendFlow" text |
| Home | `/` | Semi-bold text |
| Features | `/` | Regular weight |
| Showcase | `/` | Regular weight |
| Sign In | `/login` | Text-only button |
| Sign Up | `/register` | Filled blue button with rounded-full |

## Dependencies

| Dependency | Purpose |
|------------|---------|
| `next/link` | Client-side navigation |
| `@/app/icons/landing-logo.svg` | Brand logo SVG |

## Design System

- **Background**: White with subtle bottom border (gray-100)
- **Logo**: 48x32px SVG icon
- **Typography**: 
  - Brand name: 24px, semi-bold, Gilroy font
  - Nav links: 14px, Gilroy font
- **Spacing**: 
  - Horizontal padding: 64px (px-16)
  - Vertical padding: 24px (py-6)
  - Nav gap: 48px (gap-12)
  - Button gap: 16px (gap-4)

## Usage

This component is used on the login page (`/login`) to provide consistent navigation across authentication pages.

## Note

All navigation links currently point to `/` (landing page) as placeholders. The actual Features and Showcase sections are anchor links on the landing page.
