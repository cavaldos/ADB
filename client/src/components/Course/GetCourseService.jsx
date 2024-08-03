import React, { useState, useEffect } from "react";

function GetCourseService() {
  const [courseData, setCourseData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPage, setTotalPage] = useState(5);
  const [searchString, setSearchString] = useState("");

  const [language, setLanguage] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);

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
  };
}

export default GetCourseService;
