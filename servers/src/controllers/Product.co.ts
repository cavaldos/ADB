import { Request, Response } from "express";

const ProductController = {
  async createProduct(req: Request, res: Response) {
    try {
      const { name, price, description } = req.body;
      console.log(name, price, description);
      return res.status(201).json("product created");
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  },
  async getProducts(req: Request, res: Response) {
    try {
      console.log("getProducts");
      const id = req.query.id;
      console.log(id);
      return res.status(200).json("products");
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  },
  async getProduct(req: Request, res: Response) {
    try {
      const { id } = req.params;
      console.log(id);
      return res.status(200).json("product");
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  },
  async updateProduct(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, price, description } = req.body;
      console.log(id, name, price, description);
      return res.status(200).json("product");
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  },
  async deleteProduct(req: Request, res: Response) {
    try {
      const { id } = req.params;
      console.log(id);
      return res.status(204).json("");
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  },
};

export default ProductController;