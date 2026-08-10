import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

    export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
        return NextResponse.json(
            { error: "Email and password are required" },
            { status: 400 }
        );
        }

        await connectToDatabase();

        // 1. Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
        return NextResponse.json(
            { error: "Invalid email or password" },
            { status: 401 }
        );
        }

        // 2. Compare entered password with hashed password in database
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
        return NextResponse.json(
            { error: "Invalid email or password" },
            { status: 401 }
        );
        }

        // 3. Return user info (excluding password)
        return NextResponse.json(
        {
            success: true,
            user: {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role, // "user" or "admin"
            },
        },
        { status: 200 }
        );
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Unknown error";

        return NextResponse.json(
        { error: "Server error: " + message },
        { status: 500 }
        );
    }
}
