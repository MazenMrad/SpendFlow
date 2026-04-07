# LandingHeader Component

## Component Overview

**Name:** `LandingHeader`  
**File Path:** `app/components/LandingHeader.tsx`  
**Purpose:** The main navigation header for the landing page. Displays the SpendFlow logo, navigation links, and authentication buttons (Sign In/Sign Up).

---

## Component Details

### Component Type
Functional React Component (default export)

### Props Interface

This component accepts **no props** - it is a self-contained component.

```typescript
// No props defined - uses default export without prop types
export default function Header()
```

---

## Key Features/Sections

### 1. Logo Section
- Displays the SpendFlow brand logo using an external image URL
- Links to the home page (`/`)
- Responsive sizing: `h-8` (mobile) to `h-10` (desktop)

### 2. Desktop Navigation
- Three navigation links: Home, Features, Showcase
- Anchored navigation using hash links (`#features`, `#showcase`)
- Hidden on mobile (`hidden md:flex`)
- Responsive gap spacing: `gap-8` to `gap-16`

### 3. CTA Buttons
- **Sign In Button:** Rounded full button with gray background, links to `/login`
- **Sign Up Button:** Rounded full button with primary blue background (`#1F7CFF`), links to `/register`
- Both buttons use hover transitions and responsive padding

### 4. Mobile Menu Button
- Hamburger menu icon for mobile devices
- Hidden on desktop (`md:hidden`)
- Non-functional (click handler not implemented)

---

## Dependencies Used

| Dependency | Purpose |
|------------|---------|
| `next/link` | Next.js Link component for client-side navigation |
| Inline SVG | Hamburger menu icon (inline SVG) |
| External Image | Logo loaded from Builder.io CDN |

---

## Styling Details

### Color Palette
- **Text Primary:** `#070F18` (dark text)
- **Text Accent:** `#1F7CFF` (hover state)
- **Background:** `#FFFFFF` (white)
- **Button Primary:** `#1F7CFF` (blue)
- **Button Secondary:** `#F5F6FB` (light gray)

### Typography
- **Navigation:** `font-gilroy-medium` (custom font)
- **Buttons:** `font-poppins` (custom font)
- **Home Link:** `font-semibold` (bold weight)
- Other links: Normal weight

### Layout
- Full-width header with horizontal padding (`px-16`)
- Fixed height navigation bar: `h-24` to `h-28`
- Flexbox layout with `justify-between` for spacing

---

## Example Usage

```tsx
import LandingHeader from "@/app/components/LandingHeader";

export default function LandingPage() {
  return (
    <>
      <LandingHeader />
      {/* Other sections */}
    </>
  );
}
```

---

## Responsive Behavior

| Breakpoint | Behavior |
|------------|----------|
| Mobile (`< md`) | Shows only logo and hamburger menu |
| Desktop (`≥ md`) | Shows full navigation and CTA buttons |

---

## Accessibility Notes

- Logo has descriptive `alt` text ("SpendFlow")
- Navigation links use semantic anchor tags
- Hover states provide visual feedback
- Mobile menu button is present but not functional

---

## Component Line Count
**Total Lines:** 69 lines
