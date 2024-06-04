// khach hang

import { lazy } from "react";

const GuestLayout = lazy(() => import("~/components/Layout/GuestLayout"));
const HomeGuest = lazy(() => import("~/pages/guest/index"));
const DevPage = lazy(() => import("~/pages/guest/dev"));
const GuestRouter = [
  {
    path: "/",
    component: HomeGuest,
    Layout: GuestLayout,
  },
  {
    path: "/dev",
    component: DevPage,
    Layout: GuestLayout,
  },
];

export default GuestRouter;
