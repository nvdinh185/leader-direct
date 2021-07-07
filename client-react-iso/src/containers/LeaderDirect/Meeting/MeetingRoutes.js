import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import MeetingView from "@containers/LeaderDirect/Meeting/MeetingView";
import DrawerRoot from "@components/LeaderDirect/Drawer";
import MeetingDetail from "@containers/LeaderDirect/Meeting/MeetingDetail";

export default function MeetingRoutes() {
  const match = useRouteMatch();

  return (
    <>
      <Switch>
        <Route exact path={`${match.path}`} component={MeetingView} />
        <Route path={`${match.path}/:id`} component={MeetingDetail} />
      </Switch>
      <DrawerRoot></DrawerRoot>
    </>
  );
}
