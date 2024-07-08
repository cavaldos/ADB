import { Router } from "express";
import { AdminController } from "../controllers";
const AdminRouter = Router();
AdminRouter.post("/p", AdminController.createProduct);

export default AdminRouter;
