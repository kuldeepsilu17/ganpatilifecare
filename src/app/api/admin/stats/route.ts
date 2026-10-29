// Ganpati Lifecare - Admin Dashboard KPIs & Metrics
import { NextResponse } from "next/server";
import { getAdminStats } from "@/lib/db";
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
  const auth = verifySessionToken(token);

  if (!auth.valid) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const stats = await getAdminStats();
    return NextResponse.json(stats);
  } catch (err) {
    console.error("Admin stats error:", err);
    return NextResponse.json({ error: "Failed to load dashboard metrics" }, { status: 500 });
  }
}
