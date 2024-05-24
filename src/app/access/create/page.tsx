/** @format */
import PageNavigation from "@comp/pageNavigation";
import { CreateForm } from "../form";

export default function CreateAccess() {
  const navigation = ["Access", "Access List", "Create"];

  return (
    <main>
      <section className="layout">
        <div className="section-title">
          <h1>Create Access</h1>
        </div>
        <PageNavigation navigation={navigation} />
        <CreateForm />
      </section>
    </main>
  );
}
