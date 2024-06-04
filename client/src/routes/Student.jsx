import { lazy } from "react";
const StudentLayout = lazy(() => import("~/components/Layout/StudentLayout"));

const HomeStudent = lazy(() => import("~/pages/student/index"));

const StudentRouter = [
  {
    path: "/",
    component: HomeStudent,
    Layout: StudentLayout,
  },
];

export default StudentRouter;
