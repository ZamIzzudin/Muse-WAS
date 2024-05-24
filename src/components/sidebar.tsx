/** @format */

"use client";

import { usePathname } from "next/navigation";
import style from "@style/components/sidebar.module.css";
import SignOutBtn from "./signOutBtn";
import Link from "next/link";
import Image from "next/image";

import Icon from "./icon";

export default function SideBar({ user }: Readonly<{ user: any }>) {
  const pathname = usePathname();

  return (
    <aside
      className={`${style.sidebar} ${pathname === "/signin" ? style.hide : ""}`}
    >
      <ul>
        <div className={`${style.user_detail}`}>
          <Image src={user?.picture} alt="profile" width={20} height={20} />
          <div>
            <p>{user?.name}</p>
            <p>{user?.role}</p>
          </div>
        </div>
        <li
          className={`${pathname === "/" ? style.active : ""} ${
            style.link_item
          }`}
        >
          <Link href="/">
            <Icon variant="Home" />
            Home
          </Link>
        </li>
        <li
          className={`${pathname.includes("/access") ? style.active : ""} ${
            style.link_item
          }`}
        >
          <Link href="/access">
            <Icon variant="Access" />
            Access
          </Link>
        </li>
        <li
          className={`${pathname.includes("/translate") ? style.active : ""} ${
            style.link_item
          }`}
        >
          <Link href="/translate">
            <Icon variant="Translate" />
            Translate
          </Link>
        </li>
        <li
          className={`${pathname.includes("/publish") ? style.active : ""} ${
            style.link_item
          }`}
        >
          <Link href="/publish">
            <Icon variant="Publish" />
            Publish
          </Link>
        </li>
        <li
          className={`${pathname.includes("/task") ? style.active : ""} ${
            style.link_item
          }`}
        >
          <Link href="/task">
            <Icon variant="Task" />
            Task
          </Link>
        </li>
      </ul>
      <div className={style.logout_container}>
        <SignOutBtn />
      </div>
    </aside>
  );
}
