import { Request, Response } from "express";
import { VW_Course, VW_CourseHistory } from "../../interfaces/view.interface";
import CourseRepo from "../../repositories/course.repo";

const InstructorController = {
  //1. create a new course
  async createCourse(req: Request, res: Response) {
    try {
      const {
        title,
        subtitle,
        description,
        language,
        image,
        price,
        status,
        categoryID,
        instructorID,
      } = req.body;
      // Validate the status
      if (status !== "Free" && status !== "Hide" && status !== "Plus") {
        return res.status(400).json({
          message: "Status must be Free, Hide, or Plus",
          status: 400,
        });
      }
      await CourseRepo.createCourse(
        title,
        subtitle,
        description,
        language,
        image,
        price,
        status,
        categoryID,
        instructorID
      );
      return res.status(201).json({
        message: "Course created successfully",
        status: 201,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: `Error: ${error.message}`,
        status: 500,
      });
    }
  },
  //2. update a course
  async updateCourse(req: Request, res: Response) {
    try {
      const {
        courseID,
        title,
        subtitle,
        description,
        language,
        image,
        price,
        status,
        historyMessage,
      } = req.body;
      // Validate the status
      if (status !== "Free" && status !== "Hide" && status !== "Plus") {
        return res.status(400).json({
          message: "Status must be Free, Hide, or Plus",
          status: 400,
        });
      }
      await CourseRepo.updateCourse(
        courseID,
        title,
        subtitle,
        description,
        language,
        image,
        price,
        status,
        historyMessage
      );
      return res.status(200).json({
        message: "Course updated successfully",
        status: 200,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: `Error: ${error.message}`,
        status: 500,
      });
    }
  },
  //3. delete a course
  async editStatusCourse(req: Request, res: Response) {
    try {
      const { courseID, status } = req.body;
      // Validate the status
      if (status !== "Free" && status !== "Hide" && status !== "Plus") {
        return res.status(400).json({
          message: "Status must be Free, Hide, or Plus",
          status: 400,
        });
      }
      await CourseRepo.editStatusCourse(courseID, status);
      return res.status(200).json({
        message: "Course deleted successfully",
        status: 200,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: `Error: ${error.message}`,
        status: 500,
      });
    }
  },

  // 4. get all courses by instructor
  async getAllCourses(req: Request, res: Response) {
    try {
      const { instructorID } = req.body;
      const page = parseInt(req.body.page as string) || 1;
      const pageSize = parseInt(req.body.pageSize as string) || 10;
      const offset = (page - 1) * pageSize;

      const result: VW_Course = await CourseRepo.getAllCoursesByInstructor(
        instructorID,
        offset,
        pageSize
      );
      return res.status(200).json({
        message: "Get all courses by instructor",
        sattus: 200,
        data: result,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: `Error: ${error.message}`,
        status: 500,
        data: null,
      });
    }
  },

  //5. get Course History by courseID
  async getCourseHistorybyID(req: Request, res: Response) {
    try {
      const { courseID, version } = req.body;
      console.log(courseID, version);
      const courseHistory: VW_CourseHistory =
        await CourseRepo.getCourseHistorybyID(courseID, version);

      if (courseHistory.length === 0) {
        return res.status(404).json({
          message: "Course history not found",
          status: 404,
          data: null,
        });
      }
      return res.status(200).json({
        message: "Get course history by courseID",
        status: 200,
        data: courseHistory,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: `Error: ${error.message}`,
        status: 500,
        data: null,
      });
    }
  },
  
};

export default InstructorController;
