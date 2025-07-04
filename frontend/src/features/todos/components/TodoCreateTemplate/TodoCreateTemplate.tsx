"use client";
import { Controller } from "react-hook-form";

import { InputFormSection, TextAreaSection, CommonButton } from "@/shared/components/ui";

import { useTodoCreateTemplate } from "./useTodoCreateTemplate";
import styles from "./style.module.css";

export const TodoCreateTemplate = () => {
  const { control, errors, handleAddSubmit } = useTodoCreateTemplate();

  return (
    <form className={styles.container} onSubmit={handleAddSubmit}>
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
        <CommonButton type="submit">{"Create Todo"}</CommonButton>
      </div>
    </form>
  );
};
