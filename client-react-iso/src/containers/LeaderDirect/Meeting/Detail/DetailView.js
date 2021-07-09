import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllDirect } from "@redux/directs/actions";
import { useHistory, useLocation } from "react-router-dom";
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

  const token = useSelector((state) => state.Auth.idToken);
  const meetings = useSelector((state) => state.directMeeting.meetings);
  const directs = useSelector((state) => state.directs.directs);

  const dispatch = useDispatch();

  const [originMeeting, setOriginMeeting] = useState();
  const [meetingDirects, setMeetingDirects] = useState();

  const { rowStyle, colStyle, gutter } = basicStyle;

  // Effect to get directs info from meeting directs field
  useEffect(() => {
    // Tạm thời chưa có hàm lấy direct by ids nên lấy hết direct 1 lượt rồi lọc lại sau
    if (!directs?.[0]) {
      dispatch(getAllDirect(token));
    }
  }, [meeting]);

  useEffect(() => {
    if (meetings?.[0] && !originMeeting) {
      setOriginMeeting(meetings.find((meeting) => meeting.id === meeting.id));
    }
  }, [meetings]);

  useEffect(() => {
    if (meeting && directs?.[0]) {
      if (meeting.directs) {
        let directIdArr = JSON.parse(meeting.directs);
        let directArr = directIdArr.map((di) => directs.find((direct) => direct.id === di));
        setMeetingDirects(directArr);
      }
    }
  }, [meeting, directs]);

  useEffect(() => {
    console.log(meetingDirects);
  }, [meetingDirects]);

  return (
    <LayoutWrapper>
      <PageHeader>
        <LeftCircleOutlined style={{ fontSize: "30px", paddingRight: "10px" }} onClick={() => history.goBack()} />
        {meeting?.name}
      </PageHeader>
      <Row style={rowStyle} gutter={gutter} justify="start">
        <Col span={24} style={colStyle}>
          <Card>
            <CardDetailsWrapper>
              <DetailInfo meeting={meeting}></DetailInfo>
              <Divider />
              <DetailAttachs meeting={meeting}></DetailAttachs>
              <Divider />
              <DetailDirects view={meeting.view} directs={meetingDirects}></DetailDirects>
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
