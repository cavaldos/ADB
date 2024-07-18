import { lazy } from "react";
import ForumIcon from "@mui/icons-material/Forum";
import AssessmentIcon from "@mui/icons-material/Assessment";
import BuildIcon from "@mui/icons-material/Build";
import HelpIcon from "@mui/icons-material/Help";
import { name } from "@cloudinary/url-gen/actions/namedTransformation";
const InstructorLayout = lazy(() =>
  import("~/components/Layout/InstructorLayout")
);
const HomeInstructor = lazy(() => import("~/pages/instructor/index"));
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
    name: "Lesson Video",
    path: "/lesson-video",
    icon: <HelpIcon />,
    component: LessonVideo,
    Layout: InstructorLayout,
  },
  {
    name: "Lesson Document",
    path : "/lesson-document",
    icon: <HelpIcon />,
    component: LessonDocument,
    Layout: InstructorLayout,
  },
  {
    name: "Lesson Test",
    path : "/lesson-test",
    icon: <HelpIcon />,
    component: LessonTest,
    Layout: InstructorLayout,
  }
];

export default InstructorRouter;
