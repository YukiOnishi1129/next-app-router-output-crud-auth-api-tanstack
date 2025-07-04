import NextAuth from "next-auth";
import { options } from "@/features/auth/config/option";

export const { handlers, signIn, signOut, auth } = NextAuth(options);
