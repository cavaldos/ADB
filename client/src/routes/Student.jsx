// khach hang

import { lazy } from "react";

const StudentLayout = lazy(() => import("~/components/Layout/StudentLayout"));
const HomeStudent = lazy(() => import("~/pages/student/index"));
const DevPage = lazy(() => import("~/pages/student/chat"));
const Cart = lazy(() => import("~/pages/student/Cart"));
const Learning = lazy(() => import("~/pages/student/Learning"));
const CourseDetail = lazy(() => import("~/pages/student/CourseDetail"));
const Chats = lazy(() => import("~/pages/student/Chats"));
const LearnProcess = lazy(() => import("~/pages/student/LearnProcess"));
const BankAccount = lazy(() => import("~/pages/guest/BankAccount"));
const Profile = lazy(() => import("~/pages/guest/Profile"));
const Image = lazy(() => import("~/pages/student/image"));
const SaleOrder = lazy(() => import("../components/testcomponent/SaleOrder"));
import Test from "../pages/student/test";
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
  {
    name: "LearnProcess",
    path: "/learn-process",
    component: LearnProcess,
    Layout: StudentLayout,
  },
  {
    name: null,
    path: "/bank",
    component: BankAccount,
    Layout: null,
  },
  {
    name: "Profile",
    path: "/profile",
    component: Profile,
    Layout: StudentLayout,
  },
  {
    name: "Image",
    path: "/image",
    component: Image,
    Layout: StudentLayout,
  },
  {
    name: "SaleOrder",
    path: "/saleorder",
    component: SaleOrder,
    Layout: StudentLayout,
  },
  {
    name: "Test",
    path: "/test",
    component: Test,
    Layout: StudentLayout,
  },
];

export default StudentRouter;
