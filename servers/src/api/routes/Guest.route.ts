import { Router } from "express";
import { GuestController } from "../controllers";
const GuestRouter = Router();
GuestRouter.post("/get_all_course", GuestController.createProduct);

export default GuestRouter;
