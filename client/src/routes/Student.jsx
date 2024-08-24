import { lazy } from "react";
const StudentLayout = lazy(() => import("~/components/Layout/StudentLayout"));
const HomeStudent = lazy(() => import("~/pages/student/index"));
const SearchCourse = lazy(() => import("~/pages/student/SearchCourse.page"));
const CourseDetail = lazy(() => import("~/pages/student/CourseDetail.page"));
const Cart = lazy(() => import("~/pages/student/Cart.page"));
const Learning = lazy(() => import("~/pages/student/LearningPage"));
const LearnProcess = lazy(() => import("~/pages/student/LearnProcess.page"));
const Invoice = lazy(() => import("~/pages/student/Invoice.page"));
const Profile = lazy(() => import("~/components/Profile/Profile"));
const ChatPage = lazy(() => import("~/pages/student/ChatPage"));
const ProfileLayout = lazy(() => import("~/components/Layout/ProfileLayout"));

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
    name: "Invoice",
    path: "/invoice",
    component: Invoice,
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
    name: null,
    path: "/learn-process/:learnProcessID",
    component: LearnProcess,
    Layout: StudentLayout,
  },
  {
    name: null,
    path: "/search/:search",
    component: SearchCourse,
    Layout: StudentLayout,
  },
  {
    name: null,
    path: "/course-detail/:courseID",
    component: CourseDetail,
    Layout: StudentLayout,
  },
  {
    name: null,
    path: "/profile",
    component: Profile,
    Layout: ProfileLayout,
  },
  {
    name: null,
    path: "/chat",
    component: ChatPage,
    Layout: StudentLayout,
  },
  {
    name: null,
    path: "/chat/:chatID",
    component: ChatPage,
    Layout: StudentLayout,
  },
];

export default StudentRouter;
