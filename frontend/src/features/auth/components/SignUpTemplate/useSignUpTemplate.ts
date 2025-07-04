import { useCallback } from "react";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { signUp } from "@/features/auth/actions/auth";

import { NAVIGATION_LIST } from "@/shared/constants/navigation";

const schema = z.object({
  name: z.string().min(1, "1文字以上で入力してください"),
  email: z.string().email("メールアドレスの形式で入力してください"),
  password: z.string().min(8, "8文字以上で入力してください"),
  password_confirmation: z.string().min(8, "8文字以上で入力してください"),
});

export const useSignUpTemplate = () => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
  });

  const handleRegisterSubmit = handleSubmit(
    useCallback(
      async (values: z.infer<typeof schema>) => {
        if (values.password !== values.password_confirmation) {
          setError("password", {
            type: "manual",
            message: "確認用パスワードと一致しません",
          });
          return;
        }
        const { name, email, password } = values;
        const res = await signUp(name, email, password);
        if (res.error?.message) {
          setError("email", {
            type: "manual",
            message: res.error?.message,
          });
          return;
        }
        router.push(NAVIGATION_LIST.TOP);
      },
      [router, setError]
    )
  );

  return {
    control,
    errors,
    handleRegisterSubmit,
  };
};
