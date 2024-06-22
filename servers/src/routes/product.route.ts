import ProductController from "../controllers/Product.co";
import { Router } from "express";
const router = Router();
router.post("/aa", ProductController.createProduct);
router.get("/bb", ProductController.getProducts);
router.get("/:id", ProductController.getProduct);
router.put("/:id", ProductController.updateProduct);
router.delete("/:id", ProductController.deleteProduct);
export default router;
