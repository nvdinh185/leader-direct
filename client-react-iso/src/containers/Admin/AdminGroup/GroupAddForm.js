import React, { useState, useEffect } from "react";
import { Modal, Input, Form, Select } from "antd";
import Transfers from "@components/uielements/transfer";
import { UserOutlined, FileTextOutlined, IdcardOutlined } from "@ant-design/icons";
import { grantFunctionsToGroup, createFunctionGroup } from "@redux/adminUsers/actions";
import { useDispatch, useSelector } from "react-redux";

const { Option } = Select;

export default function GroupAddForm({
  auth,
  apis,
  menus,
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

  const [targetApiKeys, setTargetApiKeys] = useState([]);
  const [targetMenuKeys, setTargetMenuKeys] = useState([]);

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
      let newData = {
        ...form.getFieldValue(),
        function_apis: JSON.stringify(targetApiKeys.sort((a, b) => a - b)),
        menus_granted: JSON.stringify(targetMenuKeys.sort()),
      };
      if (initialValues && modalMode === "EDIT") {
        dispatch(grantFunctionsToGroup(token, newData));
        setIsModalVisible(false);
        return;
      }
      dispatch(createFunctionGroup(token, newData));
      setIsModalVisible(false);
    } catch (errorInfo) {
      console.log("Failed:", errorInfo);
    }
  };

  useEffect(() => {
    // Nếu mode là ADD thì reset form và xoá hết cái target của transfer đi
    if (modalMode === "ADD") {
      form.resetFields();
      setTargetApiKeys([]);
      setTargetMenuKeys([]);
      return;
    }
    // Nếu mode là EDIT thì set giá trị ban đầu cho form và init cái transfer lên
    if (initialValues && modalMode === "EDIT" && apis?.[0] && menus?.[0]) {
      form.resetFields();
      form.setFieldsValue({
        ...initialValues,
      });
      // Set giá trị đã có của cho target của transfer
      let apiArr = JSON.parse(initialValues.function_apis);
      let targetInitArr = apis.filter((api) => apiArr.includes(api.id)).map((item) => item.id);
      setTargetApiKeys(targetInitArr);
      let menuArr = JSON.parse(initialValues.menus_granted);
      let targetInitMenuArr = menus.filter((menu) => menuArr.includes(menu.id)).map((item) => item.id);
      setTargetMenuKeys(targetInitMenuArr);
    }
  }, [initialValues, modalMode, apis, menus]);

  const onChangeApi = (newTargetKeys, direction, moveKeys) => {
    console.log(newTargetKeys, direction, moveKeys);
    setTargetApiKeys(newTargetKeys);
  };

  const onChangeMenu = (newTargetKeys, direction, moveKeys) => {
    console.log(newTargetKeys, direction, moveKeys);
    setTargetMenuKeys(newTargetKeys);
  };

  return (
    <Modal
      {...props}
      // cancelButtonProps={{ block: true }}
      okButtonProps={{ loading: status }}
      visible={isModalVisible}
      style={{ height: "90vh", overflow: "auto" }}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form {...formItemLayout} form={form}>
        <Form.Item
          label="Tên Nhóm"
          name="name"
          rules={[
            {
              required: true,
              message: "Bạn phải nhập tên nhóm",
            },
          ]}
        >
          <Input size="large" placeholder="Nhập Tên Nhóm" prefix={<UserOutlined />} />
        </Form.Item>
        <Form.Item label="Gán API Cho Nhóm" prefix={<IdcardOutlined />}>
          <Transfers
            dataSource={apis}
            targetKeys={targetApiKeys}
            onChange={onChangeApi}
            rowKey={(item) => item.id}
            render={(item) => `${item.id} -- ${item.api_function}`}
            oneWay={true}
            showSearch={true}
            pagination
            listStyle={{
              width: 400,
              height: 300,
            }}
          />
        </Form.Item>
        <Form.Item label="Gán Menus Cho Nhóm" prefix={<IdcardOutlined />}>
          <Transfers
            dataSource={menus}
            targetKeys={targetMenuKeys}
            onChange={onChangeMenu}
            rowKey={(item) => item.id}
            render={(item) => `${item.id}. ${item.tag_id} -- ${item.name}`}
            oneWay={true}
            showSearch={true}
            pagination
            listStyle={{
              width: 400,
              height: 250,
            }}
          />
        </Form.Item>
        <Form.Item
          label="Mô Tả"
          name="description"
          rules={[
            {
              required: true,
              message: "Bạn phải nhập Mô Tả Nhóm",
            },
          ]}
        >
          <Input.TextArea size="large" placeholder="Nhập Mô Tả Cho Nhóm Này" prefix={<FileTextOutlined />} />
        </Form.Item>
        {modalMode === "EDIT" ? (
          <Form.Item label="Trạng Thái Nhóm" name="status">
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
