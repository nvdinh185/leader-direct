import React from "react";
import LayoutWrapper from "@components/utility/layoutWrapper";
import RpDirectAgg from "./RpDirectAgg/RpDirectAgg";
import RpDirectDetail from "./RpDirectDetail/RpDirectDetail";
import { Tabs } from "antd";
import { TabPane } from "@components/uielements/tabs";

export default function DirectReport() {
  return (
    <LayoutWrapper>
      <Tabs defaultActiveKey="1" type="card" size={"large"} style={{ width: "100%" }}>
        <TabPane tab="Báo Cáo Tổng Hợp" key="1">
          <RpDirectAgg></RpDirectAgg>
        </TabPane>
        <TabPane tab="Báo Cáo Chi Tiết" key="2">
          <RpDirectDetail></RpDirectDetail>
        </TabPane>
      </Tabs>
    </LayoutWrapper>
  );
}
