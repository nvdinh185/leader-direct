import React, { useState, useEffect } from "react";
import "moment/locale/vi";
import locale from "antd/es/date-picker/locale/vi_VN";
import { Row, Col, Card, Input, Checkbox, Radio, Space } from "antd";
import { DateRangepicker } from "@components/uielements/datePicker";
import { SearchOutlined } from "@ant-design/icons";

export default function SideBar({ categories, organizations }) {
  return (
    <div style={{ position: "sticky", top: "75px" }}>
      <Card size="small" style={{ background: "none" }}>
        <Input size="large" placeholder="Tìm Kiếm" prefix={<SearchOutlined />} />
      </Card>
      <Card size="small" title="Loại Chỉ Đạo" style={{ margin: "15px" }}>
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
      <Card size="small" title="Chọn Đơn Vị" style={{ margin: "15px" }}>
        <div style={{ overflow: "auto", height: "200px" }}>
          <Row>
            {organizations?.map((org, idx) => (
              <Col key={idx} span={24}>
                <Checkbox>{org.name}</Checkbox>
              </Col>
            ))}
          </Row>
        </div>
      </Card>
      <Card size="small" title="Thời Gian" style={{ margin: "15px" }}>
        <Row>
          <Space direction="vertical">
            <Col span={24}>
              <DateRangepicker locale={locale} format="DD/MM/YYYY" disabledDate={(date) => date > new Date()}></DateRangepicker>
            </Col>
            <Col span={24}>
              <Radio.Group>
                <Space direction="vertical">
                  <Radio value={1}>Chỉ Đạo Trong Tháng Này</Radio>
                  <Radio value={3}>Chỉ Đạo Trong Năm Nay</Radio>
                </Space>
              </Radio.Group>
            </Col>
          </Space>
        </Row>
      </Card>
    </div>
  );
}
