/** @format */

"use client";

import { IconContext } from "react-icons";
import { IoIosLogOut } from "react-icons/io";
import { signOut } from "next-auth/react";

import styles from "@style/components/sidebar.module.css";

export default function SignOutBtn() {
  return (
    <div className={styles.logout_btn} onClick={() => signOut()}>
      <IconContext.Provider value={{ className: "icon" }}>
        <IoIosLogOut />
      </IconContext.Provider>
    </div>
  );
}
