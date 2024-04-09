/** @format */

import styles from "@style/components/filterStatus.module.css";

export default function FilterStatus() {
  return (
    <section className={styles.filter_container}>
      <div className={styles.filter_item}>
        <span>Assigned</span>
        <span>2</span>
      </div>
      <div className={styles.filter_item}>
        <span>On Progress</span>
        <span>5</span>
      </div>
      <div className={styles.filter_item}>
        <span>Done</span>
        <span>10</span>
      </div>
      <div className={styles.filter_item}>
        <span>Need Revision</span>
        <span>1</span>
      </div>
    </section>
  );
}
