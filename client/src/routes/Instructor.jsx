
import { lazy } from "react";
const InstructorLayout = lazy(() => import("~/components/Layout/InstructorLayout"));
const HomeInstructor= lazy(() => import("~/pages/instructor/index"));

const InstructorRouter = [
  {
    path: "/",
    component: HomeInstructor,
    Layout: InstructorLayout,
  },
  
];

export default InstructorRouter;
