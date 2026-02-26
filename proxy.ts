import { NextRequest, NextResponse } from "next/server";

const BYPASS_COOKIE = "maintenance_bypass";

// Routes that are always accessible during maintenance mode
const ALLOWED_PATHS = [
  "/contact",
  "/maintenance",
  "/api/",
  "/_next/",
  "/favicon.ico",
  "/robots.txt",
  "/sitemap.xml",
  "/manifest.json",
];

export function proxy(request: NextRequest) {
  const maintenanceMode = process.env.MAINTENANCE_MODE === "true";

  if (!maintenanceMode) {
    return NextResponse.next();
  }

  const { pathname, searchParams } = request.nextUrl;
  const secret = process.env.MAINTENANCE_BYPASS_SECRET;

  // Always allow through specific paths
  if (ALLOWED_PATHS.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  // If a valid bypass secret is passed as a query param, set the cookie and redirect clean
  if (secret && searchParams.get("preview") === secret) {
    const url = request.nextUrl.clone();
    url.searchParams.delete("preview");
    const response = NextResponse.redirect(url);
    response.cookies.set(BYPASS_COOKIE, secret, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 8, // 8 hours
    });
    return response;
  }

  // If the bypass cookie matches the secret, let them through
  const bypassCookie = request.cookies.get(BYPASS_COOKIE)?.value;
  if (secret && bypassCookie === secret) {
    return NextResponse.next();
  }

  // Otherwise, redirect to maintenance page
  const url = request.nextUrl.clone();
  url.pathname = "/maintenance";
  url.search = "";
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - public folder files (images, icons, etc.)
     */
    "/((?!_next/static|_next/image|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico|woff|woff2|ttf|otf)).*)",
  ],
};
