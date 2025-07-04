import { useCallback } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useLoginMutation } from "@/features/auth/hooks/useLoginMutation";
import { NAVIGATION_LIST } from "@/shared/constants/navigation";

const schema = z.object({
  email: z.string().email("メールアドレスの形式で入力してください"),
  password: z.string().min(8, "8文字以上で入力してください"),
});

export const useLoginTemplate = () => {
  const router = useRouter();
  const loginMutation = useLoginMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLoginSubmit = handleSubmit(
    useCallback(
      async (values: z.infer<typeof schema>) => {
        const { email, password } = values;

        try {
          const response = await loginMutation.mutateAsync({
            email,
            password,
          });

          if (response.data) {
            // NextAuth.jsで認証状態を更新
            const result = await signIn("credentials", {
              email,
              password,
              redirect: false,
            });

            if (result?.error) {
              setError("email", {
                type: "manual",
                message: result.error,
              });
              return;
            }

            router.push(NAVIGATION_LIST.TOP);
          } else {
            setError("email", {
              type: "manual",
              message: response.errorMessage || "ログインに失敗しました",
            });
          }
        } catch (error) {
          setError("email", {
            type: "manual",
            message: `ログインに失敗しました: ${error}`,
          });
        }
      },
      [setError, router, loginMutation]
    )
  );

  return {
    control,
    errors,
    handleLoginSubmit,
    isLoading: loginMutation.isPending,
  };
};
