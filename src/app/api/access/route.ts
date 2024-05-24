/** @format */

import { NextResponse } from "next/server";
import USER from "@handler/user";

export async function GET() {
  const { data } = await USER.GET_USERS();

  return NextResponse.json(data);
}

export async function POST(req: any) {
  const payload = await req.json();

  const response = await USER.ADD_USER(payload);

  return NextResponse.json(response);
}

export async function PUT(req: any) {
  const id = req.nextUrl.searchParams.get("id");
  const payload = await req.json();

  const response = await USER.UPDATE_USER(payload, id);

  return NextResponse.json(response);
}

export async function DELETE(req: any) {
  const id = req.nextUrl.searchParams.get("id");

  const response = await USER.DELETE_USER(id);

  return NextResponse.json(response);
}
