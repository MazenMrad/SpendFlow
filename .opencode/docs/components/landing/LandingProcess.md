# LandingProcess Component

## Component Overview

**Name:** `LandingProcess`  
**File Path:** `app/components/LandingProcess.tsx`  
**Purpose:** A "How It Works" section displaying a vertical process flow with three large feature illustrations connected by decorative lines. Dark themed section with navy background.

---

## Component Details

### Component Type
Functional React Component (default export)  
**Directive:** `"use client"` - Client-side component (imports SVG components)

### Props Interface

This component accepts **no props** - all data is internal.

```typescript
export default function LandingProcess()
```

---

## Key Features/Sections

### 1. Header Section
- **Eyebrow Text:** "BEHIND THE SCENE" (uppercase, letter-spacing 1.8px)
- **Main Heading:** "How Our App Works" (48px, medium weight)
- **Description:** Supporting paragraph about tracking expenses and building habits
- **Position:** Centered text with `relative z-10`

### 2. Process Flow
Three vertically stacked blocks connected by lines:

#### Block 1: Track Your Expenses
- **Illustration:** `TrackExpenseFull` SVG component
- **Visual:** Full-width responsive SVG with drop shadow

#### Connector Line 1
- **Component:** `Line2` SVG
- **Height:** 24px
- **Purpose:** Visual connection between steps

#### Block 2: Get Clear Insights
- **Illustration:** `ClearInsightsFull` SVG component
- **Visual:** Full-width responsive SVG with drop shadow

#### Connector Line 2
- **Component:** `Line2` SVG
- **Same styling as Line 1`

#### Block 3: Achieve Your Goals
- **Illustration:** `AchieveGoalsFull` SVG component
- **Visual:** Full-width responsive SVG with drop shadow

### 3. Decorative Background Elements
- **Vector121:** Top-left decorative vector (500px width, 20% opacity)
- **Vector122:** Bottom-right decorative vector (400px width, 20% opacity)
- **Purpose:** Add visual interest to dark background

---

## Dependencies Used

| Dependency | Purpose |
|------------|---------|
| `@/app/icons/track-expense-full.svg` | Step 1 illustration |
| `@/app/icons/achieve-goals-full.svg` | Step 3 illustration |
| `@/app/icons/clear-insights-full.svg` | Step 2 illustration |
| `@/app/icons/vector-121.svg` | Top-left decorative vector |
| `@/app/icons/vector-122.svg` | Bottom-right decorative vector |
| `@/app/icons/landingpageicons/Line 2.svg` | Connecting lines between steps |

---

## Styling Details

### Color Palette
- **Background:** `#050d35` (dark navy blue)
- **Eyebrow Text:** `rgba(255,255,255,0.5)` (white 50% opacity)
- **Heading:** `#ffffff` (white)
- **Description:** `rgba(255,255,255,0.8)` (white 80% opacity)
- **Decorative Vectors:** 20% opacity, white

### Typography
- **Eyebrow:** Text-xs, bold, tracking-[1.8px], uppercase, `font-gilroy`
- **Heading:** Text-[48px], medium weight, `font-gilroy`
- **Description:** Text-xl, `font-gilroy`

### Layout
- **Section Padding:** `py-24 px-16`
- **Container:** `max-w-7xl mx-auto` (for header)
- **Illustration Container:** `w-full flex justify-center`
- **Overflow:** `overflow-hidden` (section level)

### Drop Shadows
Each illustration has a custom drop shadow:
```css
drop-shadow-[0_40px_100px_rgba(0,0,0,0.7)]
```

---

## Example Usage

```tsx
import LandingProcess from "@/app/components/LandingProcess";

export default function LandingPage() {
  return (
    <>
      <LandingProcess />
    </>
  );
}
```

---

## Visual Structure

```
┌─────────────────────────────────────┐
│    Decorative Vector (Vector121)    │
│        ┌─────────────────┐          │
│        │  BEHIND THE     │          │
│        │  SCENE          │          │
│        │                 │          │
│        │ How Our App     │          │
│        │ Works           │          │
│        │                 │          │
│        │ Description...  │          │
│        └─────────────────┘          │
│              │                      │
│    ┌─────────┴─────────┐           │
│    │ Track Expenses    │           │
│    │   (Illustration)  │           │
│    └─────────┬─────────┘           │
│              │                      │
│           ───┼───                   │
│              │                      │
│    ┌─────────┴─────────┐           │
│    │ Clear Insights   │           │
│    │   (Illustration)  │           │
│    └─────────┬─────────┘           │
│              │                      │
│           ───┼───                   │
│              │                      │
│    ┌─────────┴─────────┐           │
│    │ Achieve Goals    │           │
│    │   (Illustration)  │           │
│    └───────────────────┘           │
│                                    │
│    Decorative Vector (Vector122)   │
└─────────────────────────────────────┘
```

---

## Responsive Behavior

- **Full-width illustrations:** Scale with container (`max-w-full h-auto`)
- **Decorative vectors:** Positioned absolutely, may be partially hidden on smaller screens
- **Connecting lines:** Centered with `flex justify-center`

---

## Component Line Count
**Total Lines:** 57 lines
