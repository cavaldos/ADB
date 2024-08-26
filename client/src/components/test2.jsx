import React from "react";

const ShippingLabelComponent = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <div className="m-auto">
        <div>
          <button
            type="button"
            className="relative w-full flex justify-center items-center px-5 py-2.5 font-medium tracking-wide text-white capitalize bg-black rounded-md hover:bg-gray-900 focus:outline-none transition duration-300 transform active:scale-95 ease-in-out"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              enableBackground="new 0 0 24 24"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              fill="#FFFFFF"
            >
              <g>
                <rect fill="none" height="24" width="24"></rect>
              </g>
              <g>
                <g>
                  <path d="M19,13h-6v6h-2v-6H5v-2h6V5h2v6h6V13z"></path>
                </g>
              </g>
            </svg>
            <span className="pl-2 mx-1">Create new shipping label</span>
          </button>
          <div className="mt-5 bg-white rounded-lg shadow">
            <div className="flex">
              <div className="flex-1 py-5 pl-5 overflow-hidden">
                <svg
                  className="inline align-text-top"
                  height="24px"
                  viewBox="0 0 24 24"
                  width="24px"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#000000"
                >
                  <g>
                    <path
                      d="m4.88889,2.07407l14.22222,0l0,20l-14.22222,0l0,-20z"
                      fill="none"
                      stroke="null"
                    ></path>
                    <path d="m7.07935,0.05664c-3.87,0 -7,3.13 -7,7c0,5.25 7,13 7,13s7,-7.75 7,-13c0,-3.87 -3.13,-7 -7,-7zm-5,7c0,-2.76 2.24,-5 5,-5s5,2.24 5,5c0,2.88 -2.88,7.19 -5,9.88c-2.08,-2.67 -5,-7.03 -5,-9.88z"></path>
                    <circle cx="7.04807" cy="6.97256" r="2.5"></circle>
                  </g>
                </svg>
                <h1 className="inline text-2xl font-semibold leading-none">
                  Sender
                </h1>
              </div>
            </div>
            <div className="px-5 pb-5">
              <input
                placeholder="Name"
                className="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
              />
              <input
                placeholder="Address"
                className="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
              />
              <div className="flex">
                <div className="flex-grow w-1/4 pr-2">
                  <input
                    placeholder="PLZ"
                    className="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                  />
                </div>
                <div className="flex-grow">
                  <input
                    placeholder="City"
                    className="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                  />
                </div>
              </div>
              <div className="flex items-center pt-3">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-black bg-gray-300 border-none rounded-md focus:ring-transparent"
                />
                <label
                  htmlFor="safeAdress"
                  className="block ml-2 text-sm text-gray-900"
                >
                  Save as default address
                </label>
              </div>
            </div>
            <div className="flex">
              <div className="flex-1 py-5 pl-5 overflow-hidden">
                <svg
                  className="inline align-text-top"
                  width="21"
                  height="20.5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#000000"
                >
                  <g>
                    <path
                      d="m4.88889,2.07407l14.22222,0l0,20l-14.22222,0l0,-20z"
                      fill="none"
                      stroke="null"
                    ></path>
                    <path d="m7.07935,0.05664c-3.87,0 -7,3.13 -7,7c0,5.25 7,13 7,13s7,-7.75 7,-13c0,-3.87 -3.13,-7 -7,-7zm-5,7c0,-2.76 2.24,-5 5,-5s5,2.24 5,5c0,2.88 -2.88,7.19 -5,9.88c-2.08,-2.67 -5,-7.03 -5,-9.88z"></path>
                    <circle cx="7.04807" cy="6.97256" r="2.5"></circle>
                  </g>
                </svg>
                <h1 className="inline text-2xl font-semibold leading-none">
                  Receiver
                </h1>
              </div>
              <div className="flex-none pt-2.5 pr-2.5 pl-1"></div>
            </div>
            <div className="px-5 pb-5">
              <input
                placeholder="Name"
                className="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
              />
              <input
                placeholder="Address"
                className="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
              />
              <div className="flex">
                <div className="flex-grow w-1/4 pr-2">
                  <input
                    placeholder="PLZ"
                    className="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                  />
                </div>
                <div className="flex-grow">
                  <input
                    placeholder="City"
                    className="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingLabelComponent;
