/** @format */

import { NextResponse } from "next/server";

export async function GET(req: any) {
  try {
    const channelId = req.nextUrl.searchParams.get("channelId");
    const maxResults = 6;
    const apiKey = "AIzaSyDPoHDILrjvKNr_U222oYiT44zDiIHCrQY";

    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&key=${apiKey}&channelId=${channelId}&maxResults=${maxResults}&type=video&order=date`,
      {
        method: "GET",
      }
    );

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
    return NextResponse.json({});
  }
}
