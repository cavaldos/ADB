import instance from "./axios.config";

const InstructorService = {
  getAllCOurseByInstructor: async (instructorID) => {
    try {
      const response = await instance.post(
        `/instructor/get_all_course_instructorID`,
        {
          instructorID,
        }
      );
      return response;
    } catch (error) {
      console.error("Error fetching data: ", error);
      return { data: null, error: error.message || "An error occurred" };
    }
  },

  createCourse: async (
    title,
    subtitle,
    description,
    language,
    image,
    price,
    status,
    categoryID,
    instructorID
  ) => {
    try {
      const response = await instance.post(`/instructor/create_course`, {
        title,
        subtitle,
        description,
        language,
        image,
        price,
        status,
        categoryID,
        instructorID,
      });
      return response;
    } catch (error) {
      console.error("Error fetching data: ", error);
      return { data: null, error: error.message || "An error occurred" };
    }
  },
  updateCourse: async (
    courseID,
    title,
    subtitle,
    description,
    language,
    image,
    price,
    status,
    historyMessage
  ) => {
    try {
      const response = await instance.post(`/instructor/update_course`, {
        courseID,
        title,
        subtitle,
        description,
        language,
        image,
        price,
        status,
        historyMessage,
      });
      return response;
    } catch (error) {
      console.error("Error fetching data: ", error);
      return { data: null, error: error.message || "An error occurred" };
    }
  },
  historyCourse: async (courseID) => {
    try {
      const response = await instance.post(`/instructor/get_course_history`, {
        courseID,
      });
      return response;
    } catch (error) {
      console.error("Error fetching data: ", error);
      return { data: null, error: error.message || "An error occurred" };
    }
  },
 


  Category: {
    createCategory: async (name, description, parentCategoryID) => {
      try {
        const response = await instance.post(`/instructor/create_category`, {
          name,
          description,
          parentCategoryID,
        });
        return response;
      } catch (error) {
        console.error("Error fetching data: ", error);
        return { data: null, error: error.message || "An error occurred" };
      }
    },

    updateCategory: async (
      categoryID,
      categoryName,
      categoryDescription,
      parentCategoryID
    ) => {
      try {
        const response = await instance.post(`/instructor/update_category`, {
          categoryID,
          categoryName,
          categoryDescription,
          parentCategoryID,
        });
        return response;
      } catch (error) {
        console.error("Error fetching data: ", error);
        return { data: null, error: error.message || "An error occurred" };
      }
    },

    deleteCategory: async (categoryID) => {
      try {
        const response = await instance.post(`/instructor/delete_category`, {
          categoryID,
        });
        return response;
      } catch (error) {
        console.error("Error fetching data: ", error);
        return { data: null, error: error.message || "An error occurred" };
      }
    },
    getAllCategory: async () => {
      try {
        const response = await instance.post(`/instructor/get_all_categories`);
        return response;
      } catch (error) {
        console.error("Error fetching data: ", error);
        return { data: null, error: error.message || "An error occurred" };
      }
    },
  },
};

export default InstructorService;
