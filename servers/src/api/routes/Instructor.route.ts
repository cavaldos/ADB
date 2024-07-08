import { Router } from "express";
import { InstructorController } from "../controllers";
const InstructorRouter = Router();
InstructorRouter.post("/get_all_course", InstructorController.getAllCourses);

export default InstructorRouter;
