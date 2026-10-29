// Ganpati Lifecare - Check Session API Route
import { NextResponse } from "next/server";
import { verifySessionToken } from "@/lib/auth";

export async function GET(request: Request) {
  const authHeader = request.headers.get("Authorization");
  const cookie = request.headers.get("cookie");
  let cookieToken: string | null = null;

  if (cookie) {
    const match = cookie.match(/glc_admin_session=([^;]+)/);
    if (match) cookieToken = match[1];
  }

  const token = authHeader?.replace("Bearer ", "") || cookieToken;
  const result = verifySessionToken(token);

  if (!result.valid) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return NextResponse.json({
    authenticated: true,
    user: result.user,
  });
}
