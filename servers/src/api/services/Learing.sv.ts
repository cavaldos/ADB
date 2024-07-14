import LearnRepo from "../../repositories/learn.repo";
import _ from "lodash";

const LearningService = {
  // Thống kê quá trình học
  async statisticalLearnProcess(learnProcessID: number) {
    try {
      const data: any = await LearnRepo.getLearnProcessDetail(learnProcessID); // Ensure that this call is awaited
      const totalLessons = data.length;

      const statusCounts = _.countBy(data, "Status");

      const statusPercentages = {
        NotStarted: ((statusCounts.NotStarted || 0) / totalLessons) * 100,
        InProcess: ((statusCounts.InProcess || 0) / totalLessons) * 100,
        Done: ((statusCounts.Done || 0) / totalLessons) * 100,
      };

      console.log("Status Percentages:", statusPercentages);
      return statusPercentages; // Return the percentages
    } catch (error: any) {
      throw new Error(`Error statistical learn process: ${error.message}`);
    }
  },
};

export default LearningService;
