import ProductController from "../controllers/Product.co";
import { Router } from "express";
const router = Router();
router.post("/aa", ProductController.createProduct);

export default router;
