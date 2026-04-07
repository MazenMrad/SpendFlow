# LandingControl Component

## Component Overview

**Name:** `LandingControl`  
**File Path:** `app/components/LandingControl.tsx`  
**Purpose:** A section demonstrating financial control features with a side-by-side layout showing app screenshots/visuals on the left and descriptive content with CTA on the right.

---

## Component Details

### Component Type
Functional React Component (default export)  
**Directive:** `"use client"` - Client-side component (imports recharts, though unused)

### Props Interface

This component accepts **no props** - all data is internal.

```typescript
export default function LandingControl()
```

---

## Key Features/Sections

### 1. Decorative Background
- SVG quarter-circle shape in top-left corner
- Light blue (`#017EFA`) with 20% opacity
- Positioned absolutely, responsive sizing

### 2. Left Side - Visual Content
- **Main Image:** Analytics/spending visualization image
  - Source: Builder.io CDN
  - Max width: 400px
  - Centered on mobile, left-aligned on desktop
- **Decorative Icons:** Three floating decorative icons positioned absolutely
  - Top-right, bottom-left, and bottom positions

### 3. Right Side - Content Area
- **Eyebrow Text:** "SAVE MORE TIME" (uppercase, tracking-wider)
- **Headline:** "Take Control of Your Finances" (2xl to 4xl)
- **Description:** Supporting text about tracking expenses and gaining insights
- **CTA Button:** "Get Started" button linking to registration

### 4. Unused Chart Data
The component imports and defines chart data but doesn't render the PieChart:

```typescript
const categoryData = [
  { name: "Utilities", value: 40, color: "#017efa" },
  { name: "Bills", value: 30, color: "#51cbff" },
  { name: "Other", value: 30, color: "#b6e9ff" },
];
```

---

## Dependencies Used

| Dependency | Purpose |
|------------|---------|
| `recharts` | Imported but unused (PieChart, Pie, Cell, ResponsiveContainer) |
| `@/app/icons/vector-1.svg` | Imported but unused |
| `@/app/icons/vector-main.svg` | Imported but unused |
| External Image | Main illustration from Builder.io CDN |

---

## Styling Details

### Color Palette
- **Background:** `rgba(230,242,254,0.28)` (light blue tint, same as Features)
- **Eyebrow Text:** `#F75C4E` (coral/red)
- **Headline:** `#000000` (black)
- **Description:** `#575455` (gray)
- **CTA Button:** `#1F7CFF` (blue) with hover `#1A6AE0`
- **Decorative SVG:** `#017EFA` with 0.46 opacity

### Typography
- **Eyebrow:** Text-sm to text-base, `font-gilroy-bold` + `font-poppins`
- **Headline:** Text-2xl to text-4xl, `font-gilroy-bold`
- **Description:** Text-base to text-lg, `font-gilroy-medium`
- **CTA:** Text-base, semibold, `font-poppins`

### Layout
- **Container:** `max-w-7xl mx-auto` with responsive padding
- **Grid:** `grid-cols-1 lg:grid-cols-2` (single column on mobile, two columns on desktop)
- **Gap:** `gap-8 lg:gap-16`
- **Section Padding:** `py-16 sm:py-20 lg:py-24`

### Order Behavior
- Mobile: Content first, images second (`order-1`, `order-2`)
- Desktop: Images first, content second (`lg:order-1`, `lg:order-2`)

---

## Example Usage

```tsx
import LandingControl from "@/app/components/LandingControl";

export default function LandingPage() {
  return (
    <>
      <LandingControl />
    </>
  );
}
```

---

## Responsive Behavior

| Breakpoint | Layout | Image Position | Content Order |
|------------|--------|----------------|---------------|
| Mobile (< lg) | Single column | Centered | Content first |
| Desktop (≥ lg) | Two columns | Left-aligned | Images first |

---

## Unused Imports

The following imports are imported but not used in the component:
- `PieChart, Pie, Cell, ResponsiveContainer` from `recharts`
- `Vector1` from `@/app/icons/vector-1.svg`
- `VectorMain` from `@/app/icons/vector-main.svg`
- `categoryData` constant (defined but never rendered)

These may be remnants from a previous implementation or planned for future use.

---

## Component Line Count
**Total Lines:** 86 lines
