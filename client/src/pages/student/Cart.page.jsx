import React, { useState, useEffect } from "react";
import CartItem from "../../components/Course/CartItem";
import { useSelector } from "react-redux";
import StudentService from "../../services/Student.service";

const TotalBill = (props) => {
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
    totalPrice,
  } = props;
  return (
    <>
      <div class="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full bg-slate-300 shadow-sm">
        <div class="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
          <p class="text-xl font-semibold text-gray-900 dark:text-white">
            Order summary
          </p>
          <div class="space-y-4">
            <div class="space-y-2">
              <dl class="flex items-center justify-between gap-4">
                <dt class="text-base font-normal text-gray-500 dark:text-gray-400">
                  Quantity of Course
                </dt>
                <dd class="text-base font-medium text-green-600">
                  {" "}
                  -$ {totalPrice.toFixed(2)}
                </dd>
              </dl>
            </div>

            <dl class="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700"></dl>
          </div>
        </div>
      </div>
    </>
  );
};

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [CartID, setCartID] = useState(0); 
  const studentID = useSelector((state) => state.profile.StudentID);
  const state = useSelector((state) => state.resetState.state);
  useEffect(() => {
    StudentService.Cart.selectCart(studentID).then((res) => {
      setCart(res.data.Details);
      setCartID(res.data.CartID);
    });
  }, [state]);

  const totalPrice = cart.reduce((total, item) => total + item.Price, 0);

  return (
    <>
      <div class="mx-auto max-w-screen-xl px-4 2xl:px-0  ">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
          Shopping Cart
        </h2>
        <div class="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
          <div class="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
            <div class="space-y-6">
              {cart.map((item) => (
                <CartItem
                  key={item.CourseID}
                  CartDetailID={item.CartDetailID}
                  CourseID={item.CourseID}
                  CreateTime={item.CreateTime}
                  Image={item.Image}
                  InstructorName={item.InstructorName}
                  Price={item.Price}
                  Status={item.Status}
                  Subtitle={item.Subtitle}
                  Title={item.Title}
                  cartID={CartID}
                />
              ))}
            </div>
          </div>
          <TotalBill totalPrice={totalPrice} />
        </div>
      </div>
    </>
  );
};
export default Cart;
