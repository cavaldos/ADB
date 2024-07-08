import { Request, Response } from "express";

const AdminController = {
  async createProduct(req: Request, res: Response) {
    res.send("Create Product");
  },
  async updateProduct(req: Request, res: Response) {
    res.send("Update Product");
  },
  async deleteProduct(req: Request, res: Response) {
    res.send("Delete Product");
  },
  async getProducts(req: Request, res: Response) {
    res.send("Get Products");
  },
};

export default AdminController;