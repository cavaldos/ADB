import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";

import CourseItem from "../../components/Course/CourseItem";
import CourseService from "../../services/Course.service";
import FilterCourse from "../../components/Course/FilterCourse";
import Pagination from "../../components/Course/Pagination";
import GetCourseService from "../../components/Course/GetCourseService";
function SearchCourse() {
  let location = useLocation();
  let stringTemp = decodeURIComponent(location.pathname.split("/").pop());
  const {
    courseData,
    setCourseData,
    page,
    pageSize,
    setTotalPage,
    searchString,
    setSearchString,
  } = GetCourseService();
  //
  useEffect(() => {
    setSearchString(stringTemp || "");
    CourseService.getAllCourse(pageSize, page).then((response) => {
      setCourseData(response.data || []);
      // setTotalPage(response.totalPage);
    });
  }, [searchString, page, pageSize, stringTemp]);
  return (
    <div className=" min-h-[80%] mx-[100px] p-2 flex flex-row gap-1">
      <FilterCourse />
      <div className=" flex-1 p-2  rounded-md bg-blue-gray-200 ">
        <h1 className="font-semibold text-xl mb-1">
          {" "}
          result for "{searchString}"
        </h1>
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 grid-cols-1 sm:grid-cols-2  gap-3 px-4 p-2 ">
          {courseData.length === 0 ? (
            <div className="text-center">No course found</div>
          ) : (
            courseData.map((item) => (
              <CourseItem
                key={item.CourseID}
                CourseID={item.CourseID}
                Title={item.Title}
                Description={item.Description}
                Language={item.Language}
                Status={item.Status}
                Image={item.Image}
                Price={item.Price}
                CreateTime={item.CreateTime}
                CategoryName={item.CategoryName}
                FullName={item.FullName}
              />
            ))
          )}
        </div>
        <Pagination />
      </div>
    </div>
  );
}

export default SearchCourse;
