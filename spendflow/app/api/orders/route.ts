import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        let userId = (session?.user as any)?.id;

        if (!userId) {
            userId = "000000000000000000000001"; // Fallback for dev/demo if needed
        }

        const expenses = await prisma.expense.findMany({
            where: { userId },
            include: { category: true },
            orderBy: { date: 'desc' },
        });

        const normalizedExpenses = expenses.map((r) => {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const expDate = new Date(r.date);
            expDate.setHours(0, 0, 0, 0);
            const isCompleted = expDate <= today;

            return {
                id: r.id,
                date: r.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                category: r.category.name,
                categoryColor: r.category.color ?? undefined,
                description: r.description || r.category.name,
                amount: r.amount,
                status: isCompleted ? "completed" : "pending",
            };
        });

        return NextResponse.json(normalizedExpenses);
    } catch (error) {
        console.error("GET /api/orders error:", error);
        return NextResponse.json({ error: "Failed to fetch expenses" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    console.log("DEBUG: [POST /api/orders] Request received");
    try {
        const body = await request.json();
        console.log("DEBUG: [POST /api/orders] Body parsed:", JSON.stringify(body));

        // Allow id and status to be passed from n8n if provided
        const { id, description, price, amount, category, date, source, status, userId: bodyUserId } = body;

        // Use amount if price is not provided
        const finalPrice = price !== undefined && price !== null ? price : amount;

        // Use userId from body (pushed by n8n) or a default one
        const userId = bodyUserId || "000000000000000000000001";
        console.log("DEBUG: [POST /api/orders] Using userId:", userId);

        // Validate basic requirements
        if (finalPrice === undefined || finalPrice === null || !category || !date) {
            console.log("DEBUG: [POST /api/orders] Missing fields. finalPrice:", finalPrice, "category:", category, "date:", date);
            return NextResponse.json({ error: "Missing required fields: price/amount, category, date" }, { status: 400 });
        }

        const amountNum = typeof finalPrice === 'string' ? parseFloat(finalPrice) : finalPrice;
        if (isNaN(amountNum)) {
            console.log("DEBUG: [POST /api/orders] Invalid price:", finalPrice);
            return NextResponse.json({ error: "Invalid price format" }, { status: 400 });
        }

        console.log("DEBUG: [POST /api/orders] Checking category:", category);
        // Find or create category
        let categoryRecord = await prisma.category.findFirst({
            where: {
                name: category,
                userId: userId,
            },
        });

        if (!categoryRecord) {
            console.log("DEBUG: [POST /api/orders] Category not found, creating...");
            categoryRecord = await prisma.category.create({
                data: {
                    name: category,
                    userId: userId,
                    isDefault: false,
                },
            });
        }

        console.log("DEBUG: [POST /api/orders] Creating expense record...");
        const newExpense = await prisma.expense.create({
            data: {
                // If n8n provides an ID, we use it (if it's a valid Mongo ID), otherwise Prisma auto-generates
                ...(id && id.length === 24 ? { id } : {}),
                amount: amountNum,
                description: source ? `${description || ""} (Source: ${source})` : (description || category),
                date: new Date(date),
                categoryId: categoryRecord.id,
                userId: userId,
                status: status || "completed", // Use status from n8n or default to "completed"
                paymentMethod: "Card",
            },
        });

        console.log("DEBUG: [POST /api/orders] SUCCESS! ID:", newExpense.id);
        return NextResponse.json({ success: true, id: newExpense.id }, { status: 201 });
    } catch (error) {
        console.error("DEBUG: [POST /api/orders] CRITICAL ERROR:", error);
        return NextResponse.json({
            error: "Failed to create expense",
            details: error instanceof Error ? error.message : "Unknown error"
        }, { status: 500 });
    }
}
