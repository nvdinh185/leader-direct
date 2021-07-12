import React, { Fragment } from "react";
import { Card, Badge, Popconfirm, Tooltip } from "antd";
import moment from "moment";
import { IconSvg } from "@components/ScrumBoard/IconSvg/IconSvg";
import { HrBar, CardFooter, CardBody } from "../Task.style";
import ClockIcon from "@assets/images/icon/17.svg";
import plus from "@assets/images/icon/24.svg";
import CommentsIcon from "@assets/images/icon/09-icon.svg";
import AttachmentIcon from "@assets/images/icon/01-icon.svg";
import { CardAttachment, CardComment, FooterLeft, CardTitle, CardIcon } from "./TaskCard.style";

const TaskCard = ({ task, showDrawer }) => {
  const CardHeader = (
    <div style={{ display: "flex", alignItems: "center" }}>
      <CardIcon src={ClockIcon} alt="Clock Icon" mr={10} />
      {moment(task.created_at).format("ddd d")}
    </div>
  );
  return (
    <Card
      style={{
        width: "100%",
        borderRadius: "10px",
        backgroundColor: "#ffffff",
      }}
      bodyStyle={{ padding: 0 }}
      headStyle={{ borderBottom: "none", fontSize: 13, color: "#788195", padding: "0 15px" }}
      bordered={false}
      title={CardHeader}
      size="small"
    >
      <CardBody onClick={showDrawer}>
        <CardTitle>{task.title}</CardTitle>
        {task.labels.map((label) => (
          <Badge key={label} status={label} />
        ))}
      </CardBody>
      <HrBar />
      <CardFooter>
        <FooterLeft>
          <CardAttachment>
            <CardIcon src={AttachmentIcon} mr={5} />0
          </CardAttachment>
          <CardComment>
            <CardIcon src={CommentsIcon} mr={5} />0
          </CardComment>
        </FooterLeft>
        <span style={{ display: "flex" }}>
          {task.assignees.map((assignee) => (
            <Fragment key={assignee}>
              <Tooltip title="Please Implements Your Own Assigne Methods" placement="bottomRight">
                <IconSvg src={plus} radius="10% 50% 50%" mr={"0"} ml={8} width={17} height={17} />
              </Tooltip>
            </Fragment>
          ))}
        </span>
      </CardFooter>
    </Card>
  );
};
export default TaskCard;
