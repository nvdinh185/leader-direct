import React from "react";
import { Col, Row, Card } from "antd";
import basicStyle from "@assets/styles/constants";
import RpDirectAggTable from "./RpDirectAggTable";
import RpDirectAggFilter from "./RpDirectAggFilter";

export default function RpDirectAgg() {
  const { rowStyle, colStyle } = basicStyle;

  return (
    <div>
      <Row style={rowStyle} gutter={0} justify="start">
        <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
          <Card>
            <RpDirectAggFilter></RpDirectAggFilter>
          </Card>
        </Col>
        <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
          <Card title={"Bảng Dữ Liệu"}>
            <RpDirectAggTable></RpDirectAggTable>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
