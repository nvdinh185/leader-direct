import React from "react";
import { useHistory } from "react-router-dom";
import { Divider, Row, Col, Card } from "antd";
import { LeftCircleOutlined } from "@ant-design/icons";
import { CardDetailsWrapper } from "@containers/LeaderDirect/Meeting/Meeting.style";
import LayoutWrapper from "@components/utility/layoutWrapper";
import PageHeader from "@components/utility/pageHeader";
import DetailInfo from "@components/Directs/DetailInfo";
import basicStyle from "@assets/styles/constants";
import DirectHistory from "@components/Directs/DirectHistory";

/**
 *
 * @param {object} currentDirect Nhận vào thông tin direct để render lên
 * @param {jsx} children Jsx để bổ sung thêm hiển thị (nếu có)
 * @returns
 */
export default function DetailView({ currentDirect, children, showPageHeader }) {
  const history = useHistory();

  const { rowStyle, colStyle, gutter } = basicStyle;

  return (
    <LayoutWrapper>
      {showPageHeader ? (
        <PageHeader>
          <LeftCircleOutlined style={{ fontSize: "30px", paddingRight: "10px" }} onClick={() => history.goBack()} />
          {"Chi Tiết Chỉ Đạo"}
        </PageHeader>
      ) : null}

      <Row style={rowStyle} gutter={gutter} justify="start">
        <Col span={24} style={colStyle}>
          <Card>
            <CardDetailsWrapper>
              <DetailInfo currentDirect={currentDirect}></DetailInfo>
              <Divider />
              {children}
              <DirectHistory currentDirect={currentDirect}></DirectHistory>
              <Divider />
              {showPageHeader ? (
                <LeftCircleOutlined
                  style={{ fontSize: "35px", paddingRight: "10px", color: "grey" }}
                  onClick={() => history.goBack()}
                ></LeftCircleOutlined>
              ) : null}
            </CardDetailsWrapper>
          </Card>
        </Col>
      </Row>
    </LayoutWrapper>
  );
}
