# RegisterHeader Component

## File Location
`app/components/RegisterHeader.tsx`

## Purpose
The RegisterHeader component provides the navigation header for the registration page. It displays the brand logo, main navigation links, and authentication action buttons with consistent styling across authentication pages.

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

| Link | Target | Component | Styling |
|------|--------|-----------|---------|
| Logo | `/` | Link | Brand logo + "SpendFlow" text |
| Home | `/` | a | Semi-bold text |
| Features | `/` | a | Regular weight |
| Showcase | `/` | a | Regular weight |
| Sign In | `/login` | Link | Text-only button |
| Sign Up | `/register` | Link | Filled blue button with rounded-full |

## Key Differences from LoginHeader

The RegisterHeader uses `Link` components from Next.js for Sign In and Sign Up buttons (instead of `<a>` tags), providing better client-side navigation and active link styling support.

## Dependencies

| Dependency | Purpose |
|------------|---------|
| `next/link` | Client-side navigation for interactive elements |
| `@/app/icons/landing-logo.svg` | Brand logo SVG |

## Design System

- **Background**: White with subtle bottom border (border-gray-100)
- **Logo**: 48x32px SVG icon (w-12 h-8)
- **Typography**: 
  - Brand name: 24px (text-2xl), semi-bold (font-semibold), Gilroy font
  - Nav links: 14px (text-sm), Gilroy font
- **Colors**:
  - Brand text: #070f18
  - Primary button: #1570ef background, white text
- **Spacing**: 
  - Horizontal padding: 64px (px-16)
  - Vertical padding: 24px (py-6)
  - Navigation gap: 48px (gap-12)
  - Button container gap: 16px (gap-4)
- **Button Styling**:
  - Sign In: Transparent with dark text
  - Sign Up: Blue background (#1570ef), white text, fully rounded (rounded-full), padding 24px horizontal / 8px vertical

## Usage

This component is used on the registration page (`/register`) to maintain consistent navigation across authentication flows.

## Accessibility

- Uses semantic `<header>` element
- Navigation links are keyboard accessible
- Color contrast meets WCAG standards (dark text on white, white text on blue)

## Note

Similar to LoginHeader, navigation links point to `/` as placeholders. The Features and Showcase links should eventually scroll to respective sections on the landing page.
