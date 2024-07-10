import DataConnect from "../utils/DataConnect";

const LearnRepo = {
  // 28 strart learn process
  async startLearnProcess(courseID: number, studentID: number) {
    try {
      const proc = "start_learn_process";
      const params = {
        CourseID: courseID,
        StudentID: studentID,
      };
      return await DataConnect.executeProcedure(proc, params);
    } catch (error: any) {
      throw new Error(`Error starting learn process: ${error.message}`);
    }
  },
  // 29. update learn process
  async updateLearnProcess(
    learnProcess: number,
    status: boolean,
    studentID: number,
    courseID: number
  ) {
    try {
      const proc = "update_learn_process";
      const params = {
        LearnProcessID: learnProcess,
        Status: status,
        StudentID: studentID,
        CourseID: courseID,
      };
      return await DataConnect.executeProcedure(proc, params);
    } catch (error: any) {
      throw new Error(`Error updating learn process: ${error.message}`);
    }
  },
};
export default LearnRepo;
