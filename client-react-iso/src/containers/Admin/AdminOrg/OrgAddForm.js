import React, { useEffect } from "react";
import { Modal, Input, Form, Select } from "antd";
import { UserOutlined, FileTextOutlined } from "@ant-design/icons";
import { createOrganization, updateOrganization } from "@redux/adminUsers/actions";
import { useDispatch, useSelector } from "react-redux";

const { Option } = Select;

export default function OrgAddForm({
  auth,
  organizations,
  modalMode,
  initialValues,
  handleCancel,
  isModalVisible,
  setIsModalVisible,
  ...props
}) {
  const [form] = Form.useForm();
  const token = useSelector((state) => state.Auth.idToken);
  const status = useSelector((state) => state.adminUser.loading);

  const dispatch = useDispatch();

  const formItemLayout = {
    labelCol: { xs: { span: 24 }, sm: { span: 5 } },
    wrapperCol: { xs: { span: 24 }, sm: { span: 20 } },
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      console.log("Success:", values);
      // TODO: Send dữ liệu về server và thông báo kết quả
      // Nếu có initialValues tức là đang edit thì gọi hàm edit chứ đừng dại gọi add hì
      if (initialValues && modalMode === "EDIT") {
        dispatch(updateOrganization(token, form.getFieldValue()));
        setIsModalVisible(false);
        return;
      }
      dispatch(createOrganization(token, { ...form.getFieldValue(), status: 1, updated_user: auth.username }));
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

  return (
    <Modal
      {...props}
      // cancelButtonProps={{ loading: status }}
      okButtonProps={{ loading: status }}
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form {...formItemLayout} form={form}>
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
          <Input size="large" placeholder="Nhập Mã Đơn Vị" prefix={<UserOutlined />} />
        </Form.Item>
        <br></br>
        <Form.Item
          label="Mã Đơn Vị"
          name="code"
          rules={[
            {
              required: true,
              message: "Bạn phải nhập mã cho đơn vị này",
            },
          ]}
        >
          <Input size="large" placeholder="Nhập mã đơn vị" prefix={<FileTextOutlined />} />
        </Form.Item>
        <br></br>

        <Form.Item label="Đơn Vị Cấp Cha" name="parent_id">
          <Select
            size="large"
            placeholder="Chọn Đơn Vị Cấp Cha"
            optionFilterProp="children"
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            filterSort={(optionA, optionB) => optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())}
          >
            {organizations?.[0]
              ? organizations.map((org) => (
                  <Option key={org.id} value={org.id}>
                    {org.name}
                  </Option>
                ))
              : null}
          </Select>
        </Form.Item>
        <br></br>

        {modalMode === "EDIT" ? (
          <Form.Item label="Trạng Thái Menu" name="status">
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
