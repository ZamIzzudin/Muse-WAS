/** @format */

"use client";

import { CreateTrigger, PrimaryTrigger } from "@comp/triggerBtn";

export function CreateForm() {
  return (
    <CreateTrigger title="Create Access" placeholder="">
      <h1>TEST ADD</h1>
    </CreateTrigger>
  );
}

export function EditForm() {
  return (
    <PrimaryTrigger title="Edit Access" placeholder="Edit">
      <h1>TEST EDIT</h1>
    </PrimaryTrigger>
  );
}

export function DeleteForm() {
  return (
    <PrimaryTrigger title="Delete Access" placeholder="Delete">
      <h1>TEST DELETE</h1>
    </PrimaryTrigger>
  );
}
