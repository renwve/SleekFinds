import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
    try{
        const {username, email, password} = await request.json();

        if (!username || !email || !password) {
            return NextResponse.json(
                { error: "All fields are required" },
                { status: 400 }
            );
        }

        await connectToDatabase();
        // checks if the account exist with that email already
        const existingUser = await User.findOne({email});
            if (existingUser) {
            return NextResponse.json(
                {error:"An account with this email already exists"},
                {status:400}
            );
        }

        // Hash the password securely
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save the user
        const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
        role: "user", // Default access level
        });

        return NextResponse.json(
        { success: true, message: "User registered successfully", userId: newUser._id },
        { status: 201 }
        );
    } catch (error: any) {
        return NextResponse.json(
            { error: "Server error: " + error.message },
            { status: 500 }
        );
    }
}