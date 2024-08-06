import { lazy } from "react";
import ForumIcon from "@mui/icons-material/Forum";
import AssessmentIcon from "@mui/icons-material/Assessment";
import BuildIcon from "@mui/icons-material/Build";
import HelpIcon from "@mui/icons-material/Help";
const InstructorLayout = lazy(() =>
  import("~/components/Layout/InstructorLayout")
);
const HomeInstructor = lazy(() => import("~/pages/instructor/index"));
const Profile = lazy(() => import("~/components/Profile/Profile"));
const RevenuePage = lazy(() => import("~/pages/instructor/RevenuePage"));
const MyCourse = lazy(() => import("~/pages/instructor/MyCourse"));
const CreateCourse = lazy(() => import("~/pages/instructor/CreateCourse"));
const LessonVideo = lazy(() => import("~/pages/instructor/LessonVideo"));
const LessonDocument = lazy(() => import("~/pages/instructor/LessonDocument"));
const LessonTest = lazy(() => import("~/pages/instructor/LessonTest"));
const InstructorRouter = [
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
    name: "Create Course",
    path: "/create-course",
    icon: <AssessmentIcon />,
    component: CreateCourse,
    Layout: InstructorLayout,
  },
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
    path: "/create-course/lesson-video",
    icon: null,
    component: LessonVideo,
    Layout: InstructorLayout,
  },
  {
    name: null,
    path: "/create-course/lesson-document",
    icon: null,
    component: LessonDocument,
    Layout: InstructorLayout,
  },
  {
    name: null,
    path: "/create-course/lesson-test",
    icon: null,
    component: LessonTest,
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
