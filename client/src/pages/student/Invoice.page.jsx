import React, { useState, useEffect } from "react";
import InvoiceItem from "../../components/Course/InvoiceItem";
import { Button } from "@material-tailwind/react";

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
        <div class="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
          <p class="text-xl font-semibold text-gray-900 dark:text-white">
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

const Invoice = () => {
  const { cart, total, setCart, setTotal } = InvoiceService();
  return (
    <>
      <div class="mx-auto max-w-screen-xl px-4 2xl:px-0  ">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
          Invoice Page
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
export default Invoice;
