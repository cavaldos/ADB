import React,{useState} from "react";
import DiscussionChat from "../../components/Dicussion/DiscussionChat";

import { Avatar, Space, Flex, Progress } from "antd";
import LessonItemList from "../../components/Lesson/LessonItemList";
// import use selector redux
import { useSelector, useDispatch } from "react-redux";
import { setActiveTabSlice } from "../../redux/features/globalState";
import { MdOutlineForum } from "react-icons/md";
import { IoDocumentText } from "react-icons/io5";
import LearnProcessDoc from "../../components/Learn/LearnProcessDoc";
import LearnProcessVideo from "../../components/Learn/LearnProcessVideo";
import LearnProcessTest from "../../components/Learn/LearnProcessTest";
const Sidebar = () => {
  const dispatch = useDispatch();
 const [activeTab, setActiveTab] = useState("lesson");

 const handleTabClick = (tab) => {
   setActiveTab(tab);
   dispatch(setActiveTabSlice(tab));
 };
  return (
    <div className="w-72 bg-white shadow-md p-4 rounded-md">
      <h2 className="text-lg font-bold mb-4 text-center">My Course Progress</h2>
      <div className="bg-blue-gray-300 mb-5 rounded-md min-h-[40px]">sd</div>

      <ul className="overflow-y-hidden">
        <li className="mb-4">
          <button
            onClick={() => handleTabClick("lesson")}
            className={`w-full btn text-left py-2 px-4 rounded text-xl ${
              activeTab === "lesson" ? "bg-gray-400 " : "bg-gray-200"
            }`}
          >
            <IoDocumentText className="" />
            Lession
          </button>
        </li>
        <li className="mb-4">
          <button
            onClick={() => handleTabClick("discussion")}
            className={`w-full btn text-left py-2 px-4 rounded text-xl ${
              activeTab === "discussion"
                ? "bg-gray-400 "
                : "bg-gray-200"
            }`}
          >
            <MdOutlineForum className="" />
            Discussion
          </button>
        </li>
      </ul>

      <Flex
        className=" flex flex-col justify-center align-middle items-center mt-[50px] "
        gap="small"
      >
        <Progress
          className=" mx-auto shadow-2xl rounded-full"
          type="circle"
          percent={8.8}
        />
      </Flex>
    </div>
  );
};

const LessionContent = () => {
  return (
    <div className=" gap-4 flex flex-col border-spacing-3 border-2 border-red-400">
      <LearnProcessDoc />
      <LearnProcessVideo />
      <LearnProcessTest />
    </div>
  );
};
const CourseContainer = () => {
  const lessonProcessTab = useSelector((state) => state.globalState.activeTab);
  return (
    <div className=" shadow-md rounded-lg    mx-3 w-full  ">
      {lessonProcessTab === "lesson" ? <LessionContent /> : <DiscussionChat />}
    </div>
  );
};
const LeesionList = () => {
  return (
    <div className="min-w-80 bg-white shadow-md p-4 rounded-md">
      <h3 className="text-lg font-bold mb-4 text-center">List of Courses</h3>
      <LessonItemList />
    </div>
  );
};
const LearningProcess = () => {
  return (
    <div className="flex h-[85vh] bg-gray-100 mx-4  ">
      <Sidebar />
      <CourseContainer />
      <LeesionList />
    </div>
  );
};

export default LearningProcess;
