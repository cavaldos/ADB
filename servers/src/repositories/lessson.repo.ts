import DataConnect from "../utils/DataConnect";
import _ from "lodash";
const LessonRepo = {
  //1. Get Lesson Base
  async GetAllLessonBase(courseID: number) {
    try {
      const query = "select * from Lessons WHERE CourseID = @courseID";
      return await DataConnect.executeWithParams(query, { courseID });
    } catch (error: any) {
      throw new Error(`Error getting lesson base: ${error.message}`);
    }
  },
  async GetLessonDetailBase(lessonsID: number) {
    try {
      const query = `select l.LessonsID, l.CourseID, l.ComplexityLevel, l.Duration, l.CreatedTime,
        l.UpdatedTime, l.LessonType, l.Topic,l.Title,l.OrderLesson, ld.LessonDocumentID, lt.LessonTestID, lv.LessonVideoID
        from Lessons l 
        Left JOIN LessonDocument ld ON l.LessonsID = ld.LessonsID
        left JOIN LessonTest lt ON l.LessonsID = lt.LessonsID
        left  JOIN LessonVideo lv ON l.LessonsID = lv.LessonsID WHERE l.lessonsID = @lessonsID`;
      return await DataConnect.executeWithParams(query, { lessonsID });
    } catch (error: any) {
      throw new Error(`Error getting lesson base: ${error.message}`);
    }
  },
  LessonVideo: {
    //2. Create Lesson Video
    async Create(
      title: string,
      duration: number,
      complexityLevel: string,
      courseID: number,
      topic: number,
      url: string,
      oderLesson: number
    ) {
      try {
        const proc = "create_lesson_video";
        const params = {
          Title: title,
          Duration: duration,
          ComplexityLevel: complexityLevel,
          CourseID: courseID,
          Topic: topic,
          OrderLesson: oderLesson,
          URL: url,
        };
        return await DataConnect.executeProcedure(proc, params);
      } catch (error: any) {
        throw new Error(`Error creating lesson video: ${error.message}`);
      }
    },
    //3. Update Lesson Video
    async Update(lessonVideoID: number, url: string) {
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
    async getLessonVideoByID(lessonVideoID: number) {
      try {
        const query = `SELECT lv.LessonVideoID, lv.URL, lv.LessonsID, l.Title, l.Duration,
                    l.ComplexityLevel, l.CreatedTime, l.UpdatedTime, l.LessonType, l.Topic
                    FROM LessonVideo lv 
                    JOIN Lessons l ON l.LessonsID = lv.LessonsID 
                    WHERE l.LessonsID  = @lessonVideoID;`;
        return await DataConnect.executeWithParams(query, { lessonVideoID });
      } catch (error: any) {
        throw new Error(`Error fetching lesson video: ${error.message}`);
      }
    },
  },

  LessonDoc: {
    //2. Create Lesson Document
    async Create(
      title: string,
      duration: number,
      complexityLevel: string,
      courseID: number,
      topic: number,
      orderLesson: number
    ) {
      try {
        const proc = "create_lesson_document";
        const params = {
          Title: title,
          Duration: duration,
          ComplexityLevel: complexityLevel,
          CourseID: courseID,
          Topic: topic,
          OrderLesson: orderLesson,
        };
        return await DataConnect.executeProcedure(proc, params);
      } catch (error: any) {
        throw new Error(`Error creating lesson document: ${error.message}`);
      }
    },
    // 3. Update Lesson Document
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
    // 4. Delete Page Document
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
    // 5. Update Page Document
    async updatePageDocument(
      pageDocumentID: number,
      content: string,
      page: number
    ) {
      try {
        const proc = "update_page_document";
        const params = {
          PageDocumentID: pageDocumentID,
          Content: content,
          Page: page,
        };
        return await DataConnect.executeProcedure(proc, params);
      } catch (error: any) {
        throw new Error(`Error updating page document: ${error.message}`);
      }
    },
    // 6. Get All Pages Document
    async getAllPagesDocument(lessonDocumentID: number) {
      try {
        const query = `select * from PageDocument  WHERE LessonDocumentID= @lessonDocumentID;`;
        return await DataConnect.executeWithParams(query, { lessonDocumentID });
      } catch (error: any) {
        throw new Error(`Error fetching page document: ${error.message}`);
      }
    },
  },

  LessonTest: {
    //2. Create Lesson Test
    async Create(
      title: string,
      duration: number,
      complexityLevel: string,
      courseID: number,
      topic: number,
      oderLesson: number
    ) {
      try {
        const proc = "create_lesson_test";
        const params = {
          Title: title,
          Duration: duration,
          ComplexityLevel: complexityLevel,
          CourseID: courseID,
          Topic: topic,
          OrderLesson: oderLesson,
        };
        return await DataConnect.executeProcedure(proc, params);
      } catch (error: any) {
        throw new Error(`Error creating lesson test: ${error.message}`);
      }
    },
    //3. add question to lesson test
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
    // 4. Delete Question from Lesson Test
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
    // 5. Delete Question from Lesson Test
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
        const data = await DataConnect.executeWithParams(query, {
          lessonTestID,
        });

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
    // 6. Delete Question from Lesson Test
    async deleteQuestionTest(questionID: number) {
      try {
        const proc = "delete_question";
        return await DataConnect.executeWithParams(proc, {
          QuestionID: questionID,
        });
      } catch (error: any) {
        throw new Error(`Error deleting question test: ${error.message}`);
      }
    },
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
  // 12. Update Lesson
  async updateLessonBase(
    lessonID: number,
    title: string,
    duration: string,
    complexityLevel: string
  ) {
    try {
      const proc = "update_lesson";
      const params = {
        LessonsID: lessonID,
        Title: title,
        Duration: duration,
        ComplexityLevel: complexityLevel,
      };
      console.log("params", params);
      return await DataConnect.executeProcedure(proc, params);
    } catch (error: any) {
      throw new Error(`Error updating lesson: ${error.message}`);
    }
  },
  async sortOrderLesson(lessonID: number, orderLesson: number) {
    try {
      const query = `UPDATE Lessons SET OrderLesson = @orderLesson WHERE LessonsID = @lessonID;`;
      return await DataConnect.executeWithParams(query, {
        lessonID,
        orderLesson,
      });
    } catch (error: any) {
      throw new Error(`Error fetching order lesson: ${error.message}`);
    }
  },
};

export default LessonRepo;
