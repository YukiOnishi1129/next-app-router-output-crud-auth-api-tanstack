"use client";

import { useMemo, FC, useCallback, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { StatusCodes } from "http-status-codes";

import { InputFormSection } from "@/shared/components/ui";
import { BaseLayout } from "@/shared/components/layout";
import { TodoList } from "@/features/todos/components/TodoList";
import { TodoType } from "@/features/todos/types";
import { deleteTodo } from "@/features/todos/apis/todoApi";
import styles from "./style.module.css";

const schema = z.object({
  keyword: z.string(),
});

type TodoListTemplateProps = {
  data: Array<TodoType>;
};

export const TodoListTemplate: FC<TodoListTemplateProps> = ({ data }) => {
  const [originTodoList, setOriginTodoList] = useState(data);
  const { control, watch } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { keyword: "" },
  });
  const searchKeyword = watch("keyword");

  /* 表示用TodoList */
  const showTodoList = useMemo(() => {
    const regexp = new RegExp("^" + searchKeyword, "i");
    return originTodoList.filter((todo) => {
      // 検索キーワードに部分一致したTodoだけを一覧表示する
      return todo.title.match(regexp);
    });
    // useMemoの第二引数([originTodoList, searchKeyword])に依存して処理が実行される
    // originTodoListとsearchKeywordの値が変更される度にfilterの検索処理が実行
    // ただし結果が前回と同じならキャッシュを返却し処理は実行されない(無駄な処理を省いている)
    // 詳しくはuseMemoを調べてください。
  }, [originTodoList, searchKeyword]);

  const handleDeleteTodo = useCallback(async (id: string, title: string) => {
    if (window.confirm(`Do you want to delete "${title}"?`)) {
      const res = await deleteTodo({
        id,
      });
      if (res.status !== StatusCodes.NO_CONTENT) {
        alert(`${res.status} ${res.errorCode}: ${res.errorMessage}`);
        return;
      }
      // 削除成功時、一覧から削除
      setOriginTodoList((prev) => prev.filter((todo) => todo.id !== id));
    }
  }, []);

  return (
    <BaseLayout title={"TodoList"}>
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
    </BaseLayout>
  );
};
