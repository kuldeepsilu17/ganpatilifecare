// Ganpati Lifecare - Admin Authentication API Route
import { NextResponse } from "next/server";
import { verifyAdminCredentials } from "@/lib/db";
import { createSessionToken } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, passkey } = body;

    const testPassword = password || passkey;
    const testEmail = email || "whiteroseglc@gmail.com";

    if (!testPassword) {
      return NextResponse.json(
        { error: "Password or administrator passkey is required." },
        { status: 400 }
      );
    }

    const admin = await verifyAdminCredentials(testEmail, testPassword);
    if (!admin) {
      return NextResponse.json(
        { error: "Invalid administrator credentials. Access denied." },
        { status: 401 }
      );
    }

    const token = createSessionToken({
      id: admin.id,
      email: admin.email,
      role: admin.role,
      expiresInHours: 72,
    });

    const response = NextResponse.json({
      success: true,
      token,
      user: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });

    // Set secure session cookie
    response.cookies.set("glc_admin_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 72 * 3600,
      path: "/",
    });

    return response;
  } catch (err) {
    console.error("Auth login error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
