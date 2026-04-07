# Dialog Component

## Overview
The Dialog component provides a modal dialog window built on Radix UI's Dialog primitive. It includes overlay, content, header, footer, title, and description sub-components with smooth animations.

## File Location
`components/ui/dialog.tsx`

## Dependencies
- `@radix-ui/react-dialog` - Dialog primitive
- `lucide-react` - X icon for close button
- `@/lib/utils` - For utility functions (cn)

## Component Structure

```
Dialog
├── DialogTrigger
├── DialogPortal
├── DialogOverlay
├── DialogContent
│   ├── DialogClose (built-in X button)
│   ├── DialogHeader
│   ├── DialogTitle
│   ├── DialogDescription
│   └── DialogFooter
└── DialogClose
```

## Props Interface

### Dialog (Root)
Extends `@radix-ui/react-dialog` Dialog.Root props

### DialogContent
```typescript
interface DialogContentProps extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  className?: string;
}
```

### DialogHeader / DialogFooter
```typescript
interface DialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}
interface DialogFooterProps extends React.HTMLAttributes<HTMLDivElement> {}
```

### DialogTitle
```typescript
interface DialogTitleProps extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title> {}
```

### DialogDescription
```typescript
interface DialogDescriptionProps extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description> {}
```

## Usage Examples

### Basic Dialog
```tsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

<Dialog>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you sure?</DialogTitle>
      <DialogDescription>
        This action cannot be undone.
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>
```

### Dialog with Footer Actions
```tsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

<Dialog>
  <DialogTrigger asChild>
    <Button variant="outline">Edit Profile</Button>
  </DialogTrigger>
  <DialogContent className="sm:max-w-[425px]">
    <DialogHeader>
      <DialogTitle>Edit profile</DialogTitle>
      <DialogDescription>
        Make changes to your profile here.
      </DialogDescription>
    </DialogHeader>
    <div className="grid gap-4 py-4">
      {/* Form fields */}
    </div>
    <DialogFooter>
      <Button type="submit">Save changes</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

### Controlled Dialog
```tsx
const [open, setOpen] = useState(false);

<Dialog open={open} onOpenChange={setOpen}>
  <DialogTrigger asChild>
    <Button>Open</Button>
  </DialogTrigger>
  <DialogContent>
    {/* Dialog content */}
  </DialogContent>
</Dialog>
```

## Styling
- Fixed position overlay with backdrop blur
- Centered content with max-width constraint
- Smooth animations (fade, zoom, slide)
- Built-in close button with X icon
- Responsive layout (stacked on mobile, row on desktop)

## Exports
- `Dialog` - Root component
- `DialogPortal` - Portal wrapper
- `DialogOverlay` - Backdrop overlay
- `DialogTrigger` - Trigger element
- `DialogClose` - Close button
- `DialogContent` - Main dialog container
- `DialogHeader` - Header section
- `DialogFooter` - Footer section
- `DialogTitle` - Title element
- `DialogDescription` - Description text
