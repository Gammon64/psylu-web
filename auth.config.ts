import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login", // Para onde ir se não estiver logado
  },
  providers: [
    // Deixe vazio aqui, adicionaremos no auth.ts
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;

      // Defina rotas públicas
      const isPublicRoute =
        nextUrl.pathname === "/" ||
        nextUrl.pathname === "/login" ||
        nextUrl.pathname === "/register" ||
        nextUrl.pathname.match("/((?!api|_next/static|_next/image|favicon.ico).*)") ||
        nextUrl.pathname.startsWith("/api/auth"); // Importante liberar callback do google

      // Lógica de proteção
      if (!isPublicRoute) {
        if (isLoggedIn) return true;
        return false; // Redireciona para /login
      }

      // Se já está logado e tenta ir pro login, manda pro dashboard
      if (isPublicRoute && isLoggedIn && nextUrl.pathname === "/login") {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }

      return true;
    },
  },
} satisfies NextAuthConfig;
