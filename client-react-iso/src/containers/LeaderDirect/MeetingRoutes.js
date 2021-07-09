import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import MeetingLayout from "@containers/LeaderDirect/Meeting/MeetingLayout";
import DetailView from "@containers/LeaderDirect/Meeting/Detail/DetailView";
import { Suspense } from "react";

export default function MeetingRoutes() {
  const match = useRouteMatch();

  return (
    <>
      <Suspense fallback={<MeetingLayout />}>
        <Switch>
          <Route exact path={`${match.path}`} key={`${match.path}`} component={MeetingLayout} />
          <Route exact path={`${match.path}/:id`} key={`${match.path}/id`} component={DetailView} />
        </Switch>
      </Suspense>
    </>
  );
}
