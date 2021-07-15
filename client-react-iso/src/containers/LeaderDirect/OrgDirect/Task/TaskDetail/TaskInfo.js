import React from "react";
import { Row, Col, Tag, Space } from "antd";
import moment from "moment";
import HeadingWithIcon from "@components/LeaderDirect/HeadingWithIcon";
import Clock from "@assets/images/icon/17.svg";
import { ClockIcon } from "@containers/LeaderDirect/Meeting/Meeting.style";
import DescriptionIcon from "@assets/images/icon/06-icon.svg";

export default function TaskInfo({ task, taskType }) {
  return (
    <>
      <Row>
        <HeadingWithIcon heading={"Nội Dung"} iconSrc={DescriptionIcon} />
        <Col span={24}>
          <p style={{ color: "grey" }}>{task.task.title}</p>
        </Col>
        <Col span={8}>
          <HeadingWithIcon heading="Lịch Sử Xử Lý" />
          <p>{task.task.comments.length}</p>
        </Col>
        <Col span={8}>
          <HeadingWithIcon heading="Phân Loại" />
          <p>
            <Tag color={taskType?.bg_color}>{taskType?.name}</Tag>
          </p>
        </Col>
        <Col span={8}>
          <HeadingWithIcon heading="Ngày Tạo" />
          <Space>
            <ClockIcon src={Clock} />
            <p style={{ color: "grey" }}>{moment(task.task.created_at).format("DD/MM/YYYY HH:mm")}</p>
          </Space>
        </Col>
      </Row>
    </>
  );
}
