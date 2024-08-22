import { Router } from "express";
import { GuestController } from "../controllers";
const GuestRouter = Router();
GuestRouter.post("/login", GuestController.login);
GuestRouter.post("/register", GuestController.register);


// register user
// register admin
// register instructor
// register student

export default GuestRouter;
