import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import MeetingLayout from "@containers/LeaderDirect/Meeting/MeetingLayout";
import DetailView from "@containers/LeaderDirect/Meeting/Detail/DetailView";

export default function MeetingRoutes() {
  const match = useRouteMatch();

  return (
    <>
      <Switch>
        <Route exact path={`${match.path}`} component={MeetingLayout} />
        <Route path={`${match.path}/:id`} component={DetailView} />
      </Switch>
    </>
  );
}
