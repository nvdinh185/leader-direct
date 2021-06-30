import React from "react";
import moment from "moment";

export default function DateCell(props) {
  let dateToDisplay = new Date(props.date);
  if (props.format === "DD/MM/YYYY HH:mm:ss" && !props.collectData) {
    let newDate = props.date.split(" ")[0].split("/");
    dateToDisplay = new Date(newDate[2], newDate[1] - 1, newDate[0], props.date.split(" ")[1], 0, 0, 0);
  }

  return <>{props.date ? moment(dateToDisplay).format(props.format ? props.format : "DD/MM/YYYY") : null}</>;
}
