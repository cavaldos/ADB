import DataConnect from "../utils/DataConnect";
import { VW_Course, VW_CourseHistory } from "../interfaces/view.interface";
const CourseRepo = {
  // 1. Create Course
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
      console.log(params);  
      return await DataConnect.executeProcedure(proc, params);
    } catch (error: any) {
      throw new Error(`Error creating course: ${error.message}`);
    }
  },

  // 2. Update Course
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

  // 3. Delete Course
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

  // 4. get all courses with pagination
  async getAllCourses(offset: number, pageSize: number) {
    try {
      const proc = "get_all_course";

      const params = {
        offset,
        pageSize,
      };
      const result = await DataConnect.executeProcedureMulti(proc, params);
      const courses = result[0];
      const totalCount = result[1][0]?.TotalCount || 0;
      return {
        courses,
        totalCount,
      };
    } catch (error: any) {
      throw new Error(`Error fetching courses: ${error.message}`);
    }
  },
  // 5. Get all courses by instructor
  async getAllCoursesByInstructor(
    instructorID: number,
    offset: number,
    pageSize: number
  ) {
    try {
      const query = `SELECT [CourseID],[Title],[Description],[Language],co.[Status],[Image],[Price],CreateTime,c.CategoryName,u.FullName 
                    from [Course] co 
                    JOIN [Instructor] i on  co.InstructorID = i.InstructorID 
                    JOIN [User] u on u.UserID = i.UserID
                    JOIN Category c on co.CategoryID = c.CategoryID 
                    where i.InstructorID =  @instructorID_input
                    ORDER BY co.CreateTime DESC
                    OFFSET @offset ROWS
                    FETCH NEXT @pageSize ROWS ONLY;
                    `;
      const params = {
        instructorID_input: instructorID,
        offset,
        pageSize,
      };
      const courses: VW_Course = await DataConnect.executeWithParams(
        query,
        params
      );
      return courses;
    } catch (error: any) {
      throw new Error(`Error fetching courses: ${error.message}`);
    }
  },

  // 6. Edit Status Course
  async editStatusCourse(courseID: number, status: string) {
    try {
      const proc = "update_course";
      const params = {
        CourseID: courseID,
        Status: status,
      };
      return await DataConnect.executeProcedure(proc, params);
    } catch (error: any) {
      throw new Error(`Error updating course status: ${error.message}`);
    }
  },
  // 7. Get Course History by courseID
  async getCourseHistorybyID(courseID: number, version: number) {
    try {
      let query = `SELECT CourseHistoryID,ch.Title,ch.Subtitle,ch.[Description],ch.[Language],ch.[Image],
                    ch.Price,ch.[Status],ch.UpdateTime,ch.CourseID ,ch.[Version],ch.HistoryMessage from CourseHistory ch
                    JOIN [Course] co ON co.CourseID = ch.CourseID
                    JOIN [Instructor] i ON i.InstructorID = co.InstructorID
                    JOIN [User] u ON u.UserID = i.UserID
                    WHERE ch.CourseID = @courseID_input `;
      const params: { [key: string]: any } = { courseID_input: courseID };
      if (version !== undefined && version !== null && version !== 0) {
        query += ` AND ch.Version = @version_input`;
        params.version_input = version;
      }
      const courseHistory: VW_CourseHistory =
        await DataConnect.executeWithParams(query, params);
      return courseHistory;
    } catch (error: any) {
      throw new Error(`Error fetching course: ${error.message}`);
    }
  },
  // 8. Get Course by ID
  async selectCourseById(courseID: number) {
    try {
      const query = `
        SELECT [CourseID],[Title],[Description],[Language],co.[Status],[Image],[Price],co.CreateTime,c.CategoryName,u.FullName 
        FROM [Course] co 
        JOIN [Instructor] i ON co.InstructorID = i.InstructorID 
        JOIN [User] u ON u.UserID = i.UserID
        JOIN Category c ON co.CategoryID = c.CategoryID 
        WHERE co.CourseID = @courseID;
      `;
      const params = {
        courseID,
      };
      const course: VW_Course = await DataConnect.executeWithParams(
        query,
        params
      );
      return course;
    } catch (error: any) {
      throw new Error(`Error fetching course: ${error.message}`);
    }
  },

  // 9. Search for courses
  async searchCourses(searchString: string, offset: number, pageSize: number) {
    try {
      // Normalize the search string by removing all spaces
      const normalizedSearchString = searchString.replace(/\s+/g, "");
      const proc = "search_course";

      const params = {
        SearchString: normalizedSearchString,
        offset,
        pageSize,
      };
      const courses = await DataConnect.executeProcedureMulti(proc, params);
      const totalCount = courses[1][0]?.TotalCount || 0;
      const totalPage = Math.ceil(totalCount / pageSize);
      return {
        courses: courses[0],
        totalCount,
        totalPage,
        currentPage: Math.floor(offset / pageSize) + 1,
      };
    } catch (error: any) {
      throw new Error(`Error searching courses: ${error.message}`);
    }
  },

  // 10. filter courses
  async filterCourses(
    categoryName: string,
    instructorName: string,
    language: string,
    status: string,
    minPrice: number,
    maxPrice: number,
    createTime: string,
    offset: number,
    pageSize: number
  ) {
    try {
      let query = `
        SELECT [CourseID],[Title],[Description],[Language],co.[Status],[Image],[Price],CreateTime,c.CategoryName,u.FullName 
        FROM [Course] co 
        JOIN [Instructor] i ON co.InstructorID = i.InstructorID 
        JOIN [User] u ON u.UserID = i.UserID
        JOIN Category c ON co.CategoryID = c.CategoryID 
        WHERE 1 = 1
      `;

      const params: { [key: string]: any } = { offset, pageSize };

      if (categoryName) {
        query += ` AND c.CategoryName LIKE @categoryName`;
        params.categoryName = `%${categoryName}%`;
      }
      if (instructorName) {
        query += ` AND u.FullName LIKE @instructorName`;
        params.instructorName = `%${instructorName}%`;
      }
      if (language) {
        query += ` AND co.Language LIKE @language`;
        params.language = `%${language}%`;
      }
      if (status) {
        query += ` AND co.[Status] = @status`;
        params.status = status;
      }
      if (minPrice !== undefined) {
        query += ` AND co.Price >= @minPrice`;
        params.minPrice = minPrice;
      }
      if (maxPrice !== undefined) {
        query += ` AND co.Price <= @maxPrice`;
        params.maxPrice = maxPrice;
      }
      if (createTime) {
        query += ` AND co.CreateTime >= @createTime`;
        params.createTime = createTime;
      }

      query += `
        ORDER BY co.CreateTime DESC
        OFFSET @offset ROWS
        FETCH NEXT @pageSize ROWS ONLY;
      `;
      const courses: VW_Course = await DataConnect.executeWithParams(
        query,
        params
      );

      return courses;
    } catch (error: any) {
      throw new Error(`Error filtering courses: ${error.message}`);
    }
  },
  // 11. Get auto complete search
  async autoCompleteSearch(searchString: string) {
    try {
      const proc = "auto_complete_search";
      const params = {
        SearchTerm: searchString,
      };
      return await DataConnect.executeProcedure(proc, params);
    } catch (error: any) {
      throw new Error(`Error auto completing search: ${error.message}`);
    }
  },

  // 12. get Top searched courses
  async getTopSearchedCourses(searchString: string) {
    try {
      const proc = "get_top_searches";
      return await DataConnect.executeProcedure(proc, {SearchString: searchString});
    } catch (error: any) {
      throw new Error(`Error fetching top searched courses: ${error.message}`);
    }
  },
  // 13. get log search
  async logSearch(searchString: string) {
    try {
      const proc = "log_search";
      return await DataConnect.executeProcedure(proc , {SearchString: searchString});
    } catch (error: any) {
      throw new Error(`Error fetching log search: ${error.message}`);
    }
  },
};

export default CourseRepo;
