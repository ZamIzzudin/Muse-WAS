/** @format */
import PageNavigation from "@comp/pageNavigation";
import PUBLISH from "@handler/publish";
import ProgressFlow from "@comp/progressFlow";
import { REQUEST_DATA } from "@type/anime";
import { EditForm } from "app/publish/form";

interface Props {
  params: {
    id: string;
  };
}

export default async function ManagePublish({ params }: Props) {
  const { id } = params;
  const navigation = ["Publish", "Published List", id];
  const response = await PUBLISH.GET_PUBLISH(id);

  const data: any = response.data?.anime;
  const progress: any = response.data?.progress;

  return (
    <main>
      <section className="layout">
        <div className="section-title">
          <h1>Manage Publish</h1>
        </div>
        <PageNavigation navigation={navigation} />
        <ProgressFlow data={progress} />
        <EditForm data={data} />
      </section>
    </main>
  );
}
