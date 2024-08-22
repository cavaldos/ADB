import { Router } from "express";
import { InstructorController, LessonController } from "../controllers";
import LessonService from "../services/Lesson.sv";
const InstructorRouter = Router();
//1.
InstructorRouter.post("/create_course", InstructorController.createCourse);
//2.
InstructorRouter.post("/update_course", InstructorController.updateCourse);
//3.
InstructorRouter.post(
  "/get_all_course_instructorID",
  InstructorController.getAllCourses
);
//4.
InstructorRouter.post(
  "/get_course_history",
  InstructorController.getCourseHistorybyID
);
//5.
InstructorRouter.post(
  "/edit_status_course",
  InstructorController.editStatusCourse
);

// LESSON

//1. get lesson by ID
InstructorRouter.post("/get_lesson_detail", LessonService.getLessonDetail);

//6. create lesson video
InstructorRouter.post(
  "/create_lesson_video",
  LessonController.LessonVideo.createLessonVideo
);
//7. update lesson video
InstructorRouter.post(
  "/update_lesson_video",
  LessonController.LessonVideo.updateLessonVideo
);

//11. create lesson document
InstructorRouter.post(
  "/create_lesson_document",
  LessonController.LessonDocument.createLessonDocument
);
//12. add page to  document
InstructorRouter.post(
  "/add_page_to_lesson_document",
  LessonController.LessonDocument.addPage
);
//13. update page  document
InstructorRouter.post(
  "/update_page_to_lesson_document",
  LessonController.LessonDocument.updatePage
);
//14. delete page  document
InstructorRouter.post(
  "/delete_page_to_lesson_document",
  LessonController.LessonDocument.deletePage
);

//16. get lesson document by lessonID
InstructorRouter.post(
  "/get_all_page_document_by_id",
  LessonController.LessonDocument.getAllPages
);

//16. create lesson test
InstructorRouter.post(
  "/create_lesson_test",
  LessonController.LessonTest.createLessonTest
);
//17. add question to lesson test
InstructorRouter.post(
  "/add_question_to_lesson_test",
  LessonController.LessonTest.addQuestion
);
// //18. update question to lesson test
InstructorRouter.post(
  "/update_question_to_lesson_test",
  LessonController.LessonTest.updateQuestion
);

//21. get all Question test by lessonTestID
InstructorRouter.post(
  "/get_all_question_test_by_id",
  LessonController.LessonTest.getAllQuestions
);

//21. get all Lesson by courseID
InstructorRouter.post(
  "/get_all_lessons_by_courseID",
  LessonController.getAllLessons
);

InstructorRouter.post("/delete_lesson", LessonController.deleteLesson);
InstructorRouter.post("/update_lesson", LessonController.upDateLesson);
InstructorRouter.post("/sort_lesson", LessonController.sortLesson);





//=====================Category=========================
//1. create category
InstructorRouter.post("/create_category", InstructorController.createCategory);
//2. update category
InstructorRouter.post("/update_category", InstructorController.updateCategory);
//3. delete category
InstructorRouter.post("/delete_category", InstructorController.deleteCategory);
//4. get all categories
InstructorRouter.post(
  "/get_all_categories",
  InstructorController.getAllCategory
);
//5. get category by ID
InstructorRouter.post(
  "/get_category_by_id",
  InstructorController.getCategoryByID
);

//=====================Discount=========================
//1. create discount
InstructorRouter.post("/create_discount", InstructorController.createDiscount);
//2. update discount
InstructorRouter.post("/update_discount", InstructorController.updateDiscount);
//3. delete discount
InstructorRouter.post("/delete_discount", InstructorController.deleteDiscount);
//4. get all discounts
InstructorRouter.post(
  "/get_all_discounts",
  InstructorController.getAllDiscounts
);

// create tax report
InstructorRouter.post(
  "/create_tax_report",
  InstructorController.createTaxReport
);
// get tax report by instructorID
InstructorRouter.post("/get_tax_report", InstructorController.getTaxReport);

export default InstructorRouter;
