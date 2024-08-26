import { Router } from "express";
import { StudentController } from "../controllers";
import LearningService from "../services/Learing.sv";
const StudentRouter = Router();
StudentRouter.post("/add_to_card", StudentController.addToCart);
StudentRouter.post("/update_cart", StudentController.updateCart);
StudentRouter.post("/remove_cart", StudentController.removeCart);
StudentRouter.post("/select_cart_by_studentid", StudentController.selectCart);
// invoice
StudentRouter.post("/create_invoice", StudentController.Invoice.createInvoice);
StudentRouter.post(
  "/apply_discount_code",
  StudentController.Invoice.applyDiscountCode
);
StudentRouter.post(
  "/delete_invoice_detail",
  StudentController.Invoice.deleteInvoiceDetail
);
StudentRouter.post(
  "/get_invoice_details",
  StudentController.Invoice.getInvoiceDetails
);
StudentRouter.post(
  "/get_all_invoice_by_studentid",

  StudentController.Invoice.getAllInvoiceByStudentID
);
StudentRouter.post(
  "/payment_invoice",
  StudentController.Invoice.paymentInvoice
);

// learn ===========================
StudentRouter.post(
  "/get_my_course_to_learn",
  StudentController.getMyCourseReadyToLearn
);
StudentRouter.post("/start_learn_process", StudentController.startLearnProcess);
StudentRouter.post(
  "/update_learn_process",
  StudentController.updateLearnProcess
);
StudentRouter.post(
  "/get_all_learn_process",
  StudentController.getAllLearnProcess
);

//statistical LearnProcess
StudentRouter.post(
  "/statistical_learn_process",
  LearningService.statisticalLearnProcess
);

export default StudentRouter;
