import { Router } from "express";
import { StudentController } from "../controllers";
const StudentRouter = Router();
StudentRouter.post("/add_to_card", StudentController.addToCart);
StudentRouter.post("/update_cart", StudentController.updateCart);
StudentRouter.post("/remove_cart", StudentController.removeCart);
StudentRouter.post("/select_cart_by_studentid", StudentController.selectCart);
export default StudentRouter;
