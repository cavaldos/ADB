import {
  AdminRouter,
  GuestRouter,
  StudentRouter,
  InstructorRouter,
} from "~/routes";

import { Fragment, Suspense, lazy } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Loading from "./components/err/loading";
const NotfoundError = lazy(() => import("~/components/err"));

function App() {
  const role = useSelector((state) => state.profile.Role);
  const VerifyRoure = () => {
    if (role === "Admin") return AdminRouter;
    if (role === "Instructor") return InstructorRouter;
    if (role === "Student") return StudentRouter;
    if (role === "Guest" || role === "") return GuestRouter;
    else return GuestRouter;
  };
  console.log("khanh",import.meta.env.SERVER_URL);
  return (
    <>
      <Router>
        <Suspense fallback={<Loading />}>
          <Routes>
            {VerifyRoure().map((route, index) => {
              const Layout = route.Layout === null ? Fragment : route.Layout;
              const Page =
                route.component === null ? Fragment : route.component;
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              );
            })}
            <Route
              path="*"
              element={
                <Fragment>
                  <NotfoundError />
                </Fragment>
              }
            />
          </Routes>
        </Suspense>
      </Router>
    </>
  );
}

export default App;
