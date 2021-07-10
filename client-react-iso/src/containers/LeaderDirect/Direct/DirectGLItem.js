import React from "react";
import moment from "moment";
import { Space } from "antd";
import { CalendarFilled, SettingOutlined } from "@ant-design/icons";
import { SingleCardWrapper } from "@containers/LeaderDirect/Direct/DirectGLItem.style";
import Tooltip from "@components/uielements/tooltip";
import { useHistory, useLocation } from "react-router-dom";

export default function (props) {
  const history = useHistory();
  const location = useLocation();

  const listClass = `isoSingleCard card ${props.view !== "table" ? props.view : ""}`;
  const style = { zIndex: 100 - props.index };

  const handleChangeRoute = () => {
    history.push({ pathname: `${location.pathname}/${props.id}`, state: props.meeting });
  };

  return (
    <SingleCardWrapper className={listClass} style={style} {...props}>
      <div className="isoCardImage" onClick={handleChangeRoute}>
        {props.view === "list" ? props.code : null}
      </div>
      <div className="isoCardContent" onClick={handleChangeRoute}>
        <Tooltip title={props.name}>
          <h3 className="isoCardTitle">{props.name}</h3>
        </Tooltip>
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
    </SingleCardWrapper>
  );
}
