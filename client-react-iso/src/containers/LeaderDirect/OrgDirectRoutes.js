import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";

import Board from "./OrgDirect/Board/Board";
import BoardLists from "./OrgDirect/Board/BoardList/BoardList";

export default function ScrumBoard() {
  const match = useRouteMatch();
  return (
    <>
      <Switch>
        <Route exact path={`${match.path}`} component={Board} />
        {/* <Route path={`${match.path}/:id`} component={Board} /> */}
      </Switch>
    </>
  );
}
