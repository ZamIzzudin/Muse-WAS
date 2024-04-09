/** @format */
"use client";

import { IconContext } from "react-icons";
import { IoMdAdd } from "react-icons/io";

import { useState } from "react";

import Modal from "@comp/modal";

export function CreateBtn() {
  const [isShow, setShow] = useState({
    value: false,
    type: "",
    title: "",
  });

  return (
    <>
      <button
        className="add-btn"
        onClick={() => {
          setShow({ value: true, type: "add", title: "Add New Event" });
        }}
      >
        <IconContext.Provider value={{ className: "icon" }}>
          <IoMdAdd />
        </IconContext.Provider>
      </button>
      <Modal setShow={setShow} isShow={isShow}>
        <h1>Modal Add</h1>
      </Modal>
    </>
  );
}
