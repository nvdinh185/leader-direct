import React, { useState, useEffect } from "react";
import { Modal, Input, Form, Select } from "antd";
import { UserOutlined, TagOutlined, MenuOutlined, FileTextOutlined } from "@ant-design/icons";
import { createCategory, updateCategory } from "@redux/filterData/actions";
import { useDispatch, useSelector } from "react-redux";

const { Option } = Select;

export default function MenuAddForm({ modalMode, initialValues, handleCancel, isModalVisible, setIsModalVisible, ...props }) {
  const [form] = Form.useForm();
  const token = useSelector((state) => state.Auth.idToken);
  const status = useSelector((state) => state.filterData.loading);
  const categories = useSelector((state) => state.filterData.categories);

  const [parentCat, setParentCat] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (categories?.[0]) {
      setParentCat(categories.filter((cat) => !cat.parent_id));
    }
  }, [categories]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      console.log("Success:", values);
      // TODO: Send dữ liệu về server và thông báo kết quả
      // Nếu có initialValues tức là đang edit thì gọi hàm edit chứ đừng dại gọi add hì
      console.log(form.getFieldValue());
      if (initialValues && modalMode === "EDIT") {
        dispatch(updateCategory(token, form.getFieldValue()));
        setIsModalVisible(false);
        return;
      }
      dispatch(createCategory(token, form.getFieldValue()));
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
      form.resetFields();
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
      okButtonProps={{ loading: status }}
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form {...formItemLayout} form={form}>
        <Form.Item
          label="ID"
          name="id"
          rules={[
            {
              required: true,
              message: "Bạn phải nhập id",
            },
          ]}
        >
          <Input size="large" placeholder="Nhập ID phân loại" prefix={<TagOutlined />} />
        </Form.Item>
        <Form.Item
          label="Mã Code"
          name="code"
          rules={[
            {
              required: true,
              message: "Bạn phải nhập Mã Code",
            },
          ]}
        >
          <Input size="large" placeholder="Nhập Mã Code" prefix={<MenuOutlined />} />
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
        <Form.Item label="Danh Mục Cha" name="parent_id">
          <Select
            size="large"
            placeholder="Chọn Danh Mục Cha"
            optionFilterProp="children"
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            filterSort={(optionA, optionB) => optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())}
          >
            {parentCat.length > 0
              ? parentCat.map((cat) => (
                  <Option key={cat.id} value={cat.id}>
                    {`ID${cat.id} - ${cat.name}`}
                  </Option>
                ))
              : null}
          </Select>
        </Form.Item>
        <Form.Item
          label="Mô Tả"
          name="description"
          rules={[
            {
              required: true,
              message: "Bạn phải nhập mô tả cho phân loại này",
            },
          ]}
        >
          <Input.TextArea size="large" placeholder="Nhập Mô Tả Cho Phân Loại" prefix={<FileTextOutlined />} />
        </Form.Item>
        {modalMode === "EDIT" ? (
          <Form.Item label="Trạng Thái Phân Loại" name="status">
            <Select
              size="large"
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
