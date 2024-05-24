/** @format */

export interface REQUEST_DATA {
  username: string;
  email: string;
  password: string;
  role: string;
  display_name: string;
}

export interface UPDATE_DATA {
  id: string;
  username: string;
  email: string;
  password: string;
  role: string;
  display_name: string;
}

export interface LOGIN_DATA {
  username: string;
  password: string;
}

export interface USER_DATA {
  id: string;
  username: string;
  email: string;
  role: string;
  display_picture: string;
  display_name: string;
}
