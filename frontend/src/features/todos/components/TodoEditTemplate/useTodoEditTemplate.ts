import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useUpdateTodoMutation } from "@/features/todos/hooks";
import { NAVIGATION_PATH } from "@/shared/constants/navigation";
import { TodoType } from "@/features/todos/types";

const schema = z.object({
  title: z
    .string()
    .min(1, "タイトルは必須です。")
    .max(10, "10文字以内で入力してください。"),
  content: z.string().optional(),
});

type UseTodoEditTemplateParams = {
  todo: TodoType;
};

export const useTodoEditTemplate = ({ todo }: UseTodoEditTemplateParams) => {
  const navigate = useRouter();
  const updateTodoMutation = useUpdateTodoMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { title: todo?.title, content: todo?.content },
  });

  const handleEditSubmit = handleSubmit(
    useCallback(
      async (values: z.infer<typeof schema>) => {
        if (!todo) return;
        try {
          await updateTodoMutation.mutateAsync({
            id: todo.id,
            title: values.title,
            content: values.content,
          });
          navigate.push(NAVIGATION_PATH.TOP);
        } catch (error) {
          alert(`Failed to update todo: ${error}`);
        }
      },
      [navigate, todo, updateTodoMutation]
    )
  );

  return {
    control,
    errors,
    handleEditSubmit,
    isUpdating: updateTodoMutation.isPending,
  };
};
