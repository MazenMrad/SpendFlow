# Header Component

## File Location
`app/components/Header.tsx`

## Purpose
The Header component displays the page title and user-related controls including notifications, upcoming bills preview, and user menu.

## Component Structure

### Component Type
Functional React Component (Client Component)
**Directive:** `"use client"`

### Props Interface
```typescript
interface HeaderProps {
  title: string; // Page title to display
}
```

## Features

### 1. Page Title
- Displays the current page title (passed as prop)
- Typography: 32px, `font-gilroy-bold`, `#1C1F37`

### 2. Notification Bell
- Shows notification icon with red indicator dot
- Displays count of upcoming bills due this week
- Opens popover with bill details

### 3. Weekly Bills Popover
- Lists bills due in the current week
- Shows bill name, amount, due date, and category
- Link to view all upcoming bills
- Loading state while fetching data

### 4. User Menu
- Displays user avatar with initials
- Shows user name
- Dropdown with Settings and Logout options
- Gradient avatar background (blue to purple)

## Dependencies

| Dependency | Purpose |
|------------|---------|
| `react` | useState, useEffect hooks |
| `next/link` | Navigation links |
| `next-auth/react` | useSession, signOut |
| `lucide-react` | Icons (Bell, ChevronDown, Calendar, Settings, LogOut) |
| `@/components/ui/popover` | Popover UI component |
| `@/app/actions/expenses` | getWeeklyUpcomingBills action |

## State Management

```typescript
const [weeklyBills, setWeeklyBills] = useState<any[]>([]);
const [loading, setLoading] = useState(false);
```

## User Initials Logic
```typescript
const userInitials = userName
  .split(" ")
  .map((n) => n[0])
  .join("")
  .slice(0, 2)
  .toUpperCase();
```

## Data Fetching
- Fetches weekly upcoming bills on mount using `useEffect`
- Uses `getWeeklyUpcomingBills()` server action
- Shows loading state during fetch

## Bill Display Format
```typescript
{
  name: string;      // Bill/expense name
  amount: number;    // Amount in currency
  date: string;      // Due date
  category: string;  // Category name
}
```

## Design System

### Layout
- Height: 95px
- Background: White
- Border: `rgba(0,0,0,0.46)`
- Padding: Responsive (px-4 md:px-10)

### Notification Badge
- Red dot indicator (`bg-red-500`)
- Shows when `weeklyBills.length > 0`

### Popover Styling
- Width: 320px
- Max height for bill list: 300px
- Scrollable content area
- Dividers between sections

### User Avatar
- Size: 40x40px
- Gradient: `from-blue-400 to-purple-500`
- White text with user initials

## Actions

| Action | Handler | Result |
|--------|---------|--------|
| Settings | Link to `/settings` | Navigate to settings |
| Logout | `signOut({ callbackUrl: "/login" })` | Sign out and redirect |
| View All Bills | Link to `/upcoming-bills` | Navigate to bills page |

## Usage
```tsx
import Header from "@/app/components/Header";

export default function DashboardPage() {
  return (
    <div>
      <Header title="Dashboard" />
      {/* Page content */}
    </div>
  );
}
```
