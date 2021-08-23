import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getFilterDirectAssLogs, getFilterDirectExe } from "@redux/directAsses/actions";
import drawerActions from "@redux/drawer/actions";

import { Divider, Space } from "antd";
import { LeftCircleOutlined } from "@ant-design/icons";

import LayoutWrapper from "@components/utility/layoutWrapper";
import TaskHistory from "./TaskDetail/TaskHistory";
import TaskInfo from "./TaskDetail/TaskInfo";
import TaskAttachs from "./TaskDetail/TaskAttachs";
import OrgCritInfo from "../OrgDeadCrit/OrgCritInfo";

export default function TaskDetail(props) {
  const token = useSelector((state) => state.Auth.idToken);
  const userInfo = useSelector((state) => state.Auth.grantedUserInfo);
  const organizations = useSelector((state) => state.adminUser.organizations);
  const histories = useSelector((state) => state.directOrgs.directExeDos);
  const directs = useSelector((state) => state.directOrgs.directs);
  const exeTypes = useSelector((state) => state.filterData.exeTypes);
  const directTypes = useSelector((state) => state.filterData.directTypes);
  const exeHistories = useSelector((state) => state.directAsses.directExes);
  const assLogs = useSelector((state) => state.directAsses.directAssLogs);
  const dispatch = useDispatch();

  const [currentDirect, setCurrentDirect] = useState();
  const [taskHistory, setTaskHistory] = useState();
  const [taskType, setTaskType] = useState();

  useEffect(() => {
    if (props.task && directs?.[0] && directTypes?.[0]) {
      let foundDirect = directs.find((d) => d.uuid === props.task.direct_uuid);
      let taskType = directTypes.find((di) => di.id === foundDirect.category);
      setCurrentDirect(foundDirect);
      setTaskType(taskType);
    }
  }, [props.task, directs, directTypes]);

  // Effect để lấy ra thông tin history của task này
  useEffect(() => {
    if (histories?.[0]) {
      let taskHis = histories.filter((his) => his.direct_org_uuid === props.task.id);
      setTaskHistory(taskHis);
    }
  }, [histories]);

  // Effect để lấy lịch sử xử lý của chỉ đạo này
  useEffect(() => {
    if (props.task) {
      dispatch(getFilterDirectExe(token, { direct_uuid: props.task.direct_uuid, organization_id: props.task.organization_id }));
      dispatch(
        getFilterDirectAssLogs(token, {
          // direct_uuid: props.task.direct_uuid,
          direct_org_uuid: props.task.id,
          organization_exe: props.task.organization_id,
          // organization_ass: props.task.organization_id,
        })
      );
    }
  }, [props.task]);

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
      <TaskInfo task={{ ...props }} taskType={taskType} currentDirect={currentDirect}></TaskInfo>
      <Divider style={{ margin: "10px" }}></Divider>
      <TaskAttachs task={props.task}></TaskAttachs>
      <Divider style={{ margin: "10px" }}></Divider>
      <OrgCritInfo isInDrawer={true} currentDirect={currentDirect}></OrgCritInfo>
      <TaskHistory
        assLogs={assLogs}
        histories={exeHistories}
        exeTypes={exeTypes}
        task={props.task}
        organizations={organizations}
        userInfo={userInfo}
      ></TaskHistory>
    </LayoutWrapper>
  );
}
