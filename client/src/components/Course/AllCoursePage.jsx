import React, { useState, useEffect } from "react";
import PublicService from "../../services/Public.service";
import CourseItem from "./CourseItem";
import { Pagination } from "@mui/material";

function AllCoursePage() {
  const [courseData, setCourseData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  const fetchData = async () => {
    try {
      const response = await PublicService.getAllCourse(pageSize, page);
      console.log(response.data);
      setCourseData(response.data.courses);
      setTotalCount(response.data.totalCount);
      setPage(response.data.page);
      setPageSize(response.data.pageSize);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, pageSize]); // Fetch data when page or pageSize changes

  const handleChange = (event, value) => {
    setPage(value);
  };

  const totalPage = Math.ceil(totalCount / pageSize);

  return (
    <div className=" min-h-[80%] mx-[100px] p-2 flex flex-row gap-1">
      <div className=" flex-1 p-2 rounded-md ">
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 grid-cols-1 sm:grid-cols-2 gap-3 px-4 p-2">
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
        <div className="flex items-center justify-center gap-4 p-4 mt-[100px] ">
          <Pagination
            count={totalPage}
            page={page}
            onChange={handleChange}
            variant="outlined"
            color="primary"
            shape="rounded"
          />
        </div>
      </div>
    </div>
  );
}

export default AllCoursePage;
