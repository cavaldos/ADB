// Nha si
import { lazy } from "react";
const AdminLayout = lazy(() => import("~/components/Layout/AdminLayout"));
const HomeAdmin = lazy(() => import("~/pages/admin/index"));
import MenuIcon from "@mui/icons-material/Menu";

const AdminRouter = [
  {
    name: "Home",
    icon: <MenuIcon />,
    path: "/",
    component: HomeAdmin,
    Layout: AdminLayout,
  },
  {
    name: "Home2",
    icon: <MenuIcon />,
    path: "/2",
    component: HomeAdmin,
    Layout: AdminLayout,
  },
];

export default AdminRouter;

