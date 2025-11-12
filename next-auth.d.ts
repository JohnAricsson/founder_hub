// types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    id: number;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  }

  interface Profile {
    id: string;
    login: string;
    bio?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
  }
}
