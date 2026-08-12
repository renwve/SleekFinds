import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Product from "@/models/Product";
import { auth } from "@/auth";

function errorMessage(error: unknown) {
  return error instanceof Error
    ? error.message
    : "Unknown error";
}

export async function GET(request: Request) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    const query = category
      ? {
          category: {
            $regex: category,
            $options: "i",
          },
        }
      : {};

    const products = await Product.find(query).sort({
      createdAt: -1,
    });

    return NextResponse.json(
      {
        success: true,
        data: products,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    return NextResponse.json(
      {
        success: false,
        error:
          "Failed to fetch products: " +
          errorMessage(error),
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        {
          success: false,
          error: "Authentication required",
        },
        { status: 401 }
      );
    }

    await connectToDatabase();

    const body = await request.json();

    const newProduct = await Product.create(body);

    return NextResponse.json(
      {
        success: true,
        data: newProduct,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    return NextResponse.json(
      {
        success: false,
        error:
          "Failed to create listing: " +
          errorMessage(error),
      },
      { status: 400 }
    );
  }
}