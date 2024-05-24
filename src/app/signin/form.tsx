/** @format */

"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import { Form, Row, Col, InputGroup } from "react-bootstrap";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

import style from "@style/components/signin.module.css";

export default function SignInForm() {
  const router = useRouter();

  const [error, setError] = useState<string | null>(null);
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);

    const config = {
      username: data.get("username"),
      password: data.get("password"),
      redirect: false,
    };

    const signInResponse = await signIn("credentials", config);

    if (signInResponse?.error && !signInResponse) {
      console.log("Error: ", signInResponse);
      setError("Your Username or Password is wrong!");
    } else {
      router.push("/");
    }
  };

  return (
    <section className={style.form_login}>
      <h2>Sign In</h2>
      <p>Enter your username and password below to grant an access</p>
      <span>{error}</span>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Control
              name="username"
              type="text"
              placeholder="Username"
              required
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <InputGroup>
              <Form.Control
                name="password"
                type={showPass ? "text" : "password"}
                placeholder="Password"
                required
                className={style.password_form}
              />
              <button
                className={style.show_pass_btn}
                onClick={() => setShowPass(!showPass)}
                type="button"
              >
                {showPass ? <FaRegEye /> : <FaRegEyeSlash />}
              </button>
            </InputGroup>
          </Col>
        </Row>
        <Row>
          <Col className="centered mt-3 mb-4">
            <button type="submit">Sign In Now</button>
          </Col>
        </Row>
      </Form>
      <p>
        By clicking the button, you agree to our{" "}
        <a href="/">Terms of Service </a>
        and <a href="/">Privacy Policy</a>.
      </p>
    </section>
  );
}
