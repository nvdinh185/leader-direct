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

import { getDirectByIds } from "@redux/directs/actions";

export default function DetailView() {
  const history = useHistory();
  const direct = useLocation().state;

  const token = useSelector((state) => state.Auth.idToken);
  const currentDirect = useSelector((state) => state.directs.currentDirect);

  const dispatch = useDispatch();

  const { rowStyle, colStyle, gutter } = basicStyle;

  // Khi current direct trong store thay đổi thì gọi hàm lấy direct org
  useEffect(() => {
    if (Object.keys(currentDirect).length === 0) {
      dispatch(getDirectByIds(token, { uuidArr: JSON.stringify([direct.uuid]) }));
      return;
    }
    // if (currentMeeting.directs) {
    //   dispatch(getDirectByIds(token, { uuidArr: currentMeeting.directs }));
    // }
  }, [currentDirect]);

  // Khi thoát khỏi view này thì clear current direct đi
  useEffect(() => {
    return () => {
      // dispatch(clearCurrentMeetingDetail());
    };
  }, []);

  return (
    <LayoutWrapper>
      <PageHeader>
        <LeftCircleOutlined style={{ fontSize: "30px", paddingRight: "10px" }} onClick={() => history.goBack()} />
        {direct?.name}
      </PageHeader>
      <Row style={rowStyle} gutter={gutter} justify="start">
        <Col span={24} style={colStyle}>
          <Card>
            <CardDetailsWrapper>
              <DetailInfo direct={direct}></DetailInfo>
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
