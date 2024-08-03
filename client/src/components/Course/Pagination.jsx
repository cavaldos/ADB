import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Button, IconButton } from "@material-tailwind/react";

import GetCourseService from "../../components/Course/GetCourseService";

function Pagination() {
  const { page, setPage, totalPage } = GetCourseService();
  const [active, setActive] = useState(1);

  const getItemProps = (index) => ({
    variant: page === index ? "filled" : "text",
    color: "gray",
    onClick: () => {
      setPage(index);
    },
  });

  const next = () => {
    if (page < totalPage) {
      const nextPage = page + 1;
      setPage(nextPage);
      setActive(nextPage); // Ensure this matches if needed
    }
  };

  const prev = () => {
    if (page > 1) {
      const prevPage = page - 1;
      setPage(prevPage);
      setActive(prevPage); // Ensure this matches if needed
    }
  };
  return (
    <div className="flex items-center justify-center gap-4 p-4 mt-[100px] ">
      <Button className="flex gap-3" onClick={prev} disabled={active === 1}>
        <FaArrowLeft className="h-4 w-4" />
        Previous
      </Button>
      {[...Array(totalPage).keys()].map((page) => (
        <IconButton {...getItemProps(page + 1)} key={page}>
          {page + 1}
        </IconButton>
      ))}
      <Button
        className="flex gap-3"
        onClick={next}
        disabled={active === totalPage}
      >
        Next
        <FaArrowRight className="h-4 w-4" />
      </Button>
    </div>
  );
}

export default Pagination;
