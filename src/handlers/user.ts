/** @format */

// import DB_CONN from "@util/DB";
import { Connection } from "mysql2/promise";
import { uid } from "uid";

import { ENCRPYT, PAIRING } from "@util/crypt";
import { LOGIN_DATA, REQUEST_DATA, UPDATE_DATA } from "@type/user";
import DB_CONN from "@hook/useDB";

export default (() => {
  let connection_status: Connection | null = null;

  async function LOGIN(data: LOGIN_DATA) {
    try {
      const DB = await DB_CONN();
      const query = `SELECT * FROM user WHERE username = ?`;

      const [response]: Array<any> = await DB.query(query, [data.username]);

      if (response.length > 0) {
        const { password: encrypted_password, ...user } = response[0];
        const is_valid = await PAIRING(data.password, encrypted_password);

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

  async function GET_USERS() {
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

  async function GET_USERS_BY_ROLE(role: string) {
    try {
      const DB = await DB_CONN();
      let query_find =
        "SELECT id,username,email,role,display_picture,display_name FROM user WHERE role = ?";

      const [response]: Array<any> = await DB.query(query_find, [role]);

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

  async function GET_USER(id: string) {
    try {
      const DB = await DB_CONN();
      const query_find =
        "SELECT id,username,email,role,display_picture,display_name FROM user WHERE id = ?";

      const [response]: Array<any> = await DB.query(query_find, [id]);

      if (response.length === 0) {
        return {
          status: "success",
          message: "User Not Found",
          data: {},
        };
      } else {
        return {
          status: "success",
          message: "Success Get User Data",
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

  async function ADD_USER(data: REQUEST_DATA) {
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
        const encrypted_password = await ENCRPYT(data.password);
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

  async function UPDATE_USER(data: UPDATE_DATA, id: string) {
    try {
      const DB = await DB_CONN();
      let query =
        "UPDATE user SET username = ?,email = ?, role = ?, display_name = ?  WHERE id = ?";

      let payload = [
        data.username,
        data.email,
        data.role,
        data.display_name,
        id,
      ];
      if (data.password !== "") {
        query =
          "UPDATE user SET username = ?,email = ?, role = ?,password = ?, display_name = ?  WHERE id = ?";

        const encrypted_password = await ENCRPYT(data.password);

        payload = [
          data.username,
          data.email,
          data.role,
          encrypted_password,
          data.display_name,
          id,
        ];
      }

      const [response]: Array<any> = await DB.query(query, payload);

      if (response.affectedRows) {
        return {
          status: "success",
          message: "Success Update User",
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

  async function DELETE_USER(id: string) {
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
    LOGIN,
    GET_USERS,
    GET_USERS_BY_ROLE,
    GET_USER,
    ADD_USER,
    UPDATE_USER,
    DELETE_USER,
  };
})();
