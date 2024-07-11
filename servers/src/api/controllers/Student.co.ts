import { Request, Response } from "express";
import CartRepo from "../../repositories/cart.repo";
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
  //4. select cart details
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

  //5. select all cart From student
};

export default StudentController;
