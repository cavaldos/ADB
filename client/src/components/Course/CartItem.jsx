import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { ImPaypal } from "react-icons/im";
import StudentService from "../../services/Student.service";
import { message } from "antd";
import { resetState } from "../../redux/features/resetStateSlice";
import { useDispatch, useSelector } from "react-redux";
import { Tooltip } from "antd";
import { renderUrl } from "../../hooks/GetURLImage";
const formatDate = (date) => {
  const d = new Date(date);
  return d.toLocaleDateString();
};

function CartItem(props) {
  const {
    CartDetailID,
    CourseID,
    CreateTime,
    Image,
    InstructorName,
    Price,
    Status,
    Subtitle,
    Title,
    cartID,
  } = props;
  const naviage = useNavigate();
  const dispatch = useDispatch();
  const studentID = useSelector((state) => state.profile.StudentID);
  const handleRemove = async () => {
    await StudentService.Cart.removeFromCart(cartID, CourseID).then((res) => {
      if (res.status === 200) {
        message.success("Remove success");
        dispatch(resetState());
      } else {
        message.error("Remove failed");
      }
    });
  };
  const handlePayment = async () => {
    await StudentService.Invoice.createInvoice(studentID, CourseID).then(
      (res) => {
        if (res.status === 200) {
          StudentService.Cart.removeFromCart(cartID, CourseID).then((res) => {
            if (res.status === 200) {
              message.success("Remove success");
              dispatch(resetState());
            } else {
              message.error("Remove failed");
            }
          });
          dispatch(resetState());
        } else {
          message.error("Payment failed");
        }
      }
    );
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-800 max-w-[1000px]">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        {/* Image Section */}
        <div className="shrink-0 md:order-1">
          <a href="#">
            <img
              className="h-32 w-32 rounded-lg object-cover"
              src={
                renderUrl() ||
                Image ||
                "https://images.unsplash.com/photo-1719216324463-92a973ebf910?q=80&w=2828&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
              alt="imac image"
            />
          </a>
        </div>

        {/* Details Section */}
        <div className="flex-1 space-y-4 md:order-2">
          <div>
            <Tooltip title={"CourseID :" + CourseID}>
              <h2
                onClick={() => {
                  naviage(`/course-detail/${CourseID}`);
                }}
                className="text-lg font-bold text-gray-900 dark:text-white cursor-pointer hover:underline"
              >
                <span className="italic">Title:</span> {Title}
              </h2>
            </Tooltip>
          </div>

          <div>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="italic font-bold">Instructor:</span>{" "}
              {InstructorName}
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
              <span className="italic font-bold">Status:</span> {Status}
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
            <Button
              onClick={handlePayment}
              size="sm"
              variant="text"
              className="flex items-center text-white bg-green-600 hover:underline hover:text-black  ml-auto"
            >
              <ImPaypal className="mr-2" />
              Pay
            </Button>
          </div>
        </div>

        {/* Price Section */}
        <div className="flex items-center justify-end md:order-3">
          <div className="text-end">
            <p className="text-xl font-bold text-gray-900 dark:text-white">
              ${Price}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
