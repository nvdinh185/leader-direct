import React from "react";
import { Row, Col } from "antd";
import { Card } from "antd";
import Box from "@components/utility/box";
import PageHeader from "@components/utility/pageHeader";
import LayoutWrapper from "@components/utility/layoutWrapper";
import ContentHolder from "@components/utility/contentHolder";
import IntlMessages from "@components/utility/intlMessages";
import basicStyle from "@assets/styles/constants";

export default function AdminMenu() {
  const { rowStyle, colStyle, gutter } = basicStyle;
  return (
    <LayoutWrapper>
      <PageHeader>{<IntlMessages id="sidebar.adminMenu" />}</PageHeader>
      <Row style={rowStyle} gutter={gutter} justify="start">
        <Col span={24} style={colStyle}>
          <Box
            title={<IntlMessages id="uiElements.cards.gridCard" />}
            subtitle={<IntlMessages id="uiElements.cards.gridCardSubTitle" />}
          >
            <ContentHolder style={{ overflow: "hidden" }}>
              <Row>
                <Col md={8} sm={8} xs={24} style={{ padding: "0 8px" }}>
                  <Card title={<IntlMessages id="uiElements.cards.cardTitle" />}>
                    {<IntlMessages id="uiElements.cards.cardContent" />}
                  </Card>
                </Col>
                <Col md={8} sm={8} xs={24} style={{ padding: "0 8px" }}>
                  <Card title={<IntlMessages id="uiElements.cards.cardTitle" />}>
                    {<IntlMessages id="uiElements.cards.cardContent" />}
                  </Card>
                </Col>
                <Col md={8} sm={8} xs={24} style={{ padding: "0 8px" }}>
                  <Card title={<IntlMessages id="uiElements.cards.cardTitle" />}>
                    {<IntlMessages id="uiElements.cards.cardContent" />}
                  </Card>
                </Col>
              </Row>
            </ContentHolder>
          </Box>
        </Col>
      </Row>
    </LayoutWrapper>
  );
}
