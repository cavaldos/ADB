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
};

export default InstructorService;
