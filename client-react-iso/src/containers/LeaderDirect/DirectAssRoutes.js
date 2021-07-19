import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";

import Board from "./OrgDirectAss/Board/Board";

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
