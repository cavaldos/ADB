import { lazy } from "react";
const GuestLayout = lazy(() => import("~/components/Layout/GuestLayout"));

const HomeGuest = lazy(() => import("~/pages/guest/index"));
const SignIn = lazy(() => import("~/pages/auth/signIn"));
const SignUp = lazy(() => import("~/pages/auth/signUp"));
const VisaPage = lazy(() => import("~/pages/guest/visapage"));
const Bank = lazy(() => import("~/pages/guest/BankAccount"));
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
    name: "bank",
    path: "/bank",
    component: Bank,
    Layout: GuestLayout,
  },
  {
    name: "Visa",
    path: "/visa",
    component: VisaPage,
    Layout: GuestLayout,
  },
];

export default GuestRouter;
