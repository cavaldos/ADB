import LearnRepo from "../../repositories/learn.repo";
import { Request, Response } from "express";
import _ from "lodash";

const LearningService = {
  // Thống kê quá trình học
  async statisticalLearnProcess(req: Request, res: Response) {
    try {
      const { studentID, courseID } = req.body;
      const allLearnProcess = await LearnRepo.getAllLearnProcess(studentID);
      const learnProcessDetail = await LearnRepo.getLearnProcessDetail(
        courseID,
        studentID
      );
      // Lọc ra khóa học có courseID trùng với courseID được truyền vào
      const filteredLearnProcess = _.filter(allLearnProcess, {
        CourseID: courseID,
      });

      // Tính toán phần trăm học tập của từng khóa học sử dụng Lodash
      const courseProgress = _.map(filteredLearnProcess, (course) => {
        const courseLessons = _.filter(learnProcessDetail, {
          CourseID: course.CourseID,
        });

        const totalLessons = _.size(courseLessons);
        const completedLessons = _.filter(courseLessons, {
          StatusProcess: "Done",
        }).length;

        // Tính toán phần trăm hoàn thành
        const progressPercentage =
          totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

        return {
          ...course,
          progressPercentage,
        };
      });

      // Sắp xếp learnProcessDetail theo OrderLesson
      const sortedLearnProcessDetail = _.orderBy(
        learnProcessDetail,
        ["OrderLesson"],
        ["asc"]
      );

      return res.status(200).json({
        message: "Statistical learn process successfully",
        status: 200,
        data: {
          allLearnProcess: courseProgress, // Chỉ trả về các khóa học có courseID trùng với courseID đầu vào
          learnProcessDetail: sortedLearnProcessDetail, // Trả về tất cả trạng thái và sắp xếp theo OrderLesson
        },
      });
    } catch (error: any) {
      throw new Error(`Error statistical learn process: ${error.message}`);
    }
  },
};

export default LearningService;
