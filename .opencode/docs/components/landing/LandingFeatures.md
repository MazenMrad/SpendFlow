# LandingFeatures Component

## Component Overview

**Name:** `LandingFeatures` (exported as `FeaturesSection`)  
**File Path:** `app/components/LandingFeatures.tsx`  
**Purpose:** A feature showcase section highlighting six key product capabilities with icon, title, and description for each feature.

---

## Component Details

### Component Type
Functional React Component (default export)  
**Export Name:** `FeaturesSection`

### Props Interface

This component accepts **no props** - all data is internal.

```typescript
export default function FeaturesSection()
```

---

## Key Features/Sections

### 1. Section Header
- **Eyebrow Text:** "FINANCIAL WELLNESS" (uppercase, tracking-wider)
- **Main Heading:** "Smart Features For Your Money" (2xl to 4xl responsive)
- **Description:** Supporting paragraph explaining the features
- **Colors:** Red accent (`#F75C4E`) for eyebrow, black for heading

### 2. Features Grid
A responsive 3x2 grid displaying six feature cards:

#### Feature List

| # | Icon | Title | Description |
|---|------|-------|-------------|
| 1 | ⏱️ | **Instant Logging** | Quick-entry interface to log your coffee, groceries, or bills in seconds |
| 2 | 📂 | **Custom Categories** | Define limits for dining out, rent, or hobbies to see where your money goes |
| 3 | ☁️ | **Cloud Sync** | Access your financial data from any device. Your records are always updated and synced in real-time |
| 4 | 📊 | **Visual Reports** | See your spending habits through beautiful charts and organized lists |
| 5 | 🎯 | **Savings Milestones** | Set personal goals and get notified when you hit your big savings targets |
| 6 | 🔒 | **Secure & Private** | Your data stays on your device. Local storage ensures your privacy |

*Note: Icons are loaded from external Builder.io CDN URLs*

---

## Dependencies Used

| Dependency | Purpose |
|------------|---------|
| External Images | Feature icons loaded from `api.builder.io` CDN |
| Tailwind CSS | Responsive grid layout and styling |

---

## Internal Data Structure

```typescript
const features = [
  {
    icon: "https://api.builder.io/api/v1/image/assets/TEMP/...",
    title: "Instant Logging",
    description: "Quick-entry interface to log your coffee, groceries, or bills in seconds.",
  },
  // ... 5 more features
];
```

---

## Styling Details

### Color Palette
- **Background:** `rgba(230,242,254,0.28)` (light blue tint)
- **Eyebrow Text:** `#F75C4E` (coral/red)
- **Heading:** `#000000` (black)
- **Description:** `#575455` (gray)
- **Feature Titles:** `#070F18` (dark navy)

### Typography
- **Eyebrow:** Text-sm to text-base, bold, `font-gilroy-bold`
- **Heading:** Text-2xl to text-4xl, bold, `font-gilroy-bold`
- **Feature Titles:** Text-lg to text-xl, semibold, `font-gilroy-bold`
- **Descriptions:** Text-sm to text-base, `font-gilroy-regular`

### Layout
- **Container:** `max-w-7xl mx-auto` with responsive padding
- **Grid:** `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` (1→2→3 columns)
- **Gap:** `gap-6 sm:gap-8 lg:gap-12` (increases with screen size)
- **Icon Size:** `w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16`

### Responsive Padding
- Section: `py-16 sm:py-20 lg:py-24`
- Container: `px-4 sm:px-6 lg:px-8`

---

## Example Usage

```tsx
import LandingFeatures from "@/app/components/LandingFeatures";

export default function LandingPage() {
  return (
    <>
      <LandingFeatures />
    </>
  );
}
```

---

## Responsive Behavior

| Breakpoint | Columns | Icon Size | Gap |
|------------|---------|-----------|-----|
| Mobile (< sm) | 1 column | 48x48px | 24px |
| Tablet (sm-lg) | 2 columns | 56x56px | 32px |
| Desktop (≥ lg) | 3 columns | 64x64px | 48px |

---

## Section ID

- **Anchor ID:** `#features`
- Used for in-page navigation from the header

---

## Component Line Count
**Total Lines:** 72 lines
