import { lazy } from "react";
import ForumIcon from "@mui/icons-material/Forum";
import { GoDiscussionClosed } from "react-icons/go";
import BuildIcon from "@mui/icons-material/Build";
import HelpIcon from "@mui/icons-material/Help";
import { SiCoursera } from "react-icons/si";

const InstructorLayout = lazy(() =>
  import("~/components/Layout/InstructorLayout")
);
const NewCourse = lazy(() => import("~/pages/instructor/NewCourse"));

const HomeInstructor = lazy(() => import("~/pages/instructor/index"));
const Profile = lazy(() => import("~/components/Profile/Profile"));
const RevenuePage = lazy(() => import("~/pages/instructor/RevenuePage"));
const MyCourse = lazy(() => import("~/pages/instructor/MyCourse"));
const CreateLesson = lazy(() => import("~/pages/instructor/CreateLesson"));
const Discussion = lazy(() => import("~/pages/instructor/Discussion"));
const CourseDetail = lazy(() => import("~/pages/instructor/CourseDetail"));
const InstructorRouter = [
  {
    name: null,
    path: "/profile",
    icon: null,
    component: Profile,
    Layout: InstructorLayout,
  },
  {
    name: null,
    path: "/revenue",
    icon: null,
    component: RevenuePage,
    Layout: InstructorLayout,
  },

  {
    name: null,
    path: "/new-course",
    icon: null,
    component: NewCourse,
    Layout: InstructorLayout,
  },
  {
    name: null,
    path: "/new-course/:courseID/create-lesson/:lessonID",
    icon: null,
    component: CreateLesson,
    Layout: InstructorLayout,
  },
  {
    name: null,
    path: "/new-course/:courseID/create-lesson/",
    icon: null,
    component: CreateLesson,
    Layout: InstructorLayout,
  },
  {
    name: "Course Detail",
    path: "/course-detail/:courseID",
    icon: <SiCoursera />,
    component: CourseDetail,
    Layout: InstructorLayout,
  },
  {
    name: "Home",
    icon: <ForumIcon />,
    path: "/",
    component: HomeInstructor,
    Layout: InstructorLayout,
  },
  {
    name: "Mananger My Course",
    path: "/manager-my-course",
    icon: <BuildIcon />,
    component: MyCourse,
    Layout: InstructorLayout,
  },
  {
    name: "Discussion",
    path: "/discussion",
    icon: <GoDiscussionClosed className=" text-2xl" />,
    component: Discussion,
    Layout: InstructorLayout,
  },
  {
    name: null,
    path: "/discussion/:discussionID",
    icon: null,
    component: Discussion,
    Layout: InstructorLayout,
  },
  {
    name: "Create Bank Account",
    path: "/create-bank-account",
    icon: <HelpIcon />,
    component: MyCourse,
    Layout: InstructorLayout,
  },
];

export default InstructorRouter;
