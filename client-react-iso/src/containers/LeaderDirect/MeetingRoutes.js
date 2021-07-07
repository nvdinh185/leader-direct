import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import MeetingView from "@containers/LeaderDirect/Meeting/MeetingView";
import DrawerRoot from "@components/LeaderDirect/Drawer";
import DetailView from "@containers/LeaderDirect/Meeting/Detail/DetailView";

export default function MeetingRoutes() {
  const match = useRouteMatch();

  return (
    <>
      <Switch>
        <Route exact path={`${match.path}`} component={MeetingView} />
        <Route path={`${match.path}/:id`} component={DetailView} />
      </Switch>
      <DrawerRoot></DrawerRoot>
    </>
  );
}
