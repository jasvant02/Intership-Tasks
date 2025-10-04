// middleware.js
import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  if (!token && pathname.startsWith("/post")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (!token && pathname.startsWith("/employees")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/post/:path*", "/employees/:path*"],
};
