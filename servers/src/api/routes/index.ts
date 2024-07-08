import { Router } from "express";
import  AuthRouter  from "./Auth.route";
import  GuestRouter  from "./Guest.route";
import  InstructorRouter  from "./Instructor.route";
import  AdminRouter  from "./Admin.route";
import StudentRouter from "./Student.route";

const router = Router();
router.use("/auth", AuthRouter);
router.use("/guest", GuestRouter);
router.use("/instructor", InstructorRouter);
router.use("/admin", AdminRouter);
router.use("/student", StudentRouter);

export default router;