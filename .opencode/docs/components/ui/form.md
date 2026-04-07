# Form Component

## Overview
The Form component provides a comprehensive form management system built on react-hook-form with Radix UI label integration. It includes form field context, error handling, and accessibility features.

## File Location
`components/ui/form.tsx`

## Dependencies
- `@radix-ui/react-label` - Label primitive
- `@radix-ui/react-slot` - Slot primitive for composition
- `react-hook-form` - Form state management
- `@/lib/utils` - For utility functions (cn)
- `@/components/ui/label` - Label component

## Component Structure

```
Form (FormProvider)
└── FormField
    └── FormItem
        ├── FormLabel
        ├── FormControl
        ├── FormDescription
        └── FormMessage
```

## Props Interface

### FormField
```typescript
interface FormFieldProps<TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>> 
  extends ControllerProps<TFieldValues, TName> {}
```

### FormItem
```typescript
interface FormItemProps extends React.HTMLAttributes<HTMLDivElement> {}
```

### FormLabel
```typescript
interface FormLabelProps extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> {}
```

### FormControl
```typescript
interface FormControlProps extends React.ComponentPropsWithoutRef<typeof Slot> {}
```

### FormDescription / FormMessage
```typescript
interface FormTextProps extends React.HTMLAttributes<HTMLParagraphElement> {}
```

## Usage Examples

### Basic Form Setup
```tsx
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const form = useForm({
  defaultValues: {
    username: "",
  },
});

<Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
    <FormField
      control={form.control}
      name="username"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Username</FormLabel>
          <FormControl>
            <Input placeholder="shadcn" {...field} />
          </FormControl>
          <FormDescription>
            This is your public display name.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
    <Button type="submit">Submit</Button>
  </form>
</Form>
```

### Custom Hook: useFormField
```tsx
const { error, formItemId, formDescriptionId, formMessageId } = useFormField();
```

Returns:
- `id` - Generated unique ID
- `name` - Field name
- `formItemId` - ID for the form item
- `formDescriptionId` - ID for the description element
- `formMessageId` - ID for the error message element
- `invalid`, `isDirty`, `isTouched`, `isValidating`, `error` - Field state

## Accessibility
- Automatic ID generation for ARIA attributes
- Error state styling (text-destructive color)
- ARIA describedby linking between input and description/error
- aria-invalid attribute on error

## Exports
- `Form` - FormProvider wrapper
- `FormField` - Field wrapper with context
- `FormItem` - Item container with spacing
- `FormLabel` - Label with error styling
- `FormControl` - Control element wrapper (Slot)
- `FormDescription` - Help text
- `FormMessage` - Error message display
- `useFormField` - Hook to access field context
