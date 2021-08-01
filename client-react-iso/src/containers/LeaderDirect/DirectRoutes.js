import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import DirectLayout from "@containers/LeaderDirect/Direct/DirectLayout";
import DirectDetailView from "@containers/LeaderDirect/Direct/Detail/DirectDetailView";
import { Suspense } from "react";

export default function MeetingRoutes() {
  const match = useRouteMatch();

  return (
    <>
      <Suspense fallback={DirectLayout}>
        <Switch>
          <Route exact path={`${match.path}`} key={`${match.path}`} component={DirectLayout} />
          <Route exact path={`${match.path}/:id`} key={`${match.path}/id`} component={DirectDetailView} />
        </Switch>
      </Suspense>
    </>
  );
}
