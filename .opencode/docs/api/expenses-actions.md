# Expenses Server Actions

## Overview
Comprehensive server actions for expense management including CRUD operations, dashboard data aggregation, category management, and calendar events.

**File:** `app/actions/expenses.ts`  
**Directive:** `"use server"`  
**Authentication:** Required (via NextAuth session) - with fallback for development

## Actions

### 1. addExpense

Create a new expense record.

#### Signature

```typescript
async function addExpense(formData: FormData): Promise<
  | { success: true; message: string }
  | { error: string }
>
```

#### Parameters

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| date | string | Yes | Expense date (ISO format) |
| amount | string | Yes | Expense amount (positive number) |
| category | string | Yes | Category name (auto-created if not exists) |
| type | string | Yes | Payment method: "Cash", "Card", or "Check" |
| description | string | No | Optional description |

#### Response

**Success:**
```typescript
{ success: true, message: "Expense added successfully!" }
```

**Errors:**
```typescript
{ error: "You must be logged in to add expenses (Session check failed)" }
{ error: "Invalid user session" }
{ error: "Date, amount, category, and payment type are required" }
{ error: "Amount must be a positive number" }
{ error: "Invalid payment method" }
```

---

### 2. updateBudgetGoal

Update the user's monthly budget goal.

#### Signature

```typescript
async function updateBudgetGoal(formData: FormData): Promise<
  | { success: true; message: string }
  | { error: string }
>
```

#### Parameters

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| amount | string | Yes | Budget amount (non-negative number) |

#### Response

**Success:**
```typescript
{ success: true, message: "Budget updated" }
```

**Errors:**
```typescript
{ error: "Unauthorized" }
{ error: "Invalid amount" }
{ error: "Failed to update budget" }
```

---

### 3. createCategory

Create a new custom category for the user.

#### Signature

```typescript
async function createCategory(formData: FormData): Promise<
  | { success: true; message: string }
  | { error: string }
>
```

#### Parameters

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| name | string | Yes | Category name (unique per user) |

#### Response

**Success:**
```typescript
{ success: true, message: "Category created" }
```

**Errors:**
```typescript
{ error: "Unauthorized" }
{ error: "Name is required" }
{ error: "Failed to create category: [details]" }
```

#### Implementation Notes

- Generates random hex color for the category
- Sets `isDefault: false` for user-created categories
- Color format: `#RRGGBB`

---

### 4. getUserCategories

Fetch all categories for the authenticated user.

#### Signature

```typescript
async function getUserCategories(): Promise<Array<{
  id: string;
  name: string;
  color: string;
}>>
```

#### Response

```typescript
[
  { id: "cat_1", name: "Food", color: "#FF5733" },
  { id: "cat_2", name: "Transport", color: "#33FF57" }
]
```

**Returns empty array on error or if not authenticated.**

---

### 5. deleteCategory

Delete a category and all associated expenses.

#### Signature

```typescript
async function deleteCategory(categoryId: string): Promise<
  | { success: true; message: string }
  | { error: string }
>
```

#### Parameters

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| categoryId | string | Yes | Category ID to delete |

#### Response

**Success:**
```typescript
{ success: true, message: "Category deleted successfully" }
```

**Errors:**
```typescript
{ error: "Unauthorized" }
{ error: "Category not found or unauthorized" }
{ error: "Failed to delete category" }
```

---

### 6. getDashboardData

Fetch aggregated dashboard data including metrics, trends, and transactions.

#### Signature

```typescript
async function getDashboardData(): Promise<
  | DashboardData
  | { error: string }
>
```

#### Response

```typescript
{
  metrics: {
    monthlySpending: string;      // "1250.00 TND"
    remainingBudget: string;       // "750.00 TND"
    topCategory: string;           // "Food"
    topCategoryAmount: string;     // "450.00 TND"
  };
  monthlyTrend: Array<{
    label: string;                // "Jan"
    totalExpenses: number;
    dailyNeeds: number;           // 70% of total
  }>;
  weeklyTrend: Array<{
    label: string;                // "Mon"
    totalExpenses: number;
    dailyNeeds: number;
  }>;
  categories: Array<{
    name: string;
    amount: string;               // "450.00 TND"
    percentage: number;
    color: string;                 // Hex color
  }>;
  recentTransactions: Array<{
    id: string;
    type: string;                 // Category name
    amount: string;               // "45.50 TND"
    description: string;
    date: string;                // "Jan 15, 2026"
  }>;
  upcomingBills: Array<{
    id: string;
    name: string;
    amount: string;               // "120.00 TND"
    category: string;
    color: string;
    date: string;                // "Jan 20"
    fullDate: Date;
    status: string;
  }>;
}
```

#### Implementation Notes

- Calculates current month expenses
- Determines top spending category
- Generates 12-month spending trend
- Generates 7-day weekly trend
- Returns last 4 recent transactions
- Returns upcoming bills (future dates)
- Uses fallback user ID if no session (dev mode)

---

### 7. getExpenses

Fetch all expenses for the authenticated user.

#### Signature

```typescript
async function getExpenses(): Promise<Array<{
  id: string;
  date: string;              // "Jan 15, 2026"
  category: string;          // Category name
  categoryColor: string | undefined;
  description: string;
  amount: number;
  status: "completed" | "pending";
}>>
```

#### Response

```typescript
[
  {
    id: "exp_1",
    date: "Jan 15, 2026",
    category: "Food",
    categoryColor: "#FD1F9B",
    description: "Restaurant Dinner",
    amount: 45.50,
    status: "completed"
  }
]
```

#### Implementation Notes

- Returns fallback mock data if no DATABASE_URL
- Status is calculated based on date vs current date
- Orders by date descending

---

### 8. deleteExpense

Delete a specific expense.

#### Signature

```typescript
async function deleteExpense(expenseId: string): Promise<
  | { success: true; message: string }
  | { error: string }
>
```

#### Parameters

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| expenseId | string | Yes | Expense ID to delete |

#### Response

**Success:**
```typescript
{ success: true, message: "Expense deleted successfully" }
```

**Errors:**
```typescript
{ error: "Unauthorized" }
{ error: "Expense not found" }
{ error: "Unauthorized access to this expense" }
{ error: "Failed to delete expense" }
```

#### Implementation Notes

- Verifies user owns the expense before deletion
- Returns specific error for unauthorized access

---

### 9. getCalendarEvents

Fetch expenses formatted as calendar events.

#### Signature

```typescript
async function getCalendarEvents(): Promise<Array<{
  id: string;
  startDate: string;     // ISO 8601
  endDate: string;       // ISO 8601 (1 hour duration)
  title: string;
  description: string;
  color: string;         // "orange", "blue", "purple", "green", "red", "gray"
  amount: number;
  category: string;
}>>
```

#### Response

```typescript
[
  {
    id: "exp_1",
    startDate: "2026-01-15T10:00:00.000Z",
    endDate: "2026-01-15T11:00:00.000Z",
    title: "Restaurant Dinner",
    description: "Category: Food | Amount: 45.50 TND",
    color: "orange",
    amount: 45.50,
    category: "Food"
  }
]
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

Fetch bills due within the current week.

#### Signature

```typescript
async function getWeeklyUpcomingBills(): Promise<Array<{
  id: string;
  name: string;
  amount: string;        // "120.00 TND"
  date: string;          // "Mon 15"
  isOverdue: boolean;
  isDueSoon: boolean;    // Due today
  category: string;
  color: string;
}>>
```

#### Response

```typescript
[
  {
    id: "exp_1",
    name: "Electric Bill",
    amount: "120.00 TND",
    date: "Mon 15",
    isOverdue: false,
    isDueSoon: true,
    category: "Utilities",
    color: "#017EFA"
  }
]
```

#### Implementation Notes

- Week is defined as Monday to Sunday
- `isDueSoon` is true if due today
- Filters for current week dates

## Dependencies

### Imports
- `@/lib/prisma` - Prisma client
- `next-auth` - Session management
- `@/lib/auth` - Auth configuration

### Related Prisma Operations
- `prisma.expense.create()` - Create expenses
- `prisma.expense.findMany()` - Query expenses
- `prisma.expense.findUnique()` - Get single expense
- `prisma.expense.delete()` - Delete expense
- `prisma.expense.aggregate()` - Aggregate queries
- `prisma.category.create()` - Create categories
- `prisma.category.findFirst()` - Find category
- `prisma.category.findMany()` - List categories
- `prisma.category.delete()` - Delete category
- `prisma.user.findUnique()` - Get user
- `prisma.user.update()` - Update user budget

## Error Handling

| Error Type | Description |
|------------|-------------|
| Unauthorized | No active session |
| Validation Error | Invalid or missing fields |
| Not Found | Resource doesn't exist |
| Access Denied | User doesn't own resource |
| Server Error | Database or unexpected errors |

## Usage Examples

### Add Expense

```typescript
'use client';

import { addExpense } from '@/app/actions/expenses';

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  
  const result = await addExpense(formData);
  
  if ('error' in result) {
    alert(result.error);
  } else {
    alert(result.message);
  }
};
```

### Get Dashboard Data

```typescript
import { getDashboardData } from '@/app/actions/expenses';

// In Server Component or API Route
const data = await getDashboardData();
if ('error' in data) {
  console.error(data.error);
} else {
  console.log(data.metrics.monthlySpending);
}
```

### Create Category

```typescript
const formData = new FormData();
formData.append('name', 'Entertainment');

const result = await createCategory(formData);
```

## Data Flow

```
Client Form → Server Action → Prisma → MongoDB
                 ↓
            Session Check
            Validation
            Business Logic
            ↓
        JSON Response
```

## Security Considerations

1. All actions verify user session via `getServerSession()`
2. Ownership verification before updates/deletions
3. Input validation on all numeric fields
4. Fallback user ID only used in development
5. Debug logs only in development (contain sensitive IDs)
