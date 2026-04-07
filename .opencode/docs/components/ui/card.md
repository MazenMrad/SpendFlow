# Card Component

## Overview
The Card component is a flexible container that provides a consistent visual wrapper for content. It includes sub-components for header, title, description, content, footer, and actions.

## File Location
`components/ui/card.tsx`

## Dependencies
- `@/lib/utils` - For utility functions (cn)

## Component Structure

```
Card
├── CardHeader
│   ├── CardTitle
│   ├── CardDescription
│   └── CardAction
├── CardContent
└── CardFooter
```

## Props Interface

All Card sub-components extend their respective HTML element props:

```typescript
// Card, CardHeader, CardFooter, CardContent, CardTitle, CardDescription, CardAction
interface Props extends React.ComponentProps<"div"> {}
```

## Usage Examples

### Basic Card
```tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Card content goes here.</p>
  </CardContent>
</Card>
```

### Complete Card with All Elements
```tsx
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardAction,
  CardContent, 
  CardFooter 
} from "@/components/ui/card";

<Card>
  <CardHeader>
    <CardTitle>Expense Summary</CardTitle>
    <CardDescription>Your spending for this month</CardDescription>
    <CardAction>
      <Button>Edit</Button>
    </CardAction>
  </CardHeader>
  <CardContent>
    <p>Total: $1,234.56</p>
  </CardContent>
  <CardFooter>
    <Button variant="outline">View Details</Button>
  </CardFooter>
</Card>
```

## Styling
- Rounded corners (`rounded-xl`)
- Border styling (`border`)
- Shadow support (`shadow-sm`)
- Consistent padding and spacing
- Container query support for responsive headers (`@container/card-header`)

## Exports
- `Card` - Main container
- `CardHeader` - Header section with grid layout
- `CardTitle` - Title text styling
- `CardDescription` - Muted description text
- `CardAction` - Action button positioning
- `CardContent` - Main content area
- `CardFooter` - Footer section
