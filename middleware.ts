import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  if (pathname === "/login" || pathname.startsWith("/public") || pathname.startsWith("/_next")) {
    return NextResponse.next()
  }

  // Client-side auth via sessionStorage doesn't require server-side validation in middleware
  // Just protect API routes - frontend routing is handled by client-side checks
  const authHeader = request.headers.get("x-auth-token")

  if (!authHeader && pathname.startsWith("/api")) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|public).*)"],
}
