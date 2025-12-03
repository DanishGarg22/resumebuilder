import { NextResponse } from "next/server"

export function middleware(request) {
  const token = request.cookies.get("token")
  const { pathname } = request.nextUrl

  if (
    (pathname.startsWith("/dashboard") || pathname.startsWith("/editor") || pathname.startsWith("/preview")) &&
    !token
  ) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  if ((pathname === "/login" || pathname === "/signup") && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
