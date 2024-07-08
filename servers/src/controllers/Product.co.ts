import { Request, Response } from "express";


// /createProduct
const ProductController = {
  async createProduct(req: Request, res: Response) {
    try {
      const { name, price, description } = req.body;
      console.log(name, price, description);
      return res.status(201).json("invoice created");
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  },
};

export default ProductController;
