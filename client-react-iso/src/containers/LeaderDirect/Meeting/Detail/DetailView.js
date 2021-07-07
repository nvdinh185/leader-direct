import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { Divider, Row, Col, Card } from "antd";
import { LeftCircleOutlined } from "@ant-design/icons";
// import { IconSvg } from "@components/LeaderDirect/IconSvg";
import { CardDetailsWrapper } from "@containers/LeaderDirect/Meeting/Meeting.style";
import LayoutWrapper from "@components/utility/layoutWrapper";
import PageHeader from "@components/utility/pageHeader";
import DetailInfo from "./DetailInfo";
import DetailAttachs from "./DetailAttachs";
import DetailDirects from "./DetailDirects";

import basicStyle from "@assets/styles/constants";

export default function DetailView(props) {
  const { rowStyle, colStyle, gutter } = basicStyle;
  const meetings = useSelector((state) => state.directMeeting.meetings);
  const history = useHistory();
  const meeting = useLocation().state;

  const dispatch = useDispatch();

  const [originMeeting, setOriginMeeting] = useState();

  useEffect(() => {
    if (meetings?.[0] && !originMeeting) {
      console.log(history);
      setOriginMeeting(meetings.find((meeting) => meeting.id === meeting.id));
    }
  }, [meetings]);

  return (
    <LayoutWrapper>
      <PageHeader>
        <LeftCircleOutlined style={{ fontSize: "30px", paddingRight: "10px" }} onClick={() => history.goBack()} />
        {meeting.name}
      </PageHeader>
      <Row style={rowStyle} gutter={gutter} justify="start">
        <Col span={24} style={colStyle}>
          <Card>
            <CardDetailsWrapper>
              {/* // ---------------------------------------------------------------------------------  */}
              <DetailInfo meeting={meeting}></DetailInfo>
              <Divider />

              {/* // ---------------------------------------------------------------------------------- */}
              <DetailAttachs></DetailAttachs>
              <Divider />
              {/* // ---------------------------------------------------------------------------------- */}
              <DetailDirects></DetailDirects>
              <Divider></Divider>
              {/* // ---------------------------------------------------------------------------------- */}

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
