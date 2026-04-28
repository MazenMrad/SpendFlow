import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        let userId = (session?.user as any)?.id;

	if (!userId) {
		userId = "000000000000000000000001";
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
		return NextResponse.json({ error: "Failed to fetch expenses" }, { status: 500 });
	}
}

export async function POST(request: Request) {
	try {
		const body = await request.json();

		const { id, description, price, amount, category, date, source, status, userId: bodyUserId } = body;

		const finalPrice = price !== undefined && price !== null ? price : amount;

		const userId = bodyUserId || "000000000000000000000001";

		if (finalPrice === undefined || finalPrice === null || !category || !date) {
			return NextResponse.json({ error: "Missing required fields: price/amount, category, date" }, { status: 400 });
		}

		const amountNum = typeof finalPrice === 'string' ? parseFloat(finalPrice) : finalPrice;
		if (isNaN(amountNum)) {
			return NextResponse.json({ error: "Invalid price format" }, { status: 400 });
		}

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
					isDefault: false,
				},
			});
		}

		const newExpense = await prisma.expense.create({
			data: {
				...(id && id.length === 24 ? { id } : {}),
				amount: amountNum,
				description: source ? `${description || ""} (Source: ${source})` : (description || category),
				date: new Date(date),
				categoryId: categoryRecord.id,
				userId: userId,
				status: status || "completed",
				paymentMethod: "Card",
			},
		});

		return NextResponse.json({ success: true, id: newExpense.id }, { status: 201 });
	} catch (error) {
		return NextResponse.json({
			error: "Failed to create expense",
			details: error instanceof Error ? error.message : "Unknown error"
		}, { status: 500 });
	}
}
