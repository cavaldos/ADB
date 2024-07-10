import { Request, Response } from "express";

const AuthController = {
  async createProduct(req: Request, res: Response) {
    res.send(console.log(req.body));
  },
};

export default AuthController;
