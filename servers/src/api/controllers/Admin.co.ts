import { Request, Response } from "express";

const AdminController = {
  async createProduct(req: Request, res: Response) {
    res.send(req.body);
  },
  
};

export default AdminController;