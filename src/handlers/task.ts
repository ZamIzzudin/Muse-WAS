/** @format */

// import DB_CONN from "@util/DB";
import { Connection } from "mysql2/promise";

import DB_CONN from "@hook/useDB";

export default (() => {
  let connection_status: Connection | null = null;

  async function GET_ALL_TASK() {
    try {
      const DB = await DB_CONN();
      const query =
        "SELECT task.*, anime.*, task.id AS task_id, user.display_name, user.display_picture FROM task JOIN anime ON anime.id = task.anime_id JOIN user ON task.user_id = user.id ORDER BY task.created_at DESC";
      const [response]: Array<any> = await DB.query(query, []);

      if (response.length === 0) {
        return {
          status: "success",
          message: "Task List Not Found",
          data: [],
        };
      } else {
        return {
          status: "success",
          message: "Success Get Task List",
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

  async function GET_COUNT_ALL_TASK() {
    try {
      const DB = await DB_CONN();
      const query =
        "SELECT status, COUNT(*) AS total FROM task GROUP BY status";

      const [response]: Array<any> = await DB.query(query, []);

      if (response.length === 0) {
        return {
          status: "success",
          message: "Task List Not Found",
          data: [],
        };
      } else {
        return {
          status: "success",
          message: "Success Get Task List",
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

  async function GET_USER_TASK(user_id: string) {
    try {
      const DB = await DB_CONN();
      const query =
        "SELECT task.*, anime.*,user.display_name, task.id AS task_id FROM task JOIN anime ON task.anime_id = anime.id JOIN user ON task.user_id = user.id  WHERE task.user_id = ?";
      const payload = [user_id];

      const [response]: Array<any> = await DB.query(query, payload);

      if (response.length === 0) {
        return {
          status: "success",
          message: "User Task List Not Found",
          data: [],
        };
      } else {
        return {
          status: "success",
          message: "Success Get User Task List",
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

  async function GET_TASK(id: string) {
    try {
      const DB = await DB_CONN();
      const query =
        "SELECT task.*, anime.*,user.display_name, user.display_picture, task.id AS task_id FROM task JOIN anime ON anime.id = task.anime_id JOIN user ON task.user_id = user.id WHERE task.id = ?";

      const [response]: Array<any> = await DB.query(query, [id]);

      if (response.length === 0) {
        return {
          status: "success",
          message: "Task Not Found",
          data: {},
        };
      } else {
        return {
          status: "success",
          message: "Success Get Task Data",
          data: response[0],
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

  async function ADD_TASK(data: any) {
    try {
      const DB = await DB_CONN();

      const query =
        "INSERT INTO task (id,anime_id,user_id,status,type,prev_notes,is_revision,prev_task_rel_id,next_task_rel_id,next_notes,raw_files,processed_files) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";
      const payload = [
        data.id,
        data.anime_id,
        data.user_id,
        data.status,
        data.type,
        data.prev_notes,
        0,
        data.prev_task_id,
        data.next_task_id,
        data.next_notes,
        data.raw_files,
        data.processed_files,
      ];

      const [response]: any = await DB.query(query, payload);

      if (response?.affectedRows) {
        return {
          status: "success",
          message: "Success Add New Task",
        };
      } else {
        return {
          status: "failed",
          message: "Failed to Add Task",
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

  async function START_TASK(id: string) {
    try {
      const DB = await DB_CONN();
      const time = new Date().toISOString();

      let query = "UPDATE task SET status = ?, started_at = ? WHERE id = ?";

      let payload = ["On Progress", time, id];

      const [response]: Array<any> = await DB.query(query, payload);

      if (response.affectedRows) {
        return {
          status: "success",
          message: "Success Update Task",
        };
      } else {
        return {
          status: "failed",
          message: "Failed to Update Task",
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

  async function END_TASK(data: any, id: string) {
    try {
      const DB = await DB_CONN();
      const time = new Date().toISOString();

      let query_current =
        "UPDATE task SET is_revision = ?, status = ?, finished_at = ?, next_notes = ?, next_task_rel_id = ?, processed_files = ?, assigned_to = ? WHERE id = ?";

      let payload_current = [
        0,
        "Done",
        time,
        data.notes,
        data.next_task_rel_id,
        data.processed_files,
        data.assigned_to,
        id,
      ];

      const [response]: Array<any> = await DB.query(
        query_current,
        payload_current
      );

      if (data.is_revision === 1) {
        let query_next =
          "UPDATE task SET prev_notes = ?, raw_files = ? WHERE id = ?";

        let payload_next = [
          data.notes,
          data.processed_files,
          data.next_task_rel_id,
        ];

        await DB.query(query_next, payload_next);
      }

      if (response.affectedRows) {
        return {
          status: "success",
          message: "Success Update Task",
        };
      } else {
        return {
          status: "failed",
          message: "Failed to Update Task",
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

  async function REVISION_TASK(data: any, id: string) {
    try {
      const DB = await DB_CONN();
      let query_previous =
        "UPDATE task SET  status = ?, revision_notes = ?, is_revision = ?, finished_at = ? WHERE id = ?";

      let query_current =
        "UPDATE task SET  status = ?, started_at = ? WHERE id = ?";

      let payload_previous = [
        "Revision",
        data.notes,
        1,
        null,
        data.prev_task_id,
      ];

      let payload_current = ["On Progress", null, id];

      const [response_current]: Array<any> = await DB.query(
        query_current,
        payload_current
      );

      const [response_previous]: Array<any> = await DB.query(
        query_previous,
        payload_previous
      );

      console.log(response_current, "current");
      console.log(response_previous, "previous");

      if (response_current.affectedRows && response_previous.affectedRows) {
        return {
          status: "success",
          message: "Success Update Task",
        };
      } else {
        return {
          status: "failed",
          message: "Failed to Update Task",
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

  async function DELETE_TASK(id: string) {
    try {
      const DB = await DB_CONN();
      const query = "DELETE FROM task WHERE id = ?";

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
    GET_ALL_TASK,
    GET_COUNT_ALL_TASK,
    GET_USER_TASK,
    GET_TASK,
    ADD_TASK,
    START_TASK,
    END_TASK,
    REVISION_TASK,
    DELETE_TASK,
  };
})();
