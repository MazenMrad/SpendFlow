# LandingHero Component

## Component Overview

**Name:** `LandingHero`  
**File Path:** `app/components/LandingHero.tsx`  
**Purpose:** The hero section of the landing page showcasing the main value proposition with a visual preview of the app's dashboard featuring an interactive area chart.

---

## Component Details

### Component Type
Functional React Component (default export)  
**Directive:** `"use client"` - Client-side component (uses recharts library)

### Props Interface

This component accepts **no props** - it is a self-contained component with internal data.

```typescript
// No props defined
export default function LandingHero()
```

---

## Key Features/Sections

### 1. Left Content Area (45% width)
- **Headline:** Large typography (52px) - "Take Control of Your Personal Finances"
- **Subheadline:** Supporting text explaining the app's purpose
- **CTA Button:** "Get Started" button linking to registration
- **Font Families:** Uses `font-gilroy` and `font-gilroy-bold`

### 2. Right Dashboard Preview (55% width)
A mock dashboard card displaying:

#### a) Header Section
- App icon with chart symbol
- Title: "Monthly Spending Overview"
- Time period toggles: Daily, Weekly, Monthly (visual only)

#### b) Interactive Area Chart
- **Library:** Recharts (AreaChart)
- **Data:** Monthly spending data (Jan-Dec)
- **Series:**
  - `total` - Main spending line (blue `#017efa`)
  - `daily` - Daily average line (pink `#fd1f9b`)
- **Visual Features:**
  - Linear gradients for fill areas
  - Cartesian grid with dashed lines
  - Custom-styled axes

#### c) Stats Panel (Right side of chart)
Three metric cards displaying:
- **Monthly Spending:** 250 TND (with ↓ 8% indicator)
- **Remaining Budget:** 1,250 TND (with ↑ 12% indicator)
- **Groceries & Dining:** 300 TND
- **Success Message:** "You're doing good!" with performance comparison

---

## Dependencies Used

| Dependency | Purpose |
|------------|---------|
| `recharts` | Interactive area chart visualization |
| `@/app/icons/success-icon.svg` | Success/checkmark icon SVG |
| `@/app/icons/landing-chart-icon.svg` | Chart icon for dashboard header |
| `React hooks` | useState, useEffect (imported but unused) |

### Chart Components from Recharts
- `XAxis` - Horizontal axis
- `YAxis` - Vertical axis
- `CartesianGrid` - Grid background
- `ResponsiveContainer` - Responsive chart wrapper
- `AreaChart` - Main chart type
- `Area` - Data series visualization

---

## Internal Data

### Chart Data (Static)
```typescript
const data = [
  { name: "Jan", total: 1000, daily: 800 },
  { name: "Feb", total: 1500, daily: 1000 },
  { name: "Mar", total: 1300, daily: 900 },
  { name: "Apr", total: 1800, daily: 1100 },
  { name: "Mei", total: 2200, daily: 1300 },
  { name: "Jun", total: 1900, daily: 1200 },
  { name: "Jul", total: 2400, daily: 1500 },
  { name: "Aug", total: 3200, daily: 1800 },
  { name: "Sep", total: 2800, daily: 1600 },
  { name: "Oct", total: 3000, daily: 1700 },
  { name: "Nov", total: 2900, daily: 1650 },
  { name: "Dec", total: 3100, daily: 1750 },
];
```

---

## Styling Details

### Color Palette
- **Primary Blue:** `#017efa` (chart lines, accents)
- **Pink Accent:** `#fd1f9b` (secondary chart line)
- **Text Primary:** `#1c1f37` (headings)
- **Text Secondary:** `#575455` (body text)
- **Background:** `#ffffff` (white)
- **Button:** `#1570ef` (CTA blue)

### Typography
- **Headline:** 52px, bold, `font-gilroy`
- **Body:** 18px, `font-gilroy`
- **Stats Numbers:** 40px, bold
- **Chart Labels:** 12-24px

### Layout
- Two-column flex layout (45% / 55%)
- Section padding: `px-16 py-20`
- Responsive: Stack on mobile
- Card shadow: `shadow-[0px_5px_10px_#f1f2fa]`

---

## Example Usage

```tsx
import LandingHero from "@/app/components/LandingHero";

export default function LandingPage() {
  return (
    <main>
      <LandingHero />
      {/* Other sections */}
    </main>
  );
}
```

---

## Responsive Behavior

| Breakpoint | Behavior |
|------------|----------|
| Mobile | Single column, stacked layout |
| Desktop (`≥ lg`) | Two-column side-by-side layout |

---

## Visual Features

### Chart Customizations
- Gradient fills for areas (5% to 95% opacity)
- Dashed grid lines
- Hidden axis lines
- Custom tick styling
- Two data series with distinct colors

### Stats Panel
- Trend indicators (↑/↓) with color coding
- Colored dots matching chart lines
- Success message with icon

---

## Component Line Count
**Total Lines:** 149 lines
