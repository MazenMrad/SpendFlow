/**
 * Invoice Data Extraction Utility
 * 
 * Parses raw OCR text from receipts/invoices into structured data.
 * Uses regex patterns to extract amount, date, and vendor information.
 * Supports multiple date formats and currency symbols.
 */

import type { ParsedInvoiceData } from './types';

/** Common invoice header words to exclude from vendor detection */
const EXCLUDED_VENDOR_WORDS = [
  'FACTURE', 'INVOICE', 'RECEIPT', 'RECU', 'TICKET', 'BORDEREAU',
  'DEVIS', 'PROFORMA', 'TOTAL', 'TTC', 'TVA', 'HT', 'SUBTOTAL',
  'AMOUNT', 'DATE', 'PAIEMENT', 'PAYMENT', 'MAGASIN', 'STORE',
  'CAISSE', 'CASHIER', 'CLIENT', 'CUSTOMER', 'ADRESSE', 'ADDRESS',
  'TEL', 'PHONE', 'EMAIL', 'WWW', 'SIRET', 'RCS', 'NIF', 'RC',
  'MF', 'CODE', 'REFERENCE', 'REF', 'N°', 'NO', 'PAGE',
];

/**
 * Extract a monetary amount from raw OCR text.
 * Handles formats like: 1,234.56 | 1234.56 | 1 234,56 | 1234,56
 * Also handles currency symbols: TND, USD, EUR, DT, $, €, etc.
 */
function extractAmount(text: string): number | null {
  // Match amounts with optional currency symbols and various decimal separators
  // Pattern: optional currency symbol, digits with optional thousands separator, decimal part
  const patterns = [
    // 1,234.56 or 1234.56 (dot as decimal separator)
    /(?:TND|USD|EUR|DT|€|\$)\s*([\d]{1,3}(?:[,][\d]{3})*(?:\.[\d]{2})|[\d]+\.[\d]{2})/gi,
    // 1 234,56 or 1234,56 (comma as decimal separator, space as thousands)
    /(?:TND|USD|EUR|DT|€|\$)\s*([\d]{1,3}(?:[\s][\d]{3})*(?:,[\d]{2})|[\d]+,[\d]{2})/gi,
    // Standalone amounts without currency symbol (dot decimal)
    /([\d]{1,3}(?:[,][\d]{3})*(?:\.[\d]{2})|[\d]+\.[\d]{2})/g,
    // Standalone amounts without currency symbol (comma decimal)
    /([\d]{1,3}(?:[\s][\d]{3})*(?:,[\d]{2})|[\d]+,[\d]{2})/g,
  ];

  const amounts: number[] = [];

  for (const pattern of patterns) {
    pattern.lastIndex = 0;
    let match;
    while ((match = pattern.exec(text)) !== null) {
      const raw = match[1].replace(/[\s,]/g, '.');
      const value = parseFloat(raw);
      if (!isNaN(value) && value > 0 && value < 1_000_000) {
        amounts.push(value);
      }
    }
  }

  // Return the largest amount found (likely the total)
  return amounts.length > 0 ? Math.max(...amounts) : null;
}

/**
 * Extract a date from raw OCR text.
 * Supports: DD/MM/YYYY, DD-MM-YYYY, YYYY-MM-DD, DD.MM.YYYY
 */
function extractDate(text: string): string | null {
  const patterns = [
    // DD/MM/YYYY or DD-MM-YYYY
    /(\d{2})[\/\-](\d{2})[\/\-](\d{4})/,
    // YYYY-MM-DD
    /(\d{4})[\/\-](\d{2})[\/\-](\d{2})/,
    // DD.MM.YYYY
    /(\d{2})\.(\d{2})\.(\d{4})/,
    // DD/MM/YY or DD-MM-YY
    /(\d{2})[\/\-](\d{2})[\/\-](\d{2})/,
  ];

  for (const pattern of patterns) {
    const match = pattern.exec(text);
    if (match) {
      let year: number, month: number, day: number;

      if (match[0].length >= 10 && match[1].length === 4) {
        // YYYY-MM-DD format
        year = parseInt(match[1], 10);
        month = parseInt(match[2], 10);
        day = parseInt(match[3], 10);
      } else if (match[3].length === 2) {
        // DD/MM/YY format
        year = 2000 + parseInt(match[3], 10);
        month = parseInt(match[2], 10);
        day = parseInt(match[1], 10);
      } else {
        // DD/MM/YYYY format
        day = parseInt(match[1], 10);
        month = parseInt(match[2], 10);
        year = parseInt(match[3], 10);
      }

      // Validate date components
      if (month >= 1 && month <= 12 && day >= 1 && day <= 31 && year >= 2000 && year <= 2100) {
        const date = new Date(year, month - 1, day);
        if (!isNaN(date.getTime())) {
          return date.toISOString().split('T')[0];
        }
      }
    }
  }

  return null;
}

/**
 * Extract a vendor/merchant name from raw OCR text.
 * Uses the first non-empty line that doesn't match common invoice headers.
 */
function extractVendor(text: string): string | null {
  const lines = text.split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 2);

  for (const line of lines) {
    const upper = line.toUpperCase();
    const isExcluded = EXCLUDED_VENDOR_WORDS.some(word => upper === word || upper.startsWith(word + ' '));

    if (!isExcluded && line.length > 2 && line.length < 60) {
      // Clean up the line - remove excessive special characters
      const cleaned = line.replace(/[=*#~]+/g, '').trim();
      if (cleaned.length > 2) {
        return cleaned;
      }
    }
  }

  return null;
}

/**
 * Parse raw OCR text into structured invoice data.
 * 
 * @param rawText - The raw text output from Tesseract.js OCR recognition
 * @returns ParsedInvoiceData with extracted amount, date, vendor, and original text
 */
export function extractInvoiceData(rawText: string): ParsedInvoiceData {
  return {
    amount: extractAmount(rawText),
    date: extractDate(rawText),
    vendor: extractVendor(rawText),
    rawText,
  };
}
