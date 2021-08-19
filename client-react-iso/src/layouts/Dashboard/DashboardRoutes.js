import React, { lazy, Suspense } from "react";
import { Route, useRouteMatch, Switch } from "react-router-dom";
import Loader from "@components/utility/loader";
import DrawerRoot from "@components/DrawerRoot";
import ModalRoot from "@components/ModalRoot";

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
    path: "admin-group",
    component: lazy(() => import("@containers/Admin/AdminGroup/AdminGroup")),
  },
  {
    path: "admin-category",
    component: lazy(() => import("@containers/Admin/AdminCategory/AdmCategory")),
  },
  {
    path: "leader-meeting",
    component: lazy(() => import("@containers/LeaderDirect/MeetingRoutes")),
  },
  {
    path: "leader-direct-mng",
    component: lazy(() => import("@containers/LeaderDirect/DirectRoutes")),
  },
  {
    path: "leader-direct-criteria",
    component: lazy(() => import("@containers/LeaderDirect/OrgDeadCrit/OrgDeadCrit")),
  },
  {
    path: "leader-direct-assess",
    component: lazy(() => import("@containers/LeaderDirect/DirectAssRoutes")),
  },
  {
    path: "leader-direct-organization",
    component: lazy(() => import("@containers/LeaderDirect/OrgDirectRoutes")),
  },
  {
    path: "blank-page",
    component: lazy(() => import("@containers/BlankPage")),
  },
  {
    path: "rp-direct",
    component: lazy(() => import("@containers/Report/DirectReport")),
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
      <DrawerRoot></DrawerRoot>
      <ModalRoot></ModalRoot>
    </Suspense>
  );
}
