"use client";
import { FC } from "react";
import Link from "next/link";
import styles from "./style.module.css";

type NavigationLinkProps = {
  title: string;
  linkPath: string;
};

export const NavigationLink: FC<NavigationLinkProps> = ({
  title,
  linkPath,
}) => (
  <li className={styles.li}>
    <Link href={linkPath}>{title}</Link>
  </li>
);
