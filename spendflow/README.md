# SpendFlow 💸

Personal expense tracking and financial management application built with Next.js.

## Features

- 📊 **Dashboard** - View spending metrics and recent transactions
- 💰 **Expense Tracking** - Add and manage your expenses
- 📈 **Analytics** - Monthly spending charts and category breakdown
- 📅 **Upcoming Bills** - Calendar view for bill tracking
- 🔒 **Authentication** - Secure user accounts with NextAuth.js
- 🧾 **Receipt Upload** - Upload and parse receipts with OCR

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Auth**: NextAuth.js
- **Styling**: Tailwind CSS + shadcn/ui components
- **Charts**: Recharts
- **OCR**: Tesseract.js

## Project Structure

```
spendflow/
├── app/                    # Next.js App Router pages
│   ├── account/            # Account settings page
│   ├── actions/            # Server actions (auth, expenses, receipts)
│   ├── add-expense/        # Add expense page
│   ├── api/                # API routes
│   ├── components/         # App-specific components
│   ├── dashboard/          # Dashboard page
│   ├── expenses/           # Expenses list page
│   ├── icons/              # Custom icons and graphics
│   ├── login/              # Login page
│   ├── register/           # Registration page
│   ├── settings/           # Settings page
│   └── upcoming-bills/     # Bill tracking calendar
├── calendar/               # Calendar components
├── components/             # Shared UI components (shadcn/ui)
├── hooks/                  # Custom React hooks
├── lib/                    # Utility libraries
│   └── ocr/                # OCR utilities
├── prisma/                 # Database schema
└── public/                 # Static assets
```

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   # Create .env file
   DATABASE_URL="postgresql://..."
   NEXTAUTH_SECRET="your-secret-here"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. Set up the database:
   ```bash
   npx prisma db push
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000)

## Environment Variables

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string |
| `NEXTAUTH_SECRET` | Secret for NextAuth.js |
| `NEXTAUTH_URL` | Production URL for NextAuth |

## License

MIT
