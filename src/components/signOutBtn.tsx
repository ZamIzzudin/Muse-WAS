/** @format */

"use client";

import Icon from "./icon";
import { signOut } from "next-auth/react";

import styles from "@style/components/sidebar.module.css";

export default function SignOutBtn() {
  return (
    <div className={styles.logout_btn} onClick={() => signOut()}>
      <Icon variant="Logout" />
    </div>
  );
}
