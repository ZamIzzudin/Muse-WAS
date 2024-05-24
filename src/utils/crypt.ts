/** @format */

import { genSaltSync, hashSync, compareSync } from "bcrypt-ts";

async function ENCRPYT(data: string) {
  const salt = await genSaltSync(10);
  const encrypted = await hashSync(data, salt);

  return encrypted;
}

async function PAIRING(encrypted: string, raw: string) {
  const is_same = await compareSync(encrypted, raw);

  return is_same;
}

export { ENCRPYT, PAIRING };
