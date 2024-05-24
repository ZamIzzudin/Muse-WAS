/** @format */

import styles from "@style/components/filterStatus.module.css";

export default function FilterStatus({
  data,
  active,
}: {
  data: any;
  active: string;
}) {
  return (
    <div className={styles.filter_layout}>
      <section className={styles.filter_container}>
        {data.map((each: any) => (
          <div
            className={`${styles.filter_item} ${
              active === each.status && styles.active
            }`}
          >
            <span>{each.status}</span>
            <span>{each.total}</span>
          </div>
        ))}
      </section>
    </div>
  );
}
