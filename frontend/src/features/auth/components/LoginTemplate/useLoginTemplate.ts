import { useCallback } from "react";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { signIn } from "@/features/auth/actions/auth";

import { NAVIGATION_LIST } from "@/shared/constants/navigation";

const schema = z.object({
  email: z.string().email("メールアドレスの形式で入力してください"),
  password: z.string().min(8, "8文字以上で入力してください"),
});

export const useLoginTemplate = () => {
  const router = useRouter();
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
        const res = await signIn(email, password);
        if (res.error?.message) {
          setError("email", {
            type: "manual",
            message: res.error?.message,
          });
          return;
        }
        router.push(NAVIGATION_LIST.TOP);
      },

      [setError, router]
    )
  );

  return {
    control,
    errors,
    handleLoginSubmit,
  };
};
