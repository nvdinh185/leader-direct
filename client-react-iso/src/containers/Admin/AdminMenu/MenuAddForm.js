import React from "react";
import { Row, Col, Button, Table, Modal, Input } from "antd";
import { UserOutlined } from "@ant-design/icons";

export default function MenuAddForm({ handleOk, handleCancel, isModalVisible, ...props }) {
  return (
    <Modal {...props} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
      <Input name="tag_id" size="large" placeholder="Nhập Tag ID" prefix={<UserOutlined />} onKeyUp={props.handleFormChange} />
      <br />
      <br />
      <Input
        name="page"
        size="large"
        placeholder="Nhập Page (Route URL)"
        prefix={<UserOutlined />}
        onKeyUp={props.handleFormChange}
      />
      <br />
      <br />
      <Input
        name="name"
        size="large"
        placeholder="Nhập Tên Hiển Thị"
        prefix={<UserOutlined />}
        onKeyUp={props.handleFormChange}
      />
      <br />
      <br />
      <Input
        name="description"
        size="large"
        placeholder="Nhập Mô Tả Cho Route"
        prefix={<UserOutlined />}
        onKeyUp={props.handleFormChange}
      />
    </Modal>
  );
}
