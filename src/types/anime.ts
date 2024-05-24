/** @format */

import { DateTime } from "next-auth/providers/kakao";

export interface REQUEST_DATA {
  id: string;
  title: string;
  ver_thumbnail: string;
  hor_thumbnail: string;
  description: string;
  created_at: DateTime;
  genre: string;
  studio: string;
  episode: string;
  is_publish: number;
  season: string;
}

export interface UPDATE_DATA {
  id: string;
  title: string;
  description: string;
  genre: string;
  studio: string;
  episode: string;
  season: string;
}
