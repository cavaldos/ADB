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
    studentID: number,
    courseID: number
  ) {
    try {
      const proc = "update_learn_process";
      const params = {
        LearnProcessID: learnProcessID,
        Status: status,
        StudentID: studentID,
        CourseID: courseID,
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
                        iv.Status = 'Paied' and iv.StudentID = @studentID;`;
      return await DataConnect.executeWithParams(query, { studentID });
    } catch (error: any) {
      throw new Error(`Error fetching learn process: ${error.message}`);
    }
  },

  // get learn process detail
  async getLearnProcessDetail(learnProcessID: number) {
    try {
      const query = `
            SELECT 
                lp.LessonsProcessID,
                lp.Status,
                lp.StartTime,
                lp.EndTime,
                lp.LessonsID,
                lp.LearnProcessID,
                l.Title AS LessonTitle,
                l.Duration AS LessonDuration,
                l.ComplexityLevel AS LessonComplexityLevel,
                l.CreatedTime AS LessonCreatedTime,
                l.UpdatedTime AS LessonUpdatedTime,
                l.LessonType AS LessonType,
                l.CourseID AS CourseID,
                l.TopicID AS TopicID
            FROM 
                LessonsProcess lp
            JOIN 
                Lessons l ON lp.LessonsID = l.LessonsID
            WHERE 
                lp.LearnProcessID = @learnProcessID;
`;
      return await DataConnect.executeWithParams(query, { learnProcessID });
    } catch (error: any) {
      throw new Error(`Error fetching learn process detail: ${error.message}`);
    }
  },
  // start lesson process
  async startLessonProcess(lessonProcessID: number, learnProcessID: number) {
    try {
      const proc = "start_lesson_process";
      const params = {
        LessonProcessID: lessonProcessID,
        LearnProcessID: learnProcessID,
      };
      return await DataConnect.executeProcedure(proc, params);
    } catch (error: any) {
      throw new Error(`Error starting lesson process: ${error.message}`);
    }
  },

  // done lesson process
  async doneLessonProcess(lessonsProcessID: number) {
    console.log(lessonsProcessID);
    try {
      const proc = "done_lesson_process";
      const params = {
        LessonsProcessID: lessonsProcessID,
      };
      return await DataConnect.executeProcedure(proc, params);
    } catch (error: any) {
      throw new Error(`Error done lesson process: ${error.message}`);
    }
  },

  //
};
export default LearnRepo;
