"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import { createWorker, type Worker } from "tesseract.js";

interface UseOcrWorkerReturn {
  /** Process an image file and return extracted text */
  recognize: (image: File | string) => Promise<string>;
  /** Current processing status */
  status: "idle" | "loading" | "ready" | "processing" | "error";
  /** Progress percentage (0-100) during OCR processing */
  progress: number;
  /** Error message if any */
  error: string | null;
}

/**
 * React hook that manages a tesseract.js worker lifecycle.
 * Pre-loads the worker on mount, reuses it across calls, and cleans up on unmount.
 *
 * Usage:
 * ```tsx
 * const { recognize, status, progress, error } = useOcrWorker();
 *
 * const handleFile = async (file: File) => {
 *   const text = await recognize(file);
 *   console.log("Extracted text:", text);
 * };
 * ```
 */
export function useOcrWorker(language = "eng"): UseOcrWorkerReturn {
  const workerRef = useRef<Worker | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "processing" | "error">("idle");
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  // Initialize worker on mount
  useEffect(() => {
    let cancelled = false;

    async function initWorker() {
      setStatus("loading");
      try {
        const worker = await createWorker(language, 1, {
          logger: (m) => {
            if (m.status === "recognizing text") {
              setProgress(Math.round(m.progress * 100));
            }
          },
        });

        if (!cancelled) {
          workerRef.current = worker;
          setStatus("ready");
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to initialize OCR worker");
          setStatus("error");
        }
      }
    }

    initWorker();

    return () => {
      cancelled = true;
      if (workerRef.current) {
        workerRef.current.terminate();
        workerRef.current = null;
      }
    };
  }, [language]);

  const recognize = useCallback(async (image: File | string): Promise<string> => {
    if (!workerRef.current) {
      throw new Error("OCR worker is not ready. Current status: " + status);
    }

    setStatus("processing");
    setProgress(0);
    setError(null);

    try {
      const { data } = await workerRef.current.recognize(image);
      setStatus("ready");
      setProgress(100);
      return data.text;
    } catch (err) {
      const message = err instanceof Error ? err.message : "OCR recognition failed";
      setError(message);
      setStatus("error");
      throw err;
    }
  }, [status]);

  return { recognize, status, progress, error };
}
