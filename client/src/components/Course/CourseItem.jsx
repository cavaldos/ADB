import React, { memo } from "react";
import { useNavigate } from "react-router-dom";
import { Rate,Tag } from "antd";
import {
  Star,
  Clock,
  Globe,
  FileText,
  Download,
  BookCheck,
  MonitorPlay,
} from "lucide-react";
import GetURLImage, { renderUrl } from "../../hooks/GetURLImage";
function CourseItem(props) {
  const {
    CourseID,
    Title,
    Description,
    Language,
    Status,
    Image,
    Price,
    CreateTime,
    CategoryName,
    FullName,
  } = props;

  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/course-detail/${CourseID}`);
  };
  return (
    <div
      onClick={handleClick}
      className="course-item  bg-white shadow-md rounded-lg overflow-hidden border border-gray-200 h-[335px] p-2 hover:shadow-2xl hover:scale-[104%] hover:bg-[#eee] transition-transform ease-in-out duration-200"
    >
      <img
        src={renderUrl() || Image}
        alt={Title}
        scaret="Course Image"
        className="w-full h-40 object-cover rounded-md overflow-hidden"
      />
      <div className="p-2  h-full relative">
        <div
          className="font-bold text-xl  overflow-hidden h-[60px]"
          style={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
            lineClamp: 2,
            textOverflow: "ellipsis",
            overflow: "hidden",
          }}
        >
          {Title}
        </div>
        <div className="text-sm  flex items-center italic">{FullName}</div>

        <div className="text-sm text-blue-600   flex-1 ">
          <div className="text-lg font-medium text-black   ">₫{Price}</div>
          <span className="mr-4 flex items-center">
            <Globe className="w-4 h-4 mr-1" />
            <Tag className="">{Language}</Tag>
          </span>
          <Rate className="text-sm" allowHalf disabled defaultValue={2.5} />
        </div>
      </div>
    </div>
  );
}

export default CourseItem;
