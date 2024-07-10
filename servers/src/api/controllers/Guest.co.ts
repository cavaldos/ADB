import { Request, Response } from "express";

const GuestController = {
  async createProduct(req: Request, res: Response) {
    console.log(req.body);
    res.send("Create Product");
  },
};

export default GuestController;
