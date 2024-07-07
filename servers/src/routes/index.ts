import ProductRouter from "./product.route"
import { Router } from "express";

const router = Router();

router.use("/products", ProductRouter);


export {
  ProductRouter
}
export default router;