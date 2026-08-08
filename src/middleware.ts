import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get("token")?.value;

  // No token
  if (!token) {
    // Allow login page
    if (pathname === "/login") {
      return NextResponse.next();
    }

    // Redirect everything else to login
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Has token
  // pathname === "/" ||
  if (pathname === "/login") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/dashboard/:path*"],
};
