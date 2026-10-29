import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const host = request.headers.get("host") || "";
  const proto = request.headers.get("x-forwarded-proto");
  const pathname = request.nextUrl.pathname;
  const search = request.nextUrl.search;

  // Permanent 308 redirect from legacy Vercel domain or naked apex domain to primary canonical domain
  const isVercelDomain =
    host.includes("ganpatilifecare.vercel.app") ||
    host === "www.ganpatilifecare.vercel.app";
  const isNakedDomain = host === "ganpatilifecare.com";
  const isHttpOnCanonical = proto === "http" && host === "www.ganpatilifecare.com";

  if (isVercelDomain || isNakedDomain || isHttpOnCanonical) {
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
