// Nha si
import { lazy } from "react";
const AdminLayout = lazy(() => import("~/components/Layout/AdminLayout"));
const HomeAdmin = lazy(() => import("~/pages/admin/index"));
const AdminRouter = [
  {
    path: "/",
    component: HomeAdmin,
    Layout: AdminLayout,
  },
];

export default AdminRouter;
