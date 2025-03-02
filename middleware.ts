import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const isAuthenticated = !!req.cookies.get("auth-token");

  if (isAuthenticated && req.nextUrl.pathname === "/login") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login"], // ใช้ Middleware เฉพาะหน้า /login
};
