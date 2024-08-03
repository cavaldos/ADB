import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import CourseDetailItem from "../../components/Course/CourseDetailItem";
import CourseService from "../../services/Course.service";
function CourseDetail() {
  let location = useLocation();
  let searchString = decodeURIComponent(location.pathname.split("/").pop());
  const [courseData, setCourseData] = useState({});
  useEffect(() => {
    CourseService.getCourseDetail(searchString).then((response) => {
      setCourseData(response.data[0] || {});
    });
  }, [searchString]);

  return (
    <div className=" bg-grayd-500 p-2">
      <CourseDetailItem />
    </div>
  );
}

export default CourseDetail;
