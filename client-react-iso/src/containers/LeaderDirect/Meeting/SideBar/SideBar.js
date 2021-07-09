import React, { useState, useEffect } from "react";
import { Row, Col, Card, Input, Checkbox, Radio, Space } from "antd";
import { DateRangepicker } from "@components/uielements/datePicker";
import { SearchOutlined } from "@ant-design/icons";

export default function SideBar({ categories }) {
  const disableDate = (date) => {};

  return (
    <>
      <Card size="small" style={{ background: "none" }}>
        <Input size="large" placeholder="Tìm Kiếm" prefix={<SearchOutlined />} />
      </Card>
      <Card size="small" title="Loại Cuộc Họp" style={{ margin: "15px" }}>
        <Row>
          {categories
            .filter((cat) => cat.parent_id === 3)
            .map((cat, idx) => (
              <Col key={idx} span={24}>
                <Checkbox>{cat.name}</Checkbox>
              </Col>
            ))}
        </Row>
      </Card>
      <Card size="small" title="Thời Gian" style={{ margin: "15px" }}>
        <Row>
          <Space direction="vertical">
            <Col span={24}>
              <DateRangepicker format="DD/MM/YYYY" disabledDate={(date) => date > new Date()}></DateRangepicker>
            </Col>
            <Col span={24}>
              <Radio.Group>
                <Space direction="vertical">
                  <Radio value={1}>Cuộc Họp Tháng Này</Radio>
                  <Radio value={3}>Cuộc Họp Năm Nay</Radio>
                </Space>
              </Radio.Group>
            </Col>
          </Space>
        </Row>
      </Card>
    </>
  );
}
