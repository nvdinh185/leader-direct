import React from "react";
import { Switch, Route, useRouteMatch, useLocation, useHistory } from "react-router-dom";

export default function MeetingDetail(props) {
  const match = useRouteMatch();
  const history = useHistory();

  console.log(match, history);

  return <div>Meeting Detail ${}</div>;
}
