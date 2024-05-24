/** @format */

import { LOGIN_SERVER } from "@util/auth-options";
import Link from "next/link";
import { REQUEST_DATA } from "@type/anime";
import PUBLISH from "@handler/publish";

import AnimeCard from "@comp/animeCard";
import PageNavigation from "@comp/pageNavigation";
import { PrimaryTrigger } from "@comp/triggerBtn";
import Icon from "@comp/icon";
import { DeleteForm } from "./form";

export default async function Publish() {
  await LOGIN_SERVER();
  const { data: publishs } = await PUBLISH.GET_PUBLISHS();

  const navigation = ["Publish", "Publish List"];

  return (
    <main>
      <section className="layout">
        <div className="section-title">
          <h1>Publish List</h1>
          <Link href="publish/create">
            <button>
              <Icon variant="Add" />
            </button>
          </Link>
        </div>
        <PageNavigation navigation={navigation} />
        <section className="horizontal-container">
          {publishs?.map((publish: REQUEST_DATA) => (
            <AnimeCard key={publish.id} content={publish} variant="small">
              <Link href={`/publish/manage/${publish.id}`}>
                <button>
                  <Icon variant="Edit" />
                </button>
              </Link>
              <div>
                <PrimaryTrigger
                  title="Delete Access"
                  placeholder={<Icon variant="Delete" />}
                >
                  <DeleteForm data={publish} />
                </PrimaryTrigger>
              </div>
            </AnimeCard>
          ))}
        </section>
      </section>
    </main>
  );
}
