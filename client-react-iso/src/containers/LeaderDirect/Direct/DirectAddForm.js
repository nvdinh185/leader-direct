import React, { useEffect } from "react";
import { createDirect, updateDirect } from "@redux/directs/actions";
import { useDispatch, useSelector } from "react-redux";
import modalActions from "@redux/modal/actions";
import { Button, Input, Form, Select, Row, Col, Divider } from "antd";
import { TagOutlined, UserSwitchOutlined, FileTextOutlined, TeamOutlined, MessageOutlined } from "@ant-design/icons";

const { Option } = Select;

export default function DirectAddForm({
  meeting,
  directTypes,
  leaderTypes,
  organizations,
  modalMode,
  okText,
  initialValues,
  handleCancel,
  ...props
}) {
  console.log(meeting);
  const [form] = Form.useForm();
  const token = useSelector((state) => state.Auth.idToken);
  const status = useSelector((state) => state.directs.loading);

  const dispatch = useDispatch();

  const formItemLayout = {
    labelCol: { xs: { span: 24 }, sm: { span: 5 } },
    wrapperCol: { xs: { span: 24 }, sm: { span: 20 } },
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      console.log("Success:", values);
      // Nếu có initialValues tức là đang edit thì gọi hàm edit chứ đừng dại gọi add hì
      let newData = form.getFieldValue();
      if (initialValues && modalMode === "EDIT") {
        let newData = { ...form.getFieldValue(), id: initialValues.id };
        console.log(newData);
        dispatch(
          updateDirect(token, {
            ...newData,
            uuid: initialValues.uuid,
            meeting_id: initialValues.meeting_id,
            assessors: JSON.stringify(newData.assessors),
            executors: JSON.stringify(newData.executors),
          })
        );
        dispatch(modalActions.closeModal());
        return;
      }
      dispatch(
        createDirect(token, {
          ...newData,
          meeting_id: meeting.id,
          assessors: JSON.stringify(newData.assessors),
          executors: JSON.stringify(newData.executors),
        })
      );
      dispatch(modalActions.closeModal());
    } catch (errorInfo) {
      console.log("Failed:", errorInfo);
    }
  };

  // Effect thay đổi form khi dữ liệu có sự thay đổi (form ADD thì xoá hết đi, EDIT thì xoá rồi ghi các dữ liệu theo row)
  useEffect(() => {
    if (modalMode === "ADD") {
      form.resetFields();
      return;
    }
    if (Object.keys(initialValues).length > 0 && modalMode === "EDIT") {
      form.resetFields();
      form.setFieldsValue({
        ...initialValues,
      });
    }
  }, [initialValues, modalMode]);

  return (
    <>
      <Form {...formItemLayout} form={form}>
        <Form.Item
          label="Mô Tả"
          name="description"
          rules={[
            {
              required: true,
              message: "Bạn phải nhập mô tả cho chỉ đạo này",
            },
          ]}
        >
          <Input.TextArea size="large" placeholder="Nhập Mô Tả Cụ Thể Của Chỉ Đạo" prefix={<TagOutlined />} />
        </Form.Item>
        {/* // --------------------------------------------------------------------------------- */}

        <Form.Item
          label="Loại Chỉ Đạo"
          name="category"
          prefix={<FileTextOutlined />}
          rules={[
            {
              required: true,
              message: "Bạn phải chọn loại chỉ đạo",
            },
          ]}
        >
          <Select
            size="large"
            showSearch
            placeholder="Chọn Loại Chỉ Đạo"
            optionFilterProp="children"
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            filterSort={(optionA, optionB) => optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())}
          >
            {directTypes?.[0]
              ? directTypes.map((cat) => (
                  <Option key={cat.id} value={cat.id}>
                    {cat.name}
                  </Option>
                ))
              : null}
          </Select>
        </Form.Item>
        {/* // --------------------------------------------------------------------------------- */}

        <Form.Item
          label="Lãnh Đạo Chỉ Đạo"
          name="leader"
          prefix={<MessageOutlined />}
          rules={[
            {
              required: true,
              message: "Bạn Phải Chọn Lãnh Đạo",
            },
          ]}
        >
          <Select
            size="large"
            showSearch
            placeholder="Chọn Lãnh Đạo Chỉ Đạo"
            optionFilterProp="children"
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            filterSort={(optionA, optionB) => optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())}
          >
            {leaderTypes?.[0]
              ? leaderTypes.map((leader) => (
                  <Option key={leader.id} value={leader.id}>
                    {leader.name}
                  </Option>
                ))
              : null}
          </Select>
        </Form.Item>
        {/* // --------------------------------------------------------------------------------- */}

        <Form.Item
          label="Đơn Vị Đánh Giá"
          name="assessors"
          prefix={<TeamOutlined />}
          rules={[
            {
              required: true,
              message: "Bạn Phải Chọn Đơn Vị Đánh Giá",
            },
          ]}
        >
          <Select
            size="large"
            allowClear
            mode="multiple"
            showSearch
            placeholder="Chọn Đơn Vị Đánh Giá"
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

        {/* // --------------------------------------------------------------------------------- */}
        <Form.Item
          label="Đơn Vị Thực Hiện"
          name="executors"
          prefix={<UserSwitchOutlined />}
          rules={[
            {
              required: true,
              message: "Bạn Phải Chọn Đơn Vị Thực Hiện",
            },
          ]}
        >
          <Select
            size="large"
            mode="multiple"
            allowClear
            showSearch
            placeholder="Chọn Đơn Vị Đánh Giá"
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
        {/* // --------------------------------------------------------------------------------- */}

        {modalMode === "EDIT" ? (
          <Form.Item label="Trạng Thái Chỉ Đạo" name="status">
            <Select
              size="large"
              placeholder="Chọn Trạng Thái"
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
        {/* // --------------------------------------------------------------------------------- */}
        <Divider></Divider>
        <Row>
          <Col span={12}>
            <Button size={"large"} block type="default" onClick={handleCancel}>
              Bỏ Qua
            </Button>
          </Col>
          <Col span={12}>
            <Button loading={status} size={"large"} block type="primary" onClick={handleOk}>
              {okText}
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
}
