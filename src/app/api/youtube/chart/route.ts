/** @format */

import { NextResponse } from "next/server";

export async function GET(req: any) {
  try {
    const part = "snippet,contentDetails,statistics,brandingSettings";
    const channelId = req.nextUrl.searchParams.get("channelId");
    const maxResults = 5;
    const apiKey = "AIzaSyDPoHDILrjvKNr_U222oYiT44zDiIHCrQY";

    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=${part}&key=${apiKey}&id=${channelId}&maxResults=${
        maxResults || 5
      }`,
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
