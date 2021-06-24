import React, { lazy, Suspense } from "react";
import { Route, Redirect, BrowserRouter as Router, Switch } from "react-router-dom";
import { useSelector } from "react-redux";

import ErrorBoundary from "./ErrorBoundary";
import { PUBLIC_ROUTE } from "./route.constants";
import Loader from "@components/utility/loader";

const Dashboard = lazy(() => import("@layouts/Dashboard/Dashboard"));

const publicRoutes = [
  {
    path: PUBLIC_ROUTE.LANDING,
    exact: true,
    component: lazy(() => import("@layouts/Pages/SignIn/SignIn")),
  },
  {
    path: PUBLIC_ROUTE.SIGN_IN,
    component: lazy(() => import("@layouts/Pages/SignIn/SignIn")),
  },
  {
    path: PUBLIC_ROUTE.PAGE_404,
    component: lazy(() => import("@layouts/Pages/404/404")),
  },
  {
    path: PUBLIC_ROUTE.PAGE_500,
    component: lazy(() => import("@layouts/Pages/500/500")),
  },
];

function PrivateRoute({ children, ...rest }) {
  const isLoggedIn = useSelector((state) => state.Auth.idToken);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLoggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default function Routes() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Loader />}>
        <Router basename="/leader-direct">
          <Switch>
            {publicRoutes.map((route, index) => (
              <Route key={index} path={route.path} exact={route.exact}>
                <route.component />
              </Route>
            ))}
            <PrivateRoute path="/app">
              <Dashboard />
            </PrivateRoute>
            <Redirect to="/signin"></Redirect>
          </Switch>
        </Router>
      </Suspense>
    </ErrorBoundary>
  );
}
