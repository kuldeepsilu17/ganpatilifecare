// Ganpati Lifecare - Blog Posts API Route
import { NextResponse } from "next/server";
import { getBlogPosts, createBlogPost } from "@/lib/db";
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

export async function GET() {
  try {
    const posts = await getBlogPosts();
    return NextResponse.json(posts);
  } catch (err) {
    console.error("GET blog posts error:", err);
    return NextResponse.json({ error: "Failed to fetch blog posts" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, slug, excerpt, content, coverImage, author, isPublished, seoTitle, seoDescription } = body;

    if (!title || !content) {
      return NextResponse.json({ error: "Title and content are required." }, { status: 400 });
    }

    const cleanSlug = (
      slug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
    ).trim();

    const newPost = await createBlogPost({
      id: cleanSlug,
      slug: cleanSlug,
      title: title.trim(),
      excerpt: (excerpt || content.slice(0, 160)).trim(),
      content: content.trim(),
      coverImage: coverImage || "/images/products/real_orthocot_cotton_roll_15cm.webp",
      author: author || "Dharampal Verma",
      isPublished: isPublished !== undefined ? Boolean(isPublished) : true,
      seoTitle: seoTitle || `${title} | Ganpati Lifecare`,
      seoDescription: seoDescription || (excerpt || content.slice(0, 160)).trim(),
    });

    return NextResponse.json({ success: true, post: newPost });
  } catch (err) {
    console.error("POST blog post error:", err);
    return NextResponse.json({ error: "Failed to create blog post" }, { status: 500 });
  }
}
