/** @format */

import { NextResponse } from "next/server";
import USER from "@handler/user";

export async function GET(req: any) {
  const role = req.nextUrl.searchParams.get("type");

  const response = await USER.GET_USERS_BY_ROLE(role.replace("_", " "));

  return NextResponse.json(response);
}
