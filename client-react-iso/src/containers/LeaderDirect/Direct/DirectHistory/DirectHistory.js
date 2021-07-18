import React from "react";
import { Col, Row } from "antd";
import TitleIcon from "@assets/images/icon/17.svg";
import HeadingWithIcon from "@components/ScrumBoard/HeadingWithIcon";

export default function DirectHistory() {
  return (
    <>
      <HeadingWithIcon heading={"Thực Hiện Từng Đơn Vị"} iconSrc={TitleIcon} />
      <Row>
        <Col span={24}>{/* TODO: Add history component here */}</Col>
      </Row>
    </>
  );
}
