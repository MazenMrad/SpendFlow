# Input Component

## Overview
The Input component is a styled text input field with support for all standard HTML input types. It provides consistent styling, focus states, and accessibility features.

## File Location
`components/ui/input.tsx`

## Dependencies
- `@/lib/utils` - For utility functions (cn)

## Props Interface

```typescript
interface InputProps extends React.ComponentProps<"input"> {
  // Inherits all standard HTML input attributes
  type?: string;  // Input type (text, email, password, number, etc.)
}
```

## Usage Examples

### Basic Input
```tsx
import { Input } from "@/components/ui/input";

<Input placeholder="Enter your name" />
```

### With Type
```tsx
<Input type="email" placeholder="Email address" />
<Input type="password" placeholder="Password" />
<Input type="number" placeholder="Amount" />
<Input type="date" />
```

### With Form Integration
```tsx
import { useForm } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

<FormField
  control={form.control}
  name="email"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Email</FormLabel>
      <FormControl>
        <Input type="email" placeholder="Email" {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
```

### Disabled State
```tsx
<Input disabled placeholder="Disabled input" />
```

### With Custom Styling
```tsx
<Input className="max-w-xs" placeholder="Custom width" />
```

## Styling
- Full width (`w-full`)
- Consistent height (`h-9`)
- Border styling with focus ring
- Placeholder text color support
- File input styling support
- Disabled state styling
- Responsive text sizing (`md:text-sm`)

## Features
- Support for all HTML input types
- File upload styling
- Focus-visible ring
- Placeholder styling
- Disabled cursor state

## Exports
- `Input` - The main input component
