# Sidebar Component

## File Location
`app/components/Sidebar.tsx`

## Purpose
The Sidebar component provides the main navigation for authenticated users, displaying navigation links with icons and active state highlighting.

## Component Structure

### Component Type
Functional React Component (Client Component)
**Directive:** `"use client"` - Uses Next.js navigation hooks

### Props
This component accepts no props.

## Navigation Items

| Name | Icon | Path | Description |
|------|------|------|-------------|
| Dashboard | DashboardIcon | `/dashboard` | Main dashboard view |
| Upcoming Bills | BillsIcon | `/upcoming-bills` | Calendar view for bills |
| Expenses | ExpensesIcon | `/expenses` | Expense list view |
| Add Expense | AddExpenseIcon | `/add-expense` | Form to add new expense |
| Account | AccountIcon | `/account` | User account management |
| Settings | SettingsIcon | `/settings` | App settings (separated at bottom) |

## Dependencies

| Dependency | Purpose |
|------------|---------|
| `next/link` | Navigation links |
| `next/navigation` | `usePathname` for active state |
| `@/app/icons/*-icon.svg` | Navigation icons (6 icons) |

## Design System

### Layout
- **Width:** 240px fixed
- **Height:** Full viewport height
- **Position:** Fixed left side
- **Background:** `#081A51` (dark blue)
- **Responsive:** Hidden on mobile (`hidden lg:flex`)

### Active State
- Background: `bg-white/10`
- Text color: White
- Icon color: White

### Inactive State
- Text color: `#CCD2E3` (light gray)
- Hover: White background with 10% opacity

### Logo Section
- App logo with gradient icon
- "SpendFlow" branding text
- White color scheme

## Responsive Behavior
- **Mobile/Tablet:** Hidden (`hidden lg:flex`)
- **Desktop:** Visible fixed sidebar

## Icon Imports
```typescript
import Logo from "@/app/icons/spendflow-logo.svg";
import DashboardIcon from "@/app/icons/dashboard-icon.svg";
import BillsIcon from "@/app/icons/bills-icon.svg";
import ExpensesIcon from "@/app/icons/expenses-icon.svg";
import AddExpenseIcon from "@/app/icons/add-expense-icon.svg";
import AccountIcon from "@/app/icons/account-icon.svg";
import SettingsIcon from "@/app/icons/settings-icon.svg";
```

## Usage
```tsx
import Sidebar from "@/app/components/Sidebar";

export default function DashboardLayout() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-64">
        {/* Page content */}
      </main>
    </div>
  );
}
```

## Key Features
1. **Active Route Highlighting**: Uses `usePathname()` to highlight current page
2. **Icon Animations**: Smooth color transitions on hover
3. **Settings Separation**: Settings link is separated at the bottom
4. **Custom Font**: Uses `font-gilroy-regular` for navigation text
