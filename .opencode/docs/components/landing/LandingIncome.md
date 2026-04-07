# LandingIncome Component

## Component Overview

**Name:** `LandingIncome`  
**File Path:** `app/components/LandingIncome.tsx`  
**Purpose:** A section demonstrating income vs expenses visualization with a bar chart on the right and descriptive content with CTA on the left. Showcases the app's financial comparison capabilities.

---

## Component Details

### Component Type
Functional React Component (default export)  
**Directive:** `"use client"` - Client-side component (uses recharts library)

### Props Interface

This component accepts **no props** - all data is internal.

```typescript
export default function LandingIncome()
```

---

## Key Features/Sections

### 1. Left Content Area (50% width)
- **Eyebrow Text:** "GET STARTED FOR FREE" (uppercase, tracking-widest)
- **Main Heading:** "Take Control of Your Money Today" (52px, leading-tight)
- **Description:** Supporting paragraph about tracking expenses and reaching savings goals
- **CTA Button:** "Get Started" button with blue background, rounded-full, linking to `/register`

### 2. Right Chart Area (50% width)
An interactive card displaying income vs expenses comparison:

#### Card Header
- **Title:** "Income vs Expenses"
- **Time Range:** "April 2021 - September 2021" (clickable button, empty href)

#### Legend
- Two colored indicators:
  - Blue square (`#017efa`) - Expense
  - Light blue square (`#51cbff`) - Income

#### Interactive Bar Chart
- **Library:** Recharts (BarChart)
- **Data:** 6 months of financial data (Apr-Sep 2021)
- **Series:**
  - `expense` - Expense bars (dark blue `#017efa`)
  - `income` - Income bars (light blue `#51cbff`)
- **Visual Features:**
  - Cartesian grid with dashed lines
  - Custom-styled axes (hidden lines)
  - Tooltip on hover (custom styled)
  - Rounded bar tops (radius 4px)

---

## Dependencies Used

| Dependency | Purpose |
|------------|---------|
| `recharts` | Interactive bar chart visualization |

### Chart Components from Recharts
- `BarChart` - Main chart container
- `Bar` - Data series (expense and income)
- `XAxis` - Horizontal month labels
- `YAxis` - Vertical value axis
- `CartesianGrid` - Grid background
- `ResponsiveContainer` - Responsive wrapper
- `Tooltip` - Hover information display

---

## Internal Data

### Chart Data
```typescript
const incomeExpenseData = [
  { month: "Apr 21", expense: 400, income: 600 },
  { month: "May 21", expense: 800, income: 1000 },
  { month: "Jun 21", expense: 1300, expense2: 1700, income: 1300 },
  { month: "Jul 21", expense: 1200, income: 1400 },
  { month: "Aug 21", expense: 1000, income: 1200 },
  { month: "Sep 21", expense: 1100, income: 2000 },
];
```

**Note:** The `expense2` property in June appears to be unused in the chart.

---

## Styling Details

### Color Palette
- **Background:** `#ffffff` (white)
- **Card Border:** `#dadada` (light gray)
- **Card Shadow:** Custom shadow (`shadow-lg`)
- **Expense Bars:** `#017efa` (blue)
- **Income Bars:** `#51cbff` (light blue)
- **Text Primary:** `#1b1b1b` / `#1c1f37` (dark)
- **Text Secondary:** `#595e64` / `#8e8e8e` (gray)
- **Eyebrow Text:** `#8e8e8e` (gray)
- **CTA Button:** `#1570ef` (blue)

### Typography
- **Eyebrow:** Text-xs, bold, tracking-widest, uppercase, `font-gilroy`
- **Heading:** Text-[52px], leading-[1.1], bold, `font-gilroy`
- **Description:** Text-xl, `font-gilroy`
- **Card Title:** Text-xl, bold, `font-gilroy`
- **Legend:** Text-sm, medium, `font-gilroy`
- **Time Range:** Text-sm, `font-dm-sans`

### Layout
- **Section:** `py-24 px-16`
- **Container:** `max-w-7xl mx-auto`
- **Grid:** `flex flex-col lg:flex-row` (50/50 split)
- **Gap:** `gap-20` between content and chart
- **Card:** `rounded-2xl border border-[#dadada] p-8`
- **Chart Height:** `h-72` (288px)

---

## Example Usage

```tsx
import LandingIncome from "@/app/components/LandingIncome";

export default function LandingPage() {
  return (
    <>
      <LandingIncome />
    </>
  );
}
```

---

## Responsive Behavior

| Breakpoint | Layout | Behavior |
|------------|--------|----------|
| Mobile (< lg) | Single column | Content stacked above chart |
| Desktop (≥ lg) | Two columns | Side-by-side 50/50 split |

---

## Visual Features

### Chart Customizations
- Grid lines: Horizontal only (`vertical={false}`)
- Dashed grid pattern: `strokeDasharray="3 3"`
- Hidden axis lines
- Custom tick colors
- Custom tooltip styling with border-radius
- Rounded bar tops for modern look

### Data Insights
The sample data shows:
- Income generally exceeds expenses
- September has the highest income (2000)
- June has data inconsistency (unused expense2 field)

---

## Component Line Count
**Total Lines:** 88 lines
