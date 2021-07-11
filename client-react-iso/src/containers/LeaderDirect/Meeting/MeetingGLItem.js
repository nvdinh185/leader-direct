import React from "react";
import moment from "moment";
import { useHistory, useLocation } from "react-router-dom";

import { Space } from "antd";
import { CalendarFilled, SettingOutlined } from "@ant-design/icons";
import { SingleCardWrapper } from "@containers/LeaderDirect/Meeting/MeetingGLItem.style";
import Tooltip from "@components/uielements/tooltip";

export default function (props) {
  console.log(props);
  const history = useHistory();
  const location = useLocation();

  const listClass = `isoSingleCard card ${props.view !== "table" ? props.view : ""}`;
  const style = { zIndex: 100 - props.index, position: "relative" };

  const handleChangeRoute = () => {
    history.push({ pathname: `${location.pathname}/${props.id}`, state: { ...props.meeting, view: props.view } });
  };

  return (
    <SingleCardWrapper className={listClass} style={style} {...props}>
      <div className="isoCardTagInfo">{`${props.directs ? JSON.parse(props.directs).length : 0} Chỉ Đạo`}</div>
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
            {moment(props.created_time).format("DD/MM/YYYY")}
          </Space>
        </span>
      </div>
      <button className="isoDeleteBtn" onClick={props.clickHandler}>
        <SettingOutlined style={{ fontSize: "18px", fontWeight: "bold", marginRight: "10px" }} />
      </button>
    </SingleCardWrapper>
  );
}
