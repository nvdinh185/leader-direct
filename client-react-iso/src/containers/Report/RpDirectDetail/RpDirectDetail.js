import React from "react";
import { Col, Row, Card } from "antd";
import basicStyle from "@assets/styles/constants";
import RpDirectDetailTable from "./RpDirectDetailTable";
import RpDirectDetailFilter from "./RpDirectDetailFilter";

export default function RpDirectDetail() {
  const { rowStyle, colStyle } = basicStyle;

  return (
    <div>
      <Row style={rowStyle} gutter={0} justify="start">
        <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
          <Card>
            <RpDirectDetailFilter></RpDirectDetailFilter>
          </Card>
        </Col>
        <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
          <Card title={"Bảng Dữ Liệu"}>
            <RpDirectDetailTable></RpDirectDetailTable>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
