import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Tag, Space, Timeline, Divider, Button, Input } from "antd";
import HeadingWithIcon from "@components/ScrumBoard/HeadingWithIcon";
import DescriptionIcon from "@assets/images/icon/09-icon.svg";

/**
 * Load lịch sử xử lý kèm với nút đánh giá theo từng lịch sử, sau đó người dùng
 * đánh giá lịch sử nào thì post update đánh giá thông tin đó
 * @param {*} param0
 * @returns
 */
function TimeLineWithAssess({ exe, organizations, exeTypes }) {
  const [isEdit, setIsEdit] = useState(false);
  let foundOrg = organizations.find((org) => org.id === exe.organization_id);
  let foundExeType = exeTypes.find((cat) => cat.id === exe.category);

  const handleSwitchEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleSubmitAssess = () => {
    setIsEdit(false);
  };

  return (
    <>
      <Row>
        <Col span={20} style={{ paddingRight: "10px" }}>
          <>
            <Tag color={foundOrg.bg_color}>{foundOrg.name}</Tag>
            <span style={{ color: foundExeType.text_color }}>{foundExeType.name}</span>
            <p style={{ color: "#80808099" }}>{exe.description}</p>
          </>
          {isEdit ? (
            <>
              <Input.TextArea placeholder="Nhập đánh giá thực hiện chỉ đạo"></Input.TextArea>
              <Button block type="primary" onClick={handleSubmitAssess}>
                Chấp Nhận
              </Button>
            </>
          ) : (
            <p style={{ backgroundColor: "grey", color: "white" }}>{exe.description}</p>
          )}
        </Col>
        <Col span={4}>
          <Button onClick={handleSwitchEdit}>Đánh Giá</Button>
        </Col>
      </Row>
    </>
  );
}

export default function TaskAssessHistory({ task, taskType, exeTypes }) {
  const exeHistories = useSelector((state) => state.directAsses.directExes);
  const organizations = useSelector((state) => state.adminUser.organizations);
  return (
    <div style={{ width: "100%" }}>
      <Row>
        <HeadingWithIcon heading={"Đánh Giá Thực Hiện"} iconSrc={DescriptionIcon} />
        <Divider dashed={true} style={{ margin: "10px" }}></Divider>
        <Col span={24}>
          <Space direction="horizontal">
            <Timeline>
              {exeHistories && exeHistories.length > 0
                ? exeHistories.map((exe, idx) => {
                    return (
                      <Timeline.Item key={idx}>
                        <TimeLineWithAssess exe={exe} organizations={organizations} exeTypes={exeTypes}></TimeLineWithAssess>
                      </Timeline.Item>
                    );
                  })
                : null}
            </Timeline>
          </Space>
        </Col>
      </Row>
    </div>
  );
}
