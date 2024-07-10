import { Router } from "express";
import { GlobalController } from "../controllers";
const PublicRouter = Router();
PublicRouter.post("/get_all_course", GlobalController.getAllCourses);
PublicRouter.post(
  "/filter_course",
  GlobalController.filterCourse
);
PublicRouter.post("/search_course", GlobalController.searchCourses);
PublicRouter.post("/get_course_detail", GlobalController.getCourseById);
PublicRouter.post("/get_profile", GlobalController.getProfileByUserID);

export default PublicRouter;
