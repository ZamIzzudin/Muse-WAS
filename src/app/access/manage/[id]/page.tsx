/** @format */
import PageNavigation from "@comp/pageNavigation";
import USER from "@handler/user";
import { USER_DATA } from "@type/user";
import { EditForm } from "../../form";

interface Props {
  params: {
    id: string;
  };
}

export default async function ManageAccess({ params }: Props) {
  const { id } = params;
  const navigation = ["Access", "Access List", id];
  const response = await USER.GET_USER(id);

  const data: USER_DATA = response.data;
  return (
    <main>
      <section className="layout">
        <div className="section-title">
          <h1>Edit Access</h1>
        </div>
        <PageNavigation navigation={navigation} />
        <EditForm data={data} />
      </section>
    </main>
  );
}
