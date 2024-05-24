/** @format */
import PageNavigation from "@comp/pageNavigation";
import useUser from "@hook/useUser";
import { CreateForm } from "../form";

export default async function CreateAccess() {
  const navigation = ["Publish", "Publish List", "Create"];
  const user = await useUser();

  return (
    <main>
      <section className="layout">
        <div className="section-title">
          <h1>Create Publish</h1>
        </div>
        <PageNavigation navigation={navigation} />
        <CreateForm user={user} />
      </section>
    </main>
  );
}
