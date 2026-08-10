import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Product from "@/models/Product";

interface RouteContext {
  params: Promise<{ id: string }>;
}

function invalidIdResponse() {
  return NextResponse.json(
    { success: false, error: "Invalid product ID" },
    { status: 400 },
  );
}

function errorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Unknown error";
}

export async function GET(_request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;

    if (!mongoose.isValidObjectId(id)) {
      return invalidIdResponse();
    }

    await connectToDatabase();
    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json(
        { success: false, error: "Product not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, data: product });
  } catch (error: unknown) {
    return NextResponse.json(
      { success: false, error: `Failed to fetch product: ${errorMessage(error)}` },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;

    if (!mongoose.isValidObjectId(id)) {
      return invalidIdResponse();
    }

    const updates = await request.json();
    delete updates._id;
    delete updates.createdAt;
    delete updates.updatedAt;

    await connectToDatabase();
    const product = await Product.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return NextResponse.json(
        { success: false, error: "Product not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, data: product });
  } catch (error: unknown) {
    return NextResponse.json(
      { success: false, error: `Failed to update product: ${errorMessage(error)}` },
      { status: 400 },
    );
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;

    if (!mongoose.isValidObjectId(id)) {
      return invalidIdResponse();
    }

    await connectToDatabase();
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return NextResponse.json(
        { success: false, error: "Product not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, data: product });
  } catch (error: unknown) {
    return NextResponse.json(
      { success: false, error: `Failed to delete product: ${errorMessage(error)}` },
      { status: 500 },
    );
  }
}
