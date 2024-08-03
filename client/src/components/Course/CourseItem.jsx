import React from "react";
import { useNavigate } from "react-router-dom";
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
  const image =
    "https://images.unsplash.com/photo-1719216324463-92a973ebf910?q=80&w=2828&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  const title = "Deep Learning Specialization";
  const provider = "Coursera";

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
        src={image}
        alt={title}
        className="w-full h-40 object-cover rounded-md overflow-hidden"
      />
      <div className="p-4">
        <div className="text-sm text-gray-600 flex items-center">
          <img
            src="path/to/deeplearning-icon.png"
            alt="Provider Icon"
            className="w-5 h-5 mr-2"
          />
          {FullName}
        </div>
        <div className="font-bold text-xl mt-2">{title}</div>
        <div className="text-sm text-blue-600 mt-2">
          <a href="#degree-link" className="flex items-center">
            <svg
              className="w-4 h-4 mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M9 3a1 1 0 011-1h1a1 1 0 011 1v2h1a1 1 0 110 2h-1v1h1a1 1 0 110 2h-1v1h1a1 1 0 110 2h-1v2a1 1 0 11-2 0v-2h-1a1 1 0 110-2h1v-1h-1a1 1 0 110-2h1v-1h-1a1 1 0 110-2h1V3z"
                clipRule="evenodd"
              />
            </svg>
            Make progress toward a degree
          </a>
        </div>
        <div className="text-gray-500 mt-1">Specialization</div>
      </div>
    </div>
  );
}

export default CourseItem;
