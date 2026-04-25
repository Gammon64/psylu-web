import { auth } from "@/lib/auth"; // seu auth.ts do next-auth
import { NextResponse } from "next/server";
import { ProfileServiceBuilder } from "./modules/profile";

export default auth(async (req) => {
  const isLoggedIn = !!req.auth;

  const isPublicRoute = req.nextUrl.pathname === "/login";

  if (!isLoggedIn && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (isLoggedIn) {
    const profile = await ProfileServiceBuilder().getByUserId(
      req.auth?.user.id,
    );

    const isProfilePage = req.nextUrl.pathname === "/profile";

    if (!profile && !isProfilePage)
      return NextResponse.redirect(new URL("/profile", req.url));
  }

  if (isLoggedIn && isPublicRoute) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
