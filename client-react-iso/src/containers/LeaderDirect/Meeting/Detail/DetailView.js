import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDirectByIds } from "@redux/directs/actions";
import { clearCurrentMeetingDetail, getMeetingById } from "@redux/meetings/actions";
import { useHistory, useLocation, useRouteMatch } from "react-router-dom";
import { Divider, Row, Col, Card } from "antd";
import { LeftCircleOutlined } from "@ant-design/icons";
import { CardDetailsWrapper } from "@containers/LeaderDirect/Meeting/Meeting.style";
import LayoutWrapper from "@components/utility/layoutWrapper";
import PageHeader from "@components/utility/pageHeader";
import DetailInfo from "./DetailInfo";
import DetailAttachs from "./DetailAttachs";
import DetailDirects from "./DetailDirects";

import basicStyle from "@assets/styles/constants";

export default function DetailView() {
  const history = useHistory();
  const meeting = useLocation().state;
  const match = useRouteMatch();

  const token = useSelector((state) => state.Auth.idToken);
  const currentMeeting = useSelector((state) => state.meetings.currentMeeting);
  const directIds = useSelector((state) => state.directs.directIds);

  const dispatch = useDispatch();

  const { rowStyle, colStyle, gutter } = basicStyle;

  useEffect(() => {}, []);

  // Khi current meeting trong store thay đổi thì gọi hàm lấy directs
  useEffect(() => {
    if (Object.keys(currentMeeting).length === 0) {
      dispatch(getMeetingById(token, { id: meeting ? meeting.id : match.params.id }));
      return;
    }
    if (currentMeeting.directs) {
      dispatch(getDirectByIds(token, { uuidArr: currentMeeting.directs }));
    }
  }, [currentMeeting]);

  // Khi thoát khỏi view này thì clear current meeting đi
  useEffect(() => {
    return () => {
      dispatch(clearCurrentMeetingDetail());
    };
  }, []);

  return (
    <LayoutWrapper>
      <PageHeader>
        <LeftCircleOutlined style={{ fontSize: "30px", paddingRight: "10px" }} onClick={() => history.goBack()} />
        {currentMeeting?.name}
      </PageHeader>
      <Row style={rowStyle} gutter={gutter} justify="start">
        <Col span={24} style={colStyle}>
          <Card>
            <CardDetailsWrapper>
              <DetailInfo meeting={currentMeeting}></DetailInfo>
              <Divider />
              <DetailAttachs meeting={currentMeeting}></DetailAttachs>
              <Divider />
              <DetailDirects directs={directIds} meeting={currentMeeting}></DetailDirects>
              <Divider></Divider>
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
