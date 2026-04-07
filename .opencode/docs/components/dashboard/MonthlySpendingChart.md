# MonthlySpendingChart Component

## File Location
`app/components/MonthlySpendingChart.tsx`

## Purpose
Interactive chart component displaying spending trends over time with weekly/monthly view toggle. Shows total expenses as an area chart and daily needs as a line.

## Component Structure

### Component Type
Functional React Component (Client Component)
**Directive:** `"use client"`

### Props Interface
```typescript
interface MonthlySpendingChartProps {
  monthlyData: {
    label: string;       // Month name
    totalExpenses: number;
    dailyNeeds: number;
  }[];
  weeklyData: {
    label: string;       // Week identifier
    totalExpenses: number;
    dailyNeeds: number;
  }[];
}
```

## State Management

```typescript
const [viewMode, setViewMode] = useState<"weekly" | "monthly">("monthly");
```

## Features

### 1. View Mode Toggle
- **Monthly View**: Shows last 12 months of data
- **Weekly View**: Shows last 4-6 weeks of data
- Toggle buttons with active state styling

### 2. Chart Visualization
- **Library**: Recharts (ComposedChart)
- **Chart Types**:
  - Area chart for Total Expenses (blue `#017EFA`)
  - Line chart for Daily Needs (pink `#fd1f9b`)
- **Responsive**: Uses ResponsiveContainer for fluid sizing

### 3. Interactive Elements
- **Tooltip**: Shows values on hover with custom styling
- **Legend**: Displays current values for both series
- **Grid**: Dashed horizontal grid lines

### 4. Data Processing
- Fallback to empty array if data not provided
- X-axis labels truncated to 3 characters
- Y-axis shows formatted values

## Dependencies

| Dependency | Purpose |
|------------|---------|
| `recharts` | Chart components (ComposedChart, Area, Line, etc.) |
| `@/app/icons/chart-icon.svg` | Chart header icon |
| `react` | useState hook |

## Chart Configuration

### Area Chart (Total Expenses)
```typescript
<Area
  type="monotone"
  dataKey="totalExpenses"
  name="Total Expenses"
  fill="#017efa"
  stroke="#017efa"
  fillOpacity={0.1}
  isAnimationActive={true}
/>
```

### Line Chart (Daily Needs)
```typescript
<Line
  type="monotone"
  dataKey="dailyNeeds"
  name="Daily Needs"
  stroke="#fd1f9b"
  strokeWidth={2}
  dot={false}
  isAnimationActive={true}
/>
```

## Design System

### Container
- Background: White
- Border radius: `rounded-lg`
- Shadow: `shadow-md`
- Padding: `p-6`

### Header
- Chart icon (32x32px)
- Title: "Spending Overview" (24px, bold)
- Toggle buttons: Weekly / Monthly

### Toggle Styling
- Active: Blue text (`#017efa`), bold font
- Inactive: Gray text (`#a9abb0`), normal font

### Tooltip Styling
```typescript
contentStyle={{
  backgroundColor: "#f5f7fb",
  border: "1px solid #dadada",
  borderRadius: "6px",
  fontFamily: "Gilroy"
}}
```

## Legend Display
- Color-coded dots matching chart lines
- Shows last data point value
- Label: "Total Expenses" and "Daily Needs"

## Usage
```tsx
import MonthlySpendingChart from "@/app/components/MonthlySpendingChart";

export default function Dashboard() {
  return (
    <MonthlySpendingChart
      monthlyData={data?.monthlyTrend}
      weeklyData={data?.weeklyTrend}
    />
  );
}
```
