import React from "react";
import {
  Star,
  Clock,
  Globe,
  FileText,
  Download,
  Smartphone,
  Infinity,
  Award,
} from "lucide-react";
import { GoStar } from "react-icons/go";


const CourseDetailItem = () => {
  return (
    <div className="bg-gray-100 p-6 font-sans">
      <div className="max-w-6xl mx-auto">
        <nav className="text-sm mb-4">
          <span className="text-gray-500">
            Development &gt; Programming Languages &gt; Python
          </span>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <h1 className="text-3xl font-bold mb-2">
              100 Days of Code: The Complete Python Pro Bootcamp
            </h1>
            <p className="text-gray-600 mb-4">
              Master Python by building 100 projects in 100 days. Learn data
              science, automation, build websites, games and apps!
            </p>

            <div className="flex items-center mb-4">
              <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm font-semibold mr-2">
                Bestseller
              </span>
              <div className="flex items-center">
                <span className="text-yellow-400 font-bold mr-1">4.7</span>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="w-4 h-4 fill-current text-yellow-400"
                    />
                  ))}
                </div>
                <span className="text-blue-600 ml-1">(313,027 ratings)</span>
              </div>
              <span className="ml-4 text-gray-600">1,339,527 students</span>
            </div>

            <p className="mb-4">
              Created by{" "}
              <span className="text-blue-600">
                Dr. Angela Yu, Developer and Lead Instructor
              </span>
            </p>

            <div className="flex items-center text-sm text-gray-600 mb-6">
              <Clock className="w-4 h-4 mr-1" />
              <span className="mr-4">Last updated 7/2024</span>
              <Globe className="w-4 h-4 mr-1" />
              <span className="mr-4">English</span>
              <FileText className="w-4 h-4 mr-1" />
              <span>English, Arabic [Auto], 14 more</span>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h2 className="text-xl font-bold mb-4">What you'll learn</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "You will master the Python programming language by building 100 unique projects over 100 days.",
                  "You will learn automation, game, app and web development, data science and machine learning all using Python.",
                  "You will be able to program in Python professionally",
                  "You will learn Selenium, Beautiful Soup, Request, Flask, Pandas, NumPy, Scikit Learn, Plotly, and Matplotlib.",
                  "Create a portfolio of 100 Python projects to apply for developer jobs",
                  "Be able to build fully fledged websites and web apps with Python",
                  "Be able to use Python for data science and machine learning",
                  "Build games like Blackjack, Pong and Snake using Python",
                  "Build GUIs and Desktop applications with Python",
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="mb-4">
                <span className="text-3xl font-bold">₫2,199,000</span>
              </div>
              <button className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold mb-2">
                Add to cart
              </button>
              <button className="w-full bg-white border border-black text-black py-3 rounded-lg font-semibold mb-4">
                Buy now
              </button>
              <p className="text-center text-sm mb-4">
                30-Day Money-Back Guarantee
              </p>
              <h3 className="font-bold mb-2">This course includes:</h3>
              <ul className="space-y-2">
                {[
                  {
                    icon: <Clock className="w-5 h-5" />,
                    text: "54 hours on-demand video",
                  },
                  {
                    icon: <FileText className="w-5 h-5" />,
                    text: "Assignments",
                  },
                  {
                    icon: <FileText className="w-5 h-5" />,
                    text: "226 articles",
                  },
                  {
                    icon: <Download className="w-5 h-5" />,
                    text: "147 downloadable resources",
                  },
                  {
                    icon: <Smartphone className="w-5 h-5" />,
                    text: "Access on mobile and TV",
                  },
                  {
                    icon: <Infinity className="w-5 h-5" />,
                    text: "Full lifetime access",
                  },
                  {
                    icon: <Award className="w-5 h-5" />,
                    text: "Certificate of completion",
                  },
                ].map((item, index) => (
                  <li key={index} className="flex items-center">
                    {item.icon}
                    <span className="ml-2">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailItem;
