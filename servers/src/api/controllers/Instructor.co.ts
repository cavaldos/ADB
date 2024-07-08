import { Request, Response } from "express";
import DataConnect from "../../utils/DataConnect";
import { VW_Course } from "../../interfaces/view.interface";
import { Course } from "../../interfaces/model.interface";

const InstructorController = {
  //1. create a new course
  async createCourse(req: Request, res: Response) {
    res.send("Create Product");
  },
  //2. update a course
  async updateCourse(req: Request, res: Response) {
    res.send("Update Product");
  },
  //3. delete a course
  async editStatusCourse(req: Request, res: Response) {
    res.send("Delete Product");
  },
  //4. get all courses by instructor
  async getAllCourses(req: Request, res: Response) {
    // const courses: VW_Course[] ;
    try {
      // const { instructorID, courseID } = req.body;

      const query = `Select * from Instructor i join Course co on co.InstructorID = i.InstructorID WHERE i.InstructorID = @instructorID and co.CourseID = @courseID;`;
      // const {idCourse, idInstructor} = req.body;
      const params = {
        "@instructorID": 1,
        "@courseID;": 2,
      };
      console.log(params);
      const courses: VW_Course = await DataConnect.executeWithParams(
        query,
        params
      );
      return res.status(200).json(courses);
    } catch (error: any) {}
  },
  //5. get all courses by instructor and by id course
  async getCourse(req: Request, res: Response) {},
};

export default InstructorController;
