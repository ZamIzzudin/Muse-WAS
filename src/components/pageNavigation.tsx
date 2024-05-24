/** @format */

import styles from "@style/components/pageNavigation.module.css";

interface Props {
  navigation: string[];
}

export default function PageNavigation({ navigation }: Props) {
  function insertBetween<T>(arr: T[], separator: T): T[] {
    return arr.reduce((result: T[], item: T, index: number) => {
      if (index !== 0) {
        result.push(separator);
      }
      result.push(item);
      return result;
    }, []);
  }

  const modifiedArray: string[] = insertBetween(navigation, ">");

  return (
    <section className={styles.navigation_layout}>
      {modifiedArray.map((data, index) => (
        <span key={`navigation ${index + 1}`}>{data}</span>
      ))}
    </section>
  );
}
