/** @format */

import { Anime } from "@type/anime";
import Image from "next/image";

import styles from "@style/components/animeCard.module.css";
import { Children, ReactNode } from "react";

type Props = {
  children: ReactNode;
  content: Anime;
  variant: string;
};

export default function AnimeCard({ content, variant, children }: Props) {
  if (variant === "large") {
    return (
      <div className={styles.card_large}>
        <Image src={content.thumbnail} alt="anime" width="150" />
        <div className={styles.card_content}>
          <span className={styles.card_status}>{content.status}</span>
          <div className={styles.card_detail}>
            <h1>{content.name}</h1>
            <p>{content.released_date}</p>
            <p>Notes : - </p>
          </div>
          <div className={styles.card_cta}>{children}</div>
        </div>
      </div>
    );
  }
  return (
    <div
      className={styles.card_small}
      style={{ backgroundImage: `url(${content.thumbnail.src})` }}
    >
      <div className={styles.card_content}>
        <span className={styles.card_status}>{content.status}</span>
        <h1>{content.name}</h1>
        <p>{content.description}</p>
        {children}
      </div>
    </div>
  );
}
