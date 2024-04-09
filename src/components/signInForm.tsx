/** @format */

"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { Form, Row, Col, InputGroup } from "react-bootstrap";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

import style from "@style/components/signin.module.css";
import Logo from "@asset/logo.png";

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
      <Image src={Logo} alt="Logo Muse" width={100} height={100} />
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
              />
              <button
                className={style.show_pass_btn}
                onClick={() => setShowPass(!showPass)}
                type="button"
              >
                {showPass ? <FaRegEye /> : <FaRegEyeSlash />}{" "}
              </button>
            </InputGroup>
          </Col>
        </Row>
        <Row>
          <Col className="centered mt-3">
            <button type="submit">Sign In</button>
          </Col>
        </Row>
      </Form>
    </section>
  );
}
