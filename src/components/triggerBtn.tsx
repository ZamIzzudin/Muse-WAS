/** @format */

"use client";

import Icon from "./icon";

import { useState, ReactNode } from "react";

import Modal from "@comp/modal";

interface Props {
  children: ReactNode;
  title: string;
  placeholder: ReactNode;
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
        <Icon variant="Add" />
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
