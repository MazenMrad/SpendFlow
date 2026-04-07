# Textarea Component

## Overview
The Textarea component is a styled multi-line text input field. It provides consistent styling, focus states, and accessibility features for longer text inputs.

## File Location
`components/ui/textarea.tsx`

## Dependencies
- `@/lib/utils` - For utility functions (cn)

## Props Interface

```typescript
interface TextareaProps extends React.ComponentProps<"textarea"> {
  // Inherits all standard HTML textarea attributes
}
```

## Usage Examples

### Basic Textarea
```tsx
import { Textarea } from "@/components/ui/textarea";

<Textarea placeholder="Enter your message" />
```

### With Form Integration
```tsx
import { useForm } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

<FormField
  control={form.control}
  name="description"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Description</FormLabel>
      <FormControl>
        <Textarea 
          placeholder="Enter expense description..."
          className="resize-none"
          {...field} 
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
```

### With Rows
```tsx
<Textarea rows={4} placeholder="Enter text" />
```

### Disabled State
```tsx
<Textarea disabled placeholder="Disabled textarea" />
```

### Custom Styling
```tsx
<Textarea 
  className="min-h-[120px] resize-y" 
  placeholder="Resizable textarea with min height" 
/>
```

## Styling
- Full width (`w-full`)
- Minimum height (`min-h-[60px]`)
- Border styling with focus ring
- Placeholder text color support
- Disabled cursor state
- Responsive text sizing (`md:text-sm`)

## Features
- Auto-resize support (via CSS or additional libraries)
- Placeholder styling
- Focus-visible ring
- Disabled state handling
- Custom height via rows or className

## Exports
- `Textarea` - The main textarea component
