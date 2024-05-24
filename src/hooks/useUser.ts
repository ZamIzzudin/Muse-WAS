/** @format */

import { getServerSession } from "next-auth";
import { AUTH_OPTIONS } from "@util/auth-options";

export default async function useUser() {
  const session: any = await getServerSession(AUTH_OPTIONS);

  return (
    session?.user || {
      id: "",
      name: "",
      role: "",
      username: "",
      image:
        "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
      picture:
        "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
      email: "",
    }
  );
}
