"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function addExpense(formData: FormData) {
    try {
        const session = await getServerSession(authOptions);
        console.log("DEBUG: addExpense session:", JSON.stringify(session, null, 2));

        if (!session?.user) {
            return { error: "You must be logged in to add expenses (Session check failed)" };
        }

        const userId = (session.user as any).id as string;

        if (!userId) {
            return { error: "Invalid user session" };
        }

        const date = formData.get("date") as string;
        const amount = formData.get("amount") as string;
        const category = formData.get("category") as string;
        const type = formData.get("type") as string;
        const description = formData.get("description") as string;


        if (!date || !amount || !category || !type) {
            return { error: "Date, amount, category, and payment type are required" };
        }

        const amountNum = parseFloat(amount);
        if (isNaN(amountNum) || amountNum <= 0) {
            return { error: "Amount must be a positive number" };
        }

        const validPaymentMethods = ["Cash", "Card", "Check"];
        if (!validPaymentMethods.includes(type)) {
            return { error: "Invalid payment method" };
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
                    isDefault: ["Transport", "Food", "Entertainment", "Shopping"].includes(category),
                },
            });
        }

        await prisma.expense.create({
            data: {
                amount: amountNum,
                description: description || null,
                date: new Date(date),
                categoryId: categoryRecord.id,
                paymentMethod: type,
                userId: userId,
            },
        });

        return { success: true, message: "Expense added successfully!" };
    } catch (error) {
        return { error: "Something went wrong. Please try again." };
    }
}

export async function updateBudgetGoal(formData: FormData) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) return { error: "Unauthorized" };
        const userId = (session.user as any).id;

        const amount = parseFloat(formData.get("amount") as string);
        if (isNaN(amount) || amount < 0) return { error: "Invalid amount" };

        await prisma.user.update({
            where: { id: userId },
            data: { budgetGoal: amount }
        });

        return { success: true, message: "Budget updated" };
    } catch (error) {
        return { error: "Failed to update budget" };
    }
}

export async function createCategory(formData: FormData) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) return { error: "Unauthorized" };
        const userId = (session.user as any).id;

        const name = formData.get("name") as string;
        if (!name) return { error: "Name is required" };

        // Generate random pastel color
        const hue = Math.floor(Math.random() * 360);
        const color = `hsl(${hue}, 70%, 80%)`;

        // Convert HSL to Hex or just store HSL string if valid in CSS? 
        // Hex is safer for consistency, but HSL string is valid CSS.
        // Let's generate a Hex for consistency with existing hardcoded hexes.
        // Simple random hex for now to stay robust.
        const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');

        await prisma.category.create({
            data: {
                name,
                userId,
                color: randomColor,
                isDefault: false
            }
        });

        return { success: true, message: "Category created" };
    } catch (error) {
        console.error("CREATE CATEGORY ERROR:", error);
        return { error: `Failed to create category: ${error instanceof Error ? error.message : "Unknown error"}` };
    }
}




export async function getUserCategories() {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) return [];
        const userId = (session.user as any).id;

        const categories = await prisma.category.findMany({
            where: { userId },
            orderBy: { name: 'asc' }
        });

        return categories.map(c => ({
            id: c.id,
            name: c.name,
            // @ts-ignore
            color: c.color
        }));
    } catch (error) {
        console.error("Failed to fetch categories:", error);
        return [];
    }
}

export async function deleteCategory(categoryId: string) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) return { error: "Unauthorized" };
        const userId = (session.user as any).id;

        const category = await prisma.category.findUnique({
            where: { id: categoryId }
        });

        if (!category || category.userId !== userId) {
            return { error: "Category not found or unauthorized" };
        }

        await prisma.category.delete({
            where: { id: categoryId }
        });

        return { success: true, message: "Category deleted successfully" };
    } catch (error) {
        console.error("DELETE CATEGORY ERROR:", error);
        return { error: "Failed to delete category" };
    }
}

export async function getDashboardData() {
    try {
        const session = await getServerSession(authOptions);
        console.log("DEBUG: getDashboardData session:", JSON.stringify(session, null, 2));
        let userId = (session?.user as any)?.id;

        if (!userId) {
            userId = "000000000000000000000001";
            console.warn("No active session. Using fallback userId for dashboard data.");
        }

        if (!process.env.DATABASE_URL) {
            console.warn("No DATABASE_URL configured. Returning empty data.");
            return {
                metrics: {
                    monthlySpending: "0.00 TND",
                    remainingBudget: "0.00 TND",
                    topCategory: "None",
                    topCategoryAmount: "0.00 TND"
                },
                monthlyTrend: [],
                weeklyTrend: [],
                categories: [],
                recentTransactions: []
            };
        }
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { budgetGoal: true }
        });

        const now = new Date();
        const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

        const currentMonthExpenses = await prisma.expense.findMany({
            where: {
                userId,
                date: { gte: firstDayOfMonth }
            },
            include: { category: true }
        });

        const totalMonthly = currentMonthExpenses.reduce((sum: number, e: { amount: number }) => sum + e.amount, 0);
        const remainingBudget = (user?.budgetGoal || 0) - totalMonthly;

        // Group by category
        const categoryMap = new Map<string, number>();
        currentMonthExpenses.forEach((e: { category: { name: string }, amount: number }) => {
            const catName = e.category.name;
            categoryMap.set(catName, (categoryMap.get(catName) || 0) + e.amount);
        });

        const categoryList = Array.from(categoryMap.entries()).map(([name, amount], index) => {
            const colors = ["#FD1F9B", "#017EFA", "#23B899", "#6342FF"];
            return {
                name,
                amount: `${amount.toFixed(2)} TND`,
                percentage: totalMonthly > 0 ? (amount / totalMonthly) * 100 : 0,
                color: colors[index % colors.length]
            };
        });

        // Top category (highest amount)
        let topCat = "None";
        let topAmount = 0;
        categoryMap.forEach((v, k) => {
            if (v > topAmount) {
                topAmount = v;
                topCat = k;
            }
        });

        const recentRaw = await prisma.expense.findMany({
            where: { userId },
            include: { category: true },
            orderBy: { date: 'desc' },
            take: 4
        });

        const recentTransactions = recentRaw.map((r: { id: string, amount: number, description: string | null, date: Date, category: { name: string } }) => ({
            id: r.id,
            type: r.category.name,
            amount: `${r.amount.toFixed(2)} TND`,
            description: r.description || r.category.name,
            date: r.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        }));
        const monthlyTrend = [];
        for (let i = 11; i >= 0; i--) {
            const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const m = d.toLocaleString('en-US', { month: 'short' });
            const start = new Date(d.getFullYear(), d.getMonth(), 1);
            const end = new Date(d.getFullYear(), d.getMonth() + 1, 0);

            const mExpenses = await prisma.expense.aggregate({
                where: {
                    userId,
                    date: { gte: start, lte: end }
                },
                _sum: { amount: true }
            });

            const amount = mExpenses._sum.amount || 0;
            monthlyTrend.push({
                label: m,
                totalExpenses: amount,
                dailyNeeds: amount * 0.7
            });
        }
        const weeklyTrend = [];
        for (let i = 6; i >= 0; i--) {
            const d = new Date(now);
            d.setDate(now.getDate() - i);
            const dayLabel = d.toLocaleString('en-US', { weekday: 'short' });

            const start = new Date(d);
            start.setHours(0, 0, 0, 0);
            const end = new Date(d);
            end.setHours(23, 59, 59, 999);

            const dExpenses = await prisma.expense.aggregate({
                where: {
                    userId,
                    date: { gte: start, lte: end }
                },
                _sum: { amount: true }
            });

            const amount = dExpenses._sum.amount || 0;
            weeklyTrend.push({
                label: dayLabel,
                totalExpenses: amount,
                dailyNeeds: amount * 0.7
            });
        }

        const upcomingRaw = await prisma.expense.findMany({
            where: {
                userId,
                date: { gte: now }
            },
            include: { category: true },
            orderBy: { date: 'asc' },
            take: 10
        });

        const upcomingBills = upcomingRaw.map(r => ({
            id: r.id,
            name: r.description || r.category.name,
            amount: `${r.amount.toFixed(2)} TND`,
            category: r.category.name,
            color: r.category.color || "#017EFA",
            date: r.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            fullDate: r.date,
            status: r.status
        }));

        return {
            metrics: {
                monthlySpending: `${totalMonthly.toFixed(2)} TND`,
                remainingBudget: `${remainingBudget.toFixed(2)} TND`,
                topCategory: topCat,
                topCategoryAmount: `${topAmount.toFixed(2)} TND`
            },
            monthlyTrend,
            weeklyTrend,
            categories: categoryList,
            recentTransactions,
            upcomingBills
        };
    } catch (error) {
        console.error("Dashboard data error:", error);
        return { error: "Failed to fetch dashboard data" };
    }
}

export async function getExpenses() {
    try {
        const session = await getServerSession(authOptions);
        let userId = (session?.user as any)?.id;

        if (!userId) {
            userId = "000000000000000000000001"; // Fallback for dev
        }

        if (!process.env.DATABASE_URL) {
            return [
                {
                    id: "1",
                    date: "Jan 13, 2026",
                    category: "Food",
                    description: "Restaurant Dinner",
                    amount: 45.50,
                    status: "completed" as "completed",
                },
                {
                    id: "2",
                    date: "Jan 12, 2026",
                    category: "Transport",
                    description: "Taxi Ride",
                    amount: 15.00,
                    status: "completed" as "completed",
                }
            ];
        }

        const rawExpenses = await prisma.expense.findMany({
            where: { userId },
            include: { category: true },
            orderBy: { date: 'desc' }
        });

        return rawExpenses.map((r) => {
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
                status: (isCompleted ? "completed" : "pending") as "completed" | "pending"
            };
        });
    } catch (error) {
        console.error("Fetch expenses error:", error);
        return [];
    }
}



export async function deleteExpense(expenseId: string) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return { error: "Unauthorized" };
        }

        const userId = (session.user as any).id as string;

        // Verify ownership
        const expense = await prisma.expense.findUnique({
            where: { id: expenseId },
        });

        if (!expense) {
            return { error: "Expense not found" };
        }

        if (expense.userId !== userId) {
            return { error: "Unauthorized access to this expense" };
        }

        await prisma.expense.delete({
            where: { id: expenseId },
        });

        return { success: true, message: "Expense deleted successfully" };
    } catch (error) {
        console.error("Delete expense error:", error);
        return { error: "Failed to delete expense" };
    }
}

export async function getCalendarEvents() {
    try {
        const session = await getServerSession(authOptions);
        let userId = (session?.user as any)?.id;

        if (!userId) {
            userId = "000000000000000000000001"; // Fallback for dev
        }

        const rawExpenses = await prisma.expense.findMany({
            where: { userId },
            include: { category: true },
            orderBy: { date: 'asc' }
        });

        const colorMap: Record<string, string> = {
            Food: "orange",
            Transport: "blue",
            Entertainment: "purple",
            Shopping: "green",
            Health: "red",
            Other: "gray",
        };

        return rawExpenses.map((r) => {
            const startDate = new Date(r.date);
            const endDate = new Date(startDate.getTime() + 60 * 60 * 1000); // Default to 1 hour duration

            return {
                id: r.id,
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString(),
                title: r.description || r.category.name,
                description: `Category: ${r.category.name} | Amount: ${r.amount.toFixed(2)} TND`,
                color: (colorMap[r.category.name] || "gray"),
                amount: r.amount,
                category: r.category.name
            };
        });
    } catch (error) {
        console.error("Fetch calendar events error:", error);
        return [];
    }
}

export async function getWeeklyUpcomingBills() {
    try {
        const session = await getServerSession(authOptions);
        let userId = (session?.user as any)?.id;

        if (!userId) {
            userId = "000000000000000000000001"; // Fallback for dev
        }

        const now = new Date();
        const startOfWeek = new Date(now);
        const day = now.getDay();
        const diff = now.getDate() - day + (day === 0 ? -6 : 1);
        startOfWeek.setDate(diff);
        startOfWeek.setHours(0, 0, 0, 0);

        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        endOfWeek.setHours(23, 59, 59, 999);

        const bills = await prisma.expense.findMany({
            where: {
                userId,
                date: {
                    gte: startOfWeek,
                    lte: endOfWeek
                }
            },
            include: { category: true },
            orderBy: { date: 'asc' }
        });

        // Filter for pending status equivalent (future dates)
        const tonight = new Date(now);
        tonight.setHours(23, 59, 59, 999);

        return bills.map(b => ({
            id: b.id,
            name: b.description || b.category.name,
            amount: `${b.amount.toFixed(2)} TND`,
            date: b.date.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' }),
            isOverdue: b.date < startOfWeek, // Should not happen with current filter
            isDueSoon: b.date >= now && b.date <= tonight,
            category: b.category.name,
            color: b.category.color || "#017EFA"
        }));
    } catch (error) {
        console.error("Failed to fetch weekly bills:", error);
        return [];
    }
}
