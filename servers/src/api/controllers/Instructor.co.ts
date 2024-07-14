import { Request, Response } from "express";
import { VW_Course, VW_CourseHistory } from "../../interfaces/view.interface";
import CourseRepo from "../../repositories/course.repo";
import CategoryRepo from "../../repositories/category.repo";
import TaxRepo from "../../repositories/tax.repo";
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
  //6. get all Category
  async getAllCategory(res: Response) {
    try {
      const result = await CategoryRepo.getAllCategory();
      return res.status(200).json({
        message: "Get all category",
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
  //7. get category by ID
  async getCategoryByID(req: Request, res: Response) {
    try {
      const { categoryID } = req.body;
      const result = await CategoryRepo.getCategoryById(categoryID);
      if (result.length === 0) {
        return res.status(404).json({
          message: "Category not found",
          status: 404,
          data: null,
        });
      }
      return res.status(200).json({
        message: "Get category by ID",
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
  //8. create category
  async createCategory(req: Request, res: Response) {
    try {
      const { name, description, parentCategoryID } = req.body;
      await CategoryRepo.createCategory(name, description, parentCategoryID);
      return res.status(201).json({
        message: "Category created successfully",
        status: 201,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: `Error: ${error.message}`,
        status: 500,
      });
    }
  },

  //9. update category
  async updateCategory(req: Request, res: Response) {
    try {
      const { categoryID, name, description, parentCategoryID } = req.body;
      await CategoryRepo.updateCategory(
        categoryID,
        name,
        description,
        parentCategoryID
      );
      return res.status(200).json({
        message: "Category updated successfully",
        status: 200,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: `Error: ${error.message}`,
        status: 500,
      });
    }
  },
  //10. delete category
  async deleteCategory(req: Request, res: Response) {
    try {
      const { categoryID } = req.body;
      await CategoryRepo.deleteCategory(categoryID);
      return res.status(200).json({
        message: "Category deleted successfully",
        status: 200,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: `Error: ${error.message}`,
        status: 500,
      });
    }
  },

  // 11. create Discount
  async createDiscount(req: Request, res: Response) {
    try {
      const { percentage, quantity, courseID, expiredDate } = req.body;
      await CategoryRepo.createDiscount(
        percentage,
        quantity,
        courseID,
        expiredDate
      );
      return res.status(201).json({
        message: "Discount created successfully",
        status: 201,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: `Error: ${error.message}`,
        status: 500,
      });
    }
  },
  // update Discount
  async updateDiscount(req: Request, res: Response) {
    try {
      const { discountID, percentage, quantity, expiredDate } = req.body;
      await CategoryRepo.updateDiscount(
        discountID,
        percentage,
        quantity,
        expiredDate
      );
      return res.status(200).json({
        message: "Discount updated successfully",
        status: 200,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: `Error: ${error.message}`,
        status: 500,
      });
    }
  },
  // delete Discount
  async deleteDiscount(req: Request, res: Response) {
    try {
      const { discountID } = req.body;
      await CategoryRepo.deleteDiscount(discountID);
      return res.status(200).json({
        message: "Discount deleted successfully",
        status: 200,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: `Error: ${error.message}`,
        status: 500,
      });
    }
  },
  //4. get all discounts
  async getAllDiscounts(req:Request ,res: Response) {
    try {
      const { courseID } = req.body;
      const result = await CategoryRepo.getAllDiscounts(courseID);
      return res.status(200).json({
        message: "Get all discounts",
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
  //tax
  //1. create tax report
  async createTaxReport(req: Request, res: Response) {
    try {
      const { instructorID } = req.body;
      await TaxRepo.createTaxReport(instructorID);
      return res.status(201).json({
        message: "Tax report created successfully",
        status: 201,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: `Error: ${error.message}`,
        status: 500,
      });
    }
  },
  //2 get tax report by instructorID
  async getTaxReport(req: Request, res: Response) {
    try {
      const { instructorID } = req.body;
      const result = await TaxRepo.getTaxReport(instructorID);
      return res.status(200).json({
        message: "Get tax report by instructorID",
        status: 200,
        data: result,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: `Error: ${error.message}`,
        status: 500,
      });
    }
  },
};

export default InstructorController;
