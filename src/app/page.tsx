/** @format */

import { LOGIN_SERVER } from "@util/auth-options";
import useUser from "@hook/useUser";
import AnalyticsChart from "@comp/analyticChartYT";

export default async function Home() {
  await LOGIN_SERVER();
  const user = await useUser();

  return (
    <main>
      <section className="layout-home">
        <AnalyticsChart channelId="UCxxnxya_32jcKj4yN1_kD7A" />
      </section>
    </main>
  );
}
