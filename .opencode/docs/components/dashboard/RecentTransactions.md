# RecentTransactions Component

## File Location
`app/components/RecentTransactions.tsx`

## Purpose
Displays a list of recent financial transactions with details including description, type, amount, and date.

## Component Structure

### Component Type
Functional React Component

### Props Interface
```typescript
interface Transaction {
  id: string;
  type: string;        // Transaction type (e.g., "Online Purchase")
  amount: string;      // Formatted amount (e.g., "50 TND")
  category: string;    // Category name
  description: string; // Transaction description
  date: string;        // Formatted date (e.g., "Jan 13, 2026")
}

interface RecentTransactionsProps {
  transactions?: Transaction[];
}
```

## Features

### 1. Transaction List
- Displays multiple transactions
- Each transaction in a card-style container
- Fallback to sample data if no transactions provided

### 2. Transaction Card
- Icon indicator (blue circle with chart icon)
- Description text
- Type and date metadata
- Amount display

### 3. Header Section
- Transaction icon (chart/graph icon)
- Title: "Recent Transactions"
- Horizontal divider

### 4. Fallback Data
```typescript
const displayTransactions = propTransactions || [
  { id: "1", type: "Online Purchase", amount: "50 TND", category: "Inscription", description: "Sample", date: "Jan 13, 2026" },
  { id: "2", type: "Online Purchase", amount: "70 TND", category: "Inscription", description: "Sample", date: "Jan 12, 2026" },
];
```

## Design System

### Container
- Background: White
- Border radius: `rounded-lg`
- Shadow: `shadow-[0_5px_10px_0_#F1F2FA]`
- Padding: `p-5`

### Header
- Icon: Blue circle (`#017EFA`) with SVG chart icon
- Title: 18-24px, `font-gilroy-bold`, `#1C1F37`
- Divider: Light gray (`#DADADA` at 50% opacity)

### Transaction Cards
- Background: `#FAFAFA` (off-white)
- Border radius: 27px (`rounded-[27px]`)
- Padding: `p-4`

### Transaction Icon
- Purple color (`#7659FF`)
- Document/transaction SVG icon
- 24x24px

### Typography
- Description: 16px, `font-gilroy-medium`, `#1C1F37`
- Metadata: 12px, `font-gilroy-medium`, `#1C1F37` at 30% opacity
- Amount: 12px, `font-gilroy-medium`, black

### Layout
- Flex row layout for each transaction
- Icon on left
- Description and metadata in center
- Amount on right
- Gap spacing between elements

## Usage
```tsx
import RecentTransactions from "@/app/components/RecentTransactions";

export default function Dashboard() {
  const transactions = [
    { id: "1", type: "Online Purchase", amount: "50 TND", category: "Shopping", description: "Amazon Purchase", date: "Jan 13, 2026" },
    { id: "2", type: "Grocery", amount: "120 TND", category: "Food", description: "Carrefour", date: "Jan 12, 2026" },
  ];

  return (
    <RecentTransactions transactions={transactions} />
  );
}
```

## Integration
Used in the dashboard bottom section:
```tsx
<div>
  <RecentTransactions transactions={data?.recentTransactions} />
</div>
```
