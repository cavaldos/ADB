import { lazy } from "react";
const GuestLayout = lazy(() => import("~/components/Layout/GuestLayout"));

const HomeGuest = lazy(() => import("~/pages/guest/index"));
// const SignIn = lazy(() => import("~/pages/guest/signin"));
// const SignUp = lazy(() => import("~/pages/guest/signup"));
import SignIn from "../pages/guest/login";

import SignUp from "../pages/guest/register";
const SearchCourse = lazy(() => import("~/pages/guest/SearchCourse"));
const CourseDetail = lazy(() => import("~/pages/guest/CourseDetail.page"));
const GuestRouter = [
  {
    name: "Home",
    path: "/",
    component: HomeGuest,
    Layout: GuestLayout,
  },
  {
    name: "Sign In",
    path: "/signin",
    component: SignIn,
    Layout: GuestLayout,
  },
  {
    name: "Sign Up",
    path: "/signup",
    component: SignUp,
    Layout: GuestLayout,
  },

  {
    name: null,
    path: "/search/:search",
    component: SearchCourse,
    Layout: GuestLayout,
  },

  {
    name: null,
    path: "/course-detail/:courseID",
    component: CourseDetail,
    Layout: GuestLayout,
  },
];

export default GuestRouter;
