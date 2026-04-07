import { NextResponse } from "next/server";
import { getDashboardData } from "@/app/actions/expenses";

export async function GET() {
    try {
        const data = await getDashboardData();
        return NextResponse.json(data);
    } catch (error) {
        console.error("GET /api/dashboard error:", error);
        return NextResponse.json({ error: "Failed to fetch dashboard data" }, { status: 500 });
    }
}
