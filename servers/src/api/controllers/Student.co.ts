import { Request, Response } from "express";
import CartRepo from "../../repositories/cart.repo";
import InvoiceRepo from "../../repositories/invoice.repo";
import LearnRepo from "../../repositories/learn.repo";
const StudentController = {
  // 1. add to cart
  async addToCart(req: Request, res: Response) {
    try {
      const { studentID, courseID } = req.body;
      await CartRepo.addToCart(studentID, courseID);
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
  // 2. update cart
  async updateCart(req: Request, res: Response) {
    try {
      const { cardID, cartStatus } = req.body;
      await CartRepo.updateCart(cardID, cartStatus);
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
  // 3. remove cart details
  async removeCart(req: Request, res: Response) {
    try {
      const { cartID, courseID } = req.body;
      await CartRepo.removeCartDetail(cartID, courseID);
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
  //4. select all cart details by studentID
  async selectCart(req: Request, res: Response) {
    try {
      const { studentID } = req.body;
      const result = await CartRepo.selectCart(studentID);
      return res.status(200).json({
        message: "Lesson process marked as done successfully",
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
  //5. create Invoice
  async createInvoice(req: Request, res: Response) {
    try {
      const { studentID, courseID } = req.body;
      await InvoiceRepo.createInvoice(studentID, courseID);
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
  //6. add invoice detail
  async applyDiscountCode(req: Request, res: Response) {
    try {
      const { discountCode, invoiceDetailID } = req.body;
      await InvoiceRepo.applyDiscountCode(discountCode, invoiceDetailID);
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

  //7. delete invoice detail
  async deleteInvoiceDetail(req: Request, res: Response) {
    try {
      const { invoiceDetailID } = req.body;
      await InvoiceRepo.deleteInvoiceDetail(invoiceDetailID);
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

  // 8. get invoice details
  async getInvoiceDetails(req: Request, res: Response) {
    try {
      const { invoiceID } = req.body;
      const result = await InvoiceRepo.getInvoiceDetails(invoiceID);
      return res.status(200).json({
        message: "Lesson process marked as done successfully",
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
  //9. select all invoice details by studentID
  async getAllInvoiceByStudentID(req: Request, res: Response) {
    try {
      const { studentID } = req.body;
      const result = await InvoiceRepo.getALlInvoiceByStudentID(studentID);
      return res.status(200).json({
        message: "Lesson process marked as done successfully",
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
  // Learn process
  // get all My course ready to learn by studentID
  async getMyCourseReadyToLearn(req: Request, res: Response) {
    try {
      const { studentID } = req.body;
      const result = await LearnRepo.getAllMyCourseToLearn(studentID);
      return res.status(200).json({
        message: "Lesson process marked as done successfully",
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
  // srart learn processc
  async startLearnProcess(req: Request, res: Response) {
    try {
      const { studentID, courseID } = req.body;
      await LearnRepo.startLearnProcess(courseID, studentID);
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
  // update learn process
  async updateLearnProcess(req: Request, res: Response) {
    try {
      const { learnProcessID, status, studentID } = req.body;

      // Kiểm tra giá trị của status
      const validStatuses = ["NotStarted", "InProcess", "Done"];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({
          message:
            "Invalid status value. Status must be 'NotStarted', 'InProcess', or 'Done'.",
          status: 400,
        });
      }
      await LearnRepo.updateLearnProcess(learnProcessID, status, studentID);
      return res.status(200).json({
        message: "Lesson process updated successfully",
        status: 200,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: `Error: ${error.message}`,
        status: 500,
      });
    }
  },

  // 4. get all  Learn Process Detail
  async getAllLearnProcess(req: Request, res: Response) {
    try {
      const { studentID } = req.body;
      const result = await LearnRepo.getAllLearnProcess(studentID);
      return res.status(200).json({
        message: "Lesson process marked as done successfully",
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

export default StudentController;
