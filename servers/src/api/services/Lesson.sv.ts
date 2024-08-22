import LessonRepo from "../../repositories/lessson.repo";
import _ from "lodash";
import { VW_Lesson } from "../../interfaces/view.interface";
import { Request, Response } from "express";

const LessonService = {
  //1. get all lessons by courseID
  async getLessonDetail(req: Request, res: Response) {
    try {
      const { lessonID } = req.body;

      let data: any = await LessonRepo.GetLessonDetailBase(lessonID);
      const type = data[0]?.LessonType;
    
      let result: any;
      if (type === "Video") {
        result = await LessonRepo.LessonVideo.getLessonVideoByID(lessonID);
        return res.status(200).json({
          message: "Get lesson video successfully",
          status: 200,
          data: {
            type: data[0]?.LessonType,
            lesson: result[0],
          },
        });
      } else if (type === "Document") {
        let lessonDocumentID = data?.[0]?.LessonDocumentID;
   
        result = await LessonRepo.LessonDoc.getAllPagesDocument(
          lessonDocumentID
        );
   
      } else if (type === "Test") {
        let lessonTestID = data[0].LessonTestID;
        result = await LessonRepo.LessonTest.getAllQuestionsTest(lessonTestID);
      }
      return res.status(200).json({
        message: "Get lesson detail successfully",
        status: 200,
        data: {
          type: data[0]?.LessonType,
          lesson: data[0],
          detail: result,
        },
      });
    } catch (error: any) {
      throw new Error(
        `Error getting all lessons by courseID: ${error.message}`
      );
    }
  },

  //2. get lesson by id
};
export default LessonService;
