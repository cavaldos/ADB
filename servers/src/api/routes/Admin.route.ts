import { Router } from "express";
import { AdminController } from "../controllers";
const AdminRouter = Router();


// 1. create tax setting
AdminRouter.post("/create_tax_setting", AdminController.createTaxSetting);
// 2. update tax setting
AdminRouter.post("/update_tax_setting", AdminController.updateTaxSetting);
// 3. get all tax setting
AdminRouter.post("/get_all_tax_setting", AdminController.getAllTaxSetting);

AdminRouter.post("/get_all_instructor", AdminController.getAllInstructor);

AdminRouter.post("/update_instructor", AdminController.upDateInstructorByAdmin);



export default AdminRouter;
