// Ganpati Lifecare - Individual Product API Route
import { NextResponse } from "next/server";
import { getProductBySlug, updateProduct, deleteProduct } from "@/lib/db";
import { verifySessionToken } from "@/lib/auth";

function isAuthorized(request: Request): boolean {
  const authHeader = request.headers.get("Authorization");
  const cookie = request.headers.get("cookie");
  let cookieToken: string | null = null;
  if (cookie) {
    const match = cookie.match(/glc_admin_session=([^;]+)/);
    if (match) cookieToken = match[1];
  }
  const token = authHeader?.replace("Bearer ", "") || cookieToken;
  return verifySessionToken(token).valid;
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const product = await getProductBySlug(id);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json(product);
  } catch (err) {
    console.error("GET product detail error:", err);
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();

    const updated = await updateProduct(id, body);
    if (!updated) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, product: updated });
  } catch (err) {
    console.error("PUT product error:", err);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const success = await deleteProduct(id);
    if (!success) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Product deleted successfully" });
  } catch (err) {
    console.error("DELETE product error:", err);
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}
