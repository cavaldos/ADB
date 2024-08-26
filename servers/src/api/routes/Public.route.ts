import { Router } from "express";
import { GlobalController } from "../controllers";
const PublicRouter = Router();
// 1.
PublicRouter.post("/get_all_course", GlobalController.Course.getAllCourses);
// 2.
PublicRouter.post("/filter_course", GlobalController.Course.filterCourse);
// 3.
PublicRouter.post("/search_course", GlobalController.Course.searchCourses);
// 4.
PublicRouter.post("/get_course_detail", GlobalController.Course.getCourseById);
// 5.
PublicRouter.post("/get_profile", GlobalController.Profile.getProfileByUserID);
// 6. create bank account
PublicRouter.post(
  "/create_bank_account",
  GlobalController.Banking.createBankAccount
);
// 7. update bank account
PublicRouter.post(
  "/update_bank_account",
  GlobalController.Banking.updateBankAccount
);
// 8. transfer money
PublicRouter.post("/transfer_money", GlobalController.Banking.transferMoney);
// 9. create transfer course
PublicRouter.post(
  "/create_transfer_course",
  GlobalController.Banking.createTransferCourse
);
// 10. get bank account by userID
PublicRouter.post(
  "/get_bank_account",
  GlobalController.Banking.getBankAccountByUserID
);
// 11. get all transfer course
PublicRouter.post("/get_all_transfer", GlobalController.Banking.getAllTransfer);

PublicRouter.post(
  "/get_history_banking",
  GlobalController.Banking.getHistoryBanking
);

// 12. auto complete search
PublicRouter.post(
  "/auto_complete_search",
  GlobalController.Course.autoCompleteCourse
);

// 12. chat
PublicRouter.post("/create_chat", GlobalController.Chat.createChat);
// 13. get chat by userID
PublicRouter.post("/get_all_chat", GlobalController.Chat.getAllChat);
// 14. get all user chat
PublicRouter.post("/get_all_user_chat", GlobalController.Chat.getAllUserChat);
PublicRouter.post("/delete_chat", GlobalController.Chat.deleteChat);

// profile
PublicRouter.post(
  "/create_education",
  GlobalController.Profile.createEducation
);
PublicRouter.post(
  "/create_education",
  GlobalController.Profile.createEducation
);
PublicRouter.post(
  "/update_education",
  GlobalController.Profile.updateEducation
);
PublicRouter.post(
  "/delete_education/",
  GlobalController.Profile.deleteEducation
);
PublicRouter.post(
  "/get_education_userID",
  GlobalController.Profile.getEducationByUserID
);

PublicRouter.post(
  "/create_certificate",
  GlobalController.Profile.createCertificate
);
PublicRouter.post(
  "/update_certificate",
  GlobalController.Profile.updateCertificate
);
PublicRouter.post(
  "/delete_certificate",
  GlobalController.Profile.deleteCertificate
);
PublicRouter.post(
  "/get_certificate_instructorID",
  GlobalController.Profile.getCertificateByInstructorID
);

PublicRouter.post("/create_company", GlobalController.Profile.createCompany);
PublicRouter.post("/update_company", GlobalController.Profile.updateCompany);
PublicRouter.post(
  "/delete_company_companyID",
  GlobalController.Profile.deleteCompany
);
PublicRouter.post(
  "/get_company_instructorID",
  GlobalController.Profile.getCompanyByInstructorID
);

// forum
PublicRouter.post("/create_forum", GlobalController.Forum.createForum);
PublicRouter.post("/create_message_forum", GlobalController.Forum.createMess);
PublicRouter.post("/get_all_mess_forum", GlobalController.Forum.getAllMessageForum);
PublicRouter.post("/delete_forum", GlobalController.Forum.deleteDiscussionForum);

export default PublicRouter;
