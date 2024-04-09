/** @format */

// import DB_CONN from "@util/DB";
import { Connection } from "mysql2/promise";
import { uid } from "uid";

import { encrpyt_one_way, pairing_one_way } from "@util/crypt";
import { LoginUser, ReqUser, UpdateUser } from "@type/user";
import DB_CONN from "@hook/useDB";

export default (() => {
  let connection_status: Connection | null = null;

  async function login(data: LoginUser) {
    try {
      const DB = await DB_CONN();
      const query = `SELECT * FROM user WHERE username = ?`;

      const [response]: Array<any> = await DB.query(query, [data.username]);

      if (response.length > 0) {
        const { password: encrypted_password, ...user } = response[0];
        const is_valid = await pairing_one_way(
          data.password,
          encrypted_password
        );

        if (is_valid) {
          return {
            status: "success",
            message: "Success Login",
            data: user,
          };
        } else {
          return {
            status: "failed",
            message: "Password False",
          };
        }
      } else {
        return {
          status: "failed",
          message: "Username Not Found",
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

  async function getUsers() {
    try {
      const DB = await DB_CONN();
      const query_find =
        "SELECT id,username,email,role,display_picture,display_name FROM user";

      const [response]: Array<any> = await DB.query(query_find, []);

      if (response.length === 0) {
        return {
          status: "success",
          message: "User Not Found",
          data: [],
        };
      } else {
        return {
          status: "success",
          message: "Success Get User List",
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

  async function addUser(data: ReqUser) {
    try {
      const DB = await DB_CONN();
      const query_find = "SELECT * FROM user WHERE username = ? OR email = ?";
      const payload_find = [data.username, data.email];

      const [response_find]: Array<any> = await DB.query(
        query_find,
        payload_find
      );

      if (response_find.length > 0) {
        return {
          status: "failed",
          message: "Username or Email Already Used",
        };
      } else {
        const encrypted_password = await encrpyt_one_way(data.password);
        const id = uid(16);

        const query_add =
          "INSERT INTO user (id,username,email,password,role,display_name) VALUES (?,?,?,?,?,?)";
        const payload_add = [
          id,
          data.username,
          data.email,
          encrypted_password,
          data.role,
          data.display_name,
        ];

        const [response_add]: any = await DB.query(query_add, payload_add);

        if (response_add?.affectedRows) {
          return {
            status: "success",
            message: "Success Add New User",
          };
        } else {
          return {
            status: "failed",
            message: "Failed to Add User",
          };
        }
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

  async function updateUser(data: UpdateUser) {
    try {
      const DB = await DB_CONN();
      const query =
        "UPDATE user SET username = ?,email = ?, role = ?, display_name = ?, display_picture = ?, password = ?,   WHERE id = ?";

      const encrypted_password = "";
      const display_picture = "";

      const payload = [
        data.username,
        data.email,
        data.role,
        data.display_name,
        display_picture,
        encrypted_password,
        data.id,
      ];

      const [response]: Array<any> = await DB.query(query, payload);

      if (response.affectedRows) {
        return {
          status: "success",
          message: "User Update User",
        };
      } else {
        return {
          status: "failed",
          message: "Failed to Update User",
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

  async function deleteUser(id: string) {
    try {
      const DB = await DB_CONN();
      const query = "DELETE FROM user WHERE id = ?";

      const [response]: Array<any> = await DB.query(query, [id]);

      if (response.affectedRows) {
        return {
          status: "success",
          message: "User Delete User",
        };
      } else {
        return {
          status: "failed",
          message: "Failed to Delete User",
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
    login,
    getUsers,
    addUser,
    updateUser,
    deleteUser,
  };
})();
