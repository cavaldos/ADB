import React, { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
const Lecture = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="max-w-4xl mx-auto mt-6 p-1 ">
      <div className="border-[1px] border-[#929599] rounded-[5px] overflow-hidden hover:bg-[#F0F7FF] hover:border-sky-700">
        <div
          className="bg-blue-50 cursor-pointer p-4 flex justify-start gap-3 items-center "
          onClick={toggleOpen}
        >
          <span>{isOpen ? <IoIosArrowDown /> : <IoIosArrowForward />}</span>
          <span className="text-lg font-semibold text-gray-900 ">
            Making Predictions
          </span>
        </div>
        <div
          style={{
            maxHeight: isOpen ? "1000px" : "0px",
            transition: "max-height 0.4s ease-in-out",
          }}
          className={` overflow-hidden bg-white border-t`}
        >
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-semibold text-gray-900">
                  Making Predictions Before You Listen
                </p>
                <p className="text-gray-600">Video • 2 min</p>
              </div>
              <div className="text-green-500">✔</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const VideoCom = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="max-w-4xl mx-auto mt-6 p-1">
      <div className="border-[1px] border-[#929599] rounded-[5px] overflow-hidden hover:bg-[#F0F7FF] hover:border-sky-700">
        <div
          className="bg-blue-50 cursor-pointer p-4 flex justify-start gap-3 items-center"
          onClick={toggleOpen}
        >
          <span>{isOpen ? <IoIosArrowDown /> : <IoIosArrowForward />}</span>
          <span className="text-lg font-semibold text-gray-900">Video</span>
        </div>
        <div
          style={{
            maxHeight: isOpen ? "1000px" : "0px",
            transition: "max-height 0.4s ease-in-out",
          }}
          className="overflow-hidden bg-white border-t"
        >
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-semibold text-gray-900">
                  Making Predictions Before You Listen
                </p>
                <p className="text-gray-600">Video • 2 min</p>
              </div>
              <div className="text-green-500">✔</div>
            </div>
            <div className="mt-4">
              <iframe
                className="w-full min-h-[400px]"
                // src="https://drive.google.com/file/d/1B9KwdIpO96IaxaQbsoFTfxdZ97TFuwfT/view?usp=sharing"
                src="https://www.youtube.com/embed/bU98q1wNCzA"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


const VideoC = ({ videoUrl }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const getEmbedUrl = (url) => {
    if (url.includes("youtube.com")) {
      const videoId = url.split("v=")[1];
      return `https://www.youtube.com/embed/${videoId}`;
    } else if (url.includes("drive.google.com")) {
      const fileId = url.split("/d/")[1].split("/")[0];
      return `https://drive.google.com/file/d/${fileId}/preview`;
    }
    return url;
  };

  const embedUrl = getEmbedUrl(videoUrl);

  return (
    <div className="max-w-4xl mx-auto mt-6 p-1">
      <div className="border-[1px] border-[#929599] rounded-[5px] overflow-hidden hover:bg-[#F0F7FF] hover:border-sky-700">
        <div
          className="bg-blue-50 cursor-pointer p-4 flex justify-start gap-3 items-center"
          onClick={toggleOpen}
        >
          <span>{isOpen ? <IoIosArrowDown /> : <IoIosArrowForward />}</span>
          <span className="text-lg font-semibold text-gray-900">Video</span>
        </div>
        <div
          style={{
            maxHeight: isOpen ? "1000px" : "0px",
            transition: "max-height 0.4s ease-in-out",
          }}
          className="overflow-hidden bg-white border-t"
        >
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-semibold text-gray-900">
                  Making Predictions Before You Listen
                </p>
                <p className="text-gray-600">Video • 2 min</p>
              </div>
              <div className="text-green-500">✔</div>
            </div>
            <div className="mt-4">
              <iframe
                className="w-full min-h-[400px]"
                src={embedUrl}
                title="Video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const CollapsibleSection = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="max-w-4xl mx-auto mt-6 p-1 ">
      <div className="border-[1px] border-[#929599] rounded-[5px] overflow-hidden hover:bg-[#F0F7FF] hover:border-sky-700">
        <div
          className="cursor-pointer p-4 flex justify-start gap-3 items-center"
          onClick={toggleOpen}
        >
          <span>{isOpen ? <IoIosArrowDown /> : <IoIosArrowForward />}</span>
          <span className="text-lg font-semibold text-gray-900">
            Making Predictions
          </span>
        </div>
        <div
          style={{
            maxHeight: isOpen ? "100%" : "0px",
            transition: "max-height 0.5s ease-in-out",
          }}
          className={` ease-in-out overflow-hidden bg-white border-t`}
        >
          <div className="p-6 overflow-auto">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-semibold text-gray-900">
                  Making Predictions Before You Listen
                </p>
                <p className="text-gray-600">Video • 2 min</p>
              </div>
              <div className="text-green-500">✔</div>
            </div>
            <Lecture />

            <VideoCom />
            kk
            <VideoC videoUrl={"https://www.youtube.com/watch?v=bU98q1wNCzA"} />
            <VideoC videoUrl="https://drive.google.com/file/d/1B9KwdIpO96IaxaQbsoFTfxdZ97TFuwfT/view?usp=sharing" />

            <div className="mt-4">
              <p className="text-lg font-semibold text-gray-900">
                Prepare for Predicting and Review the Lesson
              </p>
              <p className="text-gray-600">Reading • 30 min</p>
            </div>
            <div className="mt-4">
              <p className="text-lg font-semibold text-gray-900">
                Making Predictions
              </p>
              <p className="text-gray-600">Practice Quiz • 2 questions</p>
            </div>
            <div className="mt-4 flex justify-end">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                Resume
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const Test = () => {
  return (
    <div className="mb-10">
      <h1>Tessdfsadt</h1>
      <CollapsibleSection />
    </div>
  );
};
export default Test;
