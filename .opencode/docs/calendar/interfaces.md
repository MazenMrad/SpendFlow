# Calendar Interfaces Documentation

## File Information
- **File**: `calendar/interfaces.ts`
- **Purpose**: Interface definitions for calendar data structures
- **Size**: 18 lines

## Interfaces Defined

### IEvent
```typescript
interface IEvent {
  id: string | number;
  startDate: string;      // ISO 8601 date string
  endDate: string;        // ISO 8601 date string
  title: string;
  color: TEventColor;
  description: string;
  amount?: number;        // Optional expense amount
  category?: string;      // Optional category
}
```

Core event/bill interface representing a calendar entry.

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | `string \| number` | Yes | Unique identifier |
| startDate | `string` | Yes | Event start date (ISO format) |
| endDate | `string` | Yes | Event end date (ISO format) |
| title | `string` | Yes | Event title |
| color | `TEventColor` | Yes | Event color theme |
| description | `string` | Yes | Event description |
| amount | `number` | No | Bill amount (for expenses) |
| category | `string` | No | Category name |

### ICalendarCell
```typescript
interface ICalendarCell {
  day: number;           // Day of month (1-31)
  currentMonth: boolean; // Whether cell belongs to current month
  date: Date;            // Full Date object
}
```

Represents a single day cell in the month view calendar grid.

| Property | Type | Description |
|----------|------|-------------|
| day | `number` | Day number (1-31) |
| currentMonth | `boolean` | True if cell is in current month |
| date | `Date` | JavaScript Date object |

## Dependencies
- `TEventColor` from `@/calendar/types`

## Usage Example
```typescript
import type { IEvent, ICalendarCell } from "@/calendar/interfaces";

const event: IEvent = {
  id: "evt-001",
  startDate: "2025-01-15T10:00:00Z",
  endDate: "2025-01-15T11:00:00Z",
  title: "Team Meeting",
  color: "blue",
  description: "Weekly sync",
  amount: 0,
  category: "Work"
};

const cell: ICalendarCell = {
  day: 15,
  currentMonth: true,
  date: new Date(2025, 0, 15)
};
```
