"use client";
import { FC } from "react";
import { Controller } from "react-hook-form";

import { useTodoEditTemplate } from "./useTodoEditTemplate";

import { BaseLayout } from "@/shared/components/layout";
import { InputFormSection, TextAreaSection,CommonButton } from "@/shared/components/ui";

import { TodoType } from "@/features/todos/types";
import styles from "./style.module.css";

type TodoEditTemplateProps = {
  todo: TodoType;
};

export const TodoEditTemplate: FC<TodoEditTemplateProps> = ({ todo }) => {
  const { control, errors, handleEditSubmit } = useTodoEditTemplate({
    todo,
  });

  return (
    <BaseLayout title={"TodoEdit"}>
      <div></div>
      {!!todo && (
        <form className={styles.container} onSubmit={handleEditSubmit}>
          <div className={styles.area}>
            <Controller
              name="title"
              render={({ field }) => (
                <InputFormSection
                  placeholder={"Title"}
                  errorMessage={errors.title?.message}
                  {...field}
                />
              )}
              control={control}
            />
          </div>
          <div className={styles.area}>
            <Controller
              name="content"
              render={({ field }) => (
                <TextAreaSection
                  placeholder={"Content"}
                  errorMessage={errors.content?.message}
                  {...field}
                />
              )}
              control={control}
            />
          </div>
          <div className={styles.area}>
            <CommonButton type="submit">{"Edit Todo"}</CommonButton>
          </div>
        </form>
      )}
    </BaseLayout>
  );
};
