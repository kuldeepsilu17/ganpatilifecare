// Ganpati Lifecare - Individual Blog Post API Route
import { NextResponse } from "next/server";
import { getBlogPostBySlug, updateBlogPost, deleteBlogPost } from "@/lib/db";
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
    const post = await getBlogPostBySlug(id);
    if (!post) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 });
    }
    return NextResponse.json(post);
  } catch (err) {
    console.error("GET blog post error:", err);
    return NextResponse.json({ error: "Failed to fetch blog post" }, { status: 500 });
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

    const updated = await updateBlogPost(id, body);
    if (!updated) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, post: updated });
  } catch (err) {
    console.error("PUT blog post error:", err);
    return NextResponse.json({ error: "Failed to update blog post" }, { status: 500 });
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
    const success = await deleteBlogPost(id);
    if (!success) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Blog post deleted successfully" });
  } catch (err) {
    console.error("DELETE blog post error:", err);
    return NextResponse.json({ error: "Failed to delete blog post" }, { status: 500 });
  }
}
