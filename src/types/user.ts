/** @format */

export interface ReqUser {
  username: string;
  email: string;
  password: string;
  role: string;
  display_name: string;
}

export interface UpdateUser {
  id: string;
  username: string;
  email: string;
  password: string;
  role: string;
  display_name: string;
}

export interface LoginUser {
  username: string;
  password: string;
}

export interface UserList {
  id: string;
  username: string;
  email: string;
  role: string;
  display_picture: string;
  display_name: string;
}
