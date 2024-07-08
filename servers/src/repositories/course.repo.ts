import DataConnect from "../utils/DataConnect";

const CourseRepo = {
  // 9. Create Course
  async createCourse(
    title: string,
    subtitle: string,
    description: string,
    language: string,
    image: string,
    price: number,
    status: string,
    categoryID: number,
    instructorID: number
  ) {
    try {
      const proc = "create_course";
      const params = {
        Title: title,
        Subtitle: subtitle,
        Description: description,
        Language: language,
        Image: image,
        Price: price,
        Status: status,
        CategoryID: categoryID,
        InstructorID: instructorID,
      };
      return await DataConnect.executeProcedure(proc, params);
    } catch (error: any) {
      throw new Error(`Error creating course: ${error.message}`);
    }
  },

  // 10. Update Course
  async updateCourse(
    courseID: number,
    title: string,
    subtitle: string,
    description: string,
    language: string,
    image: string,
    price: number,
    status: string,
    historyMessage: string
  ) {
    try {
      const proc = "update_course";
      const params = {
        CourseID: courseID,
        Title: title,
        Subtitle: subtitle,
        Description: description,
        Language: language,
        Image: image,
        Price: price,
        Status: status,
        HistoryMessage: historyMessage,
      };
      return await DataConnect.executeProcedure(proc, params);
    } catch (error: any) {
      throw new Error(`Error updating course: ${error.message}`);
    }
  },

  // 22. Delete Course
  async deleteCourse(courseID: number) {
    try {
      const proc = "delete_course";
      const params = {
        CourseID: courseID,
      };
      return await DataConnect.executeProcedure(proc, params);
    } catch (error: any) {
      throw new Error(`Error deleting course: ${error.message}`);
    }
  },

  // Gell All Courses
    async getAllCourses() {
        try {
        const query = `SELECT * FROM Course;`;
        return await DataConnect.execute(query);
        } catch (error: any) {
        throw new Error(`Error fetching courses: ${error.message}`);
        }
    },
    // Get Course By ID
    async getCourseById(courseID: number) {
        try {
        const query = `SELECT * FROM Course WHERE CourseID = @courseID;`;
        return await DataConnect.executeWithParams(query, { courseID });
        } catch (error: any) {
        throw new Error(`Error fetching course: ${error.message}`);
        }
    },
};

export default CourseRepo;
