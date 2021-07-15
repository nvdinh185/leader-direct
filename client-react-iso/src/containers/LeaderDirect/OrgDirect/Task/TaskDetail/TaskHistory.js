import React, { useState, useEffect } from "react";
import * as COMMON from "@constants/common";
import moment from "moment";
import { Col, Divider, Row, Space, Timeline } from "antd";
import {
  PlayCircleOutlined,
  CaretRightOutlined,
  ClockCircleOutlined,
  FastForwardOutlined,
  CheckCircleFilled,
} from "@ant-design/icons";
import Clock from "@assets/images/icon/18.svg";
import HeadingWithIcon from "@components/LeaderDirect/HeadingWithIcon";
import ContentHolder from "@components/utility/contentHolder";
import basicStyle from "@assets/styles/constants";

const HistoryItem = ({ exeTypes, history }) => {
  let catIcon = "";
  let tlColor = "";
  let hisCat = exeTypes.find((exe) => exe.id === history.category);
  switch (history.category) {
    case COMMON.EXE_TYPE_MAP.CREATE:
      catIcon = <PlayCircleOutlined></PlayCircleOutlined>;
      break;
    case COMMON.EXE_TYPE_MAP.ONGOING:
      catIcon = <FastForwardOutlined></FastForwardOutlined>;
      break;
    case COMMON.EXE_TYPE_MAP.COMPLETE:
      catIcon = <CheckCircleFilled style={{ color: "lightgreen" }}></CheckCircleFilled>;
      tlColor = "green";
      break;
    case COMMON.EXE_TYPE_MAP.COMPLETE_PRCT:
      catIcon = <CaretRightOutlined style={{ color: "orange" }}></CaretRightOutlined>;
      tlColor = "orange";
      break;
    case COMMON.EXE_TYPE_MAP.REQ_EXT1:
      catIcon = <ClockCircleOutlined style={{ color: "red" }}></ClockCircleOutlined>;
      tlColor = "magenta";
      break;
    default:
      break;
  }

  return (
    <Timeline.Item dot={catIcon} color={history.bg_color}>
      <p>{`${moment(history.created_at).format("DD/MM/YYYY")} - ${hisCat.name}`}</p>
      <p style={{ fontSize: "11px", color: "grey" }}>{`${
        history.description ? `(${history.created_user?.toUpperCase()}) - ` : ""
      } ${history.description}`}</p>
    </Timeline.Item>
  );
};

export default function TaskHistory({ exeTypes, task, histories }) {
  const { rowStyle, colStyle, gutter } = basicStyle;

  return (
    <>
      <HeadingWithIcon heading={"Lịch Sử Xử Lý"} iconSrc={Clock} />
      <br></br>
      <Row style={{ ...rowStyle, marginBottom: "20px" }} gutter={gutter} justify="start">
        <Col span={24}>
          <ContentHolder>
            <Timeline>
              {histories
                ? histories.map((history) => <HistoryItem exeTypes={exeTypes} key={history.uuid} history={history}></HistoryItem>)
                : null}
            </Timeline>
          </ContentHolder>
        </Col>
      </Row>
    </>
  );
}
