import { Router } from "express";
import { StudentController } from "../controllers";
const StudentRouter = Router();
StudentRouter.post("/add_to_card", StudentController.addToCart);
StudentRouter.post("/update_cart", StudentController.updateCart);
StudentRouter.post("/remove_cart", StudentController.removeCart);
StudentRouter.post("/select_cart_by_studentid", StudentController.selectCart);
// invoice
StudentRouter.post("/create_invoice", StudentController.createInvoice);
StudentRouter.post("/add_invoice_detail", StudentController.addInvoiceDetail);
StudentRouter.post("/update_total_amount", StudentController.updateTotalAmount);

export default StudentRouter;
