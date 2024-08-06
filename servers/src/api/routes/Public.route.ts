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
// 10. get bank account by userID
PublicRouter.post("/get_bank_account", GlobalController.getBankAccountByUserID);
// 11. get all transfer course
PublicRouter.post("/get_all_transfer", GlobalController.getAllTransfer);
// 12. auto complete search
PublicRouter.post("/auto_complete_search", GlobalController.autoCompleteCourse);

// 12. chat
PublicRouter.post("/create_chat", GlobalController.createChat);
// 13. get chat by userID
PublicRouter.post("/get_all_chat", GlobalController.getAllChat);
export default PublicRouter;
