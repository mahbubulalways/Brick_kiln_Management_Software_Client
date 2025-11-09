import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Apply auth check for dashboard routes
  if (pathname.startsWith("/dashboard")) {
    const token = true;

    // Redirect to /login if no token is found
    if (!token) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Continue to the requested page
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"], // Match all /dashboard routes
};
