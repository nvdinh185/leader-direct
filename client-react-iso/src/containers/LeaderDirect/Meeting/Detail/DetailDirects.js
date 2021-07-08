import React, { useState, useEffect } from "react";
import HeadingWithIcon from "@components/LeaderDirect/HeadingWithIcon";
import PlusIcon from "@assets/images/icon/09-icon.svg";
import { Col, Row } from "antd";

export default function DetailDirects({ meeting, ...props }) {
  // Effect to get directs info from meeting directs field
  useEffect(() => {
    // TODO: Call Api to get info of directs
  }, [meeting]);

  return (
    <>
      <HeadingWithIcon heading="Danh Sách Chỉ Đạo" iconSrc={PlusIcon} />
      {/* TODO: List of Chi Dao Lanh Dao Here */}
      <Row>
        <Col span={24}>ABC</Col>
        <Col span={24}>ABC</Col>
      </Row>
    </>
  );
}