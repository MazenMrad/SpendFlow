"use client";

import { useState, useCallback, useRef } from "react";
import { useOcrWorker } from "@/hooks/use-ocr-worker";
import { extractInvoiceData, normalizeDate, normalizeAmount } from "@/lib/ocr-utils";
import { uploadReceipt } from "@/app/actions/receipts";

export interface OcrExtractedData {
  amount: string;
  date: string;
  description: string;
}

interface InvoiceUploadProps {
  /** Called when OCR extraction completes with the parsed data */
  onExtracted: (data: OcrExtractedData) => void;
  /** Optional: called when a receipt is uploaded successfully */
  onReceiptUploaded?: (url: string) => void;
}

const ACCEPTED_TYPES = ["image/png", "image/jpeg", "image/jpg", "image/webp", "image/bmp", "image/gif"];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export default function InvoiceUpload({ onExtracted, onReceiptUploaded }: InvoiceUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { recognize, status: ocrStatus, progress, error: ocrError } = useOcrWorker();

  const validateFile = useCallback((file: File): string | null => {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      return "Invalid file type. Please upload PNG, JPG, WebP, BMP, or GIF images.";
    }
    if (file.size > MAX_FILE_SIZE) {
      return "File is too large. Maximum size is 10MB.";
    }
    return null;
  }, []);

  const processFile = useCallback(async (file: File) => {
    const validationError = validateFile(file);
    if (validationError) {
      setUploadError(validationError);
      return;
    }

    setUploadError(null);
    setSelectedFile(file);
    setIsUploading(true);

    // Create image preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    try {
      // Step 1: Upload receipt to server
      const uploadFormData = new FormData();
      uploadFormData.append("file", file);
      const uploadResult = await uploadReceipt(uploadFormData);

      if (uploadResult.error) {
        setUploadError(uploadResult.error);
        setIsUploading(false);
        return;
      }

      // Notify parent about uploaded receipt
      if (uploadResult.url && onReceiptUploaded) {
        onReceiptUploaded(uploadResult.url);
      }

      // Step 2: Run OCR on the image
      const rawText = await recognize(file);

      // Step 3: Extract structured data
      const extracted = extractInvoiceData(rawText);

      // Step 4: Normalize and pass to parent
      const normalizedData: OcrExtractedData = {
        amount: normalizeAmount(extracted.amount || "") || "",
        date: normalizeDate(extracted.date || "") || "",
        description: extracted.description || "",
      };

      onExtracted(normalizedData);
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Failed to process invoice image");
    } finally {
      setIsUploading(false);
    }
  }, [validateFile, recognize, onExtracted, onReceiptUploaded]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      processFile(file);
    }
  }, [processFile]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  }, [processFile]);

  const handleBrowseClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleRemoveImage = useCallback(() => {
    setPreview(null);
    setSelectedFile(null);
    setUploadError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, []);

  const isProcessing = ocrStatus === "processing" || isUploading;

  return (
    <div className="space-y-4">
      {/* Upload Zone */}
      {!preview ? (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={handleBrowseClick}
          className={`
            relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer
            transition-all duration-200
            ${isDragging
              ? "border-teal bg-teal/5"
              : "border-border-light hover:border-primary-blue/50 hover:bg-gray-50"
            }
            ${isProcessing ? "pointer-events-none opacity-70" : ""}
          `}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/jpg,image/webp,image/bmp,image/gif"
            onChange={handleFileChange}
            className="hidden"
          />

          {/* Upload Icon */}
          <div className="mx-auto w-12 h-12 mb-4 flex items-center justify-center rounded-full bg-teal/10">
            <svg className="w-6 h-6 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>

          <p className="text-text-primary font-gilroy-medium text-lg mb-1">
            {isDragging ? "Drop your invoice here" : "Drag & drop your invoice here"}
          </p>
          <p className="text-text-secondary font-gilroy text-sm">
            or <span className="text-primary-blue underline">browse files</span>
          </p>
          <p className="text-text-secondary font-gilroy text-xs mt-2">
            PNG, JPG, WebP, BMP, GIF (max 10MB)
          </p>
        </div>
      ) : (
        /* Image Preview */
        <div className="relative rounded-xl overflow-hidden border border-border-light">
          <img
            src={preview}
            alt="Invoice preview"
            className="w-full h-48 object-cover"
          />
          <button
            type="button"
            onClick={handleRemoveImage}
            disabled={isProcessing}
            className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors disabled:opacity-50"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Processing Overlay */}
          {isProcessing && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="bg-white rounded-xl p-6 text-center">
                <div className="w-10 h-10 border-4 border-teal border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                <p className="text-text-primary font-gilroy-medium text-sm">
                  {ocrStatus === "processing"
                    ? `Processing OCR... ${progress}%`
                    : "Uploading receipt..."}
                </p>
                {ocrStatus === "processing" && (
                  <div className="w-48 h-2 bg-gray-200 rounded-full mt-2 overflow-hidden">
                    <div
                      className="h-full bg-teal rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Error Message */}
      {uploadError && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 text-sm font-gilroy-medium">{uploadError}</p>
        </div>
      )}

      {/* OCR Error */}
      {ocrError && !uploadError && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 text-sm font-gilroy-medium">OCR Error: {ocrError}</p>
        </div>
      )}

      {/* Success indicator */}
      {preview && !isProcessing && !uploadError && !ocrError && (
        <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-700 text-sm font-gilroy-medium">
            Invoice processed! Form fields have been auto-filled. Review and edit before submitting.
          </p>
        </div>
      )}
    </div>
  );
}
