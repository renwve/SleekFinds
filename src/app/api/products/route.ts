import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Product from "@/models/Product";

export async function GET(request: Request) {
    try {
        await connectToDatabase();
        const { searchParams } = new URL(request.url);
        const category = searchParams.get("category");

        const query = category ? { category: { $regex: category, $options: "i" } } : {};
        const products = await Product.find(query).sort({ createdAt: -1 });

        return NextResponse.json({ success: true, data: products }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: "Failed to fetch products: " + error.message },
            { status: 500 }
        );
  }
}

export async function POST(request: Request) {
    try {
        await connectToDatabase();
        const body = await request.json();
        const newProduct = await Product.create(body);

        return NextResponse.json({ success: true, data: newProduct }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: "Failed to create listing: " + error.message },
            { status: 400 }
        );
    }
}