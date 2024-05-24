/** @format */

import create from "zustand";

const useStore = create((set) => ({
  access: [],
  user: {},
  task: [],
  translate: [],
  publish: [],
  setAccess: (data: any) => set(() => ({ access: data })),
  setUser: (data: any) => set(() => ({ user: data })),
  setTask: (data: any) => set(() => ({ task: data })),
  seTranslate: (data: any) => set(() => ({ translate: data })),
  setPublish: (data: any) => set(() => ({ publish: data })),
}));
