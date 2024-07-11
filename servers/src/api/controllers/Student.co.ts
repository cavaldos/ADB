import { Request, Response } from "express";
import CartRepo from "../../repositories/cart.repo";
import InvoiceRepo from "../../repositories/invoice.repo";
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
      const { studentID, transferID } = req.body;
      await InvoiceRepo.createInvoice(studentID, transferID);
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
  async addInvoiceDetail(req: Request, res: Response) {
    try {
      const { invoiceID, discountCode, courseID } = req.body;
      await InvoiceRepo.addInvoiceDetail(invoiceID, discountCode, courseID);
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

  //7. update total amount
  async updateTotalAmount(req: Request, res: Response) {
    try {
      const { invoiceID } = req.body;
      await InvoiceRepo.updateTotalAmount(invoiceID);
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

export default StudentController;
