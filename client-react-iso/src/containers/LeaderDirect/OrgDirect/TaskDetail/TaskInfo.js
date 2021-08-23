import React from "react";
import { Row, Col, Tag, Space } from "antd";
import moment from "moment";
import HeadingWithIcon from "@components/ScrumBoard/HeadingWithIcon";
import Clock from "@assets/images/icon/17.svg";
import { returnHexColor } from "@lib/utils/string";
import { ClockIcon } from "@containers/LeaderDirect/Meeting/Meeting.style";
import DescriptionIcon from "@assets/images/icon/06-icon.svg";

export default function TaskInfo({ task, taskType, currentDirect }) {
  console.log(taskType);
  return (
    <>
      <Row>
        <HeadingWithIcon heading={"Nội Dung"} iconSrc={DescriptionIcon} />
        <Col span={24}>
          <p style={{ color: "grey" }}>{currentDirect?.description}</p>
        </Col>
        <Col span={6}>
          <HeadingWithIcon heading="Lịch Sử Xử Lý" />
          <p>{task.task.comments.length}</p>
        </Col>
        <Col span={6}>
          <HeadingWithIcon heading="Phân Loại" />
          <p>
            <Tag color={returnHexColor(taskType?.bg_color)}>{taskType?.name}</Tag>
          </p>
        </Col>
        <Col span={6}>
          <HeadingWithIcon heading="Ngày Tạo" />
          <Space>
            <ClockIcon src={Clock} />
            <p style={{ color: "grey" }}>{moment(task.task.created_at).format("DD/MM/YYYY")}</p>
          </Space>
        </Col>
        <Col span={6}>
          <HeadingWithIcon heading="Hạn Hoàn Thành" />
          <Space>
            <ClockIcon src={Clock} />
            <p style={{ color: "grey" }}>{moment(task.task.due_date).format("DD/MM/YYYY")}</p>
          </Space>
        </Col>
      </Row>
    </>
  );
}
