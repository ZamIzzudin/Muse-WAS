/** @format */

import { quantum } from "ldrs";

import styles from "@style/components/loading.module.css";

quantum.register();

export default function Loading() {
  return (
    <section className={styles.loading_layout}>
      <l-quantum size="45" speed="1.75" color="white"></l-quantum>
    </section>
  );
}
