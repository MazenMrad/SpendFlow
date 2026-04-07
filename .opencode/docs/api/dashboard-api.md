# Dashboard API

## File Location
`app/api/dashboard/route.ts`

## Purpose
Provides aggregated dashboard data including spending metrics, trends, categories breakdown, upcoming bills, and recent transactions.

## HTTP Method
`GET`

## Authentication
Requires authenticated session (via NextAuth).

## Response Interface

```typescript
interface DashboardResponse {
  metrics: {
    monthlySpending: number;
    remainingBudget: number;
    topCategory: string;
    topCategoryAmount: number;
  };
  monthlyTrend: MonthlyData[];
  weeklyTrend: WeeklyData[];
  categories: CategoryData[];
  upcomingBills: BillData[];
  recentTransactions: TransactionData[];
}
```

## Data Structures

### Monthly Trend Data
```typescript
interface MonthlyData {
  month: string;   // Month name (e.g., "Jan", "Feb")
  amount: number;  // Total spending for month
}
```

### Weekly Trend Data
```typescript
interface WeeklyData {
  week: string;    // Week identifier
  amount: number;  // Total spending for week
}
```

### Category Data
```typescript
interface CategoryData {
  name: string;    // Category name
  amount: number;  // Total spending in category
  color: string;   // Category color (hex)
}
```

### Bill Data
```typescript
interface BillData {
  id: string;
  name: string;
  amount: number;
  date: string;
  category: string;
}
```

### Transaction Data
```typescript
interface TransactionData {
  id: string;
  description: string;
  amount: number;
  date: string;
  category: string;
  paymentMethod: string;
}
```

## Data Calculation Logic

### Monthly Spending
- Sum of all expenses for current month
- Filter: `date >= startOfMonth && date <= endOfMonth`

### Remaining Budget
```typescript
remainingBudget = user.budgetGoal - monthlySpending
```

### Top Category
- Category with highest spending amount
- Aggregated across all expenses

### Trends
- **Monthly**: Last 12 months of spending data
- **Weekly**: Last 4-6 weeks of spending data

### Upcoming Bills
- Expenses with future dates
- Sorted by date (nearest first)
- Limited to next 30 days

### Recent Transactions
- Last 10-20 expenses
- Sorted by createdAt (newest first)

## Dependencies

| Dependency | Purpose |
|------------|---------|
| `@/lib/prisma` | Prisma client for database queries |
| `next-auth` | Session authentication |
| `date-fns` | Date manipulation utilities |

## Error Handling

| Status Code | Condition |
|-------------|-----------|
| 401 | User not authenticated |
| 500 | Database error or calculation error |

## Example Response

```json
{
  "metrics": {
    "monthlySpending": 1250.50,
    "remainingBudget": 1749.50,
    "topCategory": "Groceries",
    "topCategoryAmount": 450.00
  },
  "monthlyTrend": [
    { "month": "Jan", "amount": 1100 },
    { "month": "Feb", "amount": 1200 },
    ...
  ],
  "weeklyTrend": [
    { "week": "Week 1", "amount": 300 },
    { "week": "Week 2", "amount": 450 },
    ...
  ],
  "categories": [
    { "name": "Groceries", "amount": 450, "color": "#017EFA" },
    { "name": "Transport", "amount": 200, "color": "#FD1F9B" },
    ...
  ],
  "upcomingBills": [
    { "id": "...", "name": "Rent", "amount": 800, "date": "2024-02-01", "category": "Housing" }
  ],
  "recentTransactions": [
    { "id": "...", "description": "Grocery shopping", "amount": 85.50, "date": "2024-01-15", "category": "Groceries", "paymentMethod": "CASH" }
  ]
}
```

## Client Usage (SWR)

```typescript
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function DashboardPage() {
  const { data, error, isLoading } = useSWR("/api/dashboard", fetcher, {
    refreshInterval: 10000, // Poll every 10 seconds
    revalidateOnFocus: true,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading dashboard</div>;

  return (
    <div>
      <MetricsCard
        label="Monthly Spending"
        amount={data.metrics.monthlySpending}
      />
      {/* ... */}
    </div>
  );
}
```
