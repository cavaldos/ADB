import LessonRepo from "../../repositories/lessson.repo";
import _ from "lodash";

const LessonService = {
  //1. get all lessons by courseID
  async getAllLessonsByCourseID(courseID: number) {
    try {
      const lessonsVideo = await LessonRepo.getAllLessonsVideo(courseID);
      const lessonsDocument = await LessonRepo.getAllLessonsDocument(courseID);
      const lessonsTest = await LessonRepo.getAllLessonsTest(courseID);

      // Combine all lessons into one array
      const allLessons = [...lessonsVideo, ...lessonsDocument, ...lessonsTest];

      // Group lessons by ComplexityLevel
      const groupedLessons = _.groupBy(allLessons, "ComplexityLevel");

      return groupedLessons;
    } catch (error: any) {
      throw new Error(
        `Error getting all lessons by courseID: ${error.message}`
      );
    }
  },

  //2. get lesson by id
};
export default LessonService;
