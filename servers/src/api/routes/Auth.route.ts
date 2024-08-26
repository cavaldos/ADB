import { Router } from "express";
import { AuthController } from "../controllers";
const AuthRouter = Router();
AuthRouter.post("/p", AuthController.createProduct);

export default AuthRouter;
