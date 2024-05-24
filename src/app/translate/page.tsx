/** @format */

import { LOGIN_SERVER } from "@util/auth-options";
import Link from "next/link";

import AnimeCard from "@comp/animeCard";
import PageNavigation from "@comp/pageNavigation";
import TASK from "@handler/task";
import useUser from "@hook/useUser";

export default async function Translate() {
  await LOGIN_SERVER();
  const user = await useUser();
  const { data: tasks } = await TASK.GET_USER_TASK(user?.id || "");

  const navigation = ["Translate", "Translate List"];

  return (
    <main>
      <section className="layout">
        <div className="section-title">
          <h1>Translate List</h1>
        </div>
        <PageNavigation navigation={navigation} />
        <section className="horizontal-container">
          {tasks?.map((task: any) => (
            <AnimeCard key={task.task_id} content={task} variant="large">
              <Link href={`/translate/manage/${task.task_id}`}>
                <button>Details</button>
              </Link>
            </AnimeCard>
          ))}
        </section>
      </section>
    </main>
  );
}
