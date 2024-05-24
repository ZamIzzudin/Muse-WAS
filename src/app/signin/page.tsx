/** @format */

import { DENIAL_LOGIN } from "@util/auth-options";
import SignInForm from "./form";
import Image from "next/image";

import "bootstrap/dist/css/bootstrap.min.css";
import style from "@style/components/signin.module.css";
import Logo from "@asset/logo_vector.png";

export default async function SignIn() {
  await DENIAL_LOGIN();

  return (
    <main className={style.layout}>
      <section className={style.grid_display}>
        <div className={style.display_logo}>
          <Image src={Logo} alt="logo muse" width={50} height={50} />
          <span>Muse Indonesia</span>
        </div>
        <div>
          <p>
            Acme Inc “This library has saved me countless hours of work and
            helped me deliver stunning designs to my clients faster than ever
            before.”
          </p>
          <h5>Sofia Davis</h5>
        </div>
      </section>
      <section className={style.grid_form}>
        <SignInForm />
      </section>
    </main>
  );
}
