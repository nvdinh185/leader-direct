import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import drawerActions from "@redux/drawer/actions";

import { Divider, Space } from "antd";
import { LeftCircleOutlined } from "@ant-design/icons";

import LayoutWrapper from "@components/utility/layoutWrapper";
import TaskHistory from "./TaskDetail/TaskHistory";
import TaskInfo from "./TaskDetail/TaskInfo";
import TaskAttachs from "./TaskDetail/TaskAttachs";

export default function TaskDetail(props) {
  const [taskType, setTaskType] = useState();
  const histories = useSelector((state) => state.directOrgs.directExeDos);
  const exeTypes = useSelector((state) => state.filterData.exeTypes);
  const directTypes = useSelector((state) => state.filterData.directTypes);
  const dispatch = useDispatch();

  const [taskHistory, setTaskHistory] = useState();

  // Effect để lấy ra thông tin history của task này
  useEffect(() => {
    if (histories?.[0]) {
      let taskHis = histories.filter((his) => his.direct_org_uuid === props.task.id);
      setTaskHistory(taskHis);
    }
  }, [histories]);

  // Effect để lấy thông tin loại chỉ đạo ()
  useEffect(() => {
    if (directTypes?.[0]) {
      let taskType = directTypes.find((di) => di.id === props.task.category);
      setTaskType(taskType);
    }
  }, [directTypes]);

  return (
    <LayoutWrapper>
      <Space>
        <LeftCircleOutlined
          onClick={() => dispatch(drawerActions.closeDrawer())}
          style={{ color: "grey", fontSize: "30px", paddingRight: "10px" }}
        />
        <h2 style={{ color: "grey" }}>Thông Tin Chi Tiết Chỉ Đạo</h2>
      </Space>
      <Divider style={{ margin: "10px 0" }}></Divider>
      <TaskInfo task={{ ...props }} taskType={taskType}></TaskInfo>
      <Divider style={{ margin: "10px" }}></Divider>
      <TaskAttachs task={props.task}></TaskAttachs>
      <Divider style={{ margin: "10px" }}></Divider>
      <TaskHistory exeTypes={exeTypes} task={props.task} histories={taskHistory}></TaskHistory>
    </LayoutWrapper>
  );
}
