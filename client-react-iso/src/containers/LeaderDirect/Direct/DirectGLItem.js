import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import modalActions from "@redux/modal/actions";
import moment from "moment";
import { useHistory, useLocation } from "react-router-dom";

import { Space, Avatar, Row, Col, Divider, Tag, Dropdown, Menu } from "antd";
import { CalendarFilled, SettingOutlined, MessageOutlined, TagOutlined, EditOutlined, EyeFilled } from "@ant-design/icons";
import { SingleCardWrapper } from "@containers/LeaderDirect/Direct/DirectGLItem.style";
import Tooltip from "@components/uielements/tooltip";

export default function ({ initModalProps, organizations, executors, assessors, ...props }) {
  console.log(props.direct);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const [avatarGroup, setAvatarGroup] = useState();
  const [avatarAssGroup, setAvatarAssGroup] = useState();

  const listClass = `isoSingleCard card ${props.view !== "table" ? props.view : ""}`;
  const style = { zIndex: 100 - props.index };

  const directMenu = (
    <Menu>
      <Menu.Item key={1} onClick={handleOpenModal}>
        <Space size={"small"}>
          <EditOutlined />
          <div>Sửa Thông Tin</div>
        </Space>
      </Menu.Item>
      <Menu.Item key={2}>
        <Space size={"small"}>
          <EyeFilled />
          <div>Xem Chi Tiết</div>
        </Space>
      </Menu.Item>
    </Menu>
  );

  function handleOpenModal() {
    dispatch(
      modalActions.openModal({
        ...initModalProps,
        modalProps: {
          ...initModalProps.modalProps,
          title: "Thay Đổi Thông Tin Chỉ Đạo",
          okText: "Thay Đổi",
          modalMode: "EDIT",
          initialValues: {
            ...props.direct,
            assessors: JSON.parse(assessors),
            executors: JSON.parse(executors),
            category: props.direct.category,
            leader: parseInt(props.direct.leader),
          },
        },
      })
    );
  }

  const handleChangeRoute = () => {
    history.push({ pathname: `${location.pathname}/${props.id}`, state: { ...props } });
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

          <div className="isoCardContent" onClick={props.handleClick ? props.handleClick : null}>
            <Row>
              <Col span={20}>
                {props.name ? (
                  <Tooltip title={props.name}>
                    <h3 className="isoCardTitle">{props.name}</h3>
                  </Tooltip>
                ) : null}
                <Tooltip title={props.description}>
                  <div className="isoCardDescription" onClick={props.handleClick ? props.handleClick : handleChangeRoute}>
                    {props?.description}
                  </div>
                </Tooltip>
              </Col>
              <Col span={4}>
                <button className="isoDeleteBtn" onClick={props.clickHandler}>
                  <Dropdown overlay={directMenu} placement="bottomCenter">
                    <SettingOutlined style={{ fontSize: "18px", fontWeight: "bold", marginRight: "10px" }} />
                  </Dropdown>
                </button>
              </Col>
            </Row>
            <Divider style={{ margin: "5px" }}></Divider>
            <Row onClick={props.handleClick ? props.handleClick : handleChangeRoute}>
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
                <Row>
                  <Tag className={"isoLeaderInfoTag"}>
                    <Space>
                      <MessageOutlined />
                      {props.leaderCat.name}
                    </Space>
                  </Tag>
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
