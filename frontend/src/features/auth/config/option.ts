import { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { StatusCodes } from "http-status-codes";

import { ExtendedUser } from "@/next-auth";
import { login, register } from "@/features/auth/apis/authApi";

import { ResponseType } from "@/shared/types/ApiResponse";
import { AuthType } from "@/features/auth/types";

export const options: NextAuthConfig = {
  providers: [
    Credentials({
      credentials: {
        name: {
          label: "Name",
          type: "text",
        },
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      authorize: async ({ name, email, password }) => {
        const inputName = name as string;
        const inputEmail = email as string;
        const inputPassword = password as string;

        const user: ExtendedUser = {
          id: "",
          name: "",
          email: "",
          createdAt: "",
          updatedAt: "",
          token: "",
        };

        let res: ResponseType<AuthType> | ResponseType<undefined>;

        if (!inputName || inputName === "") {
          // ログイン処理
          res = await login({
            email: inputEmail,
            password: inputPassword,
          });
        } else {
          // 新規登録処理
          res = await register({
            name: inputName,
            email: inputEmail,
            password: inputPassword,
          });
        }

        if (
          res.status !== StatusCodes.OK &&
          res.status !== StatusCodes.CREATED
        ) {
          throw new Error(res.errorMessage);
        }
        if (!res?.data) {
          throw new Error(res.errorMessage);
        }

        if (!res.data.token) {
          throw new Error("Token is not found");
        }

        user.id = res.data.user.id;
        user.name = res.data.user.name;
        user.email = res.data.user.email;
        user.createdAt = res.data.user.createdAt;
        user.updatedAt = res.data.user.updatedAt;
        user.token = res.data.token;

        return user;
      },
    }),
  ],
  pages: {
    signIn: "/",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        const u = user as ExtendedUser;
        token.id = u.id;
        token.name = u.name;
        token.email = u.email;
        token.token = u?.token;
        token.created_at = u.createdAt;
        token.updated_at = u.updatedAt;
      }
      return token;
    },
    session({ session, token }) {
      session.user = token as any; // eslint-disable-line
      return session;
    },
  },
};
