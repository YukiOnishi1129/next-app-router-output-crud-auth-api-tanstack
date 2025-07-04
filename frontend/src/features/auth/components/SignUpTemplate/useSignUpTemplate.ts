import { useCallback } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useSignUp } from "@/features/auth/hooks/useAuth";
import { NAVIGATION_LIST } from "@/shared/constants/navigation";

const schema = z.object({
  name: z.string().min(1, "1文字以上で入力してください"),
  email: z.string().email("メールアドレスの形式で入力してください"),
  password: z.string().min(8, "8文字以上で入力してください"),
  password_confirmation: z.string().min(8, "8文字以上で入力してください"),
});

export const useSignUpTemplate = () => {
  const router = useRouter();
  const signUpMutation = useSignUp();
  
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
        
        try {
          const response = await signUpMutation.mutateAsync({
            name,
            email,
            password,
          });
          
          if (response.data) {
            // 登録成功後、自動的にログインする
            const result = await signIn("credentials", {
              email,
              password,
              redirect: false,
            });
            
            if (result?.error) {
              setError("email", {
                type: "manual",
                message: "登録は成功しましたが、ログインに失敗しました",
              });
              return;
            }
            
            router.push(NAVIGATION_LIST.TOP);
          } else {
            setError("email", {
              type: "manual",
              message: response.errorMessage || "登録に失敗しました",
            });
          }
        } catch (error) {
          setError("email", {
            type: "manual",
            message: `登録に失敗しました: ${error}`,
          });
        }
      },
      [router, setError, signUpMutation]
    )
  );

  return {
    control,
    errors,
    handleRegisterSubmit,
    isLoading: signUpMutation.isPending,
  };
};
