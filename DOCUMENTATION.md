# SpendFlow Project Documentation

## Overview
SpendFlow is a personal expense tracking and budget management application built with Next.js, TypeScript, Prisma, and MongoDB.

## Quick Links
- [Project Structure](#project-structure)
- [Components](#components)
- [API & Actions](#api--actions)
- [Authentication](#authentication)
- [Database Schema](#database-schema)

## Project Structure

```
spendflow/
├── app/                          # Next.js App Router
│   ├── (pages)/                  # Route pages
│   │   ├── dashboard/
│   │   ├── expenses/
│   │   ├── add-expense/
│   │   ├── upcoming-bills/
│   │   ├── login/
│   │   ├── register/
│   │   ├── settings/
│   │   └── account/
│   ├── api/                      # API routes
│   │   ├── auth/[...nextauth]/   # NextAuth configuration
│   │   ├── dashboard/
│   │   ├── me/
│   │   └── orders/
│   ├── actions/                  # Server actions
│   │   ├── auth.ts
│   │   └── expenses.ts
│   └── components/               # React components
│       ├── Landing*.tsx         # Landing page sections
│       ├── Sidebar.tsx
│       ├── Header.tsx
│       ├── MetricsCard.tsx
│       ├── MonthlySpendingChart.tsx
│       ├── SpendingByCategoryChart.tsx
│       ├── RecentTransactions.tsx
│       ├── UpcomingBills.tsx
│       ├── LoginForm.tsx
│       └── RegisterForm.tsx
├── components/ui/                # Reusable UI components
├── lib/                          # Utilities
│   ├── auth.ts                   # Auth configuration
│   ├── prisma.ts                 # Prisma client
│   └── utils.ts
├── prisma/
│   └── schema.prisma             # Database schema
└── calendar/                     # Calendar module
    ├── components/
    ├── contexts/
    ├── hooks/
    └── *.ts                      # Types, interfaces, helpers
```

## Components

### Landing Page Components
| Component | Purpose | Location |
|-----------|---------|----------|
| LandingHeader | Navigation bar | [docs](.opencode/docs/components/landing/LandingHeader.md) |
| LandingHero | Hero section with chart preview | [docs](.opencode/docs/components/landing/LandingHero.md) |
| LandingFeatures | Features showcase | [docs](.opencode/docs/components/landing/LandingFeatures.md) |
| LandingControl | Control section | [docs](.opencode/docs/components/landing/LandingControl.md) |
| LandingProcess | How it works | [docs](.opencode/docs/components/landing/LandingProcess.md) |
| LandingIncome | Income vs expenses | [docs](.opencode/docs/components/landing/LandingIncome.md) |
| LandingWhyChooseUs | Value proposition | [docs](.opencode/docs/components/landing/LandingWhyChooseUs.md) |
| LandingFooter | Footer section | [docs](.opencode/docs/components/landing/LandingFooter.md) |

### Dashboard Components
| Component | Purpose | Location |
|-----------|---------|----------|
| Sidebar | Navigation sidebar | [docs](.opencode/docs/components/dashboard/Sidebar.md) |
| Header | Page header with notifications | [docs](.opencode/docs/components/dashboard/Header.md) |
| MetricsCard | Key metrics display | [docs](.opencode/docs/components/dashboard/MetricsCard.md) |
| MonthlySpendingChart | Spending trends chart | [docs](.opencode/docs/components/dashboard/MonthlySpendingChart.md) |
| SpendingByCategoryChart | Category breakdown | [docs](.opencode/docs/components/dashboard/SpendingByCategoryChart.md) |
| RecentTransactions | Transaction list | [docs](.opencode/docs/components/dashboard/RecentTransactions.md) |
| UpcomingBills | Bills calendar & list | [docs](.opencode/docs/components/dashboard/UpcomingBills.md) |

### Authentication Components
| Component | Purpose | Location |
|-----------|---------|----------|
| LoginForm | User login | [docs](.opencode/docs/auth/LoginForm.md) |
| LoginHeader | Login page header | [docs](.opencode/docs/auth/LoginHeader.md) |
| RegisterForm | User registration | [docs](.opencode/docs/auth/RegisterForm.md) |
| RegisterHeader | Register page header | [docs](.opencode/docs/auth/RegisterHeader.md) |
| Providers | Auth context | [docs](.opencode/docs/auth/Providers.md) |

## API & Actions

### API Routes
| Endpoint | Method | Purpose | Location |
|----------|--------|---------|----------|
| /api/dashboard | GET | Dashboard data | [docs](.opencode/docs/api/dashboard-api.md) |
| /api/me | GET/POST | User profile | [docs](.opencode/docs/api/me-route.md) |
| /api/orders | GET | Orders data | [docs](.opencode/docs/api/orders-route.md) |
| /api/auth/[...nextauth] | ALL | Auth handler | [docs](.opencode/docs/auth/route-nextauth.md) |

### Server Actions
| Action | Purpose | Location |
|--------|---------|----------|
| signUp | Register new user | [docs](.opencode/docs/api/auth-actions.md) |
| changePassword | Update password | [docs](.opencode/docs/api/auth-actions.md) |
| addExpense | Add new expense | [docs](.opencode/docs/api/expense-actions.md) |
| updateBudgetGoal | Set budget | [docs](.opencode/docs/api/expense-actions.md) |
| createCategory | Create category | [docs](.opencode/docs/api/expense-actions.md) |
| getUserCategories | List categories | [docs](.opencode/docs/api/expense-actions.md) |
| deleteCategory | Remove category | [docs](.opencode/docs/api/expense-actions.md) |
| getDashboardData | Full dashboard | [docs](.opencode/docs/api/expense-actions.md) |
| getExpenses | List expenses | [docs](.opencode/docs/api/expense-actions.md) |
| deleteExpense | Remove expense | [docs](.opencode/docs/api/expense-actions.md) |
| getCalendarEvents | Calendar data | [docs](.opencode/docs/api/expense-actions.md) |
| getWeeklyUpcomingBills | Weekly bills | [docs](.opencode/docs/api/expense-actions.md) |

## Authentication

SpendFlow uses NextAuth.js with credentials provider:

- **Strategy**: JWT-based sessions
- **Provider**: Email/password with bcrypt
- **Database**: Prisma/MongoDB
- **Session**: Stateless JWT tokens

See [Authentication Configuration](.opencode/docs/auth/auth-config.md) for details.

## Database Schema

### User Model
```prisma
model User {
  id String @id @default(auto()) @map("_id") @db.ObjectId
  email String @unique
  name String?
  password String
  budgetGoal Int?
  currency String @default("TND")
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  expenses Expense[]
  categories Category[]
}
```

### Category Model
```prisma
model Category {
  id String @id @default(auto()) @map("_id") @db.ObjectId
  name String
  isDefault Boolean @default(false)
  color String?
  userId String @db.ObjectId
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
  expenses Expense[]
}
```

### Expense Model
```prisma
model Expense {
  id String @id @default(auto()) @map("_id") @db.ObjectId
  amount Float
  description String?
  date DateTime
  categoryId String @db.ObjectId
  category Category @relation(fields: [categoryId], references: [id], onDelete: Cascade)
  paymentMethod String @default("CASH")
  userId String @db.ObjectId
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
  status String @default("completed")
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## Environment Variables

```env
DATABASE_URL="mongodb://..."
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

## Commands

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Production build
npm run build

# Run linting
npm run lint

# Start production server
npm run start
```

## Documentation Structure

All detailed documentation is located in `.opencode/docs/`:

- `api/` - API routes and server actions
- `auth/` - Authentication components and config
- `calendar/` - Calendar module
- `components/` - React components
  - `dashboard/` - Dashboard components
  - `landing/` - Landing page components
  - `ui/` - UI component library

---

**Last Updated**: March 30, 2026
**Total Documentation Files**: 54
