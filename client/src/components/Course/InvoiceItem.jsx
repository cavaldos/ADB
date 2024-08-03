import React, { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { MdDiscount } from "react-icons/md";
import { Input } from "@material-tailwind/react";

// 2024-07-15T03:36:28.450Z
const formatDate = (date) => {
  const d = new Date(date);
  return d.toLocaleDateString();
};

function InvoiceItem(props) {
  // const {
  //   CourseID,
  //   Title,
  //   Description,
  //   Language,
  //   CategoryName,
  //   InstructorName,
  //   Image,
  //   Price,
  //   CreateTime,
  // } = props;
  const naviage = useNavigate();

  const [statusCode, setStatusCode] = useState(false);
  const CourseID = 1;
  const Title = "Deep Learning Specialization";
  const Language = "English";
  const Description =
    "Master Deep Learning and earn a Specialization Certificate from Couvzxcvzxcvzxcvxzcvzxcvzxcvzxcvxzvxzcvxzcvzxcvrsera";
  const CategoryName = "Deep Learning";
  const InstructorName = "Andrew Ng";
  const Price = 49.99;
  const CreateTime = "2024-07-15T03:36:28.450Z";

  const handleRemove = () => {
    // Remove item from cart
  };
  const handlePayment = () => {
    // Add
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-800 max-w-[1000px]">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        {/* Image Section */}
        <div className="shrink-0 md:order-1">
          <a href="#">
            <img
              className="h-32 w-32 rounded-lg object-cover"
              src="https://images.unsplash.com/photo-1719216324463-92a973ebf910?q=80&w=2828&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="imac image"
            />
          </a>
        </div>

        {/* Details Section */}
        <div className="flex-1 space-y-4 md:order-2">
          <div>
            <h2
              onClick={() => {
                naviage(`/course-detail/${CourseID}`);
              }}
              className="text-lg font-bold text-gray-900 dark:text-white cursor-pointer hover:underline"
            >
              <span className="italic font-bold">Title:</span> {Title}
            </h2>
          </div>

          {/* <div>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="italic font-bold">Description:</span>{" "}
              {Description}
            </p>
          </div> */}

          <div>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="italic font-bold">Instructor:</span>{" "}
              {InstructorName}
            </p>
          </div>
          <div>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="italic font-bold">Language:</span> {Language}
            </p>
          </div>

          <div>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="italic font-bold">Created:</span>{" "}
              {formatDate(CreateTime)}
            </p>
          </div>
          <div>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="italic font-bold">Category:</span> {CategoryName}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Button
              onClick={handleRemove}
              size="sm"
              variant="text"
              className="flex items-center text-red-600 hover:underline dark:text-red-500"
            >
              <FaTrashAlt className="mr-2" /> Remove
            </Button>{" "}
            <div>
              <Input label="Discount Code" placeholder="Enter code" />
            </div>
            <Button
              onClick={handlePayment}
              size="sm"
              variant="text"
              className="flex items-center text-white bg-green-600 hover:underline hover:text-black  ml-auto"
            >
              <MdDiscount className="mr-2" />
              Apply Discount
            </Button>
          </div>
        </div>

        {/* Price Section */}
        <div className="flex flex-col items-start justify-end md:order-3  gap-2 p-2 bg-white dark:bg-gray-800 rounded-lg shadow-md  mx-auto">
          {statusCode ? (
            <p className="text-red-400">Code Invalide</p>
          ) : (
            <p className=" text-green-600">Code Sucsses</p>
          )}
          {/* discount persent */}
          <div className=" flex text-end">
            <span className="text-gray-600 dark:text-gray-400">
              Original Price :
            </span>
            <span className="text-xl font-medium text-gray-900 dark:text-white">
              ${Price.toFixed(2)}
            </span>
          </div>{" "}
          <div className=" flex text-end">
            <span className="text-gray-600 dark:text-gray-400">Discount :</span>
            <span className="text-lg font-medium text-green-600 dark:text-green-400">
              {10}%
            </span>
          </div>{" "}
          <div className="flex text-end">
            <span className="text-gray-600 dark:text-gray-400">
              Discounted price :
            </span>
            <span className="text-lg font-medium text-green-600 dark:text-green-400">
              {(Price - Price * 0.1).toFixed(2)}
            </span>
          </div>
        </div>
        {/*  */}
      </div>
    </div>
  );
}

export default InvoiceItem;
