import React, { useState, useEffect } from "react";
import { Modal, Input, Form, Select } from "antd";
import { UserOutlined, TagOutlined, MenuOutlined, FileTextOutlined, IdcardOutlined } from "@ant-design/icons";
import { createMenuApi, updateMenuApi } from "@redux/adminUsers/actions";
import { useDispatch, useSelector } from "react-redux";

const { Option } = Select;

export default function GroupAddForm({ modalMode, initialValues, handleCancel, isModalVisible, setIsModalVisible, ...props }) {
  const [form] = Form.useForm();
  const token = useSelector((state) => state.Auth.idToken);

  const dispatch = useDispatch();

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      console.log("Success:", values);
      // TODO: Send dữ liệu về server và thông báo kết quả
      // Nếu có initialValues tức là đang edit thì gọi hàm edit chứ đừng dại gọi add hì
      if (initialValues && modalMode === "EDIT") {
        // dispatch(updateMenuApi(token, form.getFieldValue()));
        setIsModalVisible(false);
        return;
      }
      //   dispatch(createMenuApi(token, form.getFieldValue()));
      setIsModalVisible(false);
    } catch (errorInfo) {
      console.log("Failed:", errorInfo);
    }
  };

  useEffect(() => {
    if (modalMode === "ADD") {
      form.resetFields();
      return;
    }
    if (initialValues && modalMode === "EDIT") {
      form.setFieldsValue({
        ...initialValues,
      });
    }
  }, [initialValues, modalMode]);

  const formItemLayout = {
    labelCol: { xs: { span: 24 }, sm: { span: 5 } },
    wrapperCol: { xs: { span: 24 }, sm: { span: 20 } },
  };

  return (
    <Modal
      {...props}
      // cancelButtonProps={{ block: true }}
      // okButtonProps={{ block: true }}
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form {...formItemLayout} form={form}>
        <Form.Item label="Tên Nhóm" name="name" disabled>
          <Input
            disabled={modalMode === "ADD" ? false : true}
            size="large"
            placeholder="Nhập Tên Nhóm"
            prefix={<UserOutlined />}
          />
        </Form.Item>
        <Form.Item label="Chọn API" name="function_apis" prefix={<IdcardOutlined />}>
          <Select
            showSearch
            placeholder="Chọn API"
            optionFilterProp="children"
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            filterSort={(optionA, optionB) => optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())}
          >
            <Option value="1">Công Ty 3</Option>
            <Option value="2">P.DVKT</Option>
            <Option value="3">P.TH</Option>
            <Option value="4">P.KHCN</Option>
            <Option value="5">P.CSKH</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Nhóm Quyền" name="function_groups">
          <Select
            showSearch
            placeholder="Chọn Nhóm Quyền"
            optionFilterProp="children"
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            filterSort={(optionA, optionB) => optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())}
          >
            <Option value="1">Admin</Option>
            <Option value="2">Người Dùng</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Menu Add Thêm" name="function_groups">
          <Select
            showSearch
            placeholder="Chọn Menu Add Thêm (ngoài nhóm menu đi theo groups)"
            optionFilterProp="children"
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            filterSort={(optionA, optionB) => optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())}
          >
            <Option value="1">Admin</Option>
            <Option value="2">Người Dùng</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Mô Tả" name="description">
          <Input.TextArea size="large" placeholder="Nhập Mô Tả Cho Người Dùng" prefix={<FileTextOutlined />} />
        </Form.Item>
        <p style={{ fontSize: 10, color: "grey" }}>
          <span style={{ color: "red" }}>*</span> Trường bắt buộc nhập liệu
        </p>
      </Form>
    </Modal>
  );
}
