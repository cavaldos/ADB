import DataConnect from "../utils/DataConnect";

const LessonRepo = {
  // 1. Create Lesson Video
  async createLessonVideo(
    title: string,
    duration: number,
    complexityLevel: string,
    courseID: number,
    topicID: number,
    url: string
  ) {
    try {
      const proc = "create_lesson_video";
      const params = {
        Title: title,
        Duration: duration,
        ComplexityLevel: complexityLevel,
        CourseID: courseID,
        TopicID: topicID,
        URL: url,
      };
      return await DataConnect.executeProcedure(proc, params);
    } catch (error: any) {
      throw new Error(`Error creating lesson video: ${error.message}`);
    }
  },

  // 2. Update Lesson Video
  async updateLessonVideo(lessonVideoID: number, url: string) {
    try {
      const proc = "update_lesson_video";
      const params = {
        LessonVideoID: lessonVideoID,
        URL: url,
      };
      return await DataConnect.executeProcedure(proc, params);
    } catch (error: any) {
      throw new Error(`Error updating lesson video: ${error.message}`);
    }
  },
  // 3. get app lessons video
  async getAllLessonsVideo(courseID: number) {
    try {
      const query = `SELECT * FROM LessonVideo WHERE CourseID = @courseID;`;
      return await DataConnect.executeWithParams(query, { courseID });
    } catch (error: any) {
      throw new Error(`Error fetching lesson video: ${error.message}`);
    }
  },
  // 4. get lesson video by id
  async getLessonsVideobyID(courseID: number) {
    try {
      const query = `SELECT * FROM LessonVideo WHERE CourseID = @courseID;`;
      return await DataConnect.executeWithParams(query, { courseID });
    } catch (error: any) {
      throw new Error(`Error fetching lesson video: ${error.message}`);
    }
  },
  // 4. Create Lesson Document
  async createLessonDocument(
    title: string,
    duration: number,
    complexityLevel: string,
    courseID: number,
    topicID: number
  ) {
    try {
      const proc = "create_lesson_document";
      const params = {
        Title: title,
        Duration: duration,
        ComplexityLevel: complexityLevel,
        CourseID: courseID,
        TopicID: topicID,
      };
      return await DataConnect.executeProcedure(proc, params);
    } catch (error: any) {
      throw new Error(`Error creating lesson document: ${error.message}`);
    }
  },

  // 5. Add Page to Lesson Document
  async addPageToDocument(
    lessonDocumentID: number,
    content: string,
    page: number
  ) {
    try {
      const proc = "add_page_document";
      const params = {
        LessonDocumentID: lessonDocumentID,
        Content: content,
        Page: page,
      };
      return await DataConnect.executeProcedure(proc, params);
    } catch (error: any) {
      throw new Error(`Error adding page to document: ${error.message}`);
    }
  },

  // 6. Update Page Document
  // neu nhu content bang rong thi se xoa page, sua proc
  async updatePageDocument(
    pageDocumentID: number,
    content: string,
    page: number,
    lessonDocumentID: number
  ) {
    try {
      const proc = "update_page_document";
      const params = {
        PageDocumentID: pageDocumentID,
        Content: content,
        Page: page,
        LessonDocumentID: lessonDocumentID,
      };
      return await DataConnect.executeProcedure(proc, params);
    } catch (error: any) {
      throw new Error(`Error updating page document: ${error.message}`);
    }
  },

  // 7. get all lessons document
  async getAllLessonsDocument(courseID: number) {
    // tra ve danh sach cac page
    try {
      const query = `SELECT * FROM LessonDocument WHERE CourseID = @courseID;`;
      return await DataConnect.executeWithParams(query, { courseID });
    } catch (error: any) {
      throw new Error(`Error fetching lesson document: ${error.message}`);
    }
  },

  // 8. create lesson test
  async createLessonTest(
    title: string,
    duration: number,
    complexityLevel: string,
    courseID: number,
    topicID: number
  ) {
    try {
      const proc = "create_lesson_test";
      const params = {
        Title: title,
        Duration: duration,
        ComplexityLevel: complexityLevel,
        CourseID: courseID,
        TopicID: topicID,
      };
      return await DataConnect.executeProcedure(proc, params);
    } catch (error: any) {
      throw new Error(`Error creating lesson test: ${error.message}`);
    }
  },
  // 9. add question to lesson test
  async addQuestionToTest(
    lessonTestID: number,
    question: string,
    option1: string,
    option2: string,
    option3: string,
    answer: string
  ) {
    try {
      const proc = "add_question_lessontest";
      const params = {
        QuestionContent: question,
        Title: question,
        LessonTestID: lessonTestID,
        Answer1: option1,
        Answer2: option2,
        Answer3: option3,
        CorrectAnswer: answer,
      };
      return await DataConnect.executeProcedure(proc, params);
    } catch (error: any) {
      throw new Error(`Error adding question to test: ${error.message}`);
    }
  },

  // 10. update question to lesson test
  // sua lai proc,neu nhu question rong thi se xoa luon question
  async updateQuestionToTest(
    questionID: number,
    lessonTestID: number,
    question: string,
    option1: string,
    option2: string,
    option3: string,
    answer: string
  ) {
    try {
      const proc = "update_question_lessontest";
      const params = {
        QuestionID: questionID,
        LessonTestID: lessonTestID,
        Title: question,
        Answer1: option1,
        Answer2: option2,
        Answer3: option3,
        CorrectAnswer: answer,
      };
      return await DataConnect.executeProcedure(proc, params);
    } catch (error: any) {
      throw new Error(`Error adding question to test: ${error.message}`);
    }
  },

  // 10. get all lessons test
  async getAllLessonsTest(courseID: number) {
    //err
    try {
      const query = `SELECT * FROM LessonTest WHERE CourseID = @courseID;`;
      return await DataConnect.executeWithParams(query, { courseID });
    } catch (error: any) {
      throw new Error(`Error fetching lesson test: ${error.message}`);
    }
  },
  // 10. get all lessons test by id
  async getLessonsTestbyID(courseID: number) {
    //err
    try {
      const query = `SELECT * FROM LessonTest WHERE CourseID = @courseID;`;
      return await DataConnect.executeWithParams(query, { courseID });
    } catch (error: any) {
      throw new Error(`Error fetching lesson test: ${error.message}`);
    }
  },
  // 11. Delete Lesson
  async deleteLesson(lessonsID: number) {
    try {
      const proc = "delete_lesson";
      const params = {
        LessonsID: lessonsID,
      };
      return await DataConnect.executeProcedure(proc, params);
    } catch (error: any) {
      throw new Error(`Error deleting lesson: ${error.message}`);
    }
  },

  // 12. Start Lesson Process
  async startLessonProcess(lessonsID: number, learnProcessID: number) {
    try {
      const proc = "start_lessons_process"; // set inprocess
      const params = {
        LessonsID: lessonsID,
        LearnProcessID: learnProcessID,
      };
      return await DataConnect.executeProcedure(proc, params);
    } catch (error: any) {
      throw new Error(`Error starting lesson process: ${error.message}`);
    }
  },

  // 13. Done Lesson Process
  async doneLessonProcess(lessonsProcessID: number) {
    try {
      const proc = "done_lesson_process";
      const params = {
        LessonsProcessID: lessonsProcessID,
      };
      return await DataConnect.executeProcedure(proc, params);
    } catch (error: any) {
      throw new Error(`Error marking lesson process as done: ${error.message}`);
    }
  },

  //
};

export default LessonRepo;
