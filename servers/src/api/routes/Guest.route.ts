import { Router } from "express";
import { GuestController } from "../controllers";
const GuestRouter = Router();
GuestRouter.post("/get_all_course", GuestController.createProduct);

// register user
// register admin
// register instructor
// register student

export default GuestRouter;
