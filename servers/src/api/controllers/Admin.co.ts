import { Request, Response } from "express";
import TaxRepo from "../../repositories/tax.repo";
import UserRepo from "../../repositories/user.repo";
const AdminController = {
  // create tax setting
  async createTaxSetting(req: Request, res: Response) {
    try {
      const { taxPercentage, effectiveDate } = req.body;
      const result = await TaxRepo.createTaxSetting(
        taxPercentage,
        effectiveDate
      );
      return res.status(200).json({
        message: `Tax setting created successfully`,
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

  // update tax setting
  async updateTaxSetting(req: Request, res: Response) {
    try {
      const { taxSettingID, taxPercentage, effectiveDate } = req.body;
      const result = await TaxRepo.updateTaxSetting(
        taxSettingID,
        taxPercentage,
        effectiveDate
      );
      return res.status(200).json({
        message: `Tax setting updated successfully`,
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
  // get all tax setting
  async getAllTaxSetting(req: Request, res: Response) {
    try {
      const result = await TaxRepo.getAllTaxSetting();
      console.log(req.body);
      return res.status(200).json({
        message: `Tax settings fetched successfully`,
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

  // get all Instructor
  async getAllInstructor(req: Request, res: Response) {
    try {
      const { instructor } = req.body;
      console.log(instructor);
      const result = await UserRepo.getAllInstructor();
      return res.status(200).json({
        message: `Instructors fetched successfully`,
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
  async upDateInstructorByAdmin(req: Request, res: Response) {
    try {
      const { instructorID, level, status } = req.body;
      const result = await UserRepo.upDateInstructorByAdmin(
        instructorID,
        level,
        status
      );
      return res.status(200).json({
        message: `Instructor updated successfully`,
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

export default AdminController;
