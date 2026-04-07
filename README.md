# SpendFlow - Personal Expense Tracker

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js" alt="Next.js">
  <img src="https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/Prisma-MongoDB-green?style=for-the-badge&logo=mongodb" alt="Prisma/MongoDB">
  <img src="https://img.shields.io/badge/Tailwind CSS-v4-38bdf8?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS">
</p>

SpendFlow is a personal expense tracking and budget management application built with Next.js, TypeScript, Prisma, and MongoDB. It helps you track expenses, visualize spending patterns, and manage your budget effectively.

## 🚀 Features

### Core Features
- **Expense Tracking** - Add, view, and delete expenses with categories
- **Dashboard Analytics** - Visual charts showing monthly/weekly spending trends
- **Budget Management** - Set monthly budget goals and track remaining budget
- **Category Organization** - Organize expenses by custom categories
- **Invoice OCR** - Upload invoice images to auto-extract amount, date, and description using Tesseract.js
- **Calendar View** - See upcoming bills and expenses on a calendar
- **Responsive Design** - Works on desktop and mobile devices

### Authentication
- User registration and login
- Protected routes with NextAuth.js
- JWT-based session management

### Technology Stack
- **Frontend**: Next.js 16 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS v4 with custom theme
- **Database**: MongoDB via Prisma ORM
- **Authentication**: NextAuth.js with credentials provider
- **Charts**: Recharts
- **Calendar**: FullCalendar
- **OCR**: Tesseract.js for invoice text extraction

## 📁 Project Structure

```
spendflow/
├── app/                      # Next.js App Router
│   ├── (pages)/             # Route pages
│   │   ├── dashboard/       # Dashboard with charts
│   │   ├── expenses/       # Expense list
│   │   ├── add-expense/    # Add expense + OCR
│   │   ├── upcoming-bills/ # Calendar view
│   │   ├── login/          # Login page
│   │   ├── register/       # Registration page
│   │   ├── settings/       # User settings
│   │   └── account/        # Account management
│   ├── api/                # API routes
│   │   └── auth/[...nextauth]/  # NextAuth handler
│   ├── actions/            # Server actions
│   │   ├── auth.ts         # Auth actions
│   │   ├── expenses.ts     # Expense CRUD + OCR upload
│   │   └── receipts.ts     # Receipt upload
│   └── components/          # Page components
├── components/ui/           # Reusable UI components (shadcn/ui style)
├── hooks/                   # Custom React hooks
│   └── use-ocr-worker.ts   # Tesseract.js worker hook
├── lib/                     # Utilities
│   ├── auth.ts             # NextAuth config
│   ├── prisma.ts           # Prisma client
│   ├── utils.ts            # Helper functions
│   └── ocr-utils.ts        # Invoice OCR parser
├── prisma/
│   └── schema.prisma       # Database schema
└── public/uploads/         # Uploaded receipt images
    └── receipts/
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/spendflow.git
cd spendflow
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# Create .env file
DATABASE_URL="mongodb://localhost:27017/spendflow"
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"
```

4. Initialize the database:
```bash
npx prisma db push
```

5. Start the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000)

## 📖 Usage

### Adding an Expense
1. Navigate to **Add Expense** from the sidebar
2. Fill in the form (date, amount, category, type, description)
3. Optionally upload an invoice image for OCR auto-fill
4. Click **Add** to save

### Using OCR Invoice Upload
1. On the Add Expense page, drag or browse for an invoice image
2. The system will extract text using Tesseract.js
3. Amount, date, and description are auto-filled
4. Review and edit the extracted data
5. Submit the expense

### Viewing Analytics
- The **Dashboard** shows spending trends and category breakdown
- **Monthly Spending Chart** - Track expenses over time
- **Spending by Category** - Pie chart of expense distribution
- **Recent Transactions** - Latest expense entries
- **Upcoming Bills** - Calendar view of future expenses

## 🔧 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npx prisma studio` | Open Prisma database GUI |

## 🔗 n8n Integration (Email to Expense)

SpendFlow can automatically create expenses from emails using n8n and Gemini AI:

### How It Works

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Email    │───▶│    n8n      │───▶│   Gemini    │───▶│  SpendFlow  │
│  (Gmail)   │    │  Workflow   │    │    AI       │    │     API    │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
```

1. **n8n** monitors your email inbox for invoice/confirmation emails
2. **Gemini AI** parses the email content to extract expense data
3. **JSON** is sent to SpendFlow API to create the expense automatically

### n8n Workflow Setup

Create an n8n workflow with:

1. **Email Read Node** (Gmail)
   - Watch for new emails with invoice keywords

2. **HTTP Request Node** (Gemini)
   - Send email content to Gemini for parsing
   - Example prompt: "Extract invoice data: amount, date, vendor, description"

3. **HTTP Request Node** (SpendFlow)
   - Send POST request to: `https://your-spendflow-url.com/api/expenses/from-email`
   - Headers: `Content-Type: application/json`
   - Body (JSON from Gemini):
   ```json
   {
     "amount": 150.00,
     "date": "2026-04-07",
     "vendor": "Amazon",
     "description": "Order #12345",
     "category": "Shopping",
     "paymentMethod": "Card"
   }
   ```

### API Endpoint

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/expenses/from-email` | Create expense from n8n/Gemini |

**Request Body:**
```json
{
  "amount": number,
  "date": "YYYY-MM-DD",
  "vendor": "string",
  "description": "string",
  "category": "string",
  "paymentMethod": "Cash | Card | Check"
}
```

**Response:**
```json
{
  "success": true,
  "expenseId": "..."
}
```

### Adding the API Route

To enable this feature, create `app/api/expenses/from-email/route.ts`:

```typescript
// See implementation in app/api/expenses/from-email/
```

## 📄 Environment Variables

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | MongoDB connection string |
| `NEXTAUTH_SECRET` | Secret for NextAuth.js |
| `NEXTAUTH_URL` | Application URL |

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License.

---

<p align="center">Built with ❤️ using Next.js, TypeScript, and MongoDB</p>
