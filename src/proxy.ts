import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

import { IToken } from "./interface/token";
import { UserRole } from "./constant/index";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/domain-not-found") {
    return NextResponse.next();
  }

  const token = request.cookies.get("token")?.value;

  if (!token) {
    if (pathname === "/login") {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }

  let decodedToken: IToken;

  try {
    decodedToken = jwtDecode<IToken>(token);
  } catch {
    if (pathname === "/login") {
      return NextResponse.next();
    }
    const res = NextResponse.redirect(new URL("/login", request.url));
    res.cookies.delete("token");
    return res;
  }

  const { role } = decodedToken;

  if (
    role === UserRole.OWNER ||
    role === UserRole.ADMIN ||
    role === UserRole.MANAGER
  ) {
    if (pathname === "/login" || pathname === "/") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    if (pathname.startsWith("/system")) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.next();
  }

  if (role === UserRole.SYSTEM_ADMIN || role === UserRole.SUPER_ADMIN) {
    if (
      pathname === "/login" ||
      pathname === "/" ||
      pathname.startsWith("/dashboard")
    ) {
      return NextResponse.redirect(new URL("/system", request.url));
    }
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/login", request.url));
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/dashboard/:path*",
    "/system/:path*",
    "/domain-not-found",
  ],
};
