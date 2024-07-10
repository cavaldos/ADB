import { Request, Response } from "express";
import { VW_Course } from "../../interfaces/view.interface";
import UserService from "../services/User.sv";
import CourseRepo from "../../repositories/course.repo";
const GlobalController = {
  //1. get all courses with pagination
  async getAllCourses(req: Request, res: Response) {
    try {
      const page = parseInt(req.body.page as string) || 1;
      const pageSize = parseInt(req.body.pageSize as string) || 10;
      const offset = (page - 1) * pageSize;

      const result = await CourseRepo.getAllCourses(offset, pageSize);
      return res.status(200).json({
        message: "Get all courses public",
        status: 200,
        data: result,
        page,
        pageSize,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: `Error: ${error.message}`,
        status: 500,
        data: null,
      });
    }
  },

  // 2. get courses by various filters with pagination
  async filterCourse(req: Request, res: Response) {
    try {
      const {
        categoryName,
        instructorName,
        language,
        status,
        minPrice,
        maxPrice,
        createTime,
      } = req.body;
      const page = parseInt(req.body.page as string) || 1;
      const pageSize = parseInt(req.body.pageSize as string) || 10;
      const offset = (page - 1) * pageSize;
      const result: VW_Course = await CourseRepo.filterCourses(
        categoryName,
        instructorName,
        language,
        status,
        minPrice,
        maxPrice,
        createTime,
        offset,
        pageSize
      );
      return res.status(200).json({
        message: `Filtered courses`,
        status: 200,
        data: result,
        page,
        pageSize,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: `Error: ${error.message}`,
        status: 500,
        data: null,
      });
    }
  },
  // 3. search courses by various fields
  async searchCourses(req: Request, res: Response) {
    try {
      const { searchString } = req.body;
      const page = parseInt(req.body.page as string) || 1;
      const pageSize = parseInt(req.body.pageSize as string) || 10;
      const offset = (page - 1) * pageSize;

      const result: VW_Course = await CourseRepo.searchCourses(
        searchString,
        offset,
        pageSize
      );
      return res.status(200).json({
        message: `Search results for: ${searchString}`,
        status: 200,
        data: result,
        page,
        pageSize,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: `Error: ${error.message}`,
        status: 500,
        data: null,
      });
    }
  },
  //4. get course by ID
  async getCourseById(req: Request, res: Response) {
    try {
      const { courseID } = req.body;
      const result: VW_Course = await CourseRepo.selectCourseById(courseID);
      return res.status(200).json({
        message: `Get course by ID: ${courseID}`,
        status: 200,
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
  //5. get Profile by UserID
  async getProfileByUserID(req: Request, res: Response) {
    try {
      const { userID, role } = req.body;
      var result;
      if (role !== "instructor" && role !== "student" && role !== "admin") {
        console.log("role is not valid");
        return res.status(400).json({
          message: "Invalid role",
          status: 400,
          data: null,
        });
      }
      if (role === "instructor") {
        result = await UserService.getInstructorByID(userID);
      } else if (role === "student") {
        result = await UserService.getStudentByID(userID);
      } else if (role === "admin") {
        result = await UserService.getAdminByID(userID);
      }
      return res.status(200).json({
        message: `Get profile by UserID: ${userID}`,
        status: 200,
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
};

export default GlobalController;
