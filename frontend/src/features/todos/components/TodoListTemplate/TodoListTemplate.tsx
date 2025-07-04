"use client";

import { useMemo, FC, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { InputFormSection } from "@/shared/components/ui";
import { TodoList } from "@/features/todos/components/TodoList";
import {
  useTodoListQuery,
  useDeleteTodoMutation,
} from "@/features/todos/hooks";
import styles from "./style.module.css";

const schema = z.object({
  keyword: z.string(),
});

export const TodoListTemplate: FC = () => {
  // サーバーコンポーネントと同じqueryKeyでアクセス → キャッシュからデータを取得（API通信なし）
  const { data: todosData, isLoading, error } = useTodoListQuery();
  const deleteOtoMutation = useDeleteTodoMutation();
  const { control, watch } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { keyword: "" },
  });
  const searchKeyword = watch("keyword");

  const showTodoList = useMemo(() => {
    const todos = todosData?.data?.todos || [];
    const regexp = new RegExp("^" + searchKeyword, "i");
    return todos.filter((todo) => {
      return todo.title.match(regexp);
    });
  }, [todosData?.data?.todos, searchKeyword]);

  const handleDeleteTodo = useCallback(
    async (id: string, title: string) => {
      if (window.confirm(`Do you want to delete "${title}"?`)) {
        try {
          await deleteOtoMutation.mutateAsync(id);
        } catch (error) {
          alert(`Failed to delete todo: ${error}`);
        }
      }
    },
    [deleteOtoMutation]
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className={styles.container}>
      {/* Todo検索フォームエリア */}
      <div className={styles.area}>
        <Controller
          name="keyword"
          render={({ field }) => (
            <InputFormSection placeholder={"Search Keyword"} {...field} />
          )}
          control={control}
        />
      </div>
      {/* Todoリスト一覧表示 */}
      <div className={styles.area}>
        {showTodoList.length > 0 && (
          <TodoList todoList={showTodoList} onDeleteTodo={handleDeleteTodo} />
        )}
      </div>
    </div>
  );
};
