# LandingFooter Component

## Component Overview

**Name:** `LandingFooter`  
**File Path:** `app/components/LandingFooter.tsx`  
**Purpose:** The landing page footer containing a CTA section with action buttons, brand identity, and footer navigation links. Dark themed with contrasting CTA card.

---

## Component Details

### Component Type
Functional React Component (default export)  
**Directive:** `"use client"` - Client-side component

### Props Interface

This component accepts **no props** - it is a self-contained component.

```typescript
export default function LandingFooter()
```

---

## Key Features/Sections

### 1. CTA Section
A rounded card with call-to-action buttons:

#### CTA Card Styling
- **Background:** `#222222` (dark gray)
- **Border Radius:** `rounded-[41px]` (large rounded corners)
- **Padding:** `px-12 py-10`
- **Margin:** `mb-16` (separates from main footer)

#### CTA Content
- **Heading:** "Ready to get Started ?" (24px, bold, `font-montserrat`)
- **Button 1:** "Join Now" - Text-only button with hover opacity
- **Button 2:** "Sign Up" - Bordered button with hover color inversion

#### Button Details
| Button | Text | Style | Hover Effect |
|--------|------|-------|--------------|
| Join Now | Text only | White text | `hover:opacity-80` |
| Sign Up | Bordered | White border, transparent bg | `hover:bg-white hover:text-[#222222]` |

### 2. Main Footer Content
Two-column layout with brand identity and navigation:

#### Brand Section (Left)
- **Logo:** SpendFlow icon image from Builder.io CDN
  - Size: `h-8 w-auto`
- **Brand Name:** "SpendFlow" text
- **Font:** `font-gilroy-semibold`, 2xl size
- **Opacity:** Logo at 80% opacity

#### Navigation Section (Right)
Five footer links arranged horizontally:
- Home (`/`)
- Features (`/`)
- Showcase (`/`)
- Login (`/login`)
- Sign Up (`/register`)

**Navigation Styling:**
- Text color: `white/80` (80% white)
- Hover: `white` (full white)
- Font: `font-gilroy-bold`
- Gap: `gap-12` (48px between links)

---

## Dependencies Used

| Dependency | Purpose |
|------------|---------|
| External Image | Brand icon from Builder.io CDN |

---

## Styling Details

### Color Palette

#### Footer Background
- **Main:** `#1a1a1a` (very dark gray/near black)

#### CTA Card
- **Background:** `#222222` (slightly lighter dark gray)
- **Text:** `#ffffff` (white)

#### Navigation
- **Default:** `rgba(255,255,255,0.8)` (white 80%)
- **Hover:** `#ffffff` (white 100%)

### Typography
- **CTA Heading:** Text-[24px], bold, `font-montserrat`
- **Buttons:** Text-sm, bold, `font-montserrat`
- **Brand Name:** Text-2xl, semibold, `font-gilroy-semibold`
- **Navigation:** Text-base, `font-gilroy-bold`

### Layout
- **Section:** `py-16 px-16`
- **Container:** `max-w-7xl mx-auto`
- **CTA Card:** Flex layout, `items-center justify-between`
- **Main Footer:** Flex layout, `items-center justify-between`, `pt-8`

---

## Example Usage

```tsx
import LandingFooter from "@/app/components/LandingFooter";

export default function LandingPage() {
  return (
    <>
      {/* Other sections */}
      <LandingFooter />
    </>
  );
}
```

---

## Responsive Behavior

The footer uses a flex layout that should wrap on smaller screens, though no explicit responsive classes are defined. The padding and gaps provide some natural responsiveness.

---

## Potential Issues

### CTA Button Link
The "Join Now" button has a link to `/regist` which appears to be a typo (should likely be `/register`):
```tsx
<a href="/regist">  // <-- Possible typo
```

### Navigation Links
Several navigation links point to `/` (Home) rather than their intended sections:
- Features links to `/` instead of `#features`
- Showcase links to `/` instead of `#showcase`

---

## Component Line Count
**Total Lines:** 58 lines
