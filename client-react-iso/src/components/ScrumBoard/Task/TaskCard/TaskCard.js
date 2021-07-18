import React from "react";
import moment from "moment";
import { Card, Badge, Popconfirm, Tooltip } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import ClockIcon from "@assets/images/icon/17.svg";
import CommentsIcon from "@assets/images/icon/09-icon.svg";
import AttachmentIcon from "@assets/images/icon/01-icon.svg";
import { HrBar, CardFooter, CardBody } from "../Task.style";
import {
  CardAttachment,
  CardComment,
  FooterLeft,
  CardTitle,
  CardIcon,
  TaskCardWrapper,
  TaskCardTopMostDiv,
  RibbonCornerBlue,
} from "./TaskCard.style";

const TaskCard = ({ task, showDrawer, isChanged }) => {
  return (
    <TaskCardWrapper>
      <Card
        style={{
          width: "100%",
          borderRadius: "10px",
          backgroundColor: "#ffffff",
          // boxShadow: "0 0 4px rgba(0,0,0,0.15)",
        }}
        bodyStyle={{ padding: 0 }}
        headStyle={{ borderBottom: "none", fontSize: 13, color: "#788195", padding: "0 15px" }}
        bordered={false}
        size="small"
      >
        <TaskCardTopMostDiv></TaskCardTopMostDiv>
        {isChanged ? <RibbonCornerBlue>Có Thay Đổi</RibbonCornerBlue> : null}
        <CardBody style={{ backgroundColor: isChanged ? "grey" : "" }} onClick={showDrawer}>
          <Tooltip title={task.title}>
            <CardTitle>{task.title}</CardTitle>
          </Tooltip>
        </CardBody>
        <div onClick={showDrawer} style={{ display: "flex", alignItems: "center", marginLeft: "15px", color: "grey" }}>
          <CardIcon src={ClockIcon} alt="Clock Icon" mr={10} />
          <p style={{ fontSize: "11px" }}>{moment(task.created_at).format("DD/MM/YYYY")}</p>
        </div>
        <HrBar />
        <CardFooter>
          <FooterLeft>
            <CardAttachment>
              <CardIcon src={AttachmentIcon} mr={5} />
              {task.attachments.length}
            </CardAttachment>
            <CardComment>
              <CardIcon src={CommentsIcon} mr={5} />
              {task.comments.length}
            </CardComment>
          </FooterLeft>
          <span style={{ display: "flex" }}>
            <SettingOutlined style={{ fontSize: "18px", color: "grey", opacity: "0.6" }}></SettingOutlined>
          </span>
        </CardFooter>
      </Card>
    </TaskCardWrapper>
  );
};
export default TaskCard;
