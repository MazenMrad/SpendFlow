/**
 * OCR and Invoice Data Type Definitions
 * 
 * Defines interfaces for OCR progress tracking and parsed invoice data extraction.
 * Used by the OCR worker hook, invoice parser, and upload components.
 */

/** Structured data extracted from an invoice/receipt via OCR */
export interface ParsedInvoiceData {
  amount: number | null;
  date: string | null;
  vendor: string | null;
  rawText: string;
}

/** Progress state reported during OCR recognition */
export interface OCRProgress {
  status: 'idle' | 'loading' | 'recognizing' | 'done' | 'error';
  progress: number;
  message: string;
}

/** Result of an OCR recognition operation */
export interface OCRResult {
  success: boolean;
  text?: string;
  error?: string;
}
