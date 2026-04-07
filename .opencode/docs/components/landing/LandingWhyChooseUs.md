# LandingWhyChooseUs Component

## Component Overview

**Name:** `LandingWhyChooseUs`  
**File Path:** `app/components/LandingWhyChooseUs.tsx`  
**Purpose:** A "Why Choose Us" section displaying three key value propositions in a card-based layout. Each card features an icon, title, and detailed description with distinct color-coded backgrounds.

---

## Component Details

### Component Type
Functional React Component (default export)  
**Directive:** `"use client"` - Client-side component (imports SVG icons)

### Props Interface

This component accepts **no props** - all data is internal.

```typescript
export default function LandingWhyChooseUs()
```

---

## Key Features/Sections

### 1. Section Header
- **Main Heading:** "Why Choose Us ?" (55px, bold)
- **Font:** `font-montserrat`
- **Position:** Centered text

### 2. Value Proposition Cards
A 3-column grid displaying three reason cards:

#### Card Structure
Each card contains:
- **Icon Container:** Colored circular background with white icon
- **Title:** Bold heading
- **Description:** Detailed explanation paragraph

#### The Three Reasons

| # | Icon | Title | Description | Background Color |
|---|------|-------|-------------|-------------------|
| 1 | 📊 | **Gain Clear Insights** | See exactly where your money goes with easy category breakdowns, monthly trends, and daily summaries. No more guessing—understand your spending habits in seconds | `#fead86` (Coral/Orange) |
| 2 | 🎯 | **Build Better Habits** | Set budgets, track progress, and get gentle reminders when you're approaching limits. Small changes add up—save more on groceries, transport, or dining out | `#51a690` (Teal/Green) |
| 3 | 🔒 | **Secure & Private** | Your data stays yours—encrypted and never shared. No ads, no bank links required. Track peacefully with a tool that's simple, free to start, and built for you | `#ffcf00` (Yellow/Gold) |

---

## Dependencies Used

| Dependency | Purpose |
|------------|---------|
| `@/app/icons/gain-insights-icon.svg` | Card 1 icon component |
| `@/app/icons/build-habits-icon.svg` | Card 2 icon component |
| `@/app/icons/secure-private-icon.svg` | Card 3 icon component |

---

## Internal Data Structure

```typescript
const reasons = [
  {
    icon: GainInsightsIcon,
    title: "Gain Clear Insights",
    description: "See exactly where your money goes with easy category breakdowns, monthly trends, and daily summaries...",
    bgColor: "bg-[#fead86]",
  },
  {
    icon: BuildHabitsIcon,
    title: "Build Better Habits",
    description: "Set budgets, track progress, and get gentle reminders when you're approaching limits...",
    bgColor: "bg-[#51a690]",
  },
  {
    icon: SecurityIcon,
    title: "Secure & Private",
    description: "Your data stays yours—encrypted and never shared. No ads, no bank links required...",
    bgColor: "bg-[#ffcf00]",
  },
];
```

---

## Styling Details

### Color Palette

#### Section
- **Background:** `#ffffff` (white)

#### Cards
- **Background:** `#ffffff` (white)
- **Border:** `#e8ecef` (light gray)
- **Shadow:** `shadow-lg` (default), `hover:shadow-2xl` (on hover)

#### Icon Backgrounds
- **Card 1:** `#fead86` (Coral/Salmon)
- **Card 2:** `#51a690` (Teal/Sage Green)
- **Card 3:** `#ffcf00` (Golden Yellow)

#### Text
- **Heading:** `#1b1b1b` (near black)
- **Card Titles:** `#3b3e43` (dark gray)
- **Descriptions:** `#595e64` (medium gray)

### Typography
- **Section Heading:** Text-[55px], bold, `font-montserrat`
- **Card Titles:** Text-2xl, bold, `font-gilroy`
- **Descriptions:** Text-base, leading-relaxed, `font-gilroy`

### Layout
- **Section:** `py-24 px-16`
- **Container:** `max-w-7xl mx-auto`
- **Grid:** `grid-cols-1 md:grid-cols-3` (1 column mobile, 3 columns tablet+)
- **Gap:** `gap-12` (48px)
- **Card Padding:** `p-10` (40px)
- **Border Radius:** `rounded-2xl`

### Icon Styling
- **Container:** `w-16 h-16 rounded-full`
- **Icon Size:** `w-8 h-8 text-white`
- **Margin:** `mb-8` below icon

---

## Example Usage

```tsx
import LandingWhyChooseUs from "@/app/components/LandingWhyChooseUs";

export default function LandingPage() {
  return (
    <>
      <LandingWhyChooseUs />
    </>
  );
}
```

---

## Responsive Behavior

| Breakpoint | Columns | Card Padding |
|------------|---------|--------------|
| Mobile (< md) | 1 column | Maintained |
| Tablet+ (≥ md) | 3 columns | Maintained |

---

## Interactive Features

### Hover Effects
- **Shadow Enhancement:** Cards elevate with `shadow-2xl` on hover
- **Transition:** `transition-shadow` for smooth animation

### Card Structure
Each card uses `relative overflow-hidden group` classes:
- `relative` - For positioning context
- `overflow-hidden` - Clips any overflow
- `group` - Enables group-hover states (though not currently used)

---

## Z-Index Management
- **Content:** `relative z-10` ensures text appears above any decorative elements

---

## Component Line Count
**Total Lines:** 56 lines
