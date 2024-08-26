
import instance from "./axios.config";

const CourseService = {
  searchCourse: async (searchString, pageSize, page) => {
    try {
      const response = await instance.post(`/public/search_course`, {
        searchString,
        pageSize: pageSize || 10,
        page: page || 1,
      });
      return response;
    } catch (error) {
      console.error("Error fetching data: ", error);
      return { data: null, error: error.message || "An error occurred" };
    }
  },
  autoComplete: async (searchString) => {
    const pageSize = 15;
    const page = 1;
    try {
      const response = await instance.post(`/public/auto_complete_search`, {
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
  getAllCourse: async (pageSize, page) => {
    try {
      const response = await instance.post(`/public/get_all_course`, {
        pageSize,
        page,
      });
      return response;
    } catch (error) {
      console.error("Error fetching data: ", error);
      return { data: null, error: error.message || "An error occurred" };
    }
  },
  getCourseDetail: async (courseID) => {
    try {
      const response = await instance.post(`/public/get_course_detail`, {
        courseID,
      });
      return response;
    } catch (error) {
      console.error("Error fetching data: ", error);
      return { data: null, error: error.message || "An error occurred" };
    }
  },
};

export default CourseService;
