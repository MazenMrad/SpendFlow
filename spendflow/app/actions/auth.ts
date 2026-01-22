"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function signUp(formData: FormData) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password || !name) {
        return { error: "Name, email and password are required" };
    }
    try {
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });
        if (existingUser) {
            return { error: "User already exists" };
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });

        return { success: true };
    } catch (error) {
        console.error("Sign up error:", error);
        return { error: "Something went wrong" };
    }
}

export async function changePassword(formData: FormData) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) return { error: "Unauthorized" };
        const userId = (session.user as any).id;

        const currentPassword = formData.get("currentPassword") as string;
        const newPassword = formData.get("newPassword") as string;

        if (!currentPassword || !newPassword) {
            return { error: "Current and new password are required" };
        }

        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user || !user.password) return { error: "User not found" };

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) return { error: "Incorrect current password" };

        const hashedPassword = await bcrypt.hash(newPassword, 12);

        await prisma.user.update({
            where: { id: userId },
            data: { password: hashedPassword }
        });

        return { success: true, message: "Password updated successfully" };
    } catch (e) {
        console.error("Change password error:", e);
        return { error: "Failed to update password" };
    }
}
