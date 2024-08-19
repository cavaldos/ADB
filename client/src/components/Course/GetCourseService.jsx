import React, { useState, useEffect, useCallback } from "react";
import CourseService from "../../services/Course.service";
function GetCourseService() {
  const [courseData, setCourseData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPage, setTotalPage] = useState(1);
  const [searchString, setSearchString] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [totalCount, setTotalCount] = useState(0);

  const fetchData2 = useCallback(async () => {
    const res = await CourseService.searchCourse(searchString, pageSize, page);
    const courses =await res.data.courses || [];
    const prices =  courses.map((course) => course.Price);
    const min = Math.min(...prices);
    const max = Math.max(...prices);

    await setCourseData(courses);
    // console.log("res", res.data.courses);
    await setTotalPage(res.data.totalPage);
    await setTotalCount(res.data.totalCount);
  });

  return {
    courseData,
    setCourseData,
    page,
    setPage,
    pageSize,
    setPageSize,
    totalPage,
    setTotalPage,
    searchString,
    setSearchString,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    fetchData2,
    totalCount,
  };
}

export default GetCourseService;
