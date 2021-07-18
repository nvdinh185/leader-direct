import React from "react";
import { Row, Col, Tag, Space } from "antd";
import HeadingWithIcon from "@components/ScrumBoard/HeadingWithIcon";
import DescriptionIcon from "@assets/images/icon/09-icon.svg";

export default function TaskAssCriteria({ task, taskType }) {
  return (
    <>
      <Row>
        <HeadingWithIcon heading={<p>Tiêu chí đánh giá</p>} iconSrc={DescriptionIcon} />
        <Col span={24}>
          <Space direction="horizontal">
            <Tag color="blue">P.TH</Tag>
            <p style={{ color: "grey" }}>Tiêu chí đánh giá</p>
          </Space>
        </Col>
      </Row>
    </>
  );
}
