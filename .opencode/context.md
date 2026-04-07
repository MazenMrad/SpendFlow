# SpendFlow Project Context

## Project Overview
SpendFlow is a personal expense tracking and budget management application built with Next.js, TypeScript, and Prisma.

## Environment
- **Framework**: Next.js 16.1.1 (App Router)
- **Language**: TypeScript 5
- **Runtime**: Node.js
- **Styling**: Tailwind CSS v4
- **Database**: MongoDB via Prisma ORM
- **Authentication**: NextAuth.js v4
- **State Management**: SWR for data fetching

## Project Structure

### Core Directories
```
app/                    # Next.js App Router pages and components
  ├── page.tsx          # Landing page
  ├── layout.tsx        # Root layout
  ├── globals.css       # Global styles
  ├── dashboard/        # Dashboard page
  ├── expenses/         # Expenses list page
  ├── add-expense/      # Add expense page
  ├── upcoming-bills/   # Calendar view for bills
  ├── login/            # Login page
  ├── register/         # Registration page
  ├── settings/         # User settings page
  ├── account/          # Account management
  ├── api/              # API routes
  │   ├── auth/[...nextauth]/  # NextAuth configuration
  │   ├── dashboard/    # Dashboard data API
  │   ├── me/           # User profile API
  │   └── orders/       # Orders API
  ├── components/       # Page-specific components
  │   ├── Landing*.tsx  # Landing page sections
  │   ├── Sidebar.tsx
  │   ├── Header.tsx
  │   ├── MetricsCard.tsx
  │   ├── MonthlySpendingChart.tsx
  │   ├── SpendingByCategoryChart.tsx
  │   ├── RecentTransactions.tsx
  │   ├── UpcomingBills.tsx
  │   ├── LoginForm.tsx
  │   └── RegisterForm.tsx
  └── actions/          # Server actions
      ├── auth.ts
      └── expenses.ts

components/ui/          # Reusable UI components (shadcn/ui style)
  ├── button.tsx
  ├── card.tsx
  ├── dialog.tsx
  ├── form.tsx
  ├── input.tsx
  ├── select.tsx
  ├── chart.tsx
  └── ...

lib/                    # Shared utilities
  ├── auth.ts           # Authentication helpers
  ├── prisma.ts         # Prisma client
  └── utils.ts          # Utility functions

prisma/
  └── schema.prisma     # Database schema

calendar/               # Calendar domain modules
  ├── components/       # Calendar view components
  ├── contexts/         # Calendar state contexts
  ├── hooks/            # Calendar hooks
  ├── types.ts          # Calendar types
  ├── interfaces.ts     # Calendar interfaces
  ├── schemas.ts        # Calendar validation schemas
  ├── helpers.ts        # Calendar utilities
  ├── mocks.ts          # Calendar test data
  └── requests.ts       # Calendar API requests

hooks/                  # Global React hooks
public/                 # Static assets
```

## Database Schema

### Models
1. **User**
   - id, email, name, password
   - budgetGoal, currency (default: TND)
   - Relationships: expenses[], categories[]

2. **Category**
   - id, name, isDefault, color
   - userId (relation to User)
   - Relationships: expenses[]

3. **Expense**
   - id, amount, description, date
   - categoryId, userId
   - paymentMethod (default: CASH)
   - status (default: completed)
   - createdAt, updatedAt

## Key Features

### Landing Page
- Hero section with value proposition
- Features showcase
- Process explanation
- Income vs Expenses visualization
- Why Choose Us section
- Footer with CTA

### Dashboard
- Monthly spending chart (trend analysis)
- Spending by category (pie/doughnut chart)
- Key metrics cards (monthly spending, remaining budget, top category)
- Upcoming bills list
- Recent transactions table

### Expense Management
- Add new expenses with category, amount, date, payment method
- View expense history
- Category-based organization

### Authentication
- NextAuth.js with credentials provider
- Registration and login flows
- Protected routes

### Calendar Integration
- FullCalendar integration for bill visualization
- Upcoming bills tracking

## Build Commands
```bash
npm install          # Install dependencies
npm run dev          # Development server
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint
```

## Dependencies Highlights
- **UI**: @radix-ui/* components, lucide-react icons
- **Charts**: recharts
- **Calendar**: @fullcalendar/*
- **Forms**: react-hook-form, @hookform/resolvers, zod
- **Date**: date-fns, react-day-picker
- **Drag & Drop**: react-dnd

## Configuration Files
- next.config.ts - Next.js configuration
- tsconfig.json - TypeScript configuration
- tailwind.config.ts - Tailwind CSS configuration
- components.json - shadcn/ui components configuration
- eslint.config.mjs - ESLint configuration
- postcss.config.mjs - PostCSS configuration
