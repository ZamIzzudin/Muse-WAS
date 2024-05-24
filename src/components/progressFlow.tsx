/** @format */
"use client";

import Image from "next/image";

import styles from "@style/components/progressFlow.module.css";

export default function ProgressFlow({ data = [] }: { data: any }) {
  return (
    <div className={styles.progress_layout}>
      {data?.map((each: any) => (
        <div className={styles.progress_card}>
          <h5>{each?.type}</h5>
          <div className={styles.user_layout}>
            <Image
              src={each.display_picture}
              width={30}
              height={30}
              alt="display picture"
            />
            <div className={styles.user_detail}>
              <span>{each.display_name}</span>
              <span>{each.role}</span>
            </div>
          </div>
          <span className={styles.flow_status}>{each?.status}</span>
        </div>
      ))}
    </div>
  );
}
