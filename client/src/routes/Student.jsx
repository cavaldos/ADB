// khach hang

import { lazy } from "react";

const StudentLayout = lazy(() => import("~/components/Layout/StudentLayout"));
const HomeStudent = lazy(() => import("~/pages/student/index"));
const SearchCourse = lazy(() => import("~/pages/student/SearchCourse.page"));
const CourseDetail = lazy(() => import("~/pages/student/CourseDetail.page"));
const Cart = lazy(() => import("~/pages/student/Cart.page"));
const Learning = lazy(() => import("~/pages/student/Learning.page"));
const LearnProcess = lazy(() => import("~/pages/student/LearnProcess.page"));
const Invoice = lazy(() => import("~/pages/student/Invoice.page"));
const Profile = lazy(() => import("~/components/Profile/Profile"));

const BankAccount = lazy(() => import("~/pages/guest/BankAccount"));
import Test from "../components/Test";
const StudentRouter = [
  {
    name: "Home",
    path: "/",
    component: HomeStudent,
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
    name: "LearnProcess",
    path: "/learn-process",
    component: LearnProcess,
    Layout: StudentLayout,
  },
  {
    name: "Invoice",
    path: "/invoice",
    component: Invoice,
    Layout: StudentLayout,
  },
  {
    name: null,
    path: "/bank",
    component: BankAccount,
    Layout: null,
  },
  {
    name: null,
    path: "/search/:search",
    component: SearchCourse,
    Layout: StudentLayout,
  },
  {
    name: null,
    path: "/course-detail/:id",
    component: CourseDetail,
    Layout: StudentLayout,
  },
  {
    name: null,
    path: "/profile",
    component: Profile,
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
