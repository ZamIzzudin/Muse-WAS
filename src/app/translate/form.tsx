/** @format */

"use client";

import FileList from "@comp/fileList";
import FileUploadForm from "@comp/fileUpload";
import { Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import Image from "next/image";

import styles from "@style/form.module.css";

interface Form {
  notes: string;
  user_next_task_id: string;
  processed_files: File[];
}

export function ManageForm({ user, data }: { data: any; user: any }) {
  switch (user?.role) {
    case "System Admin":
      return null;
    case "Admin":
      return data.type === "Need Publish" ? (
        <PublishForm data={data} />
      ) : (
        <UploadRAWForm data={data} />
      );
    case "Translator":
      return <TranslatorForm data={data} />;
    case "Editor":
      return <EditorForm data={data} />;
    case "Quality Assurance":
      return <QAForm data={data} />;
    default:
      return <></>;
  }
}

function PublishForm({ data }: { data: any }) {
  const [files, setFiles] = useState<File[]>([]);
  function getData(data: any) {
    setFiles([...files, data]);
  }

  function removeData(name: string) {
    const filtered = files.filter((file) => name != file.name);
    setFiles(filtered);
  }

  return (
    <section className={styles.form_container}>
      <Form></Form>
      <section className={styles.form_display}>
        <div>
          <h1>Publish</h1>
        </div>
      </section>
    </section>
  );
}

function UploadRAWForm({ data }: { data: any }) {
  const [form, setForm] = useState<Form>({
    notes: "",
    user_next_task_id: "",
    processed_files: [],
  });

  const [Translators, setTranslators] = useState([
    { id: "", display_name: "" },
  ]);

  function getData(data: any) {
    const temp = [...form.processed_files, data];
    setForm({ ...form, processed_files: temp });
  }

  function removeData(name: string) {
    const filtered = form.processed_files.filter((file) => name != file.name);
    setForm({ ...form, processed_files: filtered });
  }

  async function endTask() {
    try {
      const formData = new FormData();
      formData.append("type", "Need Editing");
      formData.append("anime_id", data.anime_id);
      formData.append("user_next_task_id", form.user_next_task_id);
      formData.append("notes", form.notes);
      formData.append("is_revision", data.is_revision);
      formData.append("next_task_rel_id", data.next_task_rel_id);

      if (form.processed_files.length > 0) {
        form.processed_files.forEach((file) =>
          formData.append("processed_files[]", file)
        );
      }

      const response = await fetch(`/api/task?id=${data.task_id}&type=fd`, {
        method: "PUT",
        body: formData,
      });

      const temp = await response.json();
      // if (status !== "success") {
      //   throw new Error(message);
      // }
    } catch (error: any) {
      console.log(error.message);
    }
  }

  async function revisionTask() {
    try {
      const payload = {
        type: "Revision",
        notes: form.notes,
        prev_task_id: data.prev_task_rel_id,
      };

      const response = await fetch(`/api/task?id=${data.task_id}&type=json`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const { status, message } = await response.json();

      if (status !== "success") {
        throw new Error(message);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  }

  async function getTranslators() {
    try {
      const response = await fetch("/api/access/role?type=Translator", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const { status, message, data: data_response } = await response.json();

      if (status !== "success") {
        throw new Error(message);
      }

      const selected = data_response.filter(
        (each: any) => each.id === data.assigned_to
      );

      setTranslators(selected);
      setForm({ ...form, user_next_task_id: data_response[0].id });
    } catch (error: any) {
      //handle error
      console.log(error.message);
    }
  }

  useEffect(() => {
    getTranslators();
  }, []);

  return (
    <section className={styles.form_container}>
      <Form>
        {data?.is_revision > 0 && (
          <Form.Group>
            <Form.Label>Revision Notes</Form.Label>
            <Form.Control
              value={data.revision_notes}
              name="notes"
              type="text"
              disabled
            />
            <span>This name will later be displayed</span>
          </Form.Group>
        )}
        <Form.Group>
          <Form.Label>Processed File</Form.Label>
          <div className={styles.file_list_container}>
            {form.processed_files.map((file) => (
              <FileList
                download={false}
                data={file}
                remove={true}
                removeData={removeData}
              />
            ))}
          </div>
          <FileUploadForm getData={getData} />
          <span>
            Each role has different authority, make sure to determine it
            correctly
          </span>
        </Form.Group>
        <Form.Group>
          <Form.Label>Notes</Form.Label>
          <Form.Control
            name="notes"
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            type="text"
            required
          />
          <span>This name will later be displayed</span>
        </Form.Group>
        <Form.Group>
          <Form.Label>Assigned To</Form.Label>
          <Form.Select
            name="translator"
            onChange={(e) =>
              setForm({ ...form, user_next_task_id: e.target.value })
            }
            disabled
          >
            {Translators.map((Translator) => (
              <option value={Translator?.id}>{Translator?.display_name}</option>
            ))}
          </Form.Select>
          <span>
            Each role has different authority, make sure to determine it
            correctly
          </span>
        </Form.Group>
        <div className={styles.form_cta}>
          {(data?.status === "On Progress" || data?.status === "Revision") && (
            <button onClick={() => endTask()} type="button">
              Done
            </button>
          )}
          {data?.prev_task_rel_id !== "-" &&
            data?.prev_task_rel_id !== null &&
            data?.status !== "Done" && (
              <button
                type="button"
                onClick={() => revisionTask()}
                className="secondary"
              >
                Revision
              </button>
            )}
        </div>
      </Form>
      <section className={styles.form_display}>
        <Image
          src={data?.ver_thumbnail}
          height={180}
          width={120}
          alt="display picture"
        />
        <div>
          <h5>{data?.title}</h5>
          <div className={styles.status_layout}>
            <div>{data?.type}</div>
            <div>{data?.status}</div>
          </div>
          {data?.is_revision > 0 && (
            <p className={styles.revision_notes}>
              <span>Revision : </span>
              {data.revision_notes}
            </p>
          )}
          <p className={styles.notes}>
            <span>Notes : </span>
            {data.prev_notes}
          </p>
          {data?.raw_files && (
            <div className={styles.file_list_container}>
              {JSON.parse(data?.raw_files).map((file: string) => (
                <FileList
                  download={true}
                  data={{ name: file }}
                  remove={false}
                  removeData={removeData}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </section>
  );
}

function TranslatorForm({ data }: { data: any }) {
  const [form, setForm] = useState<Form>({
    notes: "",
    user_next_task_id: "",
    processed_files: [],
  });

  const [Editors, setEditors] = useState([{ id: "", display_name: "" }]);

  function getData(data: any) {
    const temp = [...form.processed_files, data];
    setForm({ ...form, processed_files: temp });
  }

  function removeData(name: string) {
    const filtered = form.processed_files.filter((file) => name != file.name);
    setForm({ ...form, processed_files: filtered });
  }

  async function startTask() {
    try {
      const payload = {
        type: "Start",
      };

      const response = await fetch(`/api/task?id=${data.task_id}&type=json`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const { status, message } = await response.json();

      if (status !== "success") {
        throw new Error(message);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  }

  async function endTask() {
    try {
      const formData = new FormData();
      formData.append("type", "Need Editing");
      formData.append("anime_id", data.anime_id);
      formData.append("user_next_task_id", form.user_next_task_id);
      formData.append("notes", form.notes);
      formData.append("is_revision", data.is_revision);
      formData.append("next_task_rel_id", data.next_task_rel_id);

      if (form.processed_files.length > 0) {
        form.processed_files.forEach((file) =>
          formData.append("processed_files[]", file)
        );
      }

      const response = await fetch(`/api/task?id=${data.task_id}&type=fd`, {
        method: "PUT",
        body: formData,
      });

      const temp = await response.json();
      // if (status !== "success") {
      //   throw new Error(message);
      // }
    } catch (error: any) {
      console.log(error.message);
    }
  }

  async function revisionTask() {
    try {
      const payload = {
        type: "Revision",
        notes: form.notes,
        prev_task_id: data.prev_task_rel_id,
      };

      const response = await fetch(`/api/task?id=${data.task_id}&type=json`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const { status, message } = await response.json();

      if (status !== "success") {
        throw new Error(message);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  }

  async function getEditors() {
    try {
      const response = await fetch("/api/access/role?type=Editor", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const { status, message, data: data_response } = await response.json();

      if (status !== "success") {
        throw new Error(message);
      }
      setEditors(data_response);

      if (data.is_revision === 1) {
        const selected = data_response.filter(
          (each: any) => each.id === data.assigned_to
        );

        setEditors(selected);
      }
      setForm({ ...form, user_next_task_id: data_response[0].id });
    } catch (error: any) {
      //handle error
      console.log(error.message);
    }
  }

  useEffect(() => {
    getEditors();
  }, []);

  return (
    <section className={styles.form_container}>
      <Form>
        {data?.is_revision > 0 && (
          <Form.Group>
            <Form.Label>Revision Notes</Form.Label>
            <Form.Control
              value={data.revision_notes}
              name="notes"
              type="text"
              disabled
            />
            <span>This name will later be displayed</span>
          </Form.Group>
        )}
        <Form.Group>
          <Form.Label>Processed File</Form.Label>
          <div className={styles.file_list_container}>
            {form.processed_files.map((file) => (
              <FileList
                download={false}
                data={file}
                remove={true}
                removeData={removeData}
              />
            ))}
          </div>
          <FileUploadForm getData={getData} />
          <span>
            Each role has different authority, make sure to determine it
            correctly
          </span>
        </Form.Group>
        <Form.Group>
          <Form.Label>Notes</Form.Label>
          <Form.Control
            name="notes"
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            type="text"
            required
          />
          <span>This name will later be displayed</span>
        </Form.Group>
        <Form.Group>
          <Form.Label>Assigned To</Form.Label>
          <Form.Select
            name="editor"
            onChange={(e) =>
              setForm({ ...form, user_next_task_id: e.target.value })
            }
            required={data.is_revision === 0 ? true : false}
            disabled={data.is_revision === 0 ? false : true}
          >
            {Editors.map((Editor) => (
              <option value={Editor?.id}>{Editor?.display_name}</option>
            ))}
          </Form.Select>
          <span>
            Each role has different authority, make sure to determine it
            correctly
          </span>
        </Form.Group>
        <div className={styles.form_cta}>
          {data?.status === "Assigned" && (
            <button onClick={() => startTask()} type="button">
              Start
            </button>
          )}
          {(data?.status === "On Progress" || data?.status === "Revision") && (
            <button onClick={() => endTask()} type="button">
              Done
            </button>
          )}
          {data?.prev_task_rel_id !== "-" &&
            data?.prev_task_rel_id !== null &&
            data?.status !== "Done" && (
              <button
                type="button"
                onClick={() => revisionTask()}
                className="secondary"
              >
                Revision
              </button>
            )}
        </div>
      </Form>
      <section className={styles.form_display}>
        <Image
          src={data?.ver_thumbnail}
          height={180}
          width={120}
          alt="display picture"
        />
        <div>
          <h5>{data?.title}</h5>
          <div className={styles.status_layout}>
            <div>{data?.type}</div>
            <div>{data?.status}</div>
          </div>
          {data?.is_revision > 0 && (
            <p className={styles.revision_notes}>
              <span>Revision : </span>
              {data.revision_notes}
            </p>
          )}
          <p className={styles.notes}>
            <span>Notes : </span>
            {data.prev_notes}
          </p>
          {data?.raw_files && (
            <div className={styles.file_list_container}>
              {JSON.parse(data?.raw_files).map((file: string) => (
                <FileList
                  download={true}
                  data={{ name: file }}
                  remove={false}
                  removeData={removeData}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </section>
  );
}

function EditorForm({ data }: { data: any }) {
  const [form, setForm] = useState<Form>({
    notes: "",
    user_next_task_id: "",
    processed_files: [],
  });
  const [QAs, setQAs] = useState([{ id: "", display_name: "" }]);

  function getData(data: any) {
    const temp = [...form.processed_files, data];
    setForm({ ...form, processed_files: temp });
  }

  function removeData(name: string) {
    const filtered = form.processed_files.filter((file) => name != file.name);
    setForm({ ...form, processed_files: filtered });
  }

  async function startTask() {
    try {
      const payload = {
        type: "Start",
      };

      const response = await fetch(`/api/task?id=${data.task_id}&type=json`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const { status, message } = await response.json();

      if (status !== "success") {
        throw new Error(message);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  }

  async function endTask() {
    try {
      const formData = new FormData();
      formData.append("type", "Need Review");
      formData.append("anime_id", data.anime_id);
      formData.append("user_next_task_id", form.user_next_task_id);
      formData.append("notes", form.notes);
      formData.append("is_revision", data.is_revision);

      if (form.processed_files.length > 0) {
        form.processed_files.forEach((file) =>
          formData.append("processed_files[]", file)
        );
      }

      const response = await fetch(`/api/task?id=${data.task_id}&type=fd`, {
        method: "PUT",
        body: formData,
      });

      const temp = await response.json();
      // if (status !== "success") {
      //   throw new Error(message);
      // }
    } catch (error: any) {
      console.log(error.message);
    }
  }

  async function revisionTask() {
    try {
      const payload = {
        type: "Revision",
        notes: form.notes,
        prev_task_id: data.prev_task_rel_id,
      };

      const response = await fetch(`/api/task?id=${data.task_id}&type=json`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const { status, message } = await response.json();

      if (status !== "success") {
        throw new Error(message);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  }

  async function getQAs() {
    try {
      const response = await fetch("/api/access/role?type=Quality_Assurance", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const { status, message, data: data_response } = await response.json();

      if (status !== "success") {
        throw new Error(message);
      }
      setQAs(data_response);

      if (data.is_revision === 1) {
        const selected = data_response.filter(
          (each: any) => each.id === data.assigned_to
        );

        setQAs(selected);
      }

      setForm({ ...form, user_next_task_id: data[0].id });
    } catch (error: any) {
      //handle error
      console.log(error.message);
    }
  }

  useEffect(() => {
    getQAs();
  }, []);

  return (
    <section className={styles.form_container}>
      <Form>
        <Form.Group>
          <Form.Label>Processed File</Form.Label>
          <div className={styles.file_list_container}>
            {form.processed_files.map((file) => (
              <FileList
                download={false}
                data={file}
                remove={true}
                removeData={removeData}
              />
            ))}
          </div>
          <FileUploadForm getData={getData} />
          <span>
            Each role has different authority, make sure to determine it
            correctly
          </span>
        </Form.Group>
        <Form.Group>
          <Form.Label>Notes</Form.Label>
          <Form.Control
            name="notes"
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            type="text"
            required
          />
          <span>This name will later be displayed</span>
        </Form.Group>
        <Form.Group>
          <Form.Label>Assigned To</Form.Label>
          <Form.Select
            name="qa"
            onChange={(e) =>
              setForm({ ...form, user_next_task_id: e.target.value })
            }
            required={data.is_revision === 0 ? true : false}
            disabled={data.is_revision === 0 ? false : true}
          >
            {QAs.map((QA) => (
              <option value={QA?.id}>{QA?.display_name}</option>
            ))}
          </Form.Select>
          <span>
            Each role has different authority, make sure to determine it
            correctly
          </span>
        </Form.Group>
        <div className={styles.form_cta}>
          {data?.status === "Assigned" && (
            <button onClick={() => startTask()} type="button">
              Start
            </button>
          )}
          {(data?.status === "On Progress" || data?.status === "Revision") && (
            <button onClick={() => endTask()} type="button">
              Done
            </button>
          )}
          {data?.prev_task_rel_id !== "-" &&
            data?.prev_task_rel_id !== null &&
            data?.status !== "Done" && (
              <button
                type="button"
                onClick={() => revisionTask()}
                className="secondary"
              >
                Revision
              </button>
            )}
        </div>
      </Form>
      <section className={styles.form_display}>
        <Image
          src={data?.ver_thumbnail}
          height={180}
          width={120}
          alt="display picture"
        />
        <div>
          <h5>{data?.title}</h5>
          <div className={styles.status_layout}>
            <div>{data?.type}</div>
            <div>{data?.status}</div>
          </div>
          {data?.is_revision > 0 && (
            <p className={styles.revision_notes}>
              <span>Revision : </span>
              {data.revision_notes}
            </p>
          )}
          <p className={styles.notes}>
            <span>Notes : </span>
            {data.prev_notes}
          </p>
          {data?.raw_files && (
            <div className={styles.file_list_container}>
              {JSON.parse(data?.raw_files).map((file: string) => (
                <FileList
                  download={true}
                  data={{ name: file }}
                  remove={false}
                  removeData={removeData}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </section>
  );
}

function QAForm({ data }: { data: any }) {
  const [form, setForm] = useState<Form>({
    notes: "",
    user_next_task_id: "",
    processed_files: [],
  });
  const [Admins, setAdmins] = useState([{ id: "", display_name: "" }]);

  function removeData() {
    return;
  }

  async function startTask() {
    try {
      const payload = {
        type: "Start",
      };

      const response = await fetch(`/api/task?id=${data.task_id}&type=json`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const { status, message } = await response.json();

      if (status !== "success") {
        throw new Error(message);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  }

  async function endTask() {
    try {
      const formData = new FormData();
      formData.append("type", "Need Publish");
      formData.append("anime_id", data.anime_id);
      formData.append("user_next_task_id", form.user_next_task_id);
      formData.append("notes", form.notes);
      formData.append("is_revision", data.is_revision);

      formData.append("processed_files[]", data.raw_files);

      const response = await fetch(`/api/task?id=${data.task_id}&type=fd`, {
        method: "PUT",
        body: formData,
      });

      const temp = await response.json();
      // if (status !== "success") {
      //   throw new Error(message);
      // }
    } catch (error: any) {
      console.log(error.message);
    }
  }

  async function revisionTask() {
    try {
      const payload = {
        type: "Revision",
        notes: form.notes,
        prev_task_id: data.prev_task_rel_id,
      };

      const response = await fetch(`/api/task?id=${data.task_id}&type=json`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const { status, message } = await response.json();

      if (status !== "success") {
        throw new Error(message);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  }

  async function getAdmins() {
    try {
      const response = await fetch("/api/access/role?type=Admin", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const { status, message, data } = await response.json();

      if (status !== "success") {
        throw new Error(message);
      }
      setAdmins(data);
      setForm({ ...form, user_next_task_id: data[0].id });
    } catch (error: any) {
      //handle error
      console.log(error.message);
    }
  }

  useEffect(() => {
    getAdmins();
  }, []);
  return (
    <section className={styles.form_container}>
      <Form>
        <Form.Group>
          <Form.Label>Notes</Form.Label>
          <Form.Control
            name="notes"
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            type="text"
            required
          />
          <span>This name will later be displayed</span>
        </Form.Group>
        <Form.Group>
          <Form.Label>Assigned To</Form.Label>
          <Form.Select
            name="admin"
            onChange={(e) =>
              setForm({ ...form, user_next_task_id: e.target.value })
            }
            required
          >
            {Admins.map((Admin) => (
              <option value={Admin?.id}>{Admin?.display_name}</option>
            ))}
          </Form.Select>
          <span>
            Each role has different authority, make sure to determine it
            correctly
          </span>
        </Form.Group>
        <div className={styles.form_cta}>
          {data?.status === "Assigned" && (
            <button onClick={() => startTask()} type="button">
              Start
            </button>
          )}
          {(data?.status === "On Progress" || data?.status === "Revision") && (
            <button onClick={() => endTask()} type="button">
              Done
            </button>
          )}
          {data?.prev_task_rel_id !== "-" &&
            data?.prev_task_rel_id !== null &&
            data?.status !== "Done" && (
              <button
                type="button"
                onClick={() => revisionTask()}
                className="secondary"
              >
                Revision
              </button>
            )}
        </div>
      </Form>
      <section className={styles.form_display}>
        <Image
          src={data?.ver_thumbnail}
          height={180}
          width={120}
          alt="display picture"
        />
        <div>
          <h5>{data?.title}</h5>
          <div className={styles.status_layout}>
            <div>{data?.type}</div>
            <div>{data?.status}</div>
          </div>
          {data?.is_revision > 0 && (
            <p className={styles.revision_notes}>
              <span>Revision : </span>
              {data.revision_notes}
            </p>
          )}
          <p className={styles.notes}>
            <span>Notes : </span>
            {data.prev_notes}
          </p>
          {data?.raw_files && (
            <div className={styles.file_list_container}>
              {JSON.parse(data?.raw_files).map((file: string) => (
                <FileList
                  download={true}
                  data={{ name: file }}
                  remove={false}
                  removeData={removeData}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </section>
  );
}
