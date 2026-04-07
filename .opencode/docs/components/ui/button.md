# Button Component

## Overview
The Button component is a versatile, reusable button element built on top of Radix UI's Slot primitive. It supports multiple variants, sizes, and can render as a child component for maximum flexibility.

## File Location
`components/ui/button.tsx`

## Dependencies
- `@radix-ui/react-slot` - For polymorphic component behavior
- `class-variance-authority` (CVA) - For variant management
- `lucide-react` - For icon support (via children)
- `@/lib/utils` - For utility functions (cn)

## Props Interface

```typescript
interface ButtonProps extends 
  React.ButtonHTMLAttributes<HTMLButtonElement>, 
  VariantProps<typeof buttonVariants> {
  asChild?: boolean;  // When true, renders children as the button element
}

// Variant Options
variant: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
size: "default" | "sm" | "lg" | "icon"
```

## Usage Examples

### Basic Button
```tsx
import { Button } from "@/components/ui/button";

<Button>Click me</Button>
```

### Variant Examples
```tsx
<Button variant="default">Default</Button>
<Button variant="destructive">Delete</Button>
<Button variant="outline">Outline</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link Style</Button>
```

### Size Examples
```tsx
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon"><Icon /></Button>
```

### As Child Pattern
```tsx
import Link from "next/link";

<Button asChild>
  <Link href="/dashboard">Go to Dashboard</Link>
</Button>
```

### With Icons
```tsx
<Button>
  <Plus className="mr-2 h-4 w-4" />
  Add Item
</Button>
```

## Styling
- Uses Tailwind CSS for styling
- Supports dark mode via CSS variables (primary-foreground, etc.)
- Fully responsive and accessible
- Includes focus-visible states and disabled styling

## Exports
- `Button` - The main button component
- `buttonVariants` - The CVA function for creating custom button styles
