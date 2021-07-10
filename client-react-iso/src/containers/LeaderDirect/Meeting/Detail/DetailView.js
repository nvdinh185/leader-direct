import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDirectByIds } from "@redux/directs/actions";
import { clearCurrentMeetingDetail, setCurrentMeetingDetail } from "@redux/meetings/actions";
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
  const currentMeeting = useSelector((state) => state.directMeeting.currentMeeting);
  const directIds = useSelector((state) => state.directs.directIds);

  const dispatch = useDispatch();

  const { rowStyle, colStyle, gutter } = basicStyle;

  // Nếu load view này thành công thì set current meeting
  useEffect(() => {
    if (Object.keys(currentMeeting).length === 0) {
      dispatch(setCurrentMeetingDetail(meeting));
    }
  }, []);

  // Khi current meeting trong store thay đổi thì gọi hàm lấy directs
  useEffect(() => {
    if (Object.keys(currentMeeting).length === 0) {
      dispatch(setCurrentMeetingDetail(meeting));
      return;
    }
    dispatch(getDirectByIds(token, { uuidArr: currentMeeting.directs }));
  }, [currentMeeting]);

  useEffect(() => {
    return () => {
      dispatch(clearCurrentMeetingDetail());
    };
  }, []);

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
              <DetailDirects view={meeting.view} directs={directIds} meeting={meeting}></DetailDirects>
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
