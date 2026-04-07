# SpendingByCategoryChart Component

## File Location
`app/components/SpendingByCategoryChart.tsx`

## Purpose
Displays spending breakdown by category using a donut chart with percentage visualization and category list.

## Component Structure

### Component Type
Functional React Component (Client Component)
**Directive:** `"use client"`

### Props Interface
```typescript
interface Category {
  name: string;       // Category name
  amount: string;     // Formatted amount (e.g., "120.50 TND")
  percentage: number; // Percentage of total (0-100)
  color: string;      // Hex color code
}

interface SpendingByCategoryProps {
  categories?: Category[];
}
```

## Features

### 1. Donut Chart
- **Library**: Recharts (PieChart)
- **Type**: Donut chart with inner radius
- **Data**: Categories with spending amounts
- **Center Label**: Total spent amount in TND

### 2. Progress Bar
- Multi-colored segmented bar
- Each segment represents category percentage
- Matches category colors
- Rounded ends

### 3. Category List
- Category name with color indicator
- Formatted amount
- Percentage badge
- Sorted by amount (implicitly)

### 4. Empty State
- Displays when no categories provided
- Shows muted message

## Data Processing

### Amount Parsing
```typescript
const amountVal = parseFloat(cat.amount.split(' ')[0].replace(/,/g, ''));
```

### Total Calculation
- Sums all category amounts
- Displays in center of donut chart

### ChartConfig Generation
```typescript
const config: ChartConfig = {
  visitors: { label: "Amount" }
};
propCategories.forEach((cat, index) => {
  const key = `cat_${index}`;
  config[key] = {
    label: cat.name,
    color: cat.color
  };
});
```

## Dependencies

| Dependency | Purpose |
|------------|---------|
| `recharts` | Pie chart components |
| `@/components/ui/card` | Card wrapper |
| `@/components/ui/chart` | ChartContainer, ChartTooltip |
| `lucide-react` | TrendingUp icon |

## Design System

### Card Container
- Shadow: `shadow-[0_5px_10px_0_#F1F2FA]`
- Border: None
- Height: Full (`h-full`)

### Chart
- Inner radius: 60px
- Stroke width: 5px
- Aspect ratio: Square
- Max height: 250px

### Center Label
- Amount: 30px, bold, `#1C1F37`
- Currency: 14px, gray, below amount

### Progress Bar
- Height: 12px (`h-3`)
- Background: `#F5F6FB`
- Rounded: Full
- Gap: 2px between segments

### Category List
- Color dot: 12px circle
- Name: 14px, bold
- Amount: 14px, bold
- Percentage: Blue badge (`#207DFF`)

### Footer
- Total spent with TrendingUp icon
- Description: "Showing total spending for the current month"

## Usage
```tsx
import SpendingByCategoryChart from "@/app/components/SpendingByCategoryChart";

export default function Dashboard() {
  const categories = [
    { name: "Groceries", amount: "450 TND", percentage: 35, color: "#017EFA" },
    { name: "Transport", amount: "200 TND", percentage: 15, color: "#FD1F9B" },
  ];

  return (
    <SpendingByCategoryChart categories={categories} />
  );
}
```

## Responsive Behavior
- Chart scales within container
- Category list scrollable if needed
- Text sizes adjust to container
