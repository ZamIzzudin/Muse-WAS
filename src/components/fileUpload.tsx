/** @format */

"use client";

import styles from "@style/form.module.css";

interface FileUploadFormProps {
  getData: (file: File) => void;
  data?: { name: string };
}

export default function FileUploadForm({ getData }: FileUploadFormProps) {
  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    getData(file);
  };

  return (
    <div className={styles.file_upload}>
      <input type="file" onChange={handleFileChange} />
    </div>
  );
}
