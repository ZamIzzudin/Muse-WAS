/** @format */

"use client";

import { IconContext } from "react-icons";
import { FiHome } from "react-icons/fi";
import { FaYoutube } from "react-icons/fa";
import {
  RiEditBoxLine,
  RiDeleteBin6Line,
  RiUserFollowLine,
  RiTranslate,
  RiUploadCloud2Line,
  RiTaskLine,
  RiMoreFill,
  RiFile2Line,
  RiFolderOpenLine,
  RiLinksFill,
} from "react-icons/ri";
import { IoMdAdd, IoIosLogOut } from "react-icons/io";
import {
  TbProgressHelp,
  TbProgressCheck,
  TbProgressBolt,
  TbProgressAlert,
} from "react-icons/tb";
import {
  MdOutlinePerson,
  MdOutlineVideoLibrary,
  MdOutlineRemoveRedEye,
} from "react-icons/md";

interface Props {
  variant: string;
}

export default function Icon({ variant }: Props) {
  switch (variant) {
    case "Add":
      return (
        <IconContext.Provider value={{ className: "icon" }}>
          <IoMdAdd />
        </IconContext.Provider>
      );
    case "Home":
      return (
        <IconContext.Provider value={{ className: "icon" }}>
          <FiHome />
        </IconContext.Provider>
      );
    case "Access":
      return (
        <IconContext.Provider value={{ className: "icon" }}>
          <RiUserFollowLine />
        </IconContext.Provider>
      );
    case "Translate":
      return (
        <IconContext.Provider value={{ className: "icon" }}>
          <RiTranslate />
        </IconContext.Provider>
      );
    case "Publish":
      return (
        <IconContext.Provider value={{ className: "icon" }}>
          <RiUploadCloud2Line />
        </IconContext.Provider>
      );
    case "Task":
      return (
        <IconContext.Provider value={{ className: "icon" }}>
          <RiTaskLine />
        </IconContext.Provider>
      );
    case "Logout":
      return (
        <IconContext.Provider value={{ className: "icon" }}>
          <IoIosLogOut />
        </IconContext.Provider>
      );
    case "Edit":
      return (
        <IconContext.Provider value={{ className: "icon" }}>
          <RiEditBoxLine />
        </IconContext.Provider>
      );
    case "Delete":
      return (
        <IconContext.Provider value={{ className: "icon" }}>
          <RiDeleteBin6Line />
        </IconContext.Provider>
      );
    case "Details":
      return (
        <IconContext.Provider value={{ className: "icon" }}>
          <RiMoreFill />
        </IconContext.Provider>
      );
    case "File":
      return (
        <IconContext.Provider value={{ className: "icon" }}>
          <RiFile2Line />
        </IconContext.Provider>
      );
    case "Open":
      return (
        <IconContext.Provider value={{ className: "icon" }}>
          <RiFolderOpenLine />
        </IconContext.Provider>
      );
    case "Assign":
      return (
        <IconContext.Provider value={{ className: "icon" }}>
          <TbProgressHelp />
        </IconContext.Provider>
      );
    case "Progress":
      return (
        <IconContext.Provider value={{ className: "icon" }}>
          <TbProgressBolt />
        </IconContext.Provider>
      );
    case "Revision":
      return (
        <IconContext.Provider value={{ className: "icon" }}>
          <TbProgressAlert />
        </IconContext.Provider>
      );
    case "Done":
      return (
        <IconContext.Provider value={{ className: "icon" }}>
          <TbProgressCheck />
        </IconContext.Provider>
      );
    case "Youtube":
      return (
        <IconContext.Provider value={{ className: "icon" }}>
          <FaYoutube />
        </IconContext.Provider>
      );
    case "Person":
      return (
        <IconContext.Provider value={{ className: "icon" }}>
          <MdOutlinePerson />
        </IconContext.Provider>
      );
    case "Eye":
      return (
        <IconContext.Provider value={{ className: "icon" }}>
          <MdOutlineRemoveRedEye />
        </IconContext.Provider>
      );
    case "Video":
      return (
        <IconContext.Provider value={{ className: "icon" }}>
          <MdOutlineVideoLibrary />
        </IconContext.Provider>
      );
    case "Link":
      return (
        <IconContext.Provider value={{ className: "icon" }}>
          <RiLinksFill />
        </IconContext.Provider>
      );
    default:
      return <></>;
  }
}
