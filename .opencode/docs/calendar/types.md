# Calendar Types Documentation

## File Information
- **File**: `calendar/types.ts`
- **Purpose**: Core type definitions for the calendar module
- **Size**: 5 lines

## Types Defined

### TCalendarView
```typescript
type TCalendarView = "week" | "month" | "year" | "agenda";
```
Defines the available calendar view modes.
- `week`: Week view showing 7 days with hourly time slots
- `month`: Month grid view with events
- `year`: Year overview with 12 mini calendars
- `agenda`: List view of events for the selected period

### TEventColor
```typescript
type TEventColor = "blue" | "green" | "red" | "yellow" | "purple" | "orange" | "gray";
```
Color theme options for calendar events. Used for visual categorization.

### TBadgeVariant
```typescript
type TBadgeVariant = "dot" | "colored" | "mixed";
```
Badge display variants for event indicators in calendar cells.
- `dot`: Simple colored dot
- `colored`: Full colored badge
- `mixed`: Combination of styles

### TWorkingHours
```typescript
type TWorkingHours = { [key: number]: { from: number; to: number } };
```
Defines working hours for each day of the week (0 = Sunday, 6 = Saturday).
- `from`: Start hour (0-24)
- `to`: End hour (0-24)

### TVisibleHours
```typescript
type TVisibleHours = { from: number; to: number };
```
Defines the time range visible in week/day views.
- `from`: Starting hour (0-24)
- `to`: Ending hour (0-24)

## Usage Example
```typescript
import type { TCalendarView, TEventColor, TWorkingHours } from "@/calendar/types";

const view: TCalendarView = "month";
const eventColor: TEventColor = "blue";
const workingHours: TWorkingHours = {
  1: { from: 9, to: 17 },  // Monday
  2: { from: 9, to: 17 },  // Tuesday
  // ...
};
```

## Dependencies
- None (pure TypeScript types)
