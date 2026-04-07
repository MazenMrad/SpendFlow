"use client";

import { useState, useCallback, useRef } from "react";
import { useOcrWorker } from "@/hooks/use-ocr-worker";
import { extractInvoiceData } from "@/lib/ocr/invoice-parser";
import type { ParsedInvoiceData, OCRProgress } from "@/lib/ocr/types";
import { Upload, FileImage, Loader2, CheckCircle, X } from "lucide-react";

interface InvoiceUploadProps {
  onExtract: (data: ParsedInvoiceData) => void;
}

const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export default function InvoiceUpload({ onExtract }: InvoiceUploadProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [extractedData, setExtractedData] = useState<ParsedInvoiceData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { recognize, status, progress, error: ocrError } = useOcrWorker();

  const validateFile = (file: File): string | null => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      return "Invalid file type. Only PNG, JPG, and WebP images are allowed.";
    }
    if (file.size > MAX_FILE_SIZE) {
      return "File too large. Maximum size is 10MB.";
    }
    return null;
  };

  const processFile = async (file: File) => {
    const error = validateFile(file);
    if (error) {
      setValidationError(error);
      return;
    }

    setValidationError(null);
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setExtractedData(null);
    setIsEditing(false);

    try {
      const rawText = await recognize(file);
      const parsed = extractInvoiceData(rawText);
      setExtractedData(parsed);
      onExtract(parsed);
    } catch (err) {
      console.error("OCR processing error:", err);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  }, [recognize]);

  const handleEditField = (field: keyof ParsedInvoiceData, value: string) => {
    if (!extractedData) return;
    const updated = { ...extractedData, [field]: value || null };
    setExtractedData(updated);
    onExtract(updated);
  };

  const handleRemove = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    setSelectedFile(null);
    setExtractedData(null);
    setValidationError(null);
    setIsEditing(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const getStatusMessage = (): string => {
    switch (status) {
      case "loading":
        return "Loading OCR engine...";
      case "processing":
        return `Processing image... ${progress}%`;
      case "error":
        return ocrError || "OCR processing failed";
      case "ready":
        return extractedData ? "OCR complete - review extracted data below" : "Ready to scan";
      default:
        return "";
    }
  };

  const isProcessing = status === "loading" || status === "processing";

  return (
    <div className="space-y-4">
      {/* Upload Zone */}
      {!selectedFile && (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`
            relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all
            ${isDragging
              ? "border-teal bg-teal/5"
              : "border-gray-300 hover:border-teal hover:bg-gray-50"
            }
          `}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/jpg,image/webp"
            onChange={handleFileChange}
            className="hidden"
            disabled={isProcessing}
          />
          <div className="flex flex-col items-center gap-3">
            {isProcessing ? (
              <Loader2 className="w-10 h-10 text-teal animate-spin" />
            ) : (
              <Upload className="w-10 h-10 text-gray-400" />
            )}
            <div>
              <p className="text-text-primary font-gilroy-medium text-lg">
                {isProcessing ? getStatusMessage() : "Drag & drop your receipt here"}
              </p>
              <p className="text-gray-500 text-sm mt-1">
                or click to browse • PNG, JPG, WebP (max 10MB)
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Validation Error */}
      {validationError && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm flex items-center gap-2">
          <X className="w-4 h-4 flex-shrink-0" />
          {validationError}
        </div>
      )}

      {/* Preview & Results */}
      {selectedFile && (
        <div className="space-y-4">
          {/* Image Preview */}
          <div className="relative bg-white rounded-xl border border-gray-200 overflow-hidden">
            <button
              onClick={handleRemove}
              className="absolute top-2 right-2 z-10 p-1.5 bg-white/90 rounded-full shadow-sm hover:bg-white transition-colors"
              title="Remove image"
            >
              <X className="w-4 h-4 text-gray-600" />
            </button>
            <div className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <FileImage className="w-5 h-5 text-teal" />
                <span className="text-sm text-gray-600 truncate">{selectedFile.name}</span>
              </div>
              {previewUrl && (
                <img
                  src={previewUrl}
                  alt="Receipt preview"
                  className="w-full max-h-64 object-contain rounded-lg bg-gray-50"
                />
              )}
            </div>

            {/* Processing Overlay */}
            {isProcessing && (
              <div className="absolute inset-0 bg-white/80 flex flex-col items-center justify-center gap-3">
                <Loader2 className="w-8 h-8 text-teal animate-spin" />
                <p className="text-text-primary font-gilroy-medium text-sm">{getStatusMessage()}</p>
                {status === "processing" && (
                  <div className="w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-teal transition-all duration-300 rounded-full"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Extracted Data */}
          {extractedData && !isProcessing && (
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <h3 className="text-text-primary font-gilroy-bold text-lg">Extracted Data</h3>
                </div>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="text-sm text-teal hover:text-teal/80 font-gilroy-medium"
                >
                  {isEditing ? "Done editing" : "Edit fields"}
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Amount */}
                <div>
                  <label className="block text-sm text-gray-500 mb-1">Amount</label>
                  {isEditing ? (
                    <input
                      type="number"
                      value={extractedData.amount ?? ""}
                      onChange={(e) => handleEditField("amount", e.target.value)}
                      className="w-full h-10 border border-border-light rounded-lg px-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-teal"
                      placeholder="0.00"
                    />
                  ) : (
                    <p className="text-text-primary font-gilroy-medium text-lg">
                      {extractedData.amount ? `${extractedData.amount.toFixed(2)} TND` : "—"}
                    </p>
                  )}
                </div>

                {/* Date */}
                <div>
                  <label className="block text-sm text-gray-500 mb-1">Date</label>
                  {isEditing ? (
                    <input
                      type="date"
                      value={extractedData.date ?? ""}
                      onChange={(e) => handleEditField("date", e.target.value)}
                      className="w-full h-10 border border-border-light rounded-lg px-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-teal"
                    />
                  ) : (
                    <p className="text-text-primary font-gilroy-medium">
                      {extractedData.date
                        ? new Date(extractedData.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })
                        : "—"}
                    </p>
                  )}
                </div>

                {/* Vendor */}
                <div>
                  <label className="block text-sm text-gray-500 mb-1">Vendor</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={extractedData.vendor ?? ""}
                      onChange={(e) => handleEditField("vendor", e.target.value)}
                      className="w-full h-10 border border-border-light rounded-lg px-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-teal"
                      placeholder="Vendor name"
                    />
                  ) : (
                    <p className="text-text-primary font-gilroy-medium">
                      {extractedData.vendor || "—"}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* OCR Error */}
          {status === "error" && !extractedData && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {getStatusMessage()}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
