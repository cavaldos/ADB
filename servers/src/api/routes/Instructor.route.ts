import { Router } from "express";
import { InstructorController, LessonController } from "../controllers";
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

//6. create lesson video
InstructorRouter.post(
  "/create_lesson_video",
  LessonController.createLessonVideo
);
//7. update lesson video
InstructorRouter.post(
  "/update_lesson_video",
  LessonController.updateLessonVideo
);
//9. get all lesson video by courseID
InstructorRouter.post(
  "/get_all_lessons_video",
  LessonController.getAllLessonsVideo
);
//10. get lesson video by lessonID
InstructorRouter.post(
  "/get_lesson_video_by_id",
  LessonController.getLessonsVideoByID
);

//11. create lesson document
InstructorRouter.post(
  "/create_lesson_document",
  LessonController.createLessonDocument
);
//12. add page to  document
InstructorRouter.post(
  "/add_page_to_lesson_document",
  LessonController.addPageToDocument
);
//13. update page  document
InstructorRouter.post(
  "/update_page_to_lesson_document",
  LessonController.updatePageDocument
);
//14. delete page  document
InstructorRouter.post(
  "/delete_page_to_lesson_document",
  LessonController.deletePageDocument
);

//15. get all lesson document by courseID
InstructorRouter.post(
  "/get_all_lesson_document",
  LessonController.getAllLessonsDocument
);
//16. get lesson document by lessonID
InstructorRouter.post(
  "/get_lesson_document_by_id",
  LessonController.getLessonDocumentByID
);
//16.1. get Page document by lessonDocumentID
InstructorRouter.post(
  "/get_all_page_document_by_id",
  LessonController.getAllPagesDocument
);

///================================================================================================
//16. create lesson test
InstructorRouter.post("/create_lesson_test", LessonController.createLessonTest);
//17. add question to lesson test
InstructorRouter.post(
  "/add_question_to_lesson_test",
  LessonController.addQuestionToTest
);
//18. update question to lesson test
InstructorRouter.post(
  "/update_question_to_lesson_test",
  LessonController.updateQuestionToTest
);
//19. get all lesson test by courseID
InstructorRouter.post(
  "/get_all_lesson_test",
  LessonController.getAllLessonsTest
);
//20. get lesson test by lessonID
InstructorRouter.post(
  "/get_lesson_test_by_id",
  LessonController.getLessonsTestByID
);
//21. get all Question test by lessonTestID
InstructorRouter.post(
  "/get_all_question_test_by_id",
  LessonController.getAllQuestionsByTest
);
//========
//21. get all Lesson by courseID
InstructorRouter.post(
  "/get_all_lessons_by_courseID",
  LessonController.getAllLessonsByCourseID
);

//20. Delete lesson
InstructorRouter.post("/delete_lesson", LessonController.deleteLesson);

export default InstructorRouter;
