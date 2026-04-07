# Orders API Route

## Overview
API endpoint for managing expense orders. Supports fetching all user expenses and creating new expenses via POST request.

**File:** `app/api/orders/route.ts`  
**HTTP Methods:** `GET`, `POST`  
**Authentication:** Required (via NextAuth session) - with fallback for development

## Endpoints

### GET /api/orders

Fetch all expenses for the authenticated user.

#### Request

**Headers:**
- `Content-Type: application/json`
- Authentication via NextAuth session cookie

**Parameters:** None

#### Response

**Success (200 OK):**

```typescript
Array<{
  id: string;
  date: string;              // Formatted: "Jan 15, 2026"
  category: string;            // Category name
  categoryColor: string | undefined;
  description: string;
  amount: number;
  status: "completed" | "pending";
}>
```

**Example:**
```json
[
  {
    "id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "date": "Jan 15, 2026",
    "category": "Food",
    "categoryColor": "#FD1F9B",
    "description": "Restaurant Dinner",
    "amount": 45.50,
    "status": "completed"
  }
]
```

**Error (500 Internal Server Error):**
```json
{
  "error": "Failed to fetch expenses"
}
```

---

### POST /api/orders

Create a new expense. Supports integration with external sources (like n8n automation).

#### Request

**Headers:**
- `Content-Type: application/json`

**Body Parameters:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| amount | number/string | Yes | Expense amount (or use `price` as alternative) |
| price | number/string | No | Alternative to `amount` |
| category | string | Yes | Category name (will be created if not exists) |
| date | string | Yes | Expense date (ISO format or parseable date) |
| description | string | No | Description of the expense |
| source | string | No | Source system identifier |
| status | string | No | Expense status (default: "completed") |
| id | string | No | External ID (24-char hex, from n8n) |
| userId | string | No | User ID (overrides session) |

**Example:**
```json
{
  "amount": 25.99,
  "category": "Food",
  "date": "2026-01-15",
  "description": "Grocery shopping",
  "source": "n8n",
  "status": "completed"
}
```

#### Response

**Success (201 Created):**
```json
{
  "success": true,
  "id": "65a1b2c3d4e5f6g7h8i9j0k1"
}
```

**Error (400 Bad Request):**
```json
{
  "error": "Missing required fields: price/amount, category, date"
}
```

**Error (500 Internal Server Error):**
```json
{
  "error": "Failed to create expense",
  "details": "Error message details"
}
```

## Dependencies

### Imports
- `next/server` - Next.js server utilities
- `@/lib/prisma` - Prisma client instance
- `next-auth/next` - NextAuth server-side utilities
- `@/lib/auth` - Auth configuration

### Related Functions
- `prisma.expense.findMany()` - Fetch expenses
- `prisma.expense.create()` - Create expense
- `prisma.category.findFirst()` / `prisma.category.create()` - Category management

## Error Handling

| Error Type | HTTP Status | Description |
|------------|-------------|-------------|
| Bad Request | 400 | Missing required fields (amount/price, category, date) |
| Bad Request | 400 | Invalid price format (NaN) |
| Server Error | 500 | Database errors or unexpected exceptions |

## Usage Examples

### Fetch Expenses

```typescript
const fetchExpenses = async () => {
  const response = await fetch('/api/orders');
  const expenses = await response.json();
  return expenses;
};
```

### Create Expense

```typescript
const createExpense = async (expenseData: {
  amount: number;
  category: string;
  date: string;
  description?: string;
}) => {
  const response = await fetch('/api/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(expenseData),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error);
  }
  
  return await response.json();
};
```

## Implementation Notes

1. **GET Method:**
   - Uses fallback user ID for development: `"000000000000000000000001"`
   - Calculates status based on date comparison with current date
   - Includes full category data in response
   - Orders by date descending (newest first)

2. **POST Method:**
   - Supports both `amount` and `price` fields (price takes precedence)
   - Auto-creates category if it doesn't exist for the user
   - Supports custom ID from external systems (n8n integration)
   - Appends source to description if provided
   - Validates MongoDB ObjectId format (24 hex characters) for custom IDs
   - Uses "Card" as default payment method
   - Extensive debug logging for troubleshooting

3. **Integration Features:**
   - Designed to work with n8n automation workflows
   - Supports passing userId from request body for service-to-service calls
   - Flexible date parsing
