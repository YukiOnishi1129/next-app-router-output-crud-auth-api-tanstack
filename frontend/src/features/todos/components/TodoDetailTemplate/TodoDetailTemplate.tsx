"use client";

import { FC } from "react";
import { BaseLayout } from "@/shared/components/layout";
import { InputForm, TextArea } from "@/shared/components/ui";
import { useTodoQuery } from "@/features/todos/hooks";
import styles from "./style.module.css";

type TodoDetailTemplateProps = {
  id: string;
};

export const TodoDetailTemplate: FC<TodoDetailTemplateProps> = ({ id }) => {
  const { data: todoData, isLoading, error } = useTodoQuery(id);

  if (isLoading) return <BaseLayout title={"TodoDetail"}><div>Loading...</div></BaseLayout>;
  if (error) return <BaseLayout title={"TodoDetail"}><div>Error: {error.message}</div></BaseLayout>;

  const todo = todoData?.data;

  return (
    <BaseLayout title={"TodoDetail"}>
      {!!todo && (
        <div className={styles.container}>
          <div className={styles.area}>
            <InputForm disabled value={todo.title} placeholder={"Title"} />
          </div>
          <div className={styles.area}>
            <TextArea disabled value={todo.content} placeholder={"Content"} />
          </div>
        </div>
      )}
    </BaseLayout>
  );
};
