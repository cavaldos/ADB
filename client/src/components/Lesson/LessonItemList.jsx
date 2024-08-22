import React, { useState, useEffect, memo, useMemo } from "react";
import { MdOndemandVideo } from "react-icons/md";
import { GrDocumentText } from "react-icons/gr";
import { SiSpeedtest } from "react-icons/si";

import { RiArrowDropUpLine, RiArrowDropDownLine } from "react-icons/ri";
import { FaCirclePlay } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import LessonService from "../../services/Lesson.Service";
import { useNavigate } from "react-router-dom";
import { Tag } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { resetState } from "../../redux/features/resetStateSlice";
const LessonItemList = (props) => {
  const {
    CourseID,
    LessonsID,
    ComplexityLevel,
    CreatedTime,
    Duration,
    LessonType,
    OrderLesson,
    Title,
    Topic,
    UpdatedTime,
  } = props;

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const toggleAccordion = () => {
    open ? setOpen(false) : setOpen(true);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    LessonService.sortLesson(LessonsID, OrderLesson).then((res) => {
      if (res.status === 200) {
        dispatch(resetState());
      }
    });
  }, [OrderLesson]);

  const handleDetail = () => {
    navigate(`/new-course/${CourseID}/create-lesson/${LessonsID}`);
  };

  const ComplexTag = (props) => {
    let bgColor;
    let textColor;
    let text;

    switch (props.level) {
      case "Easy":
        bgColor = "bg-green-100";
        textColor = "text-green-500";
        text = "Easy";
        break;
      case "Medium":
        bgColor = "bg-purple-100";
        textColor = "text-purple-500";
        text = "Medium";
        break;
      case "Hard":
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
        className={`rounded-full border px-2 py-1 text-xs font-semibold ${bgColor} ${textColor}`}
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
    <ul className="shadow-inner">
      <li className="text-left">
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
            className="relative ml-4 cursor-pointer select-none items-center py-4 pr-2 flex"
            onClick={toggleAccordion}
          >
            <div className="text-base font-bold text-gray-600 lg:text-base  mr-4">
              {OrderLesson} - {Title}
            </div>
            {LessonType === "Video" ? (
              <Tag color="blue">{LessonType}</Tag>
            ) : LessonType === "Test" ? (
              <Tag color="red">{LessonType}</Tag>
            ) : (
              <Tag color="purple">{LessonType}</Tag>
            )}
            <div className="ml-auto flex items-center space-x-2">
              <button onClick={handleDetail} className="btn btn-sm">
                Edit
              </button>
              <RiArrowDropUpLine
                className={`text-3xl text-gray-500 transition ${
                  open ? "rotate-180" : ""
                }`}
              />
            </div>
          </div>
          <div
            className={`max-h-0 overflow-hidden transition-all duration-500 ${
              open ? "max-h-96" : ""
            }`}
          >
            {open && (
              <ul className="space-y-1 font-semibold text-gray-600 mb-6">
                <div className="flex px-2 sm:px-6 py-2.5 hover:bg-gray-100 items-center">
                  {LessonType === "Video" ? (
                    <FaCirclePlay className="text-2xl" />
                  ) : LessonType === "Test" ? (
                    <SiSpeedtest className="text-2xl" />
                  ) : (
                    <GrDocumentText className="text-2xl" />
                  )}

                  <div className="ml-3 text-sm truncate max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
                    Topic:
                    <span className="text-sm truncate max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg italic">
                      {" "}
                      {Topic}
                    </span>
                  </div>
                  <div className="ml-auto flex items-center space-x-2">
                    <ComplexTag level={ComplexityLevel} />
                    <span className="text-sm flex-shrink-0">
                      {Duration} min
                    </span>
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
const LessonList = () => {
  const { courseID } = useParams();
  const [data, setData] = useState([]);
  const resetState = useSelector((state) => state.resetState.state);

  useEffect(() => {
    LessonService.getAllLessonsByCourseID(courseID).then((response) => {
      setData(response.data);
    });
  }, [courseID, resetState]);

  const lessonItems = useMemo(() => {
    return (
      <div className="flex flex-col gap-2">
        {data?.map((lesson, index) => (
          <LessonItemList
            key={index}
            CourseID={lesson.CourseID}
            LessonsID={lesson.LessonsID}
            ComplexityLevel={lesson.ComplexityLevel}
            CreatedTime={lesson.CreatedTime}
            Duration={lesson.Duration}
            LessonType={lesson.LessonType}
            OrderLesson={lesson.OrderLesson}
            Title={lesson.Title}
            Topic={lesson.Topic}
            UpdatedTime={lesson.UpdatedTime}
          />
        ))}
      </div>
    );
  }, [courseID, data]);

  return lessonItems;
};
export { LessonItemList };

export default memo(LessonList);
