import { Router } from "express";
import { InstructorController } from "../controllers";
const InstructorRouter = Router();
InstructorRouter.post("/p", InstructorController.createProduct);

export default InstructorRouter;
