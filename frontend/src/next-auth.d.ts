import { type DefaultSession } from "next-auth";

// 独自のログインユーザーの型を定義
export type ExtendedUser = DefaultSession["user"] & {
  id: string;
  name: string;
  email: string;
  token: string;
  createdAt: string;
  updatedAt: string;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
