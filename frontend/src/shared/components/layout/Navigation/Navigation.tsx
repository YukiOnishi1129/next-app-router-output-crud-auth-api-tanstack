"use client";
import { useRouter } from "next/navigation";
import { NavigationLink } from "@/shared/components/ui/NavigationLink";
import { NAVIGATION_PATH } from "@/shared/constants/navigation";
import { logout } from "@/features/auth/apis/authApi";
import styles from "./style.module.css";

export const Navigation = () => {
  const router = useRouter();
  const handleLogOut = async () => {
    await logout();

    router.push(NAVIGATION_PATH.LOGIN);
  };
  return (
    <div className={styles.header}>
      <h1 className={styles.title}>Todo List</h1>
      <nav className={styles.nav}>
        <ul className={styles.ul}>
          <NavigationLink title={"Top"} linkPath={NAVIGATION_PATH.TOP} />
          <NavigationLink title={"Create"} linkPath={NAVIGATION_PATH.CREATE} />
          <li className={styles.li}>
            <button className={styles.button} onClick={handleLogOut}>
              SignOut
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};
