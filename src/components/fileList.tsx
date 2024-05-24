/** @format */
"use client";

import Icon from "./icon";
import useDownloader from "react-use-downloader";
import styles from "@style/form.module.css";

interface Props {
  removeData: (name: string) => void;
  data: {
    name: string;
  } | null;
  remove: boolean;
  download: boolean;
}

export default function FileList({
  removeData,
  data,
  remove = false,
  download = false,
}: Props) {
  const { download: getData } = useDownloader();
  async function downloadFile(filePath: string) {
    const fileName = filePath.split("/")[2];
    getData(filePath, fileName);
  }

  if (data) {
    return (
      <div className={styles.file_list}>
        <div className={styles.file_detail}>
          <Icon variant="File" />
          <span>{data.name}</span>
        </div>
        <div className={styles.file_cta}>
          {download && (
            <button
              type="button"
              className="secondary"
              onClick={() => downloadFile(data.name)}
            >
              <Icon variant="Open" />
            </button>
          )}
          {remove && (
            <button
              type="button"
              className="secondary"
              onClick={() => removeData(data.name)}
            >
              <Icon variant="Delete" />
            </button>
          )}
        </div>
      </div>
    );
  } else {
    return <></>;
  }
}
