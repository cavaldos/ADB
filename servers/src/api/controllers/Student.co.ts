import { Request, Response } from "express";

const StudentController = {
  async createProduct(req: Request, res: Response) {
    res.send(req.body);
  },
 
};

export default StudentController;
