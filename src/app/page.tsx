/** @format */

import { loginIsRequiredServer, authConfig } from "@util/auth";
import { getServerSession } from "next-auth";

export default async function Home() {
  await loginIsRequiredServer();
  const session = await getServerSession(authConfig);

  return (
    <main>
      <section className="layout">
        <h1>Welcome {session?.user?.name}</h1>
        <p className="highlight">Muse Indonesia CMS</p>
      </section>
    </main>
  );
}
