"use server";

import { AuthError } from "next-auth";

import { signIn as NextAuthSignIn, auth as NextAuth } from "@/features/auth/config/auth";

export const getSession = async () => await NextAuth();

export const signIn = async (email: string, password: string) => {
  try {
    await NextAuthSignIn("credentials", {
      email,
      password,
      redirect: false,
    });

    return {
      isSuccess: true,
      message: "ログインに成功しました。",
    };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            isSuccess: false,
            error: {
              message: "メールアドレスまたはパスワードが間違っています。",
            },
          };
        case "CallbackRouteError":
          return {
            isSuccess: false,
            error: {
              message: error.cause?.err?.message,
            },
          };
        default:
      }
    }
    return {
      isSuccess: false,
      error: {
        message: "ログインに失敗しました。",
      },
    };
  }
};

export const signUp = async (name: string, email: string, password: string) => {
  try {
    await NextAuthSignIn("credentials", {
      name,
      email,
      password,
      redirect: false,
    });

    return {
      isSuccess: true,
      message: "会員登録に成功しました。",
    };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CallbackRouteError":
          return {
            isSuccess: false,
            error: {
              message: error.cause?.err?.message,
            },
          };
        default:
      }
    }
    return {
      isSuccess: false,
      error: {
        message: "会員登録に失敗しました。",
      },
    };
  }
};
