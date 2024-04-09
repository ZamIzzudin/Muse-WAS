/** @format */

import { loginIsRequiredServer } from "@util/auth";

import { Anime } from "@type/anime";

import AnimeCard from "@comp/animeCard";
import { CreateBtn } from "@comp/createBtn";
import Card from "@asset/card.jpg";

export default async function Translate() {
  await loginIsRequiredServer();

  const data: Anime[] = [
    {
      id: "1",
      name: "Kono Subarashii Sekai ni Shukufuku wo! 3",
      thumbnail: Card,
      status: "Need Translate",
      released_date: "10 January 2024",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    },
    {
      id: "2",
      name: "Kono Subarashii Sekai ni Shukufuku wo! 3",
      thumbnail: Card,
      status: "Need Edit (Revision)",
      released_date: "10 January 2024",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    },
    {
      id: "3",
      name: "Kono Subarashii Sekai ni Shukufuku wo! 3",
      thumbnail: Card,
      status: "Need Review",
      released_date: "10 January 2024",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    },
    {
      id: "4",
      name: "Kono Subarashii Sekai ni Shukufuku wo! 3",
      thumbnail: Card,
      status: "Reviewed",
      released_date: "10 January 2024",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    },
  ];

  return (
    <main>
      <section className="layout">
        <div className="section-title">
          <h1>Translate List</h1>
          <CreateBtn />
        </div>
        <section className="horizontal-container">
          {data?.map((each: Anime, index) => (
            <AnimeCard key={index} content={each} variant="large" />
          ))}
        </section>
      </section>
    </main>
  );
}
