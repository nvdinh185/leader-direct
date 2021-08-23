import React, { useState, useEffect } from "react";
import _ from "lodash";
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
import HeadingWithIcon from "@components/ScrumBoard/HeadingWithIcon";
import ContentHolder from "@components/utility/contentHolder";
import basicStyle from "@assets/styles/constants";

const HistoryItem = ({ exeTypes, history, assLogs, organizations }) => {
  let catIcon = "";
  let tlColor = "";
  let hisCat = exeTypes.find((exe) => exe.id === history.category);
  let filterAssLogs = assLogs?.filter((al) => al.direct_exe_uuid === history.uuid);
  let revAssLogs = filterAssLogs?.map((ass) => {
    let foundAssOrg = organizations.find((org) => org.id === ass.organization_ass);
    return {
      ...ass,
      organization_ass_detail: foundAssOrg,
    };
  });

  console.log(filterAssLogs);

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
      <Row>
        <Col span={24}>
          <>
            <p>{`${moment(history.created_at).format("DD/MM/YYYY")} - ${hisCat.name}`}</p>
            <p style={{ fontSize: "11px", color: "grey" }}>{`${
              history.description ? `(${history.created_user?.toUpperCase()}) - ` : ""
            } ${history.description}`}</p>
          </>
          {revAssLogs
            ? revAssLogs?.map((fal, idx) => (
                <div key={idx} style={{ paddingLeft: "10px", margin: "0 15px" }}>
                  <p style={{ borderRadius: "5px", backgroundColor: "#f2f2f2", color: "GrayText", padding: "5px" }}>
                    <span style={{ color: "grey", fontWeight: "bold" }}>[{fal?.organization_ass_detail?.name}]</span> -{" "}
                    <span style={{ color: "orange" }}>{moment(fal?.due_date).format("DD/MM/yyyy")}</span>: {fal.description}
                  </p>
                </div>
              ))
            : null}
        </Col>
      </Row>
    </Timeline.Item>
  );
};

export default function TaskHistory({ exeTypes, task, histories, organizations, userInfo, assLogs }) {
  const { rowStyle, colStyle, gutter } = basicStyle;
  const [sortHistories, setSortHistories] = useState();

  useEffect(() => {
    if (histories?.[0]) {
      let sortArr = _.orderBy(histories, ["category"], ["asc"]);
      console.log(sortArr);
      setSortHistories(sortArr);
    }
  }, [histories]);

  return (
    <>
      <Row gutter={gutter} justify="start">
        <HeadingWithIcon heading={"Lịch Sử Xử Lý"} iconSrc={Clock} />
        <br></br>
        <Divider dashed={true} style={{ margin: "0" }}></Divider>
        <Col span={24}>
          <ContentHolder>
            <Timeline>
              {sortHistories
                ? sortHistories.map((history) => (
                    <HistoryItem
                      exeTypes={exeTypes}
                      key={history.uuid}
                      history={history}
                      organizations={organizations}
                      userInfo={userInfo}
                      assLogs={assLogs}
                    ></HistoryItem>
                  ))
                : null}
            </Timeline>
          </ContentHolder>
        </Col>
      </Row>
    </>
  );
}
