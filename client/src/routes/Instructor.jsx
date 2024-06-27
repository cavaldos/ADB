
import { lazy } from "react";
const InstructorLayout = lazy(() => import("~/components/Layout/InstructorLayout"));
const HomeInstructor= lazy(() => import("~/pages/instructor/index"));
import ForumIcon from "@mui/icons-material/Forum";
import AssessmentIcon from "@mui/icons-material/Assessment";
import BuildIcon from "@mui/icons-material/Build";
import HelpIcon from "@mui/icons-material/Help";

const InstructorRouter = [
  {
    name: "Home",
    icon : <ForumIcon />,
    path: "/",
    component: HomeInstructor,
    Layout: InstructorLayout,
  },
  {
    name: "sdsdfsdf",
    path: "/2",
    icon : <AssessmentIcon />,
    component: HomeInstructor,
    Layout: InstructorLayout,
  },
  {
    name: "Build",
    path: "/4",
    icon : <BuildIcon />,
    component: HomeInstructor,
    Layout: InstructorLayout,
  },
];

export default InstructorRouter;
