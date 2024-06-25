import {
  AdminRouter,
  GuestRouter,
  StudentRouter,
  InstructorRouter,
} from "~/routes";

import React, { Fragment, Suspense, lazy } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Loading from "./components/err/loading";
const NotfoundError = lazy(() => import("~/components/err"));

function App() {
  const VerifyRoure = () => {
    return GuestRouter;
    return StudentRouter;
    return InstructorRouter;
    return AdminRouter;
  };

  return (
    <>
      <Router>
        <Suspense fallback={<Loading />}>
          <Routes>
            {VerifyRoure().map((route, index) => {
              const Layout = route.Layout === null ? Fragment : route.Layout;
              const Page = route.component;
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
