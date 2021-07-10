import React, { useState, useEffect } from "react";
import moment from "moment";
import { useHistory, useLocation } from "react-router-dom";

import { Space, Avatar, Divider, Row, Col } from "antd";
import { CalendarFilled, SettingOutlined, UserOutlined, AntDesignOutlined } from "@ant-design/icons";
import { SingleCardWrapper } from "@containers/LeaderDirect/Direct/DirectGLItem.style";
import Tooltip from "@components/uielements/tooltip";

export default function ({ organizations, executors, assessors, ...props }) {
  console.log(organizations);
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
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div className="isoCardImage" onClick={props.handleClick ? props.handleClick : handleChangeRoute}>
            {props.view === "list" ? props.code : props.categoryName}
          </div>
          <div className="isoCardContent" onClick={props.handleClick ? props.handleClick : handleChangeRoute}>
            {props.name ? (
              <Tooltip title={props.name}>
                <h3 className="isoCardTitle">{props.name}</h3>
              </Tooltip>
            ) : null}

            <Tooltip title={props.description}>
              <p className="isoCardDescription">{props.description}</p>
            </Tooltip>
            <span className="isoCardDate">
              <Space>
                <CalendarFilled />
                {moment(props.created_time).format("DD/MM/YYYY HH:mm")}
              </Space>
            </span>
          </div>
          <button className="isoDeleteBtn" onClick={props.clickHandler}>
            <SettingOutlined style={{ fontSize: "18px", fontWeight: "bold", marginRight: "10px" }} />
          </button>
        </div>
        <Avatar.Group
          style={{ alignSelf: "flex-end" }}
          maxCount={4}
          size="small"
          maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
        >
          {avatarGroup}
        </Avatar.Group>

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
