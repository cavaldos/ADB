// khach hang

import { lazy } from "react";

const StudentLayout = lazy(() => import("~/components/Layout/StudentLayout"));
const HomeStudent = lazy(() => import("~/pages/student/index"));
const DevPage = lazy(() => import("~/pages/student/chat"));
const Cart = lazy(() => import("~/pages/student/Cart"));
const Learning = lazy(() => import("~/pages/student/Learning"));
const CourseDetail = lazy(() => import("~/pages/student/CourseDetail"));
const Chats = lazy(() => import("~/pages/student/Chats"));
const StudentRouter = [
  {
    name: "Home",
    path: "/",
    component: HomeStudent,
    Layout: StudentLayout,
  },
  {
    name: "Dev",
    path: "/dev",
    component: DevPage,
    Layout: StudentLayout,
  },

  {
    name: "Cart",
    path: "/cart",
    component: Cart,
    Layout: StudentLayout,
  },

  {
    name: "Learning",
    path: "/learning",
    component: Learning,
    Layout: StudentLayout,
  },
  {
    name: "CourseDetail",
    path: "/course-detail",
    component: CourseDetail,
    Layout: StudentLayout,
  },
  {
    name: "Chats",
    path: "/chat",
    component: Chats,
    Layout: StudentLayout,
  },
 
];

export default StudentRouter;
