/** @format */
"use client";

import { USER_DATA } from "@type/user";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { ROLE } from "@static/constant";

import styles from "@style/form.module.css";
import modal from "@style/components/modal.module.css";
import DEFAULT_PP from "@asset/default_pp.jpg";

export function CreateForm() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    username: "",
    display_name: "",
    role: "Admin",
  });

  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault();

      const response = await fetch("/api/access", {
        method: "POST",
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
          <Form.Label>Email</Form.Label>
          <Form.Control
            name="email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            type="email"
            required
          />
          <span>
            Make sure the email is active and can receive a notification email.
          </span>
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
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
          <Form.Label>Username</Form.Label>
          <Form.Control
            name="username"
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            type="text"
            required
          />
          <span>This username will later be used to log in</span>
        </Form.Group>
        <Form.Group>
          <Form.Label>Display Name</Form.Label>
          <Form.Control
            name="display_name"
            onChange={(e) => setForm({ ...form, display_name: e.target.value })}
            type="text"
            required
          />
          <span>This name will later be displayed</span>
        </Form.Group>
        <Form.Group>
          <Form.Label>Role</Form.Label>
          <Form.Select
            name="role"
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            required
          >
            {ROLE.map((each) => (
              <option value={each}>{each}</option>
            ))}
          </Form.Select>
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
          src={DEFAULT_PP}
          height={100}
          width={100}
          alt="display picture"
          className="rounded"
        />
        <div>
          <h5>{form.display_name}</h5>
          <p className={styles.role_display}>{form.role}</p>
          <p>
            {form.email} • {form.username}
          </p>
        </div>
      </section>
    </section>
  );
}

export function EditForm({ data }: { data: USER_DATA }) {
  const [form, setForm] = useState({ ...data, password: "" });

  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault();

      const response = await fetch(`/api/access?id=${data.id}`, {
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
          <Form.Label>Email</Form.Label>
          <Form.Control
            value={form.email}
            name="email"
            type="email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <span>
            Make sure the email is active and can receive a notification email.
          </span>
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            type="text"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <span>
            Make sure its not a word that can be found in a dictionary or the
            name of a person, character, product, or organization to avoiding a
            brute. force.
          </span>
        </Form.Group>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control
            value={form.username}
            name="username"
            type="text"
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            required
          />
          <span>This username will later be used to log in</span>
        </Form.Group>
        <Form.Group>
          <Form.Label>Display Name</Form.Label>
          <Form.Control
            value={form.display_name}
            name="display_name"
            type="text"
            onChange={(e) => setForm({ ...form, display_name: e.target.value })}
            required
          />
          <span>This name will later be displayed</span>
        </Form.Group>
        <Form.Group>
          <Form.Label>Role</Form.Label>
          <Form.Select
            defaultValue={form.role}
            name="role"
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            required
          >
            {ROLE.map((each) => (
              <option selected={each === form.role} value={each}>
                {each}
              </option>
            ))}
          </Form.Select>
          <span>
            Each role has different authority, make sure to determine it
            correctly
          </span>
        </Form.Group>
        <div className={styles.form_cta}>
          <button type="submit">Edit</button>
          <Link href="/access">
            <button className="secondary">Cancel</button>
          </Link>
        </div>
      </Form>
      <section className={styles.form_display}>
        <Image
          src={form.display_picture}
          height={100}
          width={100}
          alt="display picture"
          className="rounded"
        />
        <div>
          <h5>{form.display_name}</h5>
          <p className={styles.role_display}>{form.role}</p>
          <p>
            {form.email} • {form.username}
          </p>
        </div>
      </section>
    </section>
  );
}

export function DeleteForm({ data }: { data: USER_DATA }) {
  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/access?id=${data.id}`, {
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
      <p>Are you sure want to delete access of {data.display_name}</p>
      <div className={modal.modal_cta}>
        <button onClick={handleDelete}>Delete</button>
        <button className="secondary">Cancel</button>
      </div>
    </div>
  );
}
