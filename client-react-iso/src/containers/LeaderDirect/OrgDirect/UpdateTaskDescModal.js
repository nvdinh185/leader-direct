import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateDirectOrgExecStatus } from "@redux/directOrgs/actions";
import { warningAlert, confirmAlert, successAlert } from "@components/AlertModal/ModalInfo";
import { Form, Input, Button, Radio, Row, Col, Divider, Space } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { BoardLabelWrapper } from "./UpdateTaskDescModal.style";

export default function UpdateTaskDescModal(props) {
  const [form] = Form.useForm();
  const token = useSelector((state) => state.Auth.idToken);
  const loading = useSelector((state) => state.directOrgs.loading);
  const dispatch = useDispatch();

  const layout = { labelCol: { span: 12 }, wrapperCol: { span: 12 } };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      console.log("Success:", values);
      let newData = form.getFieldValue();
      // TODO: Tạo mới object và post cập nhập về server
      let dataToPost = props.updateArr.map((update) => {
        return {
          ...update,
          description: newData[update.uuid],
        };
      });
      if (dataToPost && dataToPost.length > 0) {
        // TODO: Call api to update the change arr
        dispatch(updateDirectOrgExecStatus(token, { update_arr: dataToPost }));
      }
    } catch (errorInfo) {
      console.log("Failed:", errorInfo);
    }
  };

  const handleCancel = () => {
    console.log("cancel");
  };

  return (
    <>
      <Form {...layout} form={form}>
        {props.updateArr
          ? props.updateArr.map((updateObj, idx) => {
              return (
                <>
                  <Form.Item
                    key={idx}
                    label={<BoardLabelWrapper>{updateObj.description}</BoardLabelWrapper>}
                    name={updateObj.uuid}
                    rules={[
                      {
                        required: true,
                        message: "Bạn phải nhập mô tả khi thay đổi trạng thái của chỉ đạo!",
                      },
                    ]}
                  >
                    <Input.TextArea placeholder="Nhập Mô Tả" />
                  </Form.Item>
                  <br></br>
                </>
              );
            })
          : null}
        <p style={{ fontSize: 10, color: "grey" }}>
          <span style={{ color: "red" }}>*</span> Trường bắt buộc nhập liệu
        </p>
        <Divider></Divider>
        <Row>
          <Col span={12}>
            <Button size={"large"} block type="default" onClick={handleCancel}>
              Bỏ Qua
            </Button>
          </Col>
          <Col span={12}>
            <Button loading={loading} size={"large"} block type="primary" onClick={handleOk}>
              {props.okText}
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
}
