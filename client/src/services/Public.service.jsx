import { auto } from "@popperjs/core";
import instance from "./axios.config";

const PublicService = {
  searchCourse: async (searchString, pageSize, page) => {
    try {
      const response = await instance.post(`/public/search_course`, {
        searchString,
        pageSize,
        page,
      });
      return response;
    } catch (error) {
      console.error("Error fetching data: ", error);
      return { data: null, error: error.message || "An error occurred" };
    }
  },
  autoComplete: async (searchString) => {
    const pageSize = 10;
    const page = 1;
    try {
      const response = await instance.post(`/public/search_course`, {
        searchString,
        pageSize,
        page,
      });
      return response;
    } catch (error) {
      console.error("Error fetching data: ", error);
      return { data: null, error: error.message || "An error occurred" };
    }
  },
};

export default PublicService;
