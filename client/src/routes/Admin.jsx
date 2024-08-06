// Nha si
import { lazy } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { GrUserManager } from "react-icons/gr";
import { TiHomeOutline } from "react-icons/ti";
import { IoBarChartOutline } from "react-icons/io5";
import { HiDocumentReport } from "react-icons/hi";

const AdminLayout = lazy(() => import("~/components/Layout/AdminLayout"));
const HomeAdmin = lazy(() => import("~/pages/admin/index"));
const MangerInstructorPage = lazy(() =>
  import("~/pages/admin/MangerInstructorPage")
);
const RevenuePage = lazy(() => import("~/pages/admin/RevenuePage"));
const TaxReportPage = lazy(() => import("~/pages/admin/TaxReportPage"));
const AdminRouter = [
  {
    name: "Home",
    icon: <TiHomeOutline />,
    path: "/",
    component: HomeAdmin,
    Layout: AdminLayout,
  },
  {
    name: "Manger Instructor",
    icon: <GrUserManager />,
    path: "/manger-instructor",
    component: MangerInstructorPage,
    Layout: AdminLayout,
  },
  {
    name: "Revenue",
    icon: <IoBarChartOutline />,
    path: "/revenue",
    component: RevenuePage,
    Layout: AdminLayout,
  },
  {
    name: "Tax Report",
    icon: <HiDocumentReport />,
    path: "/tax-report",
    component: TaxReportPage,
    Layout: AdminLayout,
  },
];

export default AdminRouter;
