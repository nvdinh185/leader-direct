import React, { lazy, Suspense } from "react";
import { Route, useRouteMatch, Switch } from "react-router-dom";
import Loader from "@components/utility/loader";

const routes = [
  {
    path: "dashboard",
    component: lazy(() => import("@containers/Widgets/Widgets")),
    exact: true,
  },
  {
    path: "admin-menu",
    component: lazy(() => import("@containers/Admin/AdminMenu/AdminMenu")),
    exact: true,
  },
  {
    path: "admin-organization",
    component: lazy(() => import("@containers/Admin/AdminOrg/AdminOrg")),
    exact: true,
  },
  {
    path: "admin-user",
    component: lazy(() => import("@containers/Admin/AdminUser/AdminUser")),
    exact: true,
  },
  {
    path: "admin-group-user",
    component: lazy(() => import("@containers/Admin/AdminGroup/AdminGroup")),
    exact: true,
  },
  {
    path: "scrum-board",
    component: lazy(() => import("@containers/ScrumBoard")),
    exact: false,
  },
  {
    path: "blank-page",
    component: lazy(() => import("@containers/BlankPage")),
  },
];

export default function AppRouter(props) {
  const { url } = useRouteMatch();
  return (
    <Suspense fallback={<Loader />}>
      <Switch>
        {routes.map((route, idx) => (
          <Route exact={route.exact} key={idx} path={`${url}/${route.path}`}>
            <route.component />
          </Route>
        ))}
      </Switch>
    </Suspense>
  );
}
