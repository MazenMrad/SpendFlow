# LandingCTA Component

## Component Overview

**Name:** `LandingCTA`  
**File Path:** `app/components/LandingCTA.tsx`  
**Purpose:** A standalone call-to-action section with a dark background and centered content. Provides final conversion opportunity with prominent action buttons.

---

## Component Details

### Component Type
Functional React Component (default export)  
**Directive:** `"use client"` - Client-side component

### Props Interface

This component accepts **no props** - it is a self-contained component.

```typescript
export default function LandingCTA()
```

---

## Key Features/Sections

### 1. Section Container
- **Background:** `bg-gray-900` (Tailwind gray-900)
- **Border Radius:** `rounded-3xl` (24px rounded corners)
- **Margin:** `mx-8 mb-20` (32px horizontal margin, 80px bottom margin)
- **Padding:** `py-20 px-16` (80px vertical, 64px horizontal)

### 2. Content Container
- **Max Width:** `max-w-2xl` (672px)
- **Alignment:** Centered with `mx-auto text-center`

### 3. Headline
- **Text:** "Ready to get Started ?"
- **Size:** `text-4xl` (36px)
- **Weight:** `font-bold`
- **Color:** `text-white`
- **Margin:** `mb-6` (24px bottom)
- **Font Family:** Inline style `"Montserrat"`

### 4. Action Buttons
Two buttons displayed side-by-side with `flex justify-center gap-4`:

#### Button 1: "Join Now"
- **Style:** Filled primary button
- **Background:** `bg-blue-600`
- **Text:** White, bold
- **Padding:** `px-8 py-3` (32px horizontal, 12px vertical)
- **Border Radius:** `rounded-full`
- **Hover:** `hover:bg-blue-700`

#### Button 2: "Sign Up"
- **Style:** Outlined secondary button
- **Background:** Transparent (`bg-transparent`)
- **Border:** `border border-white`
- **Text:** White, bold
- **Padding:** `px-8 py-3`
- **Border Radius:** `rounded-full`
- **Hover:** `hover:bg-white hover:text-gray-900`

Both buttons have `cursor-pointer` class.

---

## Dependencies Used

This component has **no external dependencies** - only uses React and Tailwind CSS.

---

## Styling Details

### Color Palette
- **Section Background:** `gray-900` (Tailwind)
- **Button Primary:** `blue-600` / `blue-700` (hover)
- **Button Secondary Border:** White
- **Text:** White

### Typography
- **Heading:** Text-4xl (36px), bold, Montserrat font
- **Buttons:** Default text size, bold weight

### Layout
- **Container:** Centered, max-width constrained
- **Buttons:** Flexbox row with gap-4 (16px spacing)

---

## Example Usage

```tsx
import LandingCTA from "@/app/components/LandingCTA";

export default function LandingPage() {
  return (
    <>
      {/* Other sections */}
      <LandingCTA />
      <LandingFooter />
    </>
  );
}
```

---

## Comparison with LandingFooter CTA

This component appears to be a standalone version of the CTA that appears in `LandingFooter.tsx`. Key differences:

| Aspect | LandingCTA | LandingFooter CTA |
|--------|------------|-------------------|
| Background | Full gray-900 section | Card with #222222 background |
| Positioning | Standalone section | Inside footer |
| Border Radius | rounded-3xl (section) | rounded-[41px] (card) |
| Font Family | Montserrat (inline) | Montserrat (inline) |
| Button Actions | No href/links defined | Has hrefs ("/regist" typo) |
| Layout | Centered content | Flex between heading and buttons |

---

## Potential Issues

### Missing Links
Neither button has an `href` or `onClick` handler defined:
```tsx
<button className="...">Join Now</button>  // No action
<button className="...">Sign Up</button>   // No action
```

### Inline Font
The Montserrat font is defined inline:
```tsx
style={{ fontFamily: "Montserrat" }}
```
This may not work if Montserrat isn't loaded in the project.

---

## Component Line Count
**Total Lines:** 21 lines
