/** @format */

export interface REQUEST_DATA {
  anime_id: string;
  user_id: string;
  status: string;
  type: string;
  prev_notes: string;
}
export interface UPDATE_DATA {
  anime_id: string;
  user_id: string;
  status: string;
  type: string;
  notes: string;
  is_revision: string;
}
