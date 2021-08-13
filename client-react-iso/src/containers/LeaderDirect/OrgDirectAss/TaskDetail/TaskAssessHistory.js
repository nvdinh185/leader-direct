import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Tag, Space, Timeline, Divider, Button, Input } from "antd";
import HeadingWithIcon from "@components/ScrumBoard/HeadingWithIcon";
import DescriptionIcon from "@assets/images/icon/09-icon.svg";
import { updateDirectAssessLogs } from "@apis/directAss";
import { errorAlert, successAlert } from "@components/AlertModal/ModalInfo";
import { getFilterDirectAssLogs } from "@redux/directAsses/actions";
import moment from "moment";

/**
 * Load lịch sử xử lý kèm với nút đánh giá theo từng lịch sử, sau đó người dùng
 * đánh giá lịch sử nào thì post update đánh giá thông tin đó
 * @param {*} param0
 * @returns
 */
function TimeLineWithAssess({ exe, organizations, exeTypes, task, assLogs, userInfo }) {
  const token = useSelector((state) => state.Auth.idToken);
  const dispatch = useDispatch();

  const [isEdit, setIsEdit] = useState(false);
  const [form, setForm] = useState();

  let foundExeOrg = organizations.find((org) => org.id === exe.organization_id);
  let foundExeType = exeTypes.find((cat) => cat.id === exe.category);
  let filterAssLogs = assLogs?.filter((al) => al.direct_exe_uuid === exe.uuid);

  let revAssLogs = filterAssLogs?.map((ass) => {
    let foundAssOrg = organizations.find((org) => org.id === ass.organization_ass);
    return {
      ...ass,
      organization_ass_detail: foundAssOrg,
    };
  });

  const handleSwitchEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleSubmitAssess = () => {
    let formToPost = {
      ...form,
      organization_ass: userInfo.organization,
      organization_exe: task.organization_exe,
      direct_uuid: task.direct_uuid,
      direct_ass_uuid: task.id,
      direct_exe_uuid: exe.uuid,
      direct_org_uuid: exe.direct_org_uuid,
    };
    // TODO: Dispatch action to insert or update data here
    if (token) {
      updateDirectAssessLogs(token, formToPost)
        .then((res) => {
          successAlert("Thành Công", "Bạn đã cập nhập đánh giá cho thực hiện chỉ đạo thành công");
          dispatch(
            getFilterDirectAssLogs(token, {
              // direct_uuid: props.task.direct_uuid,
              direct_ass_uuid: task.id,
              organization_exe: task.organization_exe,
              organization_ass: task.organization_id,
            })
          );
          // Dispatch action để lấy lại ass logs ở đây
        })
        .catch((err) => {
          errorAlert("Thất Bại", `Có lỗi khi thực hiện đánh giá: ${err}`);
        });
    }
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
        <Col span={4}>
          <Button onClick={handleSwitchEdit}>Đánh Giá</Button>
        </Col>
      </Row>
    </>
  );
}

export default function TaskAssessHistory({ task, exeTypes, exeHistories, organizations, assLogs, userInfo }) {
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
                          assLogs={assLogs}
                          organizations={organizations}
                          exeTypes={exeTypes}
                          userInfo={userInfo}
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
