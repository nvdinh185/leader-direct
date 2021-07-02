import React, { useState, useEffect } from "react";
import { Modal, Input, Form, Select } from "antd";
import { UserOutlined, TagOutlined, MenuOutlined, FileTextOutlined, IdcardOutlined } from "@ant-design/icons";
import { createGrantedUser, updateGrantedUser } from "@redux/adminUsers/actions";
import { useDispatch, useSelector } from "react-redux";
import Transfers from "@components/uielements/transfer";

const { Option } = Select;

export default function UserAddForm({
  organizations,
  apis,
  groups,
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
  const [targetApiKeys, setTargetApiKeys] = useState([]);

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
      let newData = {
        ...form.getFieldValue(),
        function_apis: JSON.stringify(targetApiKeys.sort((a, b) => a - b)),
      };
      if (initialValues && modalMode === "EDIT") {
        dispatch(updateGrantedUser(token, newData));
        setIsModalVisible(false);
        return;
      }
      dispatch(createGrantedUser(token, newData));
      setIsModalVisible(false);
    } catch (errorInfo) {
      console.log("Failed:", errorInfo);
    }
  };

  // Effect thay đổi form khi dữ liệu có sự thay đổi (form ADD thì xoá hết đi, EDIT thì xoá rồi ghi các dữ liệu theo row)
  useEffect(() => {
    if (modalMode === "ADD") {
      form.resetFields();
      setTargetApiKeys([]);

      return;
    }
    if (Object.keys(initialValues).length > 0 && modalMode === "EDIT") {
      form.resetFields();
      form.setFieldsValue({
        ...initialValues,
      });
      // Set giá trị đã có của cho target của transfer
      let groupId = JSON.parse(initialValues.function_groups)?.[0];
      let groupApis = JSON.parse(groups.find((group) => group.id === groupId).function_apis);
      let apiArr = JSON.parse(initialValues.function_apis).concat(groupApis);
      let targetInitArr = apis.filter((api) => apiArr.includes(api.id)).map((item) => item.id);
      setTargetApiKeys(targetInitArr);
    }
  }, [initialValues, modalMode]);

  const onChangeApi = (newTargetKeys, direction, moveKeys) => {
    console.log(newTargetKeys, direction, moveKeys);
    setTargetApiKeys(newTargetKeys);
  };

  return (
    <Modal
      {...props}
      // cancelButtonProps={{ block: true }}
      okButtonProps={{ loading: status }}
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      getContainer={false}
    >
      <Form {...formItemLayout} form={form}>
        <Form.Item label="Username" name="username" disabled>
          <Input
            disabled={modalMode === "ADD" ? false : true}
            size="large"
            placeholder="Tài Khoản Người Dùng"
            prefix={<UserOutlined />}
          />
        </Form.Item>
        <Form.Item label="Đơn Vị" name="organization" prefix={<IdcardOutlined />}>
          <Select
            size="large"
            showSearch
            placeholder="Chọn Đơn Vị"
            optionFilterProp="children"
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            filterSort={(optionA, optionB) => optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())}
          >
            {organizations?.[0]
              ? organizations.map((org) => (
                  <Option key={org.id} svalue={org.id}>
                    {org.name}
                  </Option>
                ))
              : null}
          </Select>
        </Form.Item>
        <Form.Item label="Nhóm Quyền" name="function_groups">
          <Select
            // defaultValue={initialValues && initialValues.function_groups?.[0] ? initialValues.function_groups[0] : null}
            size="large"
            showSearch
            placeholder="Chọn Nhóm Quyền"
            optionFilterProp="children"
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            filterSort={(optionA, optionB) => optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())}
          >
            {groups && groups.length > 0
              ? groups.map((group, idx) => <Option key={idx} value={`[${group.id}]`}>{`${group.id} - ${group.name}`}</Option>)
              : null}
          </Select>
        </Form.Item>
        <Form.Item label="Gán API Cho User" prefix={<IdcardOutlined />}>
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
        <Form.Item label="Mô Tả" name="description">
          <Input.TextArea size="large" placeholder="Nhập Mô Tả Cho Người Dùng" prefix={<FileTextOutlined />} />
        </Form.Item>
        {modalMode === "EDIT" ? (
          <Form.Item label="Trạng Thái User" name="status">
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
