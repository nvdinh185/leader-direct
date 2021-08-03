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
function TimeLineWithAssess({ exe, organizations, exeTypes, assHistories, task }) {
  const [isEdit, setIsEdit] = useState(false);
  const [form, setForm] = useState();
  let foundExeOrg = organizations.find((org) => org.id === exe.organization_id);
  let foundExeType = exeTypes.find((cat) => cat.id === exe.category);
  let foundAssHistories = assHistories.find((ah) => ah.direct_org_uuid === exe.uuid);
  const handleSwitchEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleSubmitAssess = () => {
    let formToPost = {
      ...form,
      organization_ass: task.organization_id,
      organization_exe: task.organization_exe,
      direct_uuid: task.direct_uuid,
      direct_ass_uuid: task.id,
      direct_exe_uuid: exe.uuid,
      direct_org_uuid: exe.direct_org_uuid,
    };
    // TODO: Dispatch action to insert or update data here
    console.log(formToPost);
    setIsEdit(false);
  };

  const handleChangeForm = (e) => {
    setForm({ description: e.target.value });
  };

  return (
    <>
      <Row>
        <Col span={20} style={{ paddingRight: "10px" }}>
          <>
            <Tag color={foundExeOrg.bg_color}>{foundExeOrg.name}</Tag>
            <span style={{ color: "grey", fontWeight: "bold" }}>{foundExeType.name}</span>
            <p style={{ color: "grey" }}>{exe.description}</p>
          </>
          {isEdit ? (
            <>
              <Input.TextArea
                value={form?.description}
                onChange={handleChangeForm}
                placeholder="Nhập đánh giá thực hiện chỉ đạo"
              ></Input.TextArea>
              <Button block type="primary" onClick={handleSubmitAssess}>
                Chấp Nhận
              </Button>
            </>
          ) : null}
          {foundAssHistories && foundAssHistories.length > 0
            ? foundAssHistories.map((fh) => (
                <>
                  <div style={{ paddingLeft: "10px", margin: "0 15px" }}>
                    <p style={{ borderRadius: "5px", backgroundColor: "#f2f2f2", color: "GrayText", padding: "5px" }}>
                      {fh.description}
                    </p>
                  </div>
                </>
              ))
            : null}
        </Col>
        <Col span={4}>
          <Button onClick={handleSwitchEdit}>Đánh Giá</Button>
        </Col>
      </Row>
    </>
  );
}

export default function TaskAssessHistory({ task, taskType, exeTypes, exeHistories, organizations, assHistories }) {
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
                        <TimeLineWithAssess
                          task={task}
                          exe={exe}
                          organizations={organizations}
                          exeTypes={exeTypes}
                          assHistories={assHistories}
                        ></TimeLineWithAssess>
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
