/** @format */

import { REQUEST_DATA } from "@type/anime";
import { TimeStamp2Date } from "@util/date-iso-converter";
import Image from "next/image";

import styles from "@style/components/animeCard.module.css";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  content: any;
  variant: string;
};

export default function AnimeCard({ content, variant, children }: Props) {
  if (variant === "large") {
    return (
      <div className={styles.card_large}>
        <Image
          src={content.ver_thumbnail}
          alt="anime"
          width="150"
          height="210"
        />
        <div className={styles.card_layout}>
          <div className={styles.card_content}>
            <div className={styles.card_header}>
              <span className={styles.card_status}>{content.type}</span>
              <span>
                <p>{TimeStamp2Date(content.created_at)}</p>
              </span>
            </div>
            <div className={styles.card_detail}>
              <h1>{content.title}</h1>
              {content.is_revision > 0 ? (
                <p>Revision Notes : {content.revision_notes} </p>
              ) : (
                <p>Notes : {content.prev_notes} </p>
              )}
            </div>
          </div>
          <div className={styles.card_cta}>{children}</div>
        </div>
      </div>
    );
  }
  return (
    <div
      className={styles.card_small}
      style={{ backgroundImage: `url(${content.ver_thumbnail})` }}
    >
      <div className={styles.card_layout}>
        <div className={styles.card_content}>
          <div className={styles.card_header}>
            <span className={styles.card_status}>
              {content.is_publish === 0 ? "Unpublished" : "Published"}
            </span>
          </div>
          <div className={styles.card_detail}>
            <h1>{content.title}</h1>
            <p>{content.description}</p>
          </div>
        </div>
        <div className={styles.card_cta}>{children}</div>
      </div>
    </div>
  );
}
