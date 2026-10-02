import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const host = request.headers.get("host") || "";
  const pathname = request.nextUrl.pathname;
  const search = request.nextUrl.search;

  // Permanent 308 redirect from legacy Vercel domain or naked domain to primary canonical domain
  if (
    host.includes("ganpatilifecare.vercel.app") ||
    host === "ganpatilifecare.com" ||
    host === "www.ganpatilifecare.vercel.app"
  ) {
    const targetUrl = `https://www.ganpatilifecare.com${pathname}${search}`;
    return NextResponse.redirect(targetUrl, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};

export default proxy;
