import { Router } from "express";
import { GlobalController } from "../controllers";
const PublicRouter = Router();
// 1.
PublicRouter.post("/get_all_course", GlobalController.getAllCourses);
// 2.
PublicRouter.post(
  "/filter_course",
  GlobalController.filterCourse
);
// 3.
PublicRouter.post("/search_course", GlobalController.searchCourses);
// 4.
PublicRouter.post("/get_course_detail", GlobalController.getCourseById);
// 5.
PublicRouter.post("/get_profile", GlobalController.getProfileByUserID);
// 6. create bank account
PublicRouter.post("/create_bank_account", GlobalController.createBankAccount);
// 7. update bank account
PublicRouter.post("/update_bank_account", GlobalController.updateBankAccount);
// 8. transfer money
PublicRouter.post("/transfer_money", GlobalController.transferMoney);
// 9. create transfer course
PublicRouter.post("/create_transfer_course", GlobalController.createTransferCourse);

export default PublicRouter;
