import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
const Lecture = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="max-w-4xl mx-auto mt-6 p-1 ">
      <div className="border-[1px] border-[#929599] rounded-[5px] overflow-hidden hover:bg-[#F0F7FF] hover:border-sky-700">
        <div
          className="bg-blue-50 cursor-pointer p-4 flex justify-start gap-3 items-center "
          onClick={toggleOpen}
        >
          <span>{isOpen ? <IoIosArrowDown /> : <IoIosArrowForward />}</span>
          <span className="text-lg font-semibold text-gray-900 ">
            Making Predictions
          </span>
        </div>
        <div
          style={{
            maxHeight: isOpen ? "1000px" : "0px",
            transition: "max-height 0.4s ease-in-out",
          }}
          className={` overflow-hidden bg-white border-t`}
        >
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-semibold text-gray-900">
                  Making Predictions Before You Listen
                </p>
                <p className="text-gray-600">Video • 2 min</p>
              </div>
              <div className="text-green-500">✔</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CollapsibleTopic = () => {
  // console.log(data);
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className=" mx-auto mt-6 p-[1px] w-full ">
      <div className="border-[1px] border-[#929599] rounded-sm overflow-hidden hover:bg-[#F0F7FF] hover:border-sky-700">
        <div
          className="cursor-pointer p-4 flex justify-start gap-3 items-center h-10"
          onClick={toggleOpen}
        >
          <span className=" text-black">
            {isOpen ? <IoIosArrowDown /> : <IoIosArrowForward />}
          </span>
          <span className="text-lg font-semibold text-gray-900">
            Making Predictions
          </span>
        </div>
        <div
          style={{
            maxHeight: isOpen ? "100%" : "0px",
            transition: "max-height 0.5s ease-in-out",
          }}
          className={` ease-in-out overflow-hidden bg-white border-t`}
        >
          <div className="p-4 overflow-auto ">
            <div className="flex items-center justify-between bg-red-400">
              <div>
                <p className="text-lg font-semibold text-gray-900">
                  Making Predictions Before You Listensdfsadf
                </p>
                <p className="text-gray-600">Video • 2 min</p>
              </div>
              <div className="text-green-500">✔</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const LessonListView = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .post(
        "http://113.173.16.55:5001/instructor/get_all_lessons_by_courseID",
        {
          courseID: 1111,
        }
      )
      .then((res) => {
        setData(res.data.data);
      });
  }, []);
  console.log(data);
  const lessons = [];
  return (
    <div>
      {/* {Object.keys(data).forEach((topic) => {
        console.log(data[topic]);
      })} */}
    <CollapsibleTopic />
    </div>
  );
};
export default LessonListView;
