import { Router } from "express";
import { StudentController } from "../controllers";
const StudentRouter = Router();
StudentRouter.post("/p", StudentController.createProduct);

export default StudentRouter;
