"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import { randomUUID } from "crypto";

/**
 * Upload a receipt image and save it to public/uploads/receipts/
 * Returns the relative URL path to the saved file.
 */
export async function uploadReceipt(formData: FormData): Promise<{ success?: boolean; url?: string; error?: string }> {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return { error: "You must be logged in to upload receipts" };
        }

        const file = formData.get("file") as File | null;
        if (!file) {
            return { error: "No file provided" };
        }

        // Validate file type
        const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp", "image/bmp", "image/gif"];
        if (!allowedTypes.includes(file.type)) {
            return { error: "Invalid file type. Only PNG, JPG, WebP, BMP, and GIF are allowed." };
        }

        // Validate file size (max 10MB)
        const maxSize = 10 * 1024 * 1024; // 10MB
        if (file.size > maxSize) {
            return { error: "File too large. Maximum size is 10MB." };
        }

        // Generate unique filename
        const timestamp = Date.now();
        const uuid = randomUUID().slice(0, 8);
        const extension = file.name.split(".").pop() || "png";
        const filename = `${timestamp}-${uuid}.${extension}`;

        // Ensure upload directory exists
        const uploadDir = path.join(process.cwd(), "public", "uploads", "receipts");
        if (!existsSync(uploadDir)) {
            await mkdir(uploadDir, { recursive: true });
        }

        // Convert File to Buffer and save
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const filePath = path.join(uploadDir, filename);
        await writeFile(filePath, buffer);

        // Return relative URL path
        const url = `/uploads/receipts/${filename}`;

        return { success: true, url };
    } catch (error) {
        console.error("Upload receipt error:", error);
        return { error: "Failed to upload receipt. Please try again." };
    }
}
