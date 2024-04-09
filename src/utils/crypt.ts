/** @format */

import { genSaltSync, hashSync, compareSync } from "bcrypt-ts";

async function encrpyt_one_way(data: string) {
  const salt = await genSaltSync(10);
  const encrypted = await hashSync(data, salt);

  return encrypted;
}

async function pairing_one_way(encrypted: string, raw: string) {
  const is_same = await compareSync(encrypted, raw);

  return is_same;
}

export { encrpyt_one_way, pairing_one_way };
