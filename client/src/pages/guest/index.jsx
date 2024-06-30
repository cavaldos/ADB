import React, { useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../../components/ProductCard";

const GuestPage = () => {
  return (
    <>
      <section className="container mx-auto p-4 flex items-center justify-between bg-slate-400">
        <h1>asfsdf</h1>
        <div>
          <h1 className="text-4xl font-bold">Learn without limits</h1>
          <p className="mt-4 text-lg text-gray-700">
            Start, switch, or advance your career with more than 7,000 courses,
            Professional Certificates, and degrees from world-class universities
            and companies.
          </p>
          <div className="mt-8 flex space-x-4">
            <Link
              to="#"
              className="bg-blue-600 text-white px-4 py-2 rounded-full"
            >
              Join for Free
            </Link>
            <Link
              to="#"
              className="border border-blue-600 text-blue-600 px-4 py-2 rounded-full"
            >
              Try Coursera for Business
            </Link>
          </div>
        </div>
        <div>
          <img
            src="https://via.placeholder.com/400x400"
            alt="Hero"
            className="rounded-full"
          />
        </div>
      </section>
      <ProductCard />
    </>
  );
};
export default GuestPage;
