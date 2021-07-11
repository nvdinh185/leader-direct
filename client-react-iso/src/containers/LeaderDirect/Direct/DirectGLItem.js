import React, { useState, useEffect } from "react";
import moment from "moment";
import { useHistory, useLocation } from "react-router-dom";

import { Space, Avatar, Row, Col, Divider } from "antd";
import { CalendarFilled, SettingOutlined, TagOutlined } from "@ant-design/icons";
import { SingleCardWrapper } from "@containers/LeaderDirect/Direct/DirectGLItem.style";
import Tooltip from "@components/uielements/tooltip";

export default function ({ organizations, executors, assessors, ...props }) {
  console.log(props);
  const history = useHistory();
  const location = useLocation();

  const [avatarGroup, setAvatarGroup] = useState();
  const [avatarAssGroup, setAvatarAssGroup] = useState();

  const listClass = `isoSingleCard card ${props.view !== "table" ? props.view : ""}`;
  const style = { zIndex: 100 - props.index };

  const handleChangeRoute = () => {
    history.push({ pathname: `${location.pathname}/${props.id}`, state: { ...props.meeting, view: props.view } });
  };

  const renderOrgAvataGroup = (orgs) => {
    return orgs.map((org) => {
      return (
        <Tooltip key={org.code} title={org.name} placement="top">
          <Avatar style={{ backgroundColor: org.bg_color }}>{org.code}</Avatar>
        </Tooltip>
      );
    });
  };

  useEffect(() => {
    if ((organizations?.[0] && JSON.parse(executors)) || JSON.parse(assessors)) {
      let orgExeIdArr = JSON.parse(executors);
      let orgMap = organizations.filter((org) => orgExeIdArr.includes(org.id));
      let avatarGroup = renderOrgAvataGroup(orgMap);
      setAvatarGroup(avatarGroup);
      if (JSON.parse(assessors)) {
        let orgAssIdArr = JSON.parse(assessors);
        let orgAssMap = organizations.filter((org) => orgAssIdArr.includes(org.id));
        let avatarAssGroup = renderOrgAvataGroup(orgAssMap);
        setAvatarAssGroup(avatarAssGroup);
      }
    }
  }, [organizations, executors, assessors]);

  return (
    <>
      <SingleCardWrapper className={listClass} style={{ ...style, position: "relative" }} {...props}>
        <div className="isoCardWrapperFlex">
          <div className="isoCardImage" onClick={props.handleClick ? props.handleClick : handleChangeRoute}>
            {props.view === "list" ? props.code : null}
          </div>

          <div className="isoCardContent" onClick={props.handleClick ? props.handleClick : handleChangeRoute}>
            <Row>
              <Col span={20}>
                {props.name ? (
                  <Tooltip title={props.name}>
                    <h3 className="isoCardTitle">{props.name}</h3>
                  </Tooltip>
                ) : null}
                <Tooltip title={props.description}>
                  <p className="isoCardDescription">{props.description}</p>
                </Tooltip>
              </Col>
              <Col span={4}>
                <button className="isoDeleteBtn" onClick={props.clickHandler}>
                  <SettingOutlined style={{ fontSize: "18px", fontWeight: "bold", marginRight: "10px" }} />
                </button>
              </Col>
            </Row>
            <Divider style={{ margin: "5px" }}></Divider>
            <Row>
              <Col span={12}>
                <Row>
                  <span className="isoCardDate">
                    <Space size={"small"}>
                      <CalendarFilled />
                      {moment(props.created_time).format("DD/MM/YYYY")}
                    </Space>
                  </span>
                </Row>
                <Row>
                  <span className="isoCardDate">
                    <Space>
                      <TagOutlined />
                      {props.categoryName}
                    </Space>
                  </span>
                </Row>
              </Col>
              <Col span={12}>
                <Avatar.Group
                  style={{ position: "absolute", right: "0", bottom: "0", padding: props.view === "grid" ? "5px" : "0" }}
                  maxCount={4}
                  size="small"
                  maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
                >
                  {avatarGroup}
                </Avatar.Group>
              </Col>
            </Row>
          </div>
        </div>

        {/* <div style={{ position: "absolute", bottom: "10px", left: "68px" }}>
          <Avatar.Group
            style={{ alignSelf: "center" }}
            maxCount={4}
            size="small"
            maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
          >
            {avatarAssGroup}
          </Avatar.Group>
        </div> */}
      </SingleCardWrapper>
    </>
  );
}
