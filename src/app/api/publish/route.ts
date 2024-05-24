/** @format */

import { NextResponse } from "next/server";
import PUBLISH from "@handler/publish";
import TASK from "@handler/task";
import path from "path";
import { writeFile } from "fs/promises";
import { uid } from "uid";

export async function GET() {
  const { data } = await PUBLISH.GET_PUBLISHS();

  return NextResponse.json(data);
}

export async function POST(req: any) {
  const formData = await req.formData();

  const ver_thumbnail = formData.get("ver_thumbnail");
  const hor_thumbnail = formData.get("hor_thumbnail");
  const raw_files = formData.getAll("raw_files[]");
  if (!ver_thumbnail && !hor_thumbnail && !raw_files) {
    return NextResponse.json({ error: "File Missing" }, { status: 400 });
  }

  const buffer_ver_thumbnail = Buffer.from(await ver_thumbnail.arrayBuffer());
  const buffer_hor_thumbnail = Buffer.from(await hor_thumbnail.arrayBuffer());
  let buffer_raw_file: Buffer[] = [];

  await Promise.all(
    raw_files.map(async (file: File) => {
      const buffer: Buffer = Buffer.from(await file.arrayBuffer());
      buffer_raw_file.push(buffer);
    })
  );

  try {
    await writeFile(
      path.join(
        process.cwd(),
        "public/temp/" + ver_thumbnail.name.replaceAll(" ", "_")
      ),
      buffer_ver_thumbnail
    );
    await writeFile(
      path.join(
        process.cwd(),
        "public/temp/" + hor_thumbnail.name.replaceAll(" ", "_")
      ),
      buffer_hor_thumbnail
    );
    await Promise.all(
      buffer_raw_file.map(async (file: Buffer, index: number) => {
        await writeFile(
          path.join(
            process.cwd(),
            "public/temp/" + raw_files[index].name.replaceAll(" ", "_")
          ),
          file
        );
      })
    );

    const payload = {
      title: formData.get("title"),
      genre: formData.get("genre"),
      studio: formData.get("studio"),
      season: formData.get("season"),
      episode: formData.get("episode"),
      description: formData.get("description"),
      translator: formData.get("translator"),
      admin: formData.get("admin"),
      ver_thumbnail: "/temp/" + ver_thumbnail.name.replaceAll(" ", "_"),
      hor_thumbnail: "/temp/" + hor_thumbnail.name.replaceAll(" ", "_"),
      raw_files: JSON.stringify(
        raw_files.map((file: any) => "/temp/" + file.name)
      ),
    };

    const response = await PUBLISH.ADD_PUBLISH(payload);
    const translator_task_id = uid(16);
    const upload_task_id = uid(16);

    const translator_task = {
      id: translator_task_id,
      anime_id: response.data?.anime_id || "",
      user_id: payload.translator || "",
      raw_files: payload.raw_files,
      processed_files: null,
      status: "Assigned",
      type: "Need Translate",
      prev_notes: formData.get("notes"),
      next_notes: null,
      prev_task_id: upload_task_id,
      next_task_id: "-",
    };

    const upload_task = {
      id: upload_task_id,
      anime_id: response.data?.anime_id || "",
      user_id: payload.admin || "",
      raw_files: null,
      processed_files: payload.raw_files,
      status: "Done",
      type: "Upload RAW",
      prev_notes: null,
      next_notes: formData.get("notes"),
      prev_task_id: "-",
      next_task_id: translator_task_id,
    };

    await TASK.ADD_TASK(translator_task);
    await TASK.ADD_TASK(upload_task);

    return NextResponse.json(response);
  } catch (error) {
    console.log("Error occured ", error);
    return NextResponse.json({ Message: "Failed", status: 500 });
  }
}

export async function PUT(req: any) {
  const id = req.nextUrl.searchParams.get("id");
  const payload = await req.json();

  const response = await PUBLISH.UPDATE_PUBLISH(payload, id);

  return NextResponse.json(response);
}

export async function DELETE(req: any) {
  const id = req.nextUrl.searchParams.get("id");

  const response = await PUBLISH.DELETE_PUBLISH(id);

  return NextResponse.json(response);
}
