import { NextRequest, NextResponse } from "next/server";
import { checkSubdomain } from "@/utils/checkSubdomain";

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // =========================================
    // DOMAIN NOT FOUND PAGE
    // =========================================

    if (pathname === "/domain-not-found") {
        return NextResponse.next();
    }

    // =========================================
    // GET HOST
    // =========================================

    // const host = request.headers.get("host");

    // if (!host) {
    //     return NextResponse.rewrite(
    //         new URL("/domain-not-found", request.url)
    //     );
    // }

    // const hostname = host.split(":")[0];

    // console.log("Hostname:", hostname);

    // let subdomain: string | null = null;

    // =========================================
    // LOCAL
    // =========================================
    //
    // sabbbir.localhost
    // localhost
    //
    // =========================================

    // if (hostname.endsWith(".localhost")) {
    //     const parts = hostname.split(".");

    //     // sabbbir.localhost
    //     if (parts.length === 2 && parts[0]) {
    //         subdomain = parts[0];

    //         console.log("Local Subdomain:", subdomain);
    //     }
    // }

    // // localhost without subdomain
    // else if (
    //     hostname === "localhost" ||
    //     hostname === "127.0.0.1"
    // ) {
    //     subdomain = null;
    // }

    // // =========================================
    // // PRODUCTION
    // // =========================================

    // else if (hostname.endsWith(".itvata.com")) {
    //     const parts = hostname.split(".");

    //     // itvata.com
    //     if (parts.length >= 3) {
    //         subdomain = parts[0];

    //         console.log(
    //             "Production Subdomain:",
    //             subdomain
    //         );
    //     }
    // }

    // =========================================
    // SUBDOMAIN MUST EXIST
    // =========================================

    // if (!subdomain) {
    //     return NextResponse.rewrite(
    //         new URL("/domain-not-found", request.url)
    //     );
    // }

    // =========================================
    // CHECK SUBDOMAIN FROM BACKEND
    // =========================================

    // const isValid = await checkSubdomain(subdomain);

    // console.log("Subdomain valid:", isValid);

    // if (!isValid) {
    //     return NextResponse.rewrite(
    //         new URL("/domain-not-found", request.url)
    //     );
    // }

    // =========================================
    // AUTH CHECK
    // =========================================

    const token = request.cookies.get("token")?.value;

    // No token
    if (!token) {
        if (pathname === "/login") {
            return NextResponse.next();
        }

        return NextResponse.redirect(
            new URL("/login", request.url)
        );
    }

    // Already logged in
    if (pathname === "/login") {
        return NextResponse.redirect(
            new URL("/dashboard", request.url)
        );
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/",
        "/login",
        "/dashboard/:path*",
        "/domain-not-found",
    ],
};