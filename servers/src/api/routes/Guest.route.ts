import { Router } from "express";
import { GuestController } from "../controllers";
const GuestRouter = Router();
GuestRouter.post("/p", GuestController.createProduct);

export default GuestRouter;
