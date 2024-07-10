import { Request, Response } from "express";
import LessonRepo from "../../repositories/lessson.repo";
import LessonService from "../services/Lesson.sv";
const LessonController = {
  // 1. Create Lesson Video
  async createLessonVideo(req: Request, res: Response) {
    try {
      const { title, duration, complexityLevel, courseID, topicID, url } =
        req.body;
      await LessonRepo.createLessonVideo(
        title,
        duration,
        complexityLevel,
        courseID,
        topicID,
        url
      );
      return res.status(201).json({
        message: "Lesson video created successfully",
        status: 201,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: `Error: ${error.message}`,
        status: 500,
      });
    }
  },

  // 2. Update Lesson Video
  async updateLessonVideo(req: Request, res: Response) {
    try {
      const { lessonVideoID, url } = req.body;
      await LessonRepo.updateLessonVideo(lessonVideoID, url);
      return res.status(200).json({
        message: "Lesson video updated successfully",
        status: 200,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: `Error: ${error.message}`,
        status: 500,
      });
    }
  },

  // 3. Get All Lessons Video
  async getAllLessonsVideo(req: Request, res: Response) {
    try {
      const { courseID } = req.body;
      const lessons = await LessonRepo.getAllLessonsVideo(Number(courseID));
      return res.status(200).json({
        message: "All lesson videos fetched successfully",
        status: 200,
        data: lessons,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: `Error: ${error.message}`,
        status: 500,
      });
    }
  },

  // 4. Get Lesson Video by ID
  async getLessonsVideoByID(req: Request, res: Response) {
    try {
      const { lessonID } = req.body;
      const lesson = await LessonRepo.getLessonsVideoByID(Number(lessonID));
      if (lesson.length === 0) {
        return res.status(404).json({
          message: "Lesson video not found",
          status: 404,
        });
      }
      return res.status(200).json({
        message: "Lesson video fetched successfully",
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

  // 5. Create Lesson Document
  async createLessonDocument(req: Request, res: Response) {
    try {
      const { title, duration, complexityLevel, courseID, topicID } = req.body;
      await LessonRepo.createLessonDocument(
        title,
        duration,
        complexityLevel,
        courseID,
        topicID
      );
      return res.status(201).json({
        message: "Lesson document created successfully",
        status: 201,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: `Error: ${error.message}`,
        status: 500,
      });
    }
  },

  // 6. Add Page to Lesson Document
  async addPageToDocument(req: Request, res: Response) {
    try {
      const { lessonDocumentID, content, page } = req.body;
      await LessonRepo.addPageToDocument(lessonDocumentID, content, page);
      return res.status(201).json({
        message: "Page added to document successfully",
        status: 201,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: `Error: ${error.message}`,
        status: 500,
      });
    }
  },
  //6.1 delete page
  async deletePageDocument(req: Request, res: Response) {
    try {
      const { pageDocumentID } = req.body;
      await LessonRepo.deletePageDocument(pageDocumentID);
      return res.status(200).json({
        message: "Page deleted successfully",
        status: 200,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: `Error: ${error.message}`,
        status: 500,
      });
    }
  },

  // 7. Update Page Document
  async updatePageDocument(req: Request, res: Response) {
    try {
      const { pageDocumentID, content, page, lessonDocumentID } = req.body;
      await LessonRepo.updatePageDocument(
        pageDocumentID,
        content,
        page,
        lessonDocumentID
      );
      return res.status(200).json({
        message: "Page document updated successfully",
        status: 200,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: `Error: ${error.message}`,
        status: 500,
      });
    }
  },

  // 8. Get All Lessons Document
  async getAllLessonsDocument(req: Request, res: Response) {
    try {
      const { courseID } = req.body;
      const lessons = await LessonRepo.getAllLessonsDocument(Number(courseID));
      return res.status(200).json({
        message: "All lesson documents fetched successfully",
        status: 200,
        data: lessons,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: `Error: ${error.message}`,
        status: 500,
      });
    }
  },

  // 9. Get Lesson Document by ID
  async getLessonDocumentByID(req: Request, res: Response) {
    try {
      const { lessonID } = req.body;
      const lesson = await LessonRepo.getLessonDocumentByID(Number(lessonID));
      return res.status(200).json({
        message: "Lesson document fetched successfully",
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
  // 9.1 Get all pages Document by lessonDocumentID
  async getAllPagesDocument(req: Request, res: Response) {
    try {
      const { lessonDocumentID } = req.body;
      const pages = await LessonRepo.getAllPagesDocument(
        Number(lessonDocumentID)
      );
      return res.status(200).json({
        message: "All pages fetched successfully",
        status: 200,
        data: pages,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: `Error: ${error.message}`,
        status: 500,
      });
    }
  },

  // 10. Create Lesson Test
  async createLessonTest(req: Request, res: Response) {
    try {
      const { title, duration, complexityLevel, courseID, topicID } = req.body;
      await LessonRepo.createLessonTest(
        title,
        duration,
        complexityLevel,
        courseID,
        topicID
      );
      return res.status(201).json({
        message: "Lesson test created successfully",
        status: 201,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: `Error: ${error.message}`,
        status: 500,
      });
    }
  },

  // 11. Add Question to Lesson Test
  async addQuestionToTest(req: Request, res: Response) {
    try {
      const { lessonTestID, question, option1, option2, option3, answer } =
        req.body;
      await LessonRepo.addQuestionToTest(
        lessonTestID,
        question,
        option1,
        option2,
        option3,
        answer
      );
      return res.status(201).json({
        message: "Question added to lesson test successfully",
        status: 201,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: `Error: ${error.message}`,
        status: 500,
      });
    }
  },

  // 12. Update Question to Lesson Test
  async updateQuestionToTest(req: Request, res: Response) {
    try {
      const {
        questionID,
        lessonTestID,
        title,
        questionContent,
        option1,
        option2,
        option3,
        answer,
      } = req.body;

      await LessonRepo.updateQuestionToTest(
        questionID,
        lessonTestID,
        title,
        questionContent,
        option1,
        option2,
        option3,
        answer
      );
      return res.status(200).json({
        message: "Question updated successfully",
        status: 200,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: `Error: ${error.message}`,
        status: 500,
      });
    }
  },

  // 13. Get All Lessons Test
  async getAllLessonsTest(req: Request, res: Response) {
    try {
      const { courseID } = req.body;
      const lessons = await LessonRepo.getAllLessonsTest(Number(courseID));
      return res.status(200).json({
        message: "All lesson tests fetched successfully",
        status: 200,
        data: lessons,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: `Error: ${error.message}`,
        status: 500,
      });
    }
  },

  // 14. Get Lesson Test by ID
  async getLessonsTestByID(req: Request, res: Response) {
    try {
      const { lessonID } = req.body;
      const lesson = await LessonRepo.getLessonTestByID(Number(lessonID));
      return res.status(200).json({
        message: "Lesson test fetched successfully",
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

  // 15. Delete Lesson
  async deleteLesson(req: Request, res: Response) {
    try {
      const { lessonsID } = req.body;
      await LessonRepo.deleteLesson(Number(lessonsID));
      return res.status(200).json({
        message: "Lesson deleted successfully",
        status: 200,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: `Error: ${error.message}`,
        status: 500,
      });
    }
  },

  // Get all Lesson by courseID
  async getAllLessonsByCourseID(req: Request, res: Response) {
    try {
      const { courseID } = req.body;
      const lessons = await LessonService.getAllLessonsByCourseID(
        Number(courseID)
      );
      return res.status(200).json({
        message: "All lessons fetched successfully",
        status: 200,
        data: lessons,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: `Error: ${error.message}`,
        status: 500,
      });
    }
  },

  //===
  // 16. Start Lesson Process
  async startLessonProcess(req: Request, res: Response) {
    try {
      const { lessonsID, learnProcessID } = req.body;
      await LessonRepo.startLessonProcess(lessonsID, learnProcessID);
      return res.status(200).json({
        message: "Lesson process started successfully",
        status: 200,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: `Error: ${error.message}`,
        status: 500,
      });
    }
  },

  // 17. Done Lesson Process
  async doneLessonProcess(req: Request, res: Response) {
    try {
      const { lessonsProcessID } = req.body;
      await LessonRepo.doneLessonProcess(lessonsProcessID);
      return res.status(200).json({
        message: "Lesson process marked as done successfully",
        status: 200,
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
