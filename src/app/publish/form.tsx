/** @format */
"use client";

import { Form } from "react-bootstrap";
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import { REQUEST_DATA } from "@type/anime";
import FileList from "@comp/fileList";
import FileUploadForm from "@comp/fileUpload";

import { GENRE } from "@static/constant";

import styles from "@style/form.module.css";
import modal from "@style/components/modal.module.css";
import DEFAULT_IMG from "@asset/card.jpg";

interface Form {
  title: string;
  genre: string;
  studio: string;
  season: string;
  episode: string;
  description: string;
  translator: string;
  notes: string;
  ver_thumbnail: File | null;
  hor_thumbnail: File | null;
  raw_files: File[];
}

export function CreateForm({ user }: { user: any }) {
  const [form, setForm] = useState<Form>({
    title: "-",
    genre: "Action",
    studio: "-",
    season: "-",
    episode: "-",
    description: "",
    translator: "",
    notes: "",
    ver_thumbnail: null,
    hor_thumbnail: null,
    raw_files: [],
  });

  const [Translators, setTranslator] = useState([{ id: "", display_name: "" }]);

  const [SelectedImage, setSelectedImage] = useState<any>();

  function getHorThumb(data: any) {
    setForm({ ...form, hor_thumbnail: data });
  }

  function removeHorThumb() {
    setForm({ ...form, hor_thumbnail: null });
  }

  function getVerThumb(data: any) {
    const imageUrl = URL.createObjectURL(data);

    setSelectedImage(imageUrl);
    setForm({ ...form, ver_thumbnail: data });
  }

  function removeVerThumb() {
    setSelectedImage(DEFAULT_IMG);
    setForm({ ...form, ver_thumbnail: null });
  }

  function getRAWFiles(data: any) {
    const temp = [...form.raw_files, data];
    setForm({ ...form, raw_files: temp });
  }

  function removeRAWFile(name: string) {
    const filtered = form.raw_files.filter((file) => name != file.name);
    setForm({ ...form, raw_files: filtered });
  }

  async function getTranslators() {
    try {
      const response = await fetch("/api/access/role?type=Translator", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const { status, message, data } = await response.json();

      if (status !== "success") {
        throw new Error(message);
      }
      setTranslator(data);
      setForm({ ...form, translator: data[0].id });
    } catch (error: any) {
      //handle error
      console.log(error.message);
    }
  }

  async function handleSubmit(e: any) {
    try {
      e.preventDefault();

      const formData = new FormData();

      formData.append("title", form.title);
      formData.append("genre", form.genre);
      formData.append("studio", form.studio);
      formData.append("season", form.season);
      formData.append("episode", form.episode);
      formData.append("description", form.description);
      formData.append("translator", form.translator);
      formData.append("admin", user.id);
      formData.append("notes", form.notes);
      if (
        form.ver_thumbnail &&
        form.hor_thumbnail &&
        form.raw_files.length > 0
      ) {
        formData.append("ver_thumbnail", form.ver_thumbnail);
        formData.append("hor_thumbnail", form.hor_thumbnail);
        form.raw_files.forEach((file) => formData.append("raw_files[]", file));
      }

      const response = await fetch("/api/publish", {
        method: "POST",
        body: formData,
      });

      const { status, message } = await response.json();

      if (status !== "success") {
        throw new Error(message);
      }
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
      <Form onSubmit={(e) => handleSubmit(e)}>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control
            name="title"
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            type="text"
            required
          />
          <span>
            Make sure the email is active and can receive a notification email.
          </span>
        </Form.Group>
        <Form.Group>
          <Form.Label>Genre</Form.Label>
          <Form.Select
            name="genre"
            onChange={(e) => setForm({ ...form, genre: e.target.value })}
            required
          >
            {GENRE.map((each) => (
              <option value={each}>{each}</option>
            ))}
          </Form.Select>
          <span>
            Each role has different authority, make sure to determine it
            correctly
          </span>
        </Form.Group>
        <Form.Group>
          <Form.Label>Studio</Form.Label>
          <Form.Control
            name="studio"
            onChange={(e) => setForm({ ...form, studio: e.target.value })}
            type="text"
            required
          />
          <span>
            Make sure its not a word that can be found in a dictionary or the
            name of a person, character, product, or organization to avoiding a
            brute. force.
          </span>
        </Form.Group>
        <Form.Group>
          <Form.Label>Season</Form.Label>
          <Form.Control
            name="season"
            onChange={(e) => setForm({ ...form, season: e.target.value })}
            type="text"
            required
          />
          <span>This username will later be used to log in</span>
        </Form.Group>
        <Form.Group>
          <Form.Label>Episode</Form.Label>
          <Form.Control
            name="display_name"
            onChange={(e) => setForm({ ...form, episode: e.target.value })}
            type="text"
            required
          />
          <span>This name will later be displayed</span>
        </Form.Group>
        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control
            name="display_name"
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            type="text"
            required
          />
          <span>This name will later be displayed</span>
        </Form.Group>
        <Form.Group>
          <Form.Label>Vertical Thumbnail</Form.Label>
          <div className={styles.file_list_container}>
            <FileList
              download={false}
              data={form.ver_thumbnail}
              remove={true}
              removeData={removeVerThumb}
            />
          </div>

          <FileUploadForm getData={getVerThumb} />
          <span>
            Each role has different authority, make sure to determine it
            correctly
          </span>
        </Form.Group>
        <Form.Group>
          <Form.Label>Horizontal Thumbnail</Form.Label>
          <div className={styles.file_list_container}>
            <FileList
              download={false}
              data={form.hor_thumbnail}
              remove={true}
              removeData={removeHorThumb}
            />
          </div>

          <FileUploadForm getData={getHorThumb} />
          <span>
            Each role has different authority, make sure to determine it
            correctly
          </span>
        </Form.Group>
        <Form.Group>
          <Form.Label>Assigned To</Form.Label>
          <Form.Select
            name="translator"
            onChange={(e) => setForm({ ...form, translator: e.target.value })}
            required
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
          <Form.Label>RAW File</Form.Label>
          <div className={styles.file_list_container}>
            {form.raw_files.map((file) => (
              <FileList
                download={false}
                data={file}
                remove={true}
                removeData={removeRAWFile}
              />
            ))}
          </div>

          <FileUploadForm getData={getRAWFiles} />
          <span>
            Each role has different authority, make sure to determine it
            correctly
          </span>
        </Form.Group>
        <div className={styles.form_cta}>
          <button type="submit">Add</button>
          <Link href="/access">
            <button className="secondary">Cancel</button>
          </Link>
        </div>
      </Form>
      <section className={styles.form_display}>
        <Image
          src={SelectedImage}
          height={180}
          width={120}
          alt="display picture"
        />
        <div>
          <h5>{form.title}</h5>
          <p className={styles.role_display}>{form.genre}</p>
          <p>
            {form.studio} • {form.season} • {form.episode}
          </p>
          <p>{form.description}</p>
        </div>
      </section>
    </section>
  );
}

export function EditForm({ data }: { data: any }) {
  const [form, setForm] = useState(data);
  const [SelectedImage, setSelectedImage] = useState<any>(data.ver_thumbnail);

  function getHorThumb(data: any) {
    setForm({ ...form, hor_thumbnail: data });
  }

  function removeHorThumb() {
    setForm({ ...form, hor_thumbnail: null });
  }

  function getVerThumb(data: any) {
    const imageUrl = URL.createObjectURL(data);

    setSelectedImage(imageUrl);
    setForm({ ...form, ver_thumbnail: data });
  }

  function removeVerThumb() {
    setSelectedImage(DEFAULT_IMG);
    setForm({ ...form, ver_thumbnail: null });
  }

  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault();

      const response = await fetch(`/api/publish?id=${data.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const { status, message } = await response.json();

      if (status !== "success") {
        throw new Error(message);
      }
    } catch (error: any) {
      //handle error
      console.log(error.message);
    }
  };

  return (
    <section className={styles.form_container}>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control
            value={form.title}
            name="title"
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            type="text"
            required
          />
          <span>
            Make sure the email is active and can receive a notification email.
          </span>
        </Form.Group>
        <Form.Group>
          <Form.Label>Genre</Form.Label>
          <Form.Select
            value={form.genre}
            name="genre"
            onChange={(e) => setForm({ ...form, genre: e.target.value })}
            required
          >
            {GENRE.map((each) => (
              <option selected={each === form.genre} value={each}>
                {each}
              </option>
            ))}
          </Form.Select>
          <span>
            Each role has different authority, make sure to determine it
            correctly
          </span>
        </Form.Group>
        <Form.Group>
          <Form.Label>Studio</Form.Label>
          <Form.Control
            value={form.studio}
            name="studio"
            onChange={(e) => setForm({ ...form, studio: e.target.value })}
            type="text"
            required
          />
          <span>
            Make sure its not a word that can be found in a dictionary or the
            name of a person, character, product, or organization to avoiding a
            brute. force.
          </span>
        </Form.Group>
        <Form.Group>
          <Form.Label>Season</Form.Label>
          <Form.Control
            value={form.season}
            name="season"
            onChange={(e) => setForm({ ...form, season: e.target.value })}
            type="text"
            required
          />
          <span>This username will later be used to log in</span>
        </Form.Group>
        <Form.Group>
          <Form.Label>Episode</Form.Label>
          <Form.Control
            value={form.episode}
            name="episode"
            onChange={(e) => setForm({ ...form, episode: e.target.value })}
            type="text"
            required
          />
          <span>This name will later be displayed</span>
        </Form.Group>
        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control
            value={form.description}
            name="description"
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            type="text"
            required
          />
          <span>This name will later be displayed</span>
        </Form.Group>
        <Form.Group>
          <Form.Label>Vertical Thumbnail</Form.Label>
          <div className={styles.file_list_container}>
            <FileList
              download={false}
              data={{ name: form.ver_thumbnail }}
              remove={true}
              removeData={removeVerThumb}
            />
          </div>

          <FileUploadForm getData={getVerThumb} />
          <span>
            Each role has different authority, make sure to determine it
            correctly
          </span>
        </Form.Group>
        <Form.Group>
          <Form.Label>Horizontal Thumbnail</Form.Label>
          <div className={styles.file_list_container}>
            <FileList
              download={false}
              data={{ name: form.hor_thumbnail }}
              remove={true}
              removeData={removeHorThumb}
            />
          </div>

          <FileUploadForm getData={getHorThumb} />
          <span>
            Each role has different authority, make sure to determine it
            correctly
          </span>
        </Form.Group>
        <div className={styles.form_cta}>
          <button type="submit">Add</button>
          <Link href="/access">
            <button className="secondary">Cancel</button>
          </Link>
        </div>
      </Form>
      <section className={styles.form_display}>
        <Image
          src={SelectedImage}
          height={180}
          width={120}
          alt="display picture"
        />
        <div>
          <h5>{form.title}</h5>
          <p className={styles.role_display}>{form.genre}</p>
          <p>
            {form.studio} • {form.season} • {form.episode}
          </p>
          <p>{form.description}</p>
        </div>
      </section>
    </section>
  );
}

export function DeleteForm({ data }: { data: REQUEST_DATA }) {
  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/publish?id=${data.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const { status, message } = await response.json();

      if (status !== "success") {
        throw new Error(message);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };
  return (
    <div className={modal.body}>
      <p>Are you sure want to delete data of {data?.title}</p>
      <div className={modal.modal_cta}>
        <button onClick={handleDelete}>Delete</button>
        <button className="secondary">Cancel</button>
      </div>
    </div>
  );
}
