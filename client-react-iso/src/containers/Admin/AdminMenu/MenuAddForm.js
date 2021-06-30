import React, { useState, useEffect } from "react";
import { Modal, Input, Form, Select } from "antd";
import { UserOutlined, TagOutlined, MenuOutlined, FileTextOutlined } from "@ant-design/icons";
import { createMenuApi, updateMenuApi } from "@redux/adminUsers/actions";
import { useDispatch, useSelector } from "react-redux";

const { Option } = Select;

export default function MenuAddForm({ modalMode, initialValues, handleCancel, isModalVisible, setIsModalVisible, ...props }) {
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
        dispatch(updateMenuApi(token, form.getFieldValue()));
        setIsModalVisible(false);
        return;
      }
      dispatch(createMenuApi(token, form.getFieldValue()));
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
        <Form.Item
          label="Tag ID"
          name="tag_id"
          rules={[
            {
              required: true,
              message: "Bạn phải nhập tag id",
            },
          ]}
        >
          <Input size="large" placeholder="Nhập Tag ID" prefix={<TagOutlined />} />
        </Form.Item>
        <Form.Item label="App URL" name="page">
          <Input size="large" placeholder="Nhập Page (Route URL)" prefix={<MenuOutlined />} />
        </Form.Item>
        <Form.Item
          label="Tên"
          name="name"
          rules={[
            {
              required: true,
              message: "Bạn phải nhập tên hiển thị",
            },
          ]}
        >
          <Input size="large" placeholder="Nhập Tên Hiển Thị" prefix={<UserOutlined />} />
        </Form.Item>
        <Form.Item
          label="Mô Tả"
          name="description"
          rules={[
            {
              required: true,
              message: "Bạn phải nhập mô tả cho route này",
            },
          ]}
        >
          <Input.TextArea size="large" placeholder="Nhập Mô Tả Cho Route" prefix={<FileTextOutlined />} />
        </Form.Item>
        {modalMode === "EDIT" ? (
          <Form.Item label="Trạng Thái Menu" name="status">
            <Select
              placeholder="Chọn Menu Nhóm Này Có Thể Truy Cập"
              optionFilterProp="children"
              filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              filterSort={(optionA, optionB) => optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())}
            >
              <Option value={1}>Hoạt Động</Option>
              <Option value={0}>Không Hoạt Động</Option>
            </Select>
          </Form.Item>
        ) : null}
        <p style={{ fontSize: 10, color: "grey" }}>
          <span style={{ color: "red" }}>*</span> Trường bắt buộc nhập liệu
        </p>
      </Form>
    </Modal>
  );
}
