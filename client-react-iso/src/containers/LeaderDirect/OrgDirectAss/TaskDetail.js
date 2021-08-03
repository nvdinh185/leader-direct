import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import drawerActions from "@redux/drawer/actions";

import { Divider, Space } from "antd";
import { LeftCircleOutlined } from "@ant-design/icons";

import LayoutWrapper from "@components/utility/layoutWrapper";
import TaskInfo from "./TaskDetail/TaskInfo";
import TaskAttachs from "./TaskDetail/TaskAttachs";
import OrgCritInfo from "../OrgDeadCrit/OrgCritInfo";
import TaskAssessHistory from "./TaskDetail/TaskAssessHistory";
import { getFilterDirectExe } from "@redux/directAsses/actions";

export default function TaskDetail(props) {
  const token = useSelector((state) => state.Auth.idToken);
  const exeHistories = useSelector((state) => state.directAsses.directExes);
  const directs = useSelector((state) => state.directAsses.directs);
  const exeTypes = useSelector((state) => state.filterData.exeTypes);
  const directTypes = useSelector((state) => state.filterData.directTypes);
  const dispatch = useDispatch();

  const [currentDirect, setCurrentDirect] = useState();
  const [taskType, setTaskType] = useState();

  // Effect để lấy lịch sử xử lý của chỉ đạo này
  useEffect(() => {
    if (props.task) {
      dispatch(getFilterDirectExe(token, { direct_uuid: props.task.direct_uuid, organization_id: props.task.organization_exe }));
    }
  }, [props.task]);

  // Props để set direct hiện tại được sử dụng
  useEffect(() => {
    if (props.task && directs?.[0] && directTypes?.[0]) {
      let foundDirect = directs.find((d) => d.uuid === props.task.direct_uuid);
      let taskType = directTypes.find((di) => di.id === foundDirect.category);
      setTaskType(taskType);
      setCurrentDirect(foundDirect);
    }
  }, [props.task, directs, directTypes]);

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
      <TaskInfo currentDirect={currentDirect} task={{ ...props }} taskType={taskType} exeHistories={exeHistories}></TaskInfo>
      <Divider style={{ margin: "10px" }}></Divider>
      <TaskAttachs task={props.task}></TaskAttachs>
      <Divider style={{ margin: "10px" }}></Divider>
      <OrgCritInfo isInDrawer={true} currentDirect={currentDirect}></OrgCritInfo>
      <TaskAssessHistory task={props.task} taskType={taskType} exeTypes={exeTypes}></TaskAssessHistory>
    </LayoutWrapper>
  );
}
