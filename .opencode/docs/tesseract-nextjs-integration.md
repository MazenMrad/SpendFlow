# Research: Tesseract.js Integration with Next.js App Router

Date: 2026-04-07
Source: https://github.com/naptha/tesseract.js
Confidence: HIGH
Version: Latest (v5+/v6+)

## Context
Adding client-side OCR invoice scanning to SpendFlow expense tracker. Decision was made to use CLIENT-SIDE tesseract.js (not server-side) for:
- Privacy (financial documents stay on device)
- No server compute cost for CPU-intensive OCR
- No serverless timeout issues
- Only send extracted text to server for parsing/storage

## Key Findings

### 1. Next.js Build Fix (CRITICAL)
Tesseract.js fails to build in Next.js without webpack aliases. Two known issues:
- Issue #842: `Cannot find module '.next\worker-script\node\index.js'`
- Issue #868: `Cannot find module '/my-dev-folder/.next/server/app/worker-script/node/index.js'`

**Fix** - Add to `next.config.ts`:
```ts
webpack: (config) => {
  config.resolve.alias.canvas = false;
  config.resolve.alias.encoding = false;
  return config;
},
```
Source: https://javascript.plainenglish.io/implementing-ocr-with-tesseract-js-in-next-js-ac4143ff5218

### 2. Worker Lifecycle (Performance Best Practice)
From official docs (performance.md):
- **NEVER** create/destroy worker per image - massive wasted runtime
- Create worker ONCE, reuse with `worker.recognize(image)` for each image
- Call `worker.terminate()` only on component unmount
- For parallel processing, use schedulers with fixed worker pool (not needed for single invoice upload)

```ts
// CORRECT pattern:
const worker = await createWorker('eng', 1, { logger: m => console.log(m) });
const { data: { text } } = await worker.recognize(image1);
const { data: { text } } = await worker.recognize(image2);
await worker.terminate(); // Only at end
```

### 3. API Signature (v5+)
```ts
import { createWorker } from 'tesseract.js';

// createWorker(langs, oem, options)
const worker = await createWorker('eng', 1, {
  logger: m => console.log(m),  // Progress logging
  // Optional: workerPath, langPath, corePath, cacheMethod, etc.
});

// worker.recognize(image, options, output)
const { data: { text } } = await worker.recognize(imageFile);

// Cleanup
await worker.terminate();
```

### 4. Supported Image Formats
- PNG, JPG, WebP, BMP, GIF (non-animated)
- **PDF NOT supported** natively
- Input types: File object, Blob, base64 data URI, buffer

### 5. Client-Side Only
Tesseract.js runs in browser via WebAssembly. It should be used in `"use client"` components only.
- Server Components cannot use tesseract.js directly
- Server Actions can use it via Node.js worker threads but this defeats the privacy/cost benefits

### 6. Performance Tips
- Set up worker ahead of time (lazy load when user indicates OCR intent)
- Do NOT disable language data caching (default cacheMethod is optimal)
- Use latest version (v2 is 10x slower)
- English language data is ~2MB (cached after first download)

### 7. Invoice Data Extraction
Tesseract.js returns RAW text only. Structured data extraction requires custom parsing:
- Amount: regex for currency patterns (`[\d,]+\.\d{2}`, `[\d]+ TND`, etc.)
- Date: regex for date formats (DD/MM/YYYY, YYYY-MM-DD, etc.)
- Vendor: first prominent text line, excluding headers like "FACTURE", "INVOICE"

## Files to Create/Modify
1. `next.config.ts` - webpack aliases
2. `hooks/use-ocr-worker.ts` - React hook for worker management
3. `lib/ocr/types.ts` - Type definitions
4. `lib/ocr/invoice-parser.ts` - Regex-based data extraction
5. `app/components/InvoiceUpload.tsx` - UI component

## References
- Official README: https://github.com/naptha/tesseract.js
- API Docs: https://github.com/naptha/tesseract.js/blob/master/docs/api.md
- Performance Guide: https://github.com/naptha/tesseract.js/blob/master/docs/performance.md
- FAQ: https://github.com/naptha/tesseract.js/blob/master/docs/faq.md
- Image Formats: https://github.com/naptha/tesseract.js/blob/master/docs/image-format.md
- Next.js Tutorial: https://javascript.plainenglish.io/implementing-ocr-with-tesseract-js-in-next-js-ac4143ff5218
- Issue #842: https://github.com/naptha/tesseract.js/issues/842
- Issue #868: https://github.com/naptha/tesseract.js/issues/868
