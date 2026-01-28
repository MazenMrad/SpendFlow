import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
        return NextResponse.json({ error: "Not logged in" }, { status: 401 });
    }
    return NextResponse.json({
        id: (session.user as any).id,
        email: session.user.email,
        name: session.user.name
    });
}
