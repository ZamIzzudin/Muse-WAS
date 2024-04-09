/** @format */

import { createConnection } from "mysql2/promise";

async function DB_CONN() {
  const CONNECTION = await createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "muse",
  });

  return CONNECTION;
}

export default DB_CONN;
