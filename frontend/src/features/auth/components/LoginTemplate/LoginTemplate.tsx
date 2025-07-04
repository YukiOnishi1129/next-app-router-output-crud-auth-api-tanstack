"use client";

import { FC } from "react";
import Link from "next/link";
import { Controller } from "react-hook-form";

import { NAVIGATION_LIST } from "@/shared/constants/navigation";

import { InputFormSection, CommonButton } from "@/shared/components/ui";

import { useLoginTemplate } from "./useLoginTemplate";

import styles from "./style.module.css";

export const LoginTemplate: FC = () => {
  const { control, errors, handleLoginSubmit } = useLoginTemplate();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Login</h1>
      <form className={styles.form} onSubmit={handleLoginSubmit}>
        <div className={styles.area}>
          <Controller
            name="email"
            render={({ field }) => (
              <InputFormSection
                type="email"
                placeholder="email"
                errorMessage={errors.email?.message}
                {...field}
              />
            )}
            control={control}
          />
        </div>
        <div className={styles.area}>
          <Controller
            name="password"
            render={({ field }) => (
              <InputFormSection
                type="password"
                placeholder="password"
                errorMessage={errors.password?.message}
                {...field}
              />
            )}
            control={control}
          />
        </div>
        <div className={styles.area}>
          <CommonButton type="submit">{"Login"}</CommonButton>
        </div>
        <div className={styles.link}>
          <Link href={NAVIGATION_LIST.SIGNUP}>&lt;&lt; to signup page</Link>
        </div>
      </form>
    </div>
  );
};
