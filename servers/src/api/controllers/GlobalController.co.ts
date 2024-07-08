import { Request, Response } from "express";

const GlobalController = {
  //1. get all courses
  async getAllCourses(req: Request, res: Response) {
    res.send("Get All Courses");
  },
};

export default GlobalController;
