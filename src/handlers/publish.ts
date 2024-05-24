/** @format */

// import DB_CONN from "@util/DB";
import { Connection } from "mysql2/promise";
import { uid } from "uid";

import { REQUEST_DATA, UPDATE_DATA } from "@type/anime";
import DB_CONN from "@hook/useDB";

export default (() => {
  let connection_status: Connection | null = null;

  async function GET_PUBLISHS() {
    try {
      const DB = await DB_CONN();
      const query = "SELECT * FROM anime";

      const [response]: Array<any> = await DB.query(query, []);

      if (response.length === 0) {
        return {
          status: "success",
          message: "Publish List Not Found",
          data: [],
        };
      } else {
        return {
          status: "success",
          message: "Success Get Publish List",
          data: response,
        };
      }
    } catch (ERROR: any) {
      return {
        status: "error",
        message: ERROR.message,
      };
    } finally {
      if (connection_status) await connection_status.end();
    }
  }

  async function GET_PUBLISH(id: string) {
    try {
      const DB = await DB_CONN();
      const query_find = "SELECT * FROM anime WHERE id = ?";
      const query_progress =
        "SELECT task.*, user.display_name, user.role, user.display_picture FROM task JOIN user ON user.id = task.user_id WHERE task.anime_id = ? ORDER BY task.created_at DESC";

      const [response_find]: Array<any> = await DB.query(query_find, [id]);
      const [response_progress]: Array<any> = await DB.query(query_progress, [
        id,
      ]);

      if (response_find.length === 0) {
        return {
          status: "success",
          message: "Publish Not Found",
          data: {},
        };
      } else {
        return {
          status: "success",
          message: "Success Get Publish Data",
          data: {
            anime: response_find[0],
            progress: response_progress,
          },
        };
      }
    } catch (ERROR: any) {
      console.log(ERROR);

      return {
        status: "error",
        message: ERROR.message,
      };
    } finally {
      if (connection_status) await connection_status.end();
    }
  }

  async function ADD_PUBLISH(data: any) {
    try {
      const DB = await DB_CONN();
      const id = uid(16);
      const query =
        "INSERT INTO anime (id,title,genre,studio,season,episode,description,ver_thumbnail,hor_thumbnail) VALUES (?,?,?,?,?,?,?,?,?)";
      const payload = [
        id,
        data.title,
        data.genre,
        data.studio,
        data.season,
        data.episode,
        data.description,
        data.ver_thumbnail,
        data.hor_thumbnail,
      ];

      const [response]: any = await DB.query(query, payload);

      if (response?.affectedRows) {
        return {
          status: "success",
          message: "Success Add New Publish",
          data: {
            anime_id: id,
            user_id: "",
          },
        };
      } else {
        return {
          status: "failed",
          message: "Failed to Add Publish",
        };
      }
    } catch (ERROR: any) {
      return {
        status: "error",
        message: ERROR.message,
      };
    } finally {
      if (connection_status) await connection_status.end();
    }
  }

  async function UPDATE_PUBLISH(data: UPDATE_DATA, id: string) {
    try {
      const DB = await DB_CONN();
      let query =
        "UPDATE anime SET title = ?,genre = ?, studio = ?, season = ?, episode = ?, description = ?  WHERE id = ?";

      let payload = [
        data.title,
        data.genre,
        data.studio,
        data.season,
        data.episode,
        data.description,
        id,
      ];

      const [response]: Array<any> = await DB.query(query, payload);

      if (response.affectedRows) {
        return {
          status: "success",
          message: "Success Update Publish",
        };
      } else {
        return {
          status: "failed",
          message: "Failed to Update Publish",
        };
      }
    } catch (ERROR: any) {
      return {
        status: "error",
        message: ERROR.message,
      };
    } finally {
      if (connection_status) await connection_status.end();
    }
  }

  async function DELETE_PUBLISH(id: string) {
    try {
      const DB = await DB_CONN();
      const query = "DELETE FROM anime WHERE id = ?";

      const [response]: Array<any> = await DB.query(query, [id]);

      if (response.affectedRows) {
        return {
          status: "success",
          message: "Sucess Delete Publish",
        };
      } else {
        return {
          status: "failed",
          message: "Failed to Delete Publish",
        };
      }
    } catch (ERROR: any) {
      return {
        status: "error",
        message: ERROR.message,
      };
    } finally {
      if (connection_status) await connection_status.end();
    }
  }

  return {
    GET_PUBLISHS,
    GET_PUBLISH,
    ADD_PUBLISH,
    UPDATE_PUBLISH,
    DELETE_PUBLISH,
  };
})();
