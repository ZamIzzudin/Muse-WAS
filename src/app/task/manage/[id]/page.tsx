/** @format */

import PageNavigation from "@comp/pageNavigation";
import { DetailForm } from "../../form";
import TASK from "@handler/task";

interface Props {
  params: {
    id: string;
  };
}

export default async function ManageTask({ params }: Props) {
  const { id } = params;
  const navigation = ["Task", "Task List", id];

  const { data: task } = await TASK.GET_TASK(id);
  console.log(task);
  return (
    <main>
      <section className="layout">
        <div className="section-title">
          <h1>Manage Task</h1>
        </div>
        <PageNavigation navigation={navigation} />
        <DetailForm data={task} />
      </section>
    </main>
  );
}
