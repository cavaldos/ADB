import LessonRepo from "../../repositories/lessson.repo";
import _ from "lodash";
import { VW_Lesson } from "../../interfaces/view.interface";

const LessonService = {
  //1. get all lessons by courseID
  async getAllLessonsByCourseID(courseID: number) {
    try {
      const lessonsVideo = await LessonRepo.getAllLessonsVideo(courseID);
      const lessonsDocument = await LessonRepo.getAllLessonsDocument(courseID);
      const lessonsTest = await LessonRepo.getAllLessonsTest(courseID);

      // Combine all lessons into one array
      const allLessons: VW_Lesson[] = [
        ...lessonsVideo,
        ...lessonsDocument,
        ...lessonsTest,
      ];

      // Group lessons by TopicName
      const groupedByTopic = _.groupBy(allLessons, "TopicName");

      // Define the order of complexity levels
      const complexityOrder = ["Easy", "Medium", "Hard"];

      // For each topic, group lessons by ComplexityLevel and sort the groups
      const groupedLessons: Record<string, Record<string, VW_Lesson[]>> = {};
      for (const [topic, lessons] of Object.entries(groupedByTopic)) {
        const groupedByComplexity = _.groupBy(lessons, "ComplexityLevel");

        // Sort the complexity levels
        groupedLessons[topic] = {};
        for (const level of complexityOrder) {
          if (groupedByComplexity[level]) {
            groupedLessons[topic][level] = groupedByComplexity[level];
          }
        }
      }

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
