# Dashboard API Route

## Overview
API endpoint for fetching aggregated dashboard data including spending metrics, trends, categories, transactions, and upcoming bills.

**File:** `app/api/dashboard/route.ts`  
**HTTP Method:** `GET`  
**Authentication:** Required (via NextAuth session)

## Endpoint

```
GET /api/dashboard
```

## Request

### Headers
- `Content-Type: application/json`
- Authentication is handled via NextAuth session cookie

### Parameters
None required.

## Response

### Success (200 OK)

```typescript
{
  metrics: {
    monthlySpending: string;      // e.g., "1250.00 TND"
    remainingBudget: string;      // e.g., "750.00 TND"
    topCategory: string;          // e.g., "Food"
    topCategoryAmount: string;      // e.g., "450.00 TND"
  };
  monthlyTrend: Array<{
    label: string;                // Month abbreviation (e.g., "Jan")
    totalExpenses: number;
    dailyNeeds: number;           // 70% of total
  }>;
  weeklyTrend: Array<{
    label: string;                // Weekday abbreviation (e.g., "Mon")
    totalExpenses: number;
    dailyNeeds: number;
  }>;
  categories: Array<{
    name: string;
    amount: string;               // e.g., "450.00 TND"
    percentage: number;
    color: string;                // Hex color code
  }>;
  recentTransactions: Array<{
    id: string;
    type: string;                 // Category name
    amount: string;               // e.g., "45.50 TND"
    description: string;
    date: string;                 // e.g., "Jan 15, 2026"
  }>;
  upcomingBills: Array<{
    id: string;
    name: string;
    amount: string;               // e.g., "120.00 TND"
    category: string;
    color: string;
    date: string;               // e.g., "Jan 20"
    fullDate: Date;
    status: string;
  }>;
}
```

### Error Response (500 Internal Server Error)

```json
{
  "error": "Failed to fetch dashboard data"
}
```

## Dependencies

### Imports
- `next/server` - Next.js server utilities
- `@/app/actions/expenses` - Contains `getDashboardData()` server action

### Related Actions
- `getDashboardData()` in `app/actions/expenses.ts` - Fetches and aggregates all dashboard data

## Error Handling

| Error Type | HTTP Status | Description |
|------------|-------------|-------------|
| Server Error | 500 | Generic server-side error from `getDashboardData()` |

All errors are logged to console for debugging.

## Usage Example

```typescript
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

// In a component
const { data, error, isLoading } = useSWR('/api/dashboard', fetcher, {
  refreshInterval: 30000, // Refresh every 30 seconds
  revalidateOnFocus: false,
});
```

## Implementation Notes

1. This is a thin wrapper around the `getDashboardData()` server action
2. Uses fallback user ID if session is not available (for development/demo purposes)
3. Returns formatted currency strings with "TND" suffix
4. Monthly trend includes last 12 months of data
5. Weekly trend includes last 7 days of data
6. Handles missing DATABASE_URL gracefully with empty data response
