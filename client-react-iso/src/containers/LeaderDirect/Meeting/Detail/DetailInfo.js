import React from "react";
import moment from "moment";
import { Col, Row, Tag } from "antd";
import HeadingWithIcon from "@components/LeaderDirect/HeadingWithIcon";
import TitleIcon from "@assets/images/icon/05-icon.svg";
import DescriptionIcon from "@assets/images/icon/06-icon.svg";
import Clock from "@assets/images/icon/17.svg";
import { TaskDescription, ClockIcon } from "@containers/LeaderDirect/Meeting/Meeting.style";

export default function DetailInfo(props) {
  return (
    <>
      <HeadingWithIcon heading={props.meeting?.name} iconSrc={TitleIcon} />
      <Row>
        <Col span={8}>
          <HeadingWithIcon heading="Số Lượng Chỉ Đạo" />
          <p>{props.meeting.directs ? JSON.parse(props.meeting.directs).length : 0}</p>
        </Col>
        <Col span={8}>
          <HeadingWithIcon heading="Phân Loại" />
          <p>
            <Tag color={"geekblue"}>{props.meeting.category}</Tag>
          </p>
        </Col>
        <Col span={8}>
          <HeadingWithIcon heading="Ngày Tạo" />
          <ClockIcon src={Clock} />
          {moment(props.meeting.created_time).format("DD/MM/YYYY HH:mm")}
        </Col>
      </Row>
      <div style={{ clear: "both", paddingTop: "10px" }}>
        <HeadingWithIcon heading="Mô Tả" iconSrc={DescriptionIcon} />
        <TaskDescription>{props.meeting.description}</TaskDescription>
      </div>
    </>
  );
}
