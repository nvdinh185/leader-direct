import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { Divider, Row, Col, Card } from "antd";
import { LeftCircleOutlined } from "@ant-design/icons";
import { CardDetailsWrapper } from "@containers/LeaderDirect/Meeting/Meeting.style";
import LayoutWrapper from "@components/utility/layoutWrapper";
import PageHeader from "@components/utility/pageHeader";
import DetailInfo from "./DetailInfo";
import basicStyle from "@assets/styles/constants";
import DirectHistory from "@containers/LeaderDirect/Direct/Detail/DirectHistory";

import { getDirectByIds } from "@redux/directs/actions";

export default function DetailView() {
  const history = useHistory();
  const direct = useLocation().state;

  console.log(direct);

  const token = useSelector((state) => state.Auth.idToken);
  const currentDirect = useSelector((state) => state.directs.currentDirect);

  const dispatch = useDispatch();

  const { rowStyle, colStyle, gutter } = basicStyle;

  // Khi current direct trong store thay đổi thì gọi hàm lấy direct org
  useEffect(() => {
    if (!currentDirect || Object.keys(currentDirect).length === 0) {
      dispatch(getDirectByIds(token, { uuidArr: JSON.stringify([direct.uuid]) }, "CURRENT_DIRECT"));
      return;
    }
  }, [currentDirect]);

  return (
    <LayoutWrapper>
      <PageHeader>
        <LeftCircleOutlined style={{ fontSize: "30px", paddingRight: "10px" }} onClick={() => history.goBack()} />
        {"Chi Tiết Chỉ Đạo"}
      </PageHeader>
      <Row style={rowStyle} gutter={gutter} justify="start">
        <Col span={24} style={colStyle}>
          <Card>
            <CardDetailsWrapper>
              <DetailInfo direct={direct}></DetailInfo>
              <Divider />
              <DirectHistory></DirectHistory>
              <Divider />
              <LeftCircleOutlined
                style={{ fontSize: "35px", paddingRight: "10px", color: "grey" }}
                onClick={() => history.goBack()}
              ></LeftCircleOutlined>
            </CardDetailsWrapper>
          </Card>
        </Col>
      </Row>
    </LayoutWrapper>
  );
}
