import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * API Route: Create expense from n8n workflow / Gemini AI
 * 
 * POST /api/expenses
 * 
 * Expected body:
 * {
 *   amount: number,
 *   date: string (YYYY-MM-DD),
 *   vendor: string,
 *   description: string,
 *   category: string,
 *   paymentMethod: "Cash" | "Card" | "Check"
 * }
 * 
 * Headers required:
 * - x-user-id: User ID for the expense owner
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    const { amount, date, vendor, description, category, paymentMethod } = body;

    // Validate required fields
    if (!amount || !date || !category) {
      return NextResponse.json(
        { error: "amount, date, and category are required" },
        { status: 400 }
      );
    }

    // Get user ID from header (n8n integration)
    const userId = req.headers.get("x-user-id");
    
    if (!userId) {
      return NextResponse.json(
        { error: "Missing x-user-id header for n8n integration" },
        { status: 401 }
      );
    }

    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      return NextResponse.json(
        { error: "Invalid amount" },
        { status: 400 }
      );
    }

    // Find or create category
    let categoryRecord = await prisma.category.findFirst({
      where: {
        name: category,
        userId: userId,
      },
    });

    if (!categoryRecord) {
      categoryRecord = await prisma.category.create({
        data: {
          name: category,
          userId: userId,
        },
      });
    }

    // Create the expense
    const expense = await prisma.expense.create({
      data: {
        amount: amountNum,
        description: description || vendor || null,
        date: new Date(date),
        categoryId: categoryRecord.id,
        paymentMethod: paymentMethod || "Card",
        userId: userId,
      },
    });

    return NextResponse.json({
      success: true,
      expenseId: expense.id,
      message: "Expense created from email"
    });
  } catch (error) {
    console.error("Error creating expense from email:", error);
    return NextResponse.json(
      { error: "Failed to create expense" },
      { status: 500 }
    );
  }
}
