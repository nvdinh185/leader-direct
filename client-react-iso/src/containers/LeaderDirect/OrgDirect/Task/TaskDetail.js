import React from "react";
import TaskHistory from "./TaskDetail/TaskHistory";
import TaskInfo from "./TaskDetail/TaskInfo";
import { Divider } from "antd";

export default function TaskDetail(props) {
  console.log(props);
  return (
    <>
      <Divider></Divider>
      <TaskInfo></TaskInfo>
      <Divider></Divider>
      <TaskHistory task={{ ...props }}></TaskHistory>
    </>
  );
}
