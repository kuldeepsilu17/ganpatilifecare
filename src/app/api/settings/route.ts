// Ganpati Lifecare - Business Site Settings API Route
import { NextResponse } from "next/server";
import { getSiteSettings, updateSiteSettings } from "@/lib/db";
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
    const settings = await getSiteSettings();
    return NextResponse.json(settings);
  } catch (err) {
    console.error("GET site settings error:", err);
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const updated = await updateSiteSettings(body);
    return NextResponse.json({ success: true, settings: updated });
  } catch (err) {
    console.error("PUT site settings error:", err);
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
  }
}
