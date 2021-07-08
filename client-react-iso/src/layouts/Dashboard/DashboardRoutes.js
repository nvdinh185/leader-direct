import React, { lazy, Suspense } from "react";
import { Route, useRouteMatch, Switch } from "react-router-dom";
import Loader from "@components/utility/loader";

const routes = [
  {
    path: "",
    component: lazy(() => import("@containers/Widgets/Widgets")),
    exact: true,
  },
  {
    path: "dashboard",
    component: lazy(() => import("@containers/Widgets/Widgets")),
  },
  {
    path: "admin-menu",
    component: lazy(() => import("@containers/Admin/AdminMenu/AdminMenu")),
  },
  {
    path: "admin-organization",
    component: lazy(() => import("@containers/Admin/AdminOrg/AdminOrg")),
  },
  {
    path: "admin-user",
    component: lazy(() => import("@containers/Admin/AdminUser/AdminUser")),
  },
  {
    path: "admin-group-user",
    component: lazy(() => import("@containers/Admin/AdminGroup/AdminGroup")),
  },
  {
    path: "admin-category",
    component: lazy(() => import("@containers/Admin/AdminCategory/AdmCategory")),
  },
  {
    path: "leader-meeting",
    component: lazy(() => import("@containers/LeaderDirect/Meeting/MeetingLayout")),
  },
  {
    path: "leader-direct-mng",
    component: lazy(() => import("@components/GridListLayout/Example")),
  },
  {
    path: "leader-direct-history",
    component: lazy(() => import("@containers/LeaderDirect/DirectHistory/DirectHistory")),
  },
  {
    path: "leader-direct-organization",
    component: lazy(() => import("@containers/LeaderDirect/OrgDirect/OrgDirect")),
  },
  {
    path: "scrum-board",
    component: lazy(() => import("@containers/ScrumBoard")),
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
