import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const userCookie = request.cookies.get("user")
  const isAuthPage = ["/login", "/signup", "/forgot-password"].includes(request.nextUrl.pathname)
  const isDashboardPage = request.nextUrl.pathname.startsWith("/dashboard")

  if (userCookie && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  if (!userCookie && isDashboardPage) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/signup", "/forgot-password"],
}
