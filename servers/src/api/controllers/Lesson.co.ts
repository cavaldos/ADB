import { Request, Response } from "express";
import LessonRepo from "../../repositories/lessson.repo";
import LessonService from "../services/Lesson.sv";
import _ from "lodash";
const LessonController = {
  // 1. Get All Lesson Base
  async getAllLessons(req: Request, res: Response) {
    try {
      const { courseID } = req.body;
      const lessons = await LessonRepo.GetAllLessonBase(Number(courseID));
      // sap xeptang dan theo orderLesson

      const sortedLessons = _.orderBy(lessons, ["OrderLesson"], ["asc"]);

      return res.status(200).json({
        message: "All lessons fetched successfully",
        status: 200,
        data: sortedLessons,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: `Error: ${error.message}`,
        status: 500,
      });
    }
  },
  async getLessonDetail(req: Request, res: Response) {
    try {
      // const { lessonID } = req.body;
      // const lesson = await LessonRepo.getLessonDetail(Number(lessonID));
      // return res.status(200).json({
      //   message: "Lesson fetched successfully",
      //   status: 200,
      //   data: lesson,
      // });
    } catch (error: any) {
      return res.status(500).json({
        message: `Error: ${error.message}`,
        status: 500,
      });
    }
  },
  LessonVideo: {
    async createLessonVideo(req: Request, res: Response) {
      try {
        const {
          title,
          duration,
          complexityLevel,
          courseID,
          topic,
          url,
          orderLesson,
        } = req.body;
        const lesson = await LessonRepo.LessonVideo.Create(
          title,
          duration,
          complexityLevel,
          courseID,
          topic,
          url,
          orderLesson
        );
        return res.status(200).json({
          message: "Lesson video created successfully",
          status: 200,
          data: lesson,
        });
      } catch (error: any) {
        return res.status(500).json({
          message: `Error: ${error.message}`,
          status: 500,
        });
      }
    },
    async updateLessonVideo(req: Request, res: Response) {
      try {
        const { lessonVideoID, url } = req.body;
        const lesson = await LessonRepo.LessonVideo.Update(
          Number(lessonVideoID),
          url
        );
        return res.status(200).json({
          message: "Lesson video updated successfully",
          status: 200,
          data: lesson,
        });
      } catch (error: any) {
        return res.status(500).json({
          message: `Error: ${error.message}`,
          status: 500,
        });
      }
    },
  },
  LessonDocument: {
    async createLessonDocument(req: Request, res: Response) {
      try {
        const {
          title,
          duration,
          complexityLevel,
          courseID,
          topic,
          orderLesson,
        } = req.body;
        const lesson = await LessonRepo.LessonDoc.Create(
          title,
          duration,
          complexityLevel,
          courseID,
          topic,
          orderLesson
        );
        return res.status(200).json({
          message: "Lesson document created successfully",
          status: 200,
          data: lesson,
        });
      } catch (error: any) {
        return res.status(500).json({
          message: `Error: ${error.message}`,
          status: 500,
        });
      }
    },
    async addPage(req: Request, res: Response) {
      try {
        const { lessonDocumentID, page, content } = req.body;
        const lesson = await LessonRepo.LessonDoc.addPageToDocument(
          Number(lessonDocumentID),
          content,
          page
        );
        return res.status(200).json({
          message: "Page added to lesson document successfully",
          status: 200,
          data: lesson,
        });
      } catch (error: any) {
        return res.status(500).json({
          message: `Error: ${error.message}`,
          status: 500,
        });
      }
    },
    async updatePage(req: Request, res: Response) {
      try {
        const { pageDocumentID, page, content } = req.body;
        const lesson = await LessonRepo.LessonDoc.updatePageDocument(
          Number(pageDocumentID),
          content,
          page
        );
        return res.status(200).json({
          message: "Page updated successfully",
          status: 200,
          data: lesson,
        });
      } catch (error: any) {
        return res.status(500).json({
          message: `Error: ${error.message}`,
          status: 500,
        });
      }
    },
    async deletePage(req: Request, res: Response) {
      try {
        const { pageDocumentID } = req.body;
        const lesson = await LessonRepo.LessonDoc.deletePageDocument(
          Number(pageDocumentID)
        );
        return res.status(200).json({
          message: "Page deleted successfully",
          status: 200,
          data: lesson,
        });
      } catch (error: any) {
        return res.status(500).json({
          message: `Error: ${error}`,
          status: 500,
        });
      }
    },
    // Get all pages in a document
    async getAllPages(req: Request, res: Response) {
      try {
        const { lessonDocumentID } = req.body;
        const lesson = await LessonRepo.LessonDoc.getAllPagesDocument(
          Number(lessonDocumentID)
        );
        return res.status(200).json({
          message: "All pages fetched successfully",
          status: 200,
          data: lesson,
        });
      } catch (error: any) {
        return res.status(500).json({
          message: `Error: ${error.message}`,
          status: 500,
        });
      }
    },
  },
  LessonTest: {
    async createLessonTest(req: Request, res: Response) {
      try {
        const {
          title,
          duration,
          complexityLevel,
          courseID,
          topic,
          orderLesson,
        } = req.body;
        const lesson = await LessonRepo.LessonTest.Create(
          title,
          duration,
          complexityLevel,
          courseID,
          topic,
          orderLesson
        );
        return res.status(200).json({
          message: "Lesson test created successfully",
          status: 200,
          data: lesson,
        });
      } catch (error: any) {
        return res.status(500).json({
          message: `Error: ${error.message}`,
          status: 500,
        });
      }
    },
    async addQuestion(req: Request, res: Response) {
      try {
        const {
          lessonTestID,
          question,
          title,
          option1,
          option2,
          option3,
          answer,
        } = req.body;
        console.log(req.body);
        const lesson = await LessonRepo.LessonTest.addQuestionToTest(
          Number(lessonTestID),
          question,
          title,
          option1,
          option2,
          option3,
          answer
        );
        return res.status(200).json({
          message: "Question added to lesson test successfully",
          status: 200,
          data: lesson,
        });
      } catch (error: any) {
        return res.status(500).json({
          message: `Error: ${error.message}`,
          status: 500,
        });
      }
    },
    async updateQuestion(req: Request, res: Response) {
      try {
        const {
          questionID,
          lessonTestID,
          questionContent,
          title,
          option1,
          option2,
          option3,
          answer,
        } = req.body;
        const lesson = await LessonRepo.LessonTest.updateQuestionToTest(
          questionID,
          lessonTestID,
          questionContent,
          title,
          option1,
          option2,
          option3,
          answer
        );
        return res.status(200).json({
          message: "Question updated successfully",
          status: 200,
          data: lesson,
        });
      } catch (error: any) {
        return res.status(500).json({
          message: `Error: ${error.message}`,
          status: 500,
        });
      }
    },
    async deleteQuestion(req: Request, res: Response) {
      try {
        const { questionID } = req.body;
        // const lesson = await LessonRepo.LessonTest.(
        //   Number(questionID)
        // );
        return res.status(200).json({
          message: "Question deleted successfully",
          status: 200,
          // data: lesson,
        });
      } catch (error: any) {
        return res.status(500).json({
          message: `Error: ${error}`,
          status: 500,
        });
      }
    },
    //
    async getAllQuestions(req: Request, res: Response) {
      try {
        const { lessonTestID } = req.body;
        const lesson = await LessonRepo.LessonTest.getAllQuestionsTest(
          Number(lessonTestID)
        );
        return res.status(200).json({
          message: "All questions fetched successfully",
          status: 200,
          data: lesson,
        });
      } catch (error: any) {
        return res.status(500).json({
          message: `Error: ${error.message}`,
          status: 500,
        });
      }
    },
  },

  async deleteLesson(req: Request, res: Response) {
    try {
      const { lessonID } = req.body;
      const lesson = await LessonRepo.deleteLesson(Number(lessonID));
      return res.status(200).json({
        message: "Lesson deleted successfully",
        status: 200,
        data: lesson,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: `Error: ${error.message}`,
        status: 500,
      });
    }
  },
  async upDateLesson(req: Request, res: Response) {
    try {
      const { lessonID, title, duration, complexityLevel } = req.body;
      const lesson = await LessonRepo.updateLessonBase(
        Number(lessonID),
        title,
        duration,
        complexityLevel
      );
      return res.status(200).json({
        message: "Lesson updated successfully",
        status: 200,
        data: lesson,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: `Error: ${error.message}`,
        status: 500,
      });
    }
  },
  // sort lesson
  async sortLesson(req: Request, res: Response) {
    try {
      const { lessonID, orderLesson } = req.body;
      const lesson = await LessonRepo.sortOrderLesson(
        Number(lessonID),
        orderLesson
      );
      return res.status(200).json({
        message: "Lesson sorted successfully",
        status: 200,
        data: lesson,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: `Error: ${error.message}`,
        status: 500,
      });
    }
  },
};

export default LessonController;
