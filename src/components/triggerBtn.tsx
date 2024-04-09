/** @format */

"use client";

import { IconContext } from "react-icons";
import { IoMdAdd } from "react-icons/io";

import { useState, ReactNode } from "react";

import Modal from "@comp/modal";

interface Props {
  children: ReactNode;
  title: string;
  placeholder: string;
}

export function CreateTrigger({ children, title }: Props) {
  const [isShow, setShow] = useState({
    value: false,
    title,
  });

  return (
    <>
      <button
        className="add-btn"
        onClick={() => {
          setShow({ value: true, title });
        }}
      >
        <IconContext.Provider value={{ className: "icon" }}>
          <IoMdAdd />
        </IconContext.Provider>
      </button>
      <Modal setShow={setShow} isShow={isShow}>
        {children}
      </Modal>
    </>
  );
}

export function PrimaryTrigger({ children, title, placeholder }: Props) {
  const [isShow, setShow] = useState({
    value: false,
    title,
  });

  return (
    <>
      <button
        onClick={() => {
          setShow({ value: true, title });
        }}
      >
        {placeholder}
      </button>
      <Modal setShow={setShow} isShow={isShow}>
        {children}
      </Modal>
    </>
  );
}

export function SecondaryTrigger({ children, title, placeholder }: Props) {
  const [isShow, setShow] = useState({
    value: false,
    title,
  });

  return (
    <>
      <button
        className="secondary"
        onClick={() => {
          setShow({ value: true, title });
        }}
      >
        {placeholder}
      </button>
      <Modal setShow={setShow} isShow={isShow}>
        {children}
      </Modal>
    </>
  );
}
