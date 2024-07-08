import DataConnect from "../utils/DataConnect";

const LessonRepo = {
  // 14. Create Lesson Video
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

  // 15. Update Lesson Video
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

  // 16. Create Lesson Document
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

  // 17. Add Page to Lesson Document
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

  // 18. Update Page Document
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

  // 19. Delete Lesson
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

  // 26. Start Lesson Process
  async startLessonProcess(lessonsID: number, learnProcessID: number) {
    try {
      const proc = "start_lessons_process";
      const params = {
        LessonsID: lessonsID,
        LearnProcessID: learnProcessID,
      };
      return await DataConnect.executeProcedure(proc, params);
    } catch (error: any) {
      throw new Error(`Error starting lesson process: ${error.message}`);
    }
  },

  // 27. Done Lesson Process
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
};

export default LessonRepo;
