import React, { useState, useEffect } from "react";
import { Button, Input, Form, Select, Upload, message, Row, Col, Divider } from "antd";
import { TagOutlined, MenuOutlined, FileTextOutlined, InboxOutlined } from "@ant-design/icons";
import { createMeeting, updateMeeting } from "@redux/meetings/actions";
import { useDispatch, useSelector } from "react-redux";
import modalActions from "@redux/modal/actions";
import * as COMMON from "@constants/fileTypes";

const { Option } = Select;

export default function MeetingAddForm({
  meetingTypes,
  organizations,
  meetings,
  modalMode,
  okText,
  initialValues,
  handleCancel,
  ...props
}) {
  const [form] = Form.useForm();
  const token = useSelector((state) => state.Auth.idToken);
  const status = useSelector((state) => state.meetings.loading);

  const dispatch = useDispatch();

  const [fileList, setFileList] = useState([]);

  const uploadProps = {
    beforeUpload: (file) => {
      if (!COMMON.excelTypes.includes(file.type)) {
        message.error(`Định dạng ${file.type} không được hỗ trợ upload!`);
        return COMMON.excelTypes.includes(file.type) ? true : Upload.LIST_IGNORE;
      }
      setFileList([...fileList, file]);
      return false;
    },
    onRemove: (file) => {
      setFileList((_fileList) => {
        const index = _fileList.indexOf(file);
        const newFileList = _fileList.slice();
        newFileList.splice(index, 1);
        return newFileList;
      });
    },
    fileList: { fileList },
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const formItemLayout = {
    labelCol: { xs: { span: 24 }, sm: { span: 5 } },
    wrapperCol: { xs: { span: 24 }, sm: { span: 20 } },
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      console.log("Success:", values);
      // Nếu có initialValues tức là đang edit thì gọi hàm edit chứ đừng dại gọi add hì
      let newData = new FormData();
      for (let key of Object.keys(values)) {
        if (key === "dragger") {
          for (let file of fileList) {
            console.log("Called Add File");
            newData.append(`files["${file.uid}"]`, file);
          }
          continue;
        }
        newData.append(key, values[key]);
      }
      for (let pair of newData.entries()) {
        console.log(pair);
      }
      if (initialValues && modalMode === "EDIT") {
        newData.append("id", initialValues.id);
        dispatch(updateMeeting(token, newData));
        dispatch(modalActions.closeModal());
        return;
      }
      dispatch(createMeeting(token, newData));
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

  useEffect(() => {
    console.log(fileList);
  }, [fileList]);

  return (
    <>
      <Form {...formItemLayout} form={form}>
        <Form.Item
          label="Tên Cuộc Họp"
          name="name"
          rules={[
            {
              required: true,
              message: "Bạn phải nhập tên cuộc họp",
            },
          ]}
        >
          <Input
            disabled={modalMode === "ADD" ? false : true}
            size="large"
            placeholder="Nhập Tên Cuộc Họp"
            prefix={<MenuOutlined />}
          />
        </Form.Item>
        {/* // --------------------------------------------------------------------------------- */}

        <Form.Item label="Cuộc Họp" name="category" prefix={<FileTextOutlined />}>
          <Select
            size="large"
            showSearch
            placeholder="Chọn Loại Cuộc Họp"
            optionFilterProp="children"
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            filterSort={(optionA, optionB) => optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())}
          >
            {meetingTypes?.[0]
              ? meetingTypes.map((cat) => (
                  <Option key={cat.id} value={cat.id}>
                    {cat.name}
                  </Option>
                ))
              : null}
          </Select>
        </Form.Item>

        {/* // --------------------------------------------------------------------------------- */}

        <Form.Item label="File Đính Kèm">
          <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
            <Upload.Dragger name="files" {...uploadProps}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-hint">Click hoặc kéo thả để upload file.</p>
            </Upload.Dragger>
          </Form.Item>
        </Form.Item>
        {/* // --------------------------------------------------------------------------------- */}

        <Form.Item
          label="Mô Tả"
          name="description"
          rules={[
            {
              required: true,
              message: "Bạn phải nhập mô tả cho danh mục này",
            },
          ]}
        >
          <Input.TextArea size="large" placeholder="Nhập Mô Tả Cho Cuộc Họp" prefix={<TagOutlined />} />
        </Form.Item>
        {/* // --------------------------------------------------------------------------------- */}

        {modalMode === "EDIT" ? (
          <Form.Item
            label="Trạng Thái Danh Mục"
            name="status"
            rules={[
              {
                required: true,
                message: "Bạn phải nhập mô tả cho route này",
              },
            ]}
          >
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
