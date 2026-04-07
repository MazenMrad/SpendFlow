# UpcomingBills Component

## File Location
`app/components/UpcomingBills.tsx`

## Purpose
Displays upcoming bills in a calendar view for the current week and a list view with detailed bill information. Shows bills due on specific dates with hover interactions.

## Component Structure

### Component Type
Functional React Component

### Props Interface
```typescript
interface Bill {
  id: string;
  name: string;
  status: string;           // "completed" or "pending"
  color: string;             // Category color
  date: string;             // Formatted date string
  fullDate: string | Date;  // Full date for comparison
  amount: string;             // Formatted amount
  category: string;
}

interface UpcomingBillsProps {
  bills?: Bill[];
}
```

## Features

### 1. Weekly Calendar Grid
- 7-column grid representing Monday-Sunday
- Shows day names in header
- Shows day numbers for current week
- Highlights current day in blue
- Shows bills due indicator on specific dates

### 2. Bill Calendar Indicators
- Dates with bills shown with light blue background (`bg-[#F3F4FB]`)
- Hover card shows bill details for that day
- Bills grouped by date

### 3. Bills List
- Vertical list of upcoming bills
- Each bill shows:
  - Calendar icon with category color
  - Bill name
  - Due date
  - Status (completed/pending)
  - Options menu button

### 4. Hover Cards
- Shows detailed bill info on hover
- Amount, category, and status

### 5. "See Detail" Link
- Links to full upcoming bills page (`/upcoming-bills`)
- Arrow icon for visual indication

## Dependencies

| Dependency | Purpose |
|------------|---------|
| `date-fns` | Date manipulation (isSameWeek, parseISO) |
| `@/lib/utils` | cn utility for class names |
| `@/components/ui/hover-card` | Hover card UI component |

## Date Calculation Logic

### Week Range Calculation
```typescript
const today = new Date();
const currentDay = today.getDay();
const currentDate = today.getDate();
const mondayOffset = currentDay === 0 ? -6 : 1 - currentDay;

const dates = Array.from({ length: 7 }, (_, i) => {
  const date = new Date(today);
  date.setDate(currentDate + mondayOffset + i);
  date.setHours(0, 0, 0, 0);
  return { day: date.getDate(), fullDate: date };
});
```

### Bill Matching
- Compares bill date with calendar date
- Normalizes dates to midnight for accurate comparison
- Filters bills for each day cell

### Week Status
```typescript
const isDueThisWeek = isSameWeek(billDate, today, { weekStartsOn: 1 });
```

## Design System

### Container
- Background: White
- Border radius: `rounded-lg`
- Shadow: `shadow-[0_5px_10px_0_#F1F2FA]`
- Padding: `p-5`

### Calendar Header
- Background: `#F9FAFD` (light gray)
- Border: `#ECEDF3`
- Day names: 14px, `#313131`
- Padding: `py-4`

### Calendar Cells
- Default: White background
- Today: Blue background (`bg-[#017EFA]`) with white text
- With Bills: Light blue (`bg-[#F3F4FB]`)
- Border: `#ECEDF3`

### Bill List Items
- Padding: `p-2`
- Border radius: `rounded-lg`
- Hover: `hover:bg-gray-50`
- Due this week: `bg-[#F3F4FB]` with border

### Status Styling
- **Completed**: Green text (`#23B899`)
- **Pending**: Black text with 50% opacity

### Icons
- Header icon: Blue circle with clock SVG
- Bill icon: Calendar/clipboard SVG with category color
- Options: Three dots menu

## Bill Display Format

| Field | Value |
|-------|-------|
| Name | Bill description or category name |
| Amount | Formatted with currency (TND) |
| Category | Category name |
| Status | "completed" or "pending" |
| Color | Category color for styling |

## Usage
```tsx
import UpcomingBills from "@/app/components/UpcomingBills";

export default function Dashboard() {
  const bills = [
    { id: "1", name: "Rent", status: "pending", color: "#017EFA", date: "Jan 15", fullDate: "2024-01-15", amount: "800 TND", category: "Housing" },
  ];

  return (
    <UpcomingBills bills={bills} />
  );
}
```
