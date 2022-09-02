import React, { lazy } from "react";
import { Switch } from "react-router-dom";
import RouteWithLayout from "./components/RouteWithLayout";
import MainLayout from "./layouts/MainLayout";

const HomeView = lazy(() =>
  import(/* webpackChunkName: "homeView" */ "./pages/Home")
);
const NotFoundView = lazy(() =>
  import(/* webpackChunkName: "NotFound" */ "./pages/NotFound")
);

const AppRoutes = () => {
  return (
    <Switch>
      <RouteWithLayout
        component={HomeView}
        layout={MainLayout}
        exact
        path="/"
      />
      <RouteWithLayout
        component={HomeView}
        layout={MainLayout}
        exact
        path="/home"
      />
      <RouteWithLayout component={NotFoundView} layout={MainLayout} />
    </Switch>
  );
};

export default AppRoutes;
