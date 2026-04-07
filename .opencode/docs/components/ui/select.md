# Select Component

## Overview
The Select component is a dropdown selection component built on Radix UI's Select primitive. It provides a styled trigger, content area, and various supporting elements like groups, labels, and separators.

## File Location
`components/ui/select.tsx`

## Dependencies
- `@radix-ui/react-select` - Select primitive
- `lucide-react` - Check, ChevronDown, ChevronUp icons
- `@/lib/utils` - For utility functions (cn)

## Component Structure

```
Select (Root)
├── SelectTrigger
│   └── SelectValue
├── SelectContent
│   ├── SelectScrollUpButton
│   ├── SelectViewport
│   │   └── SelectGroup / SelectItem / SelectLabel / SelectSeparator
│   └── SelectScrollDownButton
└── SelectPortal
```

## Props Interface

### Select
```typescript
interface SelectProps extends React.ComponentProps<typeof SelectPrimitive.Root> {}
```

### SelectTrigger
```typescript
interface SelectTriggerProps extends React.ComponentProps<typeof SelectPrimitive.Trigger> {
  size?: "sm" | "default";
}
```

### SelectContent
```typescript
interface SelectContentProps extends React.ComponentProps<typeof SelectPrimitive.Content> {
  position?: "item-aligned" | "popper";
  align?: "center" | "start" | "end";
}
```

### SelectItem
```typescript
interface SelectItemProps extends React.ComponentProps<typeof SelectPrimitive.Item> {}
```

## Usage Examples

### Basic Select
```tsx
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

<Select>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Select a fruit" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="apple">Apple</SelectItem>
    <SelectItem value="banana">Banana</SelectItem>
    <SelectItem value="orange">Orange</SelectItem>
  </SelectContent>
</Select>
```

### With Groups and Labels
```tsx
<Select>
  <SelectTrigger className="w-[280px]">
    <SelectValue placeholder="Select a timezone" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectLabel>North America</SelectLabel>
      <SelectItem value="est">Eastern Standard Time</SelectItem>
      <SelectItem value="cst">Central Standard Time</SelectItem>
      <SelectItem value="mst">Mountain Standard Time</SelectItem>
    </SelectGroup>
    <SelectSeparator />
    <SelectGroup>
      <SelectLabel>Europe</SelectLabel>
      <SelectItem value="gmt">Greenwich Mean Time</SelectItem>
      <SelectItem value="cet">Central European Time</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>
```

### Controlled Select
```tsx
const [value, setValue] = useState("");

<Select value={value} onValueChange={setValue}>
  <SelectTrigger>
    <SelectValue placeholder="Select option" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Option 1</SelectItem>
    <SelectItem value="option2">Option 2</SelectItem>
  </SelectContent>
</Select>
```

### Size Variants
```tsx
<SelectTrigger size="sm">Small</SelectTrigger>
<SelectTrigger size="default">Default</SelectTrigger>
```

## Styling
- Styled trigger with chevron icon
- Animated content with fade/zoom transitions
- Scroll buttons for long lists
- Checkmark indicator for selected item
- Separator support for grouping
- Dark mode support

## Exports
- `Select` - Root component
- `SelectGroup` - Grouping container
- `SelectValue` - Displayed value placeholder
- `SelectTrigger` - Dropdown trigger button
- `SelectContent` - Dropdown content container
- `SelectLabel` - Group label
- `SelectItem` - Individual selectable item
- `SelectSeparator` - Divider between items
- `SelectScrollUpButton` - Scroll to top button
- `SelectScrollDownButton` - Scroll to bottom button
