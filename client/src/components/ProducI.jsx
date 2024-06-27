const Product = () => {
  return (
    <>
      <div class="space-y-6 overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800 bg-slate-500">
        <a href="#" class="overflow-hidden rounded">
          <img
            class="mx-auto h-44 w-44 dark:hidden"
            src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg"
            alt="imac image"
          />
          <img
            class="mx-auto hidden h-44 w-44 dark:block"
            src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg"
            alt="imac image"
          />
        </a>
        <div>
          <a
            href="#"
            class="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white"
          >
            iMac 27”
          </a>
          <p class="mt-2 text-base font-normal text-gray-500 dark:text-gray-400">
            This generation has some improvements, including a longer continuous
            battery life.
          </p>
        </div>
        <div>
          <p class="text-lg font-bold text-gray-900 dark:text-white">
            <span class="line-through"> $399,99 </span>
          </p>
          <p class="text-lg font-bold leading-tight text-red-600 dark:text-red-500">
            $299
          </p>
        </div>
        <div class="mt-6 flex items-center gap-2.5">
          <button
            data-tooltip-target="favourites-tooltip-1"
            type="button"
            class="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white p-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
          >
            <svg
              class="h-5 w-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z"
              ></path>
            </svg>
          </button>
          <div
            id="favourites-tooltip-1"
            role="tooltip"
            class="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700"
          >
            Add to favourites
            <div class="tooltip-arrow" data-popper-arrow></div>
          </div>
          <button
            type="button"
            class="inline-flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium  text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            <svg
              class="-ms-2 me-2 h-5 w-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7h-1M8 7h-.688M13 5v4m-2-2h4"
              />
            </svg>
            Add to cart
          </button>
        </div>
      </div>
    </>
  );
};

export default Product;
