// Ganpati Lifecare - Products API Route
import { NextResponse } from "next/server";
import { getProducts, createProduct } from "@/lib/db";
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

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") || undefined;
    const publishedOnly = searchParams.get("published") === "true";

    const products = await getProducts({
      category,
      isPublished: publishedOnly ? true : undefined,
    });
    return NextResponse.json(products);
  } catch (err) {
    console.error("GET products error:", err);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const {
      name,
      slug,
      category,
      description,
      imageUrls,
      specifications,
      variants,
      packagingInformation,
      seoTitle,
      seoDescription,
      isFeatured,
      isPublished,
    } = body;

    if (!name || !description || !category) {
      return NextResponse.json(
        { error: "Product name, category, and description are required." },
        { status: 400 }
      );
    }

    const cleanSlug = (
      slug || name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
    ).trim();

    const newProduct = await createProduct({
      id: cleanSlug,
      slug: cleanSlug,
      name: name.trim(),
      category: category.trim(),
      description: description.trim(),
      imageUrls: typeof imageUrls === "string" ? imageUrls : JSON.stringify(imageUrls || []),
      specifications: typeof specifications === "string" ? specifications : JSON.stringify(specifications || {}),
      variants: typeof variants === "string" ? variants : JSON.stringify(variants || []),
      packagingInformation: packagingInformation || "",
      seoTitle: seoTitle || `${name} | Ganpati Lifecare`,
      seoDescription: seoDescription || description.slice(0, 160),
      isFeatured: Boolean(isFeatured),
      isPublished: isPublished !== undefined ? Boolean(isPublished) : true,
    });

    return NextResponse.json({ success: true, product: newProduct });
  } catch (err) {
    console.error("POST product error:", err);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}
