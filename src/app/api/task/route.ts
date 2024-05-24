/** @format */
import { NextResponse } from "next/server";
import TASK from "@handler/task";
import { writeFile } from "fs/promises";
import path from "path";
import { uid } from "uid";

export async function PUT(req: any) {
  const id = req.nextUrl.searchParams.get("id");
  const type = req.nextUrl.searchParams.get("type");

  if (type === "json") {
    const payload = await req.json();

    if (payload.type === "Start") {
      const response = await TASK.START_TASK(id);
      return NextResponse.json(response);
    } else if (payload.type === "Revision") {
      const response = await TASK.REVISION_TASK(payload, id);
      return NextResponse.json(response);
    }
  } else {
    const formData = await req?.formData();
    const type = formData.get("type");

    if (type === "Need Publish") {
      const processed_files = formData.getAll("processed_files[]");

      const new_task_id = uid(16);

      const update_payload = {
        notes: formData.get("notes"),
        next_task_rel_id: formData.get("next_task_rel_id"),
        processed_files: processed_files,
        assigned_to: null,
      };

      const add_payload = {
        id: new_task_id,
        anime_id: formData.get("anime_id"),
        prev_notes: formData.get("notes"),
        user_id: formData.get("user_next_task_id"),
        raw_files: processed_files,
        status: "Assigned",
        type,
        next_notes: null,
        prev_task_id: id,
        next_task_id: "-",
      };
      await TASK.ADD_TASK(add_payload);

      const response = await TASK.END_TASK(update_payload, id);
      return NextResponse.json(response);
    } else {
      const processed_files = formData.getAll("processed_files[]");

      let buffer_processed_file: Buffer[] = [];

      await Promise.all(
        processed_files.map(async (file: File) => {
          const buffer: Buffer = Buffer.from(await file.arrayBuffer());
          buffer_processed_file.push(buffer);
        })
      );

      await Promise.all(
        buffer_processed_file.map(async (file: Buffer, index: number) => {
          await writeFile(
            path.join(
              process.cwd(),
              "public/temp/" + processed_files[index].name.replaceAll(" ", "_")
            ),
            file
          );
        })
      );

      const new_task_id = uid(16);
      const is_revision = parseInt(formData.get("is_revision"));

      const update_payload = {
        is_revision,
        notes: formData.get("notes"),
        next_task_rel_id:
          is_revision === 0 ? new_task_id : formData.get("next_task_rel_id"),
        processed_files: JSON.stringify(
          processed_files.map((file: any) => "/temp/" + file.name)
        ),
        assigned_to: formData.get("user_next_task_id"),
      };

      if (is_revision === 0) {
        const add_payload = {
          id: new_task_id,
          anime_id: formData.get("anime_id"),
          prev_notes: formData.get("notes"),
          user_id: formData.get("user_next_task_id"),
          raw_files: JSON.stringify(
            processed_files.map((file: any) => "/temp/" + file.name)
          ),
          status: "Assigned",
          type,
          next_notes: null,
          prev_task_id: id,
          next_task_id: "-",
        };

        await TASK.ADD_TASK(add_payload);
      }

      const response = await TASK.END_TASK(update_payload, id);
      return NextResponse.json(response);
    }
  }

  return NextResponse.json({
    status: "failed",
    message: "Type Not Valid",
  });
}
