import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateTodoMutation } from "@/features/todos/hooks";
import { NAVIGATION_PATH } from "@/shared/constants/navigation";

const schema = z.object({
  title: z
    .string()
    .min(1, "タイトルは必須です。")
    .max(10, "10文字以内で入力してください。"),
  content: z.string().optional(),
});

export const useTodoCreateTemplate = () => {
  const navigate = useRouter();
  const createTodoMutation = useCreateTodoMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { title: "", content: undefined },
  });

  const handleAddSubmit = handleSubmit(
    useCallback(
      async (values: z.infer<typeof schema>) => {
        try {
          await createTodoMutation.mutateAsync({
            title: values.title,
            content: values.content,
          });
          navigate.push(NAVIGATION_PATH.TOP);
        } catch (error) {
          alert(`Failed to create todo: ${error}`);
        }
      },
      [navigate, createTodoMutation]
    )
  );

  return {
    control,
    errors,
    handleAddSubmit,
    isCreating: createTodoMutation.isPending,
  };
};
