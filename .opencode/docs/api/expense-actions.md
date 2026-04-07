# Expense Actions

## File Location
`app/actions/expenses.ts`

## Purpose
Server-side actions for managing expenses, categories, budget goals, and fetching dashboard data. All actions require authentication via NextAuth.

## Directive
```typescript
"use server";
```

## Actions

### 1. addExpense

Add a new expense to the system.

#### Parameters
```typescript
formData: FormData
```

#### FormData Fields
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| date | string | Yes | Expense date (ISO format) |
| amount | string | Yes | Expense amount |
| category | string | Yes | Category name (created if not exists) |
| type | string | Yes | Payment method: "Cash", "Card", or "Check" |
| description | string | No | Expense description |

#### Returns
```typescript
{ success: true, message: string } | { error: string }
```

#### Implementation Details
- Auto-creates category if it doesn't exist
- Marks default categories: Transport, Food, Entertainment, Shopping
- Validates payment method
- Validates amount is positive number

---

### 2. updateBudgetGoal

Update user's monthly budget goal.

#### Parameters
```typescript
formData: FormData
```

#### FormData Fields
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| amount | string | Yes | Budget amount (positive number) |

#### Returns
```typescript
{ success: true, message: string } | { error: string }
```

---

### 3. createCategory

Create a new expense category.

#### Parameters
```typescript
formData: FormData
```

#### FormData Fields
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| name | string | Yes | Category name |

#### Returns
```typescript
{ success: true, message: string } | { error: string }
```

#### Implementation Details
- Generates random hex color for the category
- Sets `isDefault: false`
- Associates with current user

---

### 4. getUserCategories

Fetch all categories for current user.

#### Returns
```typescript
Array<{
  id: string;
  name: string;
  color: string;
}>
```

---

### 5. deleteCategory

Delete a category.

#### Parameters
```typescript
categoryId: string
```

#### Returns
```typescript
{ success: true, message: string } | { error: string }
```

#### Security
- Verifies user owns the category
- Prevents deletion of other users' categories

---

### 6. getDashboardData

Fetch comprehensive dashboard data including metrics, trends, and recent activity.

#### Returns
```typescript
{
  metrics: {
    monthlySpending: string;    // "1250.50 TND"
    remainingBudget: string;     // "749.50 TND"
    topCategory: string;           // "Groceries"
    topCategoryAmount: string;     // "450.00 TND"
  };
  monthlyTrend: Array<{
    label: string;         // "Jan", "Feb", etc.
    totalExpenses: number;
    dailyNeeds: number;    // 70% of total
  }>;
  weeklyTrend: Array<{
    label: string;         // "Mon", "Tue", etc.
    totalExpenses: number;
    dailyNeeds: number;
  }>;
  categories: Array<{
    name: string;
    amount: string;        // "450.00 TND"
    percentage: number;      // 0-100
    color: string;         // Hex color
  }>;
  recentTransactions: Array<{
    id: string;
    type: string;          // Category name
    amount: string;        // "50.00 TND"
    description: string;
    date: string;          // "Jan 13, 2026"
  }>;
  upcomingBills: Array<{
    id: string;
    name: string;
    amount: string;        // "800.00 TND"
    category: string;
    color: string;
    date: string;          // "Jan 15"
    fullDate: Date;
    status: string;        // "completed" or "pending"
  }>;
}
```

#### Implementation Details
- Calculates current month spending
- Computes remaining budget from user's budgetGoal
- Aggregates spending by category
- Generates 12-month trend data
- Generates 7-day weekly trend
- Identifies top spending category
- Fetches recent transactions (last 4)
- Fetches upcoming bills (next 10)

---

### 7. getExpenses

Fetch all expenses for current user.

#### Returns
```typescript
Array<{
  id: string;
  date: string;           // "Jan 13, 2026"
  category: string;
  categoryColor?: string;
  description: string;
  amount: number;
  status: "completed" | "pending";
}>
```

#### Status Logic
- **completed**: Expense date is today or earlier
- **pending**: Expense date is in the future

---

### 8. deleteExpense

Delete an expense.

#### Parameters
```typescript
expenseId: string
```

#### Returns
```typescript
{ success: true, message: string } | { error: string }
```

#### Security
- Verifies user owns the expense
- Returns error if expense not found
- Returns error if unauthorized

---

### 9. getCalendarEvents

Fetch expenses formatted as calendar events.

#### Returns
```typescript
Array<{
  id: string;
  startDate: string;      // ISO timestamp
  endDate: string;        // ISO timestamp (1 hour duration)
  title: string;
  description: string;
  color: string;          // "orange", "blue", "purple", "green", "red", "gray"
  amount: number;
  category: string;
}>
```

#### Color Mapping
| Category | Color |
|----------|-------|
| Food | orange |
| Transport | blue |
| Entertainment | purple |
| Shopping | green |
| Health | red |
| Other | gray |

---

### 10. getWeeklyUpcomingBills

Fetch bills due in the current week.

#### Returns
```typescript
Array<{
  id: string;
  name: string;
  amount: string;         // "50.00 TND"
  date: string;           // "Mon 15"
  isOverdue: boolean;
  isDueSoon: boolean;
  category: string;
  color: string;
}>
```

#### Week Definition
- Week starts on Monday
- Includes current week (Monday-Sunday)
- Filters for expenses with dates in current week

## Dependencies

| Dependency | Purpose |
|------------|---------|
| `@/lib/prisma` | Prisma database client |
| `next-auth` | getServerSession for auth |
| `@/lib/auth` | authOptions configuration |

## Security

1. **Session Verification**: All actions verify active session
2. **User Isolation**: All queries filter by userId
3. **Ownership Checks**: delete actions verify ownership
4. **Fallback User**: Development fallback for getDashboardData/getExpenses
5. **Input Validation**: Amount validation, payment method validation

## Usage Examples

### Add Expense
```typescript
const formData = new FormData();
formData.append("date", "2024-01-15");
formData.append("amount", "50.00");
formData.append("category", "Food");
formData.append("type", "Cash");
formData.append("description", "Grocery shopping");

const result = await addExpense(formData);
```

### Get Dashboard Data
```typescript
const data = await getDashboardData();
console.log(data.metrics.monthlySpending);
console.log(data.categories);
```
