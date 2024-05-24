/** @format */

import TASK from "@handler/task";

import PageNavigation from "@comp/pageNavigation";
import useUser from "@hook/useUser";
import { ManageForm } from "../../form";

interface Props {
  params: {
    id: string;
  };
}

export default async function ManageTranlate({ params }: Props) {
  const { id } = params;
  const navigation = ["Translate", "Translate List", id];
  const user = await useUser();

  const response = await TASK.GET_TASK(id);

  const data: any = response.data;

  return (
    <main>
      <section className="layout">
        <div className="section-title">
          <h1>Manage Translate</h1>
        </div>
        <PageNavigation navigation={navigation} />
        <ManageForm user={user} data={data} />
      </section>
    </main>
  );
}
