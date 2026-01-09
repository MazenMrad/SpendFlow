"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

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
