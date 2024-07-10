import { Router } from "express";
import { InstructorController } from "../controllers";
const InstructorRouter = Router();
InstructorRouter.post("/create_course", InstructorController.createCourse);
InstructorRouter.post("/update_course", InstructorController.updateCourse);
InstructorRouter.post("/get_all_course", InstructorController.getAllCourses);
InstructorRouter.post(
  "/get_course_history",
  InstructorController.getCourseHistorybyID
);

export default InstructorRouter;
