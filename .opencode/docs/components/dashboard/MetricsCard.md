# MetricsCard Component

## File Location
`app/components/MetricsCard.tsx`

## Purpose
The MetricsCard component displays a metric value with a label, optional change indicator, and optional description. Used in the dashboard to show key financial metrics.

## Component Structure

### Component Type
Functional React Component

### Props Interface
```typescript
interface MetricsCardProps {
  label: string;           // Metric label (e.g., "Monthly Spending")
  amount: string;          // Formatted amount value
  change?: string;         // Optional change value (e.g., "12%")
  changeSign?: "up" | "down";  // Direction of change
  description?: string;    // Optional description text
}
```

## Features

### 1. Label Display
- Shows metric name with a colored dot indicator
- Dot color: `#017EFA` (blue)

### 2. Amount Display
- Large typography (text-2xl)
- Font: `font-gilroy-bold`
- Color: `#1c1f37`

### 3. Change Indicator (Optional)
- Shows percentage change with arrow
- Up arrow (↑) in green `#30d988`
- Down arrow (↓) in red `#dd405f`
- Only shown if `change` prop is provided

### 4. Description (Optional)
- Additional context text
- Small font size
- Color: `#1c1f37`

## Design System

### Layout
- Background: `#f5f7fb` (light gray)
- Border radius: `rounded-lg`
- Padding: `p-4`
- Flex column with gap spacing

### Typography
- Label: 14px, `font-gilroy-medium`, muted color
- Amount: 24px, `font-gilroy-bold`, dark color
- Change: 12px, `font-gilroy-bold`, colored based on direction
- Description: 12px, `font-gilroy-medium`

## Usage Examples

```tsx
// Basic usage
<MetricsCard
  label="Monthly Spending"
  amount="1,250 TND"
/>

// With change indicator
<MetricsCard
  label="Remaining Budget"
  amount="750 TND"
  change="12%"
  changeSign="up"
/>

// With description
<MetricsCard
  label="Top Category"
  amount="450 TND"
  description="Groceries & Dining"
/>
```

## Dashboard Integration

Used in a 3-column grid on the dashboard:
```tsx
<div className="grid grid-cols-3 gap-6">
  <MetricsCard label="Monthly Spending" amount={data?.metrics?.monthlySpending} />
  <MetricsCard label="Remaining Budget" amount={data?.metrics?.remainingBudget} changeSign="up" />
  <MetricsCard label={data?.metrics?.topCategory} amount={data?.metrics?.topCategoryAmount} />
</div>
```
