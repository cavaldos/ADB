import React, { useState, useEffect } from "react";
import InvoiceItem from "../../components/Course/InvoiceItem";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { MdPayment } from "react-icons/md";

const InvoiceService = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  return {
    cart,
    total,
    setCart,
    setTotal,
  };
};
const TotalBill = () => {
  const { cart, total } = InvoiceService();
  return (
    <>
      <div class="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full bg-slate-300">
        <div class="space-y-4 rounded-lg border  border-gray-200 bg-white min-w-[350px] p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
          <p class="text-xl font-semibold text-gray-900 dark:text-white ">
            Information Invoice
          </p>

          <div class="space-y-4">
            <div class="space-y-2">
              <dl class="flex items-center justify-between gap-4">
                <dt class="text-base font-normal text-gray-500 dark:text-gray-400">
                  Original price
                </dt>
                <dd class="text-base font-medium text-gray-900 dark:text-white">
                  $7,592
                </dd>
              </dl>

              <dl class="flex items-center justify-between gap-4">
                <dt class="text-base font-normal text-gray-500 dark:text-gray-400">
                  Tax
                </dt>
                <dd class="text-base font-medium text-gray-900 dark:text-white">
                  $799
                </dd>
              </dl>
            </div>
          </div>
        </div>
        <div class="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
          <p class="text-xl font-semibold text-gray-900 dark:text-white">
            Order summary
          </p>

          <div class="space-y-4">
            <div class="space-y-2">
              <dl class="flex items-center justify-between gap-4">
                <dt class="text-base font-normal text-gray-500 dark:text-gray-400">
                  Original price
                </dt>
                <dd class="text-base font-medium text-gray-900 dark:text-white">
                  $7,592.00
                </dd>
              </dl>

              <dl class="flex items-center justify-between gap-4">
                <dt class="text-base font-normal text-gray-500 dark:text-gray-400">
                  Total savings
                </dt>
                <dd class="text-base font-medium text-green-600">-$299.00</dd>
              </dl>
            </div>

            <dl class="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
              <dt class="text-base font-bold text-gray-900 dark:text-white">
                Total
              </dt>
              <dd class="text-base font-bold text-gray-900 dark:text-white">
                $8,191.00
              </dd>
            </dl>
          </div>
        </div>

        <div class="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6 ">
          <Button className="flex mx-auto bg-purple-500">
            <MdPayment className="mr-2" />
            Payment
          </Button>
        </div>
      </div>
    </>
  );
};
const InvoiceHistoryItem = () => {
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
        <div className="flex-1 space-y-4 md:order-2">
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
              <span className="italic font-bold">Created:</span> {CreateTime}
            </p>
          </div>
          <div>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="italic font-bold">Category:</span> {CategoryName}
            </p>
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
};
const InvoiceNow = () => {
  return (
    <>
      <div class="mx-auto max-w-screen-xl px-4 2xl:px-0  ">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
          Invoice Now
        </h2>
        <div class="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
          <div class="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
            <div class="space-y-6 ">
              <InvoiceItem />
              <InvoiceItem />
            </div>
          </div>
          <TotalBill />
        </div>
      </div>
    </>
  );
};

const InvoiceHistory = () => {
  return (
    <>
      <div class="mx-auto max-w-screen-xl px-4  2xl:px-0  ">
        <h1>Invoice History</h1>
        <div class="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8 ">
          <div class="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
            <div class="space-y-6 ">
              <InvoiceHistoryItem />
              <InvoiceHistoryItem />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const Invoice = () => {
  const { cart, total, setCart, setTotal } = InvoiceService();

  const [activeTab, setActiveTab] = useState("InvoiceNow");

  return (
    <div className="p-8  mx-[200px]">
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab("InvoiceNow")}
          className={`px-4 py-2 rounded-full ${
            activeTab === "InvoiceNow"
              ? "bg-gray-800 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          Invoice Now
        </button>
        <button
          onClick={() => setActiveTab("InvoiceHistory")}
          className={`px-4 py-2 rounded-full ${
            activeTab === "InvoiceHistory"
              ? "bg-gray-800 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          Invoice History
        </button>
      </div>
      <div>
        {activeTab === "InvoiceNow" ? <InvoiceNow /> : <InvoiceHistory />}
      </div>
    </div>
  );
};
export default Invoice;
