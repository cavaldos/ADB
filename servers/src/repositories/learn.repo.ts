import DataConnect from "../utils/DataConnect";

const LearnRepo = {
  // 28 strart learn process
  async startLearnProcess(courseID: number, studentID: number) {
    try {
      const proc = "start_learn_process";
      const params = {
        CourseID: courseID,
        StudentID: studentID,
      };
      return await DataConnect.executeProcedure(proc, params);
    } catch (error: any) {
      throw new Error(`Error starting learn process: ${error.message}`);
    }
  },
  // 29. update learn process
  async updateLearnProcess(
    learnProcessID: number,
    status: boolean,
    studentID: number
  ) {
    try {
      const proc = "update_learn_process";
      const params = {
        LearnProcessID: learnProcessID,
        Status: status,
        StudentID: studentID,
      };
      return await DataConnect.executeProcedure(proc, params);
    } catch (error: any) {
      throw new Error(`Error updating learn process: ${error.message}`);
    }
  },
  // 3. get all my learn process
  async getAllMyCourseToLearn(studentID: number) {
    try {
      const query = `
                    SELECT 
                        c.CourseID,
                        c.Title,
                        c.Subtitle,
                        c.Description,
                        c.Language,
                        c.Image,
                        c.Price,
                        c.Status,
                        c.CreateTime,
                        c.CategoryID,
                        c.InstructorID
                    FROM 
                        Invoice iv
                    JOIN 
                        InvoiceDetail ivd ON iv.InvoiceID = ivd.InvoiceID
                    JOIN 
                        Course c ON ivd.CourseID = c.CourseID
                    WHERE 
                        iv.InvoiceStatus = 'Paied' and iv.StudentID = @studentID;`;
      return await DataConnect.executeWithParams(query, { studentID });
    } catch (error: any) {
      throw new Error(`Error fetching learn process: ${error.message}`);
    }
  },

  // get learn process detail
  async getAllLearnProcess(studentID: number) {
    try {
      const query = ` SELECT 
                      c.CourseID,
                      MAX(c.Title) AS Title,
                      MAX(c.Subtitle) AS Subtitle,
                      MAX(c.Description) AS Description,
                      MAX(c.Language) AS Language,
                      MAX(c.Image) AS Image,
                      MAX(c.Price) AS Price,
                      MAX(c.Status) AS Status,
                      MAX(c.CreateTime) AS CreateTime,
                      MAX(c.CategoryID) AS CategoryID,
                      MAX(c.InstructorID) AS InstructorID
                  FROM 
                      [LearnProcess] lp
                  JOIN 
                      [Course] c ON lp.CourseID = c.CourseID
                  join 
                      [Student] s ON lp.StudentID = s.StudentID
                  WHERE 
                      lp.StudentID = @studentID
                  GROUP BY 
                      c.CourseID;`;
      return await DataConnect.executeWithParams(query, { studentID });
    } catch (error: any) {
      throw new Error(`Error fetching learn process detail: ${error.message}`);
    }
  },
  async getLearnProcessDetail(courseID: number, studentID: number) {
    try {
      const query = `SELECT lp.StatusProcess,l.* FROM LearnProcess lp
                    join Course c on lp.CourseID = c.CourseID
                    join Student s on lp.StudentID = s.StudentID
                    join Lessons l on lp.LessonsID = l.LessonsID 
                    WHERE lp.CourseID = @courseID AND lp.StudentID = @studentID;`;
      return await DataConnect.executeWithParams(query, { courseID, studentID });
    } catch (error: any) {
      throw new Error(`Error fetching learn process detail: ${error.message}`);
    }
  }, // 30. get learn process detail
};
export default LearnRepo;
