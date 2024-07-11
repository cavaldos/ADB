import DataConnect from "../utils/DataConnect";

import _ from "lodash";

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
  // 3. get all lessons video
  async getAllLessonsVideo(courseID: number) {
    try {
      const query = `SELECT c.CourseID, ls.LessonsID,lvd.LessonVideoID,ls.Title,lvd.URL,ls.Duration,
                      ls.ComplexityLevel,ls.CreatedTime,ls.UpdatedTime,ls.LessonType,
                      ls.TopicID,tp.TopicName FROM LessonVideo lvd
                      JOIN Lessons ls ON ls.LessonsID = lvd.LessonsID
                      JOIN Topic tp ON tp.TopicID = ls.TopicID
                      join Course c on c.CourseID = ls.CourseID
                      WHERE c.CourseID = @courseID;`;
      return await DataConnect.executeWithParams(query, { courseID });
    } catch (error: any) {
      throw new Error(`Error fetching lesson video: ${error.message}`);
    }
  },
  // 4. get lesson video by id
  async getLessonsVideoByID(lessonID: number) {
    try {
      const query = `SELECT c.CourseID, ls.LessonsID,lvd.LessonVideoID,ls.Title,lvd.URL,ls.Duration,
                      ls.ComplexityLevel,ls.CreatedTime,ls.UpdatedTime,ls.LessonType,
                      ls.TopicID,tp.TopicName FROM LessonVideo lvd
                      JOIN Lessons ls ON ls.LessonsID = lvd.LessonsID
                      JOIN Topic tp ON tp.TopicID = ls.TopicID
                      join Course c on c.CourseID = ls.CourseID
                      WHERE ls.LessonsID = @LessonID;`;

      return await DataConnect.executeWithParams(query, { lessonID });
    } catch (error: any) {
      throw new Error(`Error fetching lesson video: ${error.message}`);
    }
  },

  //---------------------------------

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
  //5 .1 delete page
  async deletePageDocument(pageDocumentID: number) {
    try {
      const query = `DELETE FROM PageDocument WHERE PageDocumentID = @PageDocumentID;`;

      return await DataConnect.executeWithParams(query, {
        PageDocumentID: pageDocumentID,
      });
    } catch (error: any) {
      throw new Error(`Error deleting page document: ${error.message}`);
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
      const query = `SELECT c.CourseID, ls.LessonsID,ld.LessonDocumentID,ls.Title,ls.Duration,
                      ls.ComplexityLevel,ls.CreatedTime,ls.UpdatedTime,ls.LessonType,
                      ls.TopicID,tp.TopicName FROM LessonDocument ld
                      JOIN Lessons ls ON ls.LessonsID = ld.LessonsID
                      JOIN Topic tp ON tp.TopicID = ls.TopicID
                      join Course c on c.CourseID = ls.CourseID
                      WHERE c.CourseID = @courseID;`;
      return await DataConnect.executeWithParams(query, { courseID });
    } catch (error: any) {
      throw new Error(`Error fetching lesson document: ${error.message}`);
    }
  },
  // 7. get all lessons document by id
  async getLessonDocumentByID(lessonID: number) {
    // tra ve danh sach cac page

    try {
      const query = `SELECT c.CourseID, ls.LessonsID,ld.LessonDocumentID,ls.Title,ls.Duration,
                      ls.ComplexityLevel,ls.CreatedTime,ls.UpdatedTime,ls.LessonType,
                      ls.TopicID,tp.TopicName FROM LessonDocument ld
                      JOIN Lessons ls ON ls.LessonsID = ld.LessonsID
                      JOIN Topic tp ON tp.TopicID = ls.TopicID
                      join Course c on c.CourseID = ls.CourseID
                      WHERE ls.LessonsID = @lessonID;`;
      return await DataConnect.executeWithParams(query, { lessonID });
    } catch (error: any) {
      throw new Error(`Error fetching lesson document: ${error.message}`);
    }
  },
  // 7.1 get all page
  async getAllPagesDocument(lessonDocumentID: number) {
    try {
      const query = `SELECT * FROM PageDocument WHERE LessonDocumentID = @lessonDocumentID;`;
      return await DataConnect.executeWithParams(query, { lessonDocumentID });
    } catch (error: any) {
      throw new Error(`Error fetching page document: ${error.message}`);
    }
  },

  //====================================================

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
    title: string,
    option1: string,
    option2: string,
    option3: string,
    answer: string
  ) {
    try {
      const proc = "add_question_lessontest";
      const params = {
        QuestionContent: question,
        Title: title,
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
    questionContent: string,
    title: string,
    option1: string,
    option2: string,
    option3: string,
    answer: string
  ) {
    try {
      const proc = "update_question_lessontest";
      const params = {
        QuestionID: questionID,
        QuestionContent: questionContent,
        Title: title,
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

  // 10. get all lessons test
  async getAllLessonsTest(courseID: number) {
    //err

    try {
      const query = `SELECT c.CourseID, ls.LessonsID,lt.LessonTestID,ls.Title,ls.Duration,
                      ls.ComplexityLevel,ls.CreatedTime,ls.UpdatedTime,ls.LessonType,
                      ls.TopicID,tp.TopicName FROM LessonTest lt
                      JOIN Lessons ls ON ls.LessonsID = lt.LessonsID
                      JOIN Topic tp ON tp.TopicID = ls.TopicID
                      join Course c on c.CourseID = ls.CourseID
                      WHERE c.CourseID = @courseID;`;
      return await DataConnect.executeWithParams(query, { courseID });
    } catch (error: any) {
      throw new Error(`Error fetching lesson test: ${error.message}`);
    }
  },
  // 10. get  lessons test by id
  async getLessonTestByID(lessonID: number) {
    //err
    try {
      const query = `SELECT c.CourseID, ls.LessonsID,lt.LessonTestID,ls.Title,ls.Duration,
                      ls.ComplexityLevel,ls.CreatedTime,ls.UpdatedTime,ls.LessonType,
                      ls.TopicID,tp.TopicName FROM LessonTest lt
                      JOIN Lessons ls ON ls.LessonsID = lt.LessonsID
                      JOIN Topic tp ON tp.TopicID = ls.TopicID
                      join Course c on c.CourseID = ls.CourseID
                      WHERE ls.LessonsID = @LessonID;`;
      return await DataConnect.executeWithParams(query, { lessonID });
    } catch (error: any) {
      throw new Error(`Error fetching lesson test: ${error.message}`);
    }
  },
  // 10.1 get all questions test
  async getAllQuestionsTest(lessonTestID: number) {
    try {
      const query = `SELECT 
                    q.LessonTestID,
                    q.QuestionID,
                    q.QuestionContent,
                    q.Title,
                    a.AnswerID,
                    a.AnswerText,
                    a.IsCorrect
                FROM Question q
                JOIN Answer a ON q.QuestionID = a.QuestionID
                WHERE q.LessonTestID = @lessonTestID
                ORDER BY q.QuestionID, a.AnswerID;`;
      const data = await DataConnect.executeWithParams(query, {lessonTestID});

      const groupedData = _.chain(data)
        .groupBy("QuestionID")
        .map((value, key) => ({
          QuestionID: parseInt(key),
          LessonTestID: value[0].LessonTestID,
          QuestionContent: value[0].QuestionContent,
          Title: value[0].Title,
          Answers: value.map((ans) => ({
            AnswerID: ans.AnswerID,
            AnswerText: ans.AnswerText,
            IsCorrect: ans.IsCorrect,
          })),
        }))
        .value();

      return groupedData;
    } catch (error: any) {
      throw new Error(`Error fetching questions test: ${error.message}`);
    }
  },
  //==============================
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
  //============================================
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
