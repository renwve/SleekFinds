import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface User {
    role: "user" | "admin";
  }

  interface Session {
    user: {
      id: string;
      role: "user" | "admin";
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: "user" | "admin";
  }
}
