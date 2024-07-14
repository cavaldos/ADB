import { Request, Response } from "express";
import TaxRepo from "../../repositories/tax.repo";
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
  async getAllTaxSetting(res: Response) {
    try {
      const result = await TaxRepo.getAllTaxSetting();
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
};

export default AdminController;
