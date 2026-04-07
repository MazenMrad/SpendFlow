/**
 * OCR Invoice Data Extraction Utilities
 * Parses raw OCR text from tesseract.js into structured invoice fields.
 */

export interface ExtractedInvoiceData {
  amount: string | null;
  date: string | null;
  description: string | null;
  currency: string | null;
}

/**
 * Extract structured invoice data from raw OCR text.
 * Uses regex patterns to find amount, date, vendor name, and currency.
 */
export function extractInvoiceData(ocrText: string): ExtractedInvoiceData {
  const result: ExtractedInvoiceData = {
    amount: null,
    date: null,
    description: null,
    currency: null,
  };

  if (!ocrText || ocrText.trim().length === 0) {
    return result;
  }

  // --- Currency Detection ---
  const currencySymbols = ocrText.match(/[\$€£¥]/);
  const currencyCodes = ocrText.match(/\b(USD|EUR|GBP|TND|DT|Dinar|Dollars?|Euros?)\b/i);

  if (currencyCodes) {
    const code = currencyCodes[1];
    // Map common codes to symbols
    const codeMap: Record<string, string> = {
      USD: '$', EUR: '€', GBP: '£', TND: 'DT', DT: 'DT',
    };
    result.currency = codeMap[code] || code;
  } else if (currencySymbols) {
    result.currency = currencySymbols[1];
  }

  // --- Amount Extraction ---
  // Look for "total" followed by a number, or the largest number in the document
  const totalPatterns = [
    /total\s*(?:amount|due)?\s*:?\s*[\$€£¥]?\s*([\d][\d,.]*)/i,
    /amount\s*(?:due|total)?\s*:?\s*[\$€£¥]?\s*([\d][\d,.]*)/i,
    /grand\s*total\s*:?\s*[\$€£¥]?\s*([\d][\d,.]*)/i,
    /net\s*amount\s*:?\s*[\$€£¥]?\s*([\d][\d,.]*)/i,
    /sum\s*:?\s*[\$€£¥]?\s*([\d][\d,.]*)/i,
    /([\d][\d,.]*)\s*(?:USD|EUR|GBP|TND|DT)\b/i,
  ];

  for (const pattern of totalPatterns) {
    const match = ocrText.match(pattern);
    if (match) {
      result.amount = match[1].replace(/,/g, '');
      break;
    }
  }

  // Fallback: find the largest number that looks like a monetary amount
  if (!result.amount) {
    const allNumbers = ocrText.match(/[\$€£¥]?\s*(\d{1,6}[,.]?\d{0,2})/g);
    if (allNumbers) {
      const parsed = allNumbers
        .map(n => parseFloat(n.replace(/[\$€£¥,\s]/g, '')))
        .filter(n => !isNaN(n) && n > 0 && n < 1000000);

      if (parsed.length > 0) {
        // Take the largest number as the likely total
        result.amount = Math.max(...parsed).toFixed(2);
      }
    }
  }

  // --- Date Extraction ---
  const datePatterns = [
    // DD/MM/YYYY or DD-MM-YYYY
    /(?:date|dated?|invoice\s*date|bill\s*date)\s*:?\s*(\d{1,2}[\/\-.]\d{1,2}[\/\-.]\d{2,4})/i,
    // YYYY-MM-DD
    /(?:date|dated?)\s*:?\s*(\d{4}[\/\-.]\d{1,2}[\/\-.]\d{1,2})/i,
    // DD Mon YYYY (e.g., "15 Jan 2024")
    /(\d{1,2}\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+\d{4})/i,
    // Mon DD, YYYY (e.g., "Jan 15, 2024")
    /((?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+\d{1,2},?\s+\d{4})/i,
    // DD/MM/YY
    /(\d{1,2}[\/\-.]\d{1,2}[\/\-.]\d{2})/i,
  ];

  for (const pattern of datePatterns) {
    const match = ocrText.match(pattern);
    if (match) {
      result.date = match[1].trim();
      break;
    }
  }

  // --- Vendor / Description Extraction ---
  // Try to find vendor name from common patterns
  const vendorPatterns = [
    /(?:from|supplier|vendor|merchant|billed\s*by|seller)\s*:?\s*([A-Z][A-Za-z\s&.,'-]{2,50}?)(?:\n|$)/i,
    /(?:company|store|shop)\s*:?\s*([A-Z][A-Za-z\s&.,'-]{2,50}?)(?:\n|$)/i,
  ];

  for (const pattern of vendorPatterns) {
    const match = ocrText.match(pattern);
    if (match) {
      result.description = match[1].trim();
      break;
    }
  }

  // Fallback: use the first meaningful line as description
  if (!result.description) {
    const lines = ocrText.split('\n').map(l => l.trim()).filter(l => l.length > 2);
    if (lines.length > 0) {
      // Skip lines that look like headers or numbers
      const firstMeaningful = lines.find(line =>
        !/^\d/.test(line) &&
        !/^(invoice|bill|receipt|total|date|amount|tax|subtotal)/i.test(line) &&
        line.length > 2 &&
        line.length < 60
      );
      if (firstMeaningful) {
        result.description = firstMeaningful;
      }
    }
  }

  return result;
}

/**
 * Normalize a date string to ISO format (YYYY-MM-DD) for form input.
 * Handles common date formats found in invoices.
 */
export function normalizeDate(dateStr: string): string | null {
  if (!dateStr) return null;

  try {
    const parsed = new Date(dateStr);
    if (isNaN(parsed.getTime())) return null;

    return parsed.toISOString().split('T')[0];
  } catch {
    return null;
  }
}

/**
 * Normalize an amount string to a clean number string.
 * Removes currency symbols, commas, and extra whitespace.
 */
export function normalizeAmount(amountStr: string): string | null {
  if (!amountStr) return null;

  const cleaned = amountStr.replace(/[\$€£¥,\s]/g, '');
  const num = parseFloat(cleaned);

  if (isNaN(num) || num <= 0) return null;

  return num.toFixed(2);
}
