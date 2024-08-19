import React, { useEffect, useState } from "react";
import {
  Star,
  Clock,
  Globe,
  FileText,
  Download,
  BookCheck,
  MonitorPlay,
} from "lucide-react";
import { message } from "antd";
import { GoStar } from "react-icons/go";
import { Tag, Rate } from "antd";
import { useParams } from "react-router-dom";
import CourseService from "../../services/Course.service";
import { ConvertTime } from "../../hooks/Time.utils";
import { renderUrl } from "../../hooks/GetURLImage";
import LessonItemList from "../Lesson/LessonItemList";
const CourseDetail = () => {
  const { courseID } = useParams();
  const [courseData, setCourseData] = useState({
    Title: "",
    Description: "",
    Language: "",
    CategoryName: "",
    Image: 0,
    Price: 0,
    CreateTime: 0,
    CategoryName: "",
    FullName: "",
  });

  const fetchCourseDetail = async () => {
    try {
      const response = await CourseService.getCourseDetail(courseID);
      setCourseData(response.data[0] || {});
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };
  useEffect(() => {
    fetchCourseDetail();
  }, [courseID]);

  const handleAddToCart = () => {
    message.success("Added to cart");
  };
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, [courseID]);
  return (
    <div className="bg-gray-100 p-6 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <h1 className="text-3xl font-bold mb-2">
              {courseData.Title || "Loading..."}
            </h1>
            <p className="text-gray-600 mb-4">
              {courseData.Description || "Loading..."}
            </p>

            <div className="flex items-center mb-4">
              <div className="flex items-center ">
                <Rate allowHalf disabled defaultValue={2.5} />
                <div className="flex"></div>
                <span className="text-blue-600 ml-1">(313,027 ratings)</span>
              </div>
              <span className="ml-4 text-gray-600">1,339,527 students</span>
            </div>

            <p className="mb-4">
              Created by{" "}
              <span className="text-blue-600">
                <Tag className="text-[14px] italic">
                  {" "}
                  {courseData.FullName || "Loading..."}
                </Tag>
              </span>
            </p>

            <div className="flex items-center text-sm text-gray-600 mb-6">
              <Clock className="w-4 h-4 mr-1" />
              <span className="mr-4">
                Create{" "}
                <Tag color={"cyan"}>
                  {ConvertTime.convertDateToDDMMYYYY(courseData.CreateTime)}
                </Tag>
              </span>
              <Globe className="w-4 h-4 mr-1" />
              <span className="mr-4">
                <Tag color={"pink"}>{courseData.Language}</Tag>
              </span>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h2 className="text-xl font-bold mb-4">What you'll learn</h2>
                <LessonItemList />
            </div>
          </div>

          <div>
            <img
              src={courseData.Image || renderUrl()}
              alt={courseData.Title}
              className="w-full h-40 object-cover rounded-md mb-3"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = renderUrl();
              }}
            />
            <div className="bg-white p-6 rounded-lg shadow-md ">
              <div className="mb-4">
                <span className="text-3xl font-bold">₫{courseData.Price}</span>
              </div>
              <button
                onClick={handleAddToCart}
                className="w-full btn bg-purple-600 hover:bg-purple-500 text-white py-3 rounded-lg font-semibold mb-2"
              >
                Add to cart
              </button>

              <p className="text-center text-sm mb-4">
                30-Day Money-Back Guarantee
              </p>
              <h3 className="font-bold mb-2">This course includes:</h3>
              <ul className="space-y-2">
                {[
                  {
                    icon: <Clock className="w-5 h-5" />,
                    text: `54 hours on-demand video `,
                  },
                  {
                    icon: <FileText className="w-5 h-5" />,
                    text: `Assignments`,
                  },
                  {
                    icon: <MonitorPlay className="w-5 h-5" />,
                    text: `Video`,
                  },
                  {
                    icon: <BookCheck className="w-5 h-5" />,
                    text: `Exams`,
                  },
                ].map((item, index) => (
                  <li key={index} className="flex items-center">
                    {item.icon}
                    <span className="ml-2">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
