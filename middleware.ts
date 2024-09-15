import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const publicURL = path === "/login" || path === "/signup";

  const token = request.cookies.get("token")?.value || "";

  // If the user is trying to access a public URL and they don't have a token, allow access
  if (publicURL && !token) {
    return NextResponse.next();
  }

  // If the user is trying to access a public URL and they have a token, redirect to profile
  if (publicURL && token) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  // If the user is trying to access a protected URL and they don't have a token, redirect to login
  if (!publicURL && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If the user is trying to access a protected URL and they have a token, allow access
  return NextResponse.next();
}

export const config = {
  matcher: ["/profile", "/home", "/login", "/signup"],
};
