/** @format */

"use client";

import Image from "next/image";
import { Form } from "react-bootstrap";
import { TimeStamp2Date, TimeDifference } from "@util/date-iso-converter";
import styles from "@style/form.module.css";

export function DetailForm({ data }: { data: any }) {
  return (
    <section className={styles.form_container}>
      <Form>
        <div className={styles.image_container}>
          <Image
            height={140}
            width={100}
            src={data.ver_thumbnail}
            alt="vertical thumbnail"
          />
          <Image
            height={140}
            width={200}
            src={data.hor_thumbnail}
            alt="horizontal thumbnail"
          />
        </div>

        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control value={data.title} name="title" type="text" disabled />
          <span>
            Make sure the email is active and can receive a notification email.
          </span>
        </Form.Group>
        <Form.Group>
          <Form.Label>Genre</Form.Label>
          <Form.Control value={data.genre} name="genre" type="text" disabled />
          <span>
            Each role has different authority, make sure to determine it
            correctly
          </span>
        </Form.Group>
        <Form.Group>
          <Form.Label>Studio</Form.Label>
          <Form.Control
            value={data.studio}
            name="studio"
            type="text"
            disabled
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
            value={data.season}
            name="season"
            type="text"
            disabled
          />
          <span>This username will later be used to log in</span>
        </Form.Group>
        <Form.Group>
          <Form.Label>Episode</Form.Label>
          <Form.Control
            value={data.episode}
            name="episode"
            type="text"
            disabled
          />
          <span>This name will later be displayed</span>
        </Form.Group>
        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control
            value={data.description}
            name="description"
            type="text"
            disabled
          />
          <span>This name will later be displayed</span>
        </Form.Group>
      </Form>
      <div className={styles.form_display}>
        <Image
          height={70}
          width={70}
          src={data.display_picture}
          alt="display picture"
          className="rounded"
        />
        <h5>{data.display_name}</h5>
        <div className={styles.status_layout}>
          <div>{data?.type}</div>
          <div>{data?.status}</div>
        </div>
        <div>
          <p>Started : {TimeStamp2Date(data.started_at)}</p>
          <p>Finished : {TimeStamp2Date(data.finished_at)}</p>
          <p>
            Work Progress : {TimeDifference(data.started_at, data.finished_at)}
          </p>
        </div>
      </div>
    </section>
  );
}
