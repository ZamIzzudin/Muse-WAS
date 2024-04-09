/** @format */

import { denialSignIn } from "@util/auth";
import SignInForm from "@comp/signInForm";

import "bootstrap/dist/css/bootstrap.min.css";
import style from "@style/components/signin.module.css";

export default async function SignIn() {
  await denialSignIn();

  return (
    <main className={style.layout}>
      <SignInForm />
    </main>
  );
}
