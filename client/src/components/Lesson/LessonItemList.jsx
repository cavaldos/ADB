import React, { useState } from "react";
import { MdOndemandVideo } from "react-icons/md";
import { GrDocumentText } from "react-icons/gr";
import { SiSpeedtest } from "react-icons/si";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
  Typography,
} from "@mui/material";
import { RiArrowDropUpLine, RiArrowDropDownLine } from "react-icons/ri";
import { FaCirclePlay } from "react-icons/fa6";

const LessonItemList = ({ course }) => {
  const [open, setOpen] = useState(false);

  const toggleAccordion = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const ComplexTag = (props) => {
    let bgColor;
    let textColor;
    let text;

    switch (props.level) {
      case "easy":
        bgColor = "bg-green-100";
        textColor = "text-green-500";
        text = "Easy";
        break;
      case "medium":
        bgColor = "bg-purple-100";
        textColor = "text-purple-500";
        text = "Medium";
        break;
      case "hard":
        bgColor = "bg-red-100";
        textColor = "text-red-500";
        text = "Hard";
        break;
      default:
        bgColor = "bg-gray-100";
        textColor = "text-gray-500";
        text = "Unknown";
        break;
    }

    return (
      <li
        className={` rounded-full border px-2 py-1 text-xs font-semibold ${bgColor} ${textColor}`}
      >
        {text}
      </li>
    );
  };
  const StatusTag = (props) => {
    let bgColor;
    let textColor;
    let text;

    switch (props.status) {
      case "notstarted":
        bgColor = "bg-gray-100";
        textColor = "text-gray-500";
        text = "Not Started";
        break;
      case "inprocess":
        bgColor = "bg-blue-100";
        textColor = "text-blue-500";
        text = "In Process";
        break;
      case "done":
        bgColor = "bg-green-100";
        textColor = "text-green-500";
        text = "Done";
        break;
      default:
        bgColor = "bg-gray-100";
        textColor = "text-gray-500";
        text = "Unknown";
        break;
    }

    return (
      <li
        className={`rounded-full border px-2 py-1 text-xs font-semibold  ${bgColor} ${textColor}`}
      >
        {text}
      </li>
    );
  };

  return (
    <ul className=" shadow-inner">
      <li className="text-left ">
        <label
          htmlFor="accordion-1"
          className="relative flex flex-col rounded-md border border-gray-100 shadow-md"
        >
          <button
            className="peer hidden bg-blue"
            type="checkbox"
            id="accordion-1"
            checked={open}
            onChange={toggleAccordion}
          />
          <div
            className="relative ml-4 cursor-pointer select-none items-center py-4 pr-2 flex "
            onClick={toggleAccordion}
          >
            <h3 className="text-base font-bold text-gray-600 lg:text-base">
              What are Closures
            </h3>
            <RiArrowDropUpLine
              className={`text-3xl ml-auto mr-5 text-gray-500 transition ${
                open ? "rotate-180" : ""
              }`}
            />
          </div>
          <div
            className={`max-h-0 overflow-hidden transition-all duration-500 ${
              open ? "max-h-96" : ""
            }`}
          >
            {open && (
              <ul className="space-y-1 font-semibold text-gray-600 mb-6 ">
                <div className="flex px-2 sm:px-6 py-2.5 hover:bg-gray-100 items-center ">
                  <FaCirclePlay className="text-2xl text-black mr-2 flex-shrink-0" />
                  <span className="text-sm truncate max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
                    Introductions sd
                  </span>
                  <div className="ml-auto flex items-center space-x-2">
                    <ComplexTag level="hard" />
                    <StatusTag status="done" />
                    <span className="text-sm flex-shrink-0">23 min</span>
                  </div>
                </div>
              </ul>
            )}
          </div>
        </label>
      </li>
    </ul>
  );
};

export default LessonItemList;
