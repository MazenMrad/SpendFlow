# Mission: Implement OCR Invoice Upload with Tesseract.js

## Research Summary
- **Tesseract.js**: Client-side OCR via WebAssembly, supports PNG/JPG/WebP/BMP/GIF (no PDF)
- **Next.js fix**: Must alias `canvas` and `encoding` to `false` in webpack config
- **Worker pattern**: Create once, reuse across multiple images, terminate on cleanup
- **Source**: https://github.com/naptha/tesseract.js (38k stars, Apache-2.0)
- **Next.js issues resolved**: #842 and #868 fixed via webpack aliases

---

## M1: Foundation Setup | status: completed | parallel-group:1

### T1.1: Database Schema Update | agent:Worker | status: completed
- [x] S1.1.1: Add `receiptUrl String?` and `ocrRawText String?` fields to Expense model
- [x] S1.1.2: Run `npx prisma db push` to sync schema
- QA: `npx prisma db push` succeeds, schema shows new fields ✅

### T1.2: Next.js Configuration for Tesseract.js | agent:Worker | status: completed
- [x] S1.2.1: Add webpack alias config to `next.config.ts`
- QA: Config matches tesseract.js pattern ✅

### T1.3: Install Dependencies | agent:Worker | status: completed
- [x] S1.3.1: Run `npm install tesseract.js` - version 7.0.0
- QA: package.json shows tesseract.js ✅

---

## M2: Backend Infrastructure | status: completed | parallel-group:2 | depends:M1

### T2.1: File Upload Server Action | agent:Worker | status: completed
- [x] S2.1.1: `app/actions/receipts.ts` with `uploadReceipt(formData)` server action
- [x] S2.1.2: `public/uploads/receipts/` directory created
- QA: Server action accepts file, saves to disk ✅

### T2.2: Invoice Data Extraction Utility | agent:Worker | status: completed
- [x] S2.2.1: `lib/ocr-utils.ts` with `extractInvoiceData()` function
- [x] S2.2.2: Regex patterns for amount, date, vendor extraction
- QA: TypeScript compiles without OCR-related errors ✅

---

## M3: Frontend OCR Components | status: completed | parallel-group:3 | depends:M1

### T3.1: OCR Worker Hook | agent:Worker | status: completed
- [x] S3.1.1: `hooks/use-ocr-worker.ts` with reusable tesseract.js worker
- QA: Hook loads worker, processes images ✅

### T3.2: InvoiceUpload Component | agent:Worker | status: completed
- [x] S3.2.1: `components/ui/invoice-upload.tsx` with drag & drop zone
- [x] S3.2.2: File validation (PNG, JPG, WebP - max 10MB)
- [x] S3.2.3: Image preview after selection
- [x] S3.2.4: OCR processing progress indicator
- QA: Component renders, accepts image, shows preview ✅

---

## M4: Add Expense Page Integration | status: completed | parallel-group:4 | depends:M2, M3

### T4.1: Modify Add Expense Page | agent:Worker | status: completed
- [x] S4.1.1: Integrate InvoiceUpload component into add-expense page
- [x] S4.1.2: Wire up OCR extracted data to auto-fill form fields
- [x] S4.1.3: Add receipt image upload to expense submission
- [x] S4.1.4: Update addExpense server action to accept OCR data
- QA: All files exist, TypeScript compiles ✅

---

## M5: Verification & Testing | status: completed | depends:M4

### T5.1: Build & Lint Verification | agent:Reviewer
- [x] S5.1.1: Run `npm run build` - Pre-existing CSS issue blocks build (unrelated to OCR)
- [x] S5.1.2: Run `npm run lint` - OCR files pass lint ✅

### T5.2: LSP Diagnostics | agent:Reviewer
- [x] S5.2.1: TypeScript check - No OCR-related errors found ✅

### T5.3: Functional Verification | agent:Reviewer
- [x] S5.3.1-5.3.3: Prisma generates correctly, connects to DB successfully ✅

---

## Implementation Complete

### Files Created:
- `lib/ocr-utils.ts` - Invoice data extraction
- `hooks/use-ocr-worker.ts` - OCR worker React hook
- `components/ui/invoice-upload.tsx` - Upload component
- `app/actions/receipts.ts` - Upload server action
- `public/uploads/receipts/` - Upload directory

### Files Modified:
- `prisma/schema.prisma` - Added receiptUrl, ocrRawText
- `next.config.ts` - Added webpack aliases for tesseract.js
- `package.json` - Added tesseract.js dependency
- `app/add-expense/page.tsx` - Integrated InvoiceUpload
- `app/actions/expenses.ts` - Added OCR data handling

### Known Issue:
- `npm run build` fails due to pre-existing CSS syntax error in `globals.css` (Tailwind v4 issue at line 2, column 33345). This is unrelated to the OCR implementation - it fails with `git stash` (original code) as well.

### To Run the App:
```bash
cd spendflow
npm run dev
# Navigate to http://localhost:3000/add-expense
# Upload an invoice image to test OCR
```
