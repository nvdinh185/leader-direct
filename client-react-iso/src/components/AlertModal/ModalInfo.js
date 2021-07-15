import React from "react";
import { Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

export function successAlert(_title, _content) {
  Modal.success({
    title: _title,
    content: _content,
  });
}

export function errorAlert(_title, _content) {
  Modal.error({
    title: _title,
    content: _content,
  });
}

export function warningAlert(_title, _content) {
  Modal.warning({
    title: _title,
    content: _content,
  });
}

export function confirmAlert(_title, _content, onOk) {
  Modal.confirm({
    title: _title,
    icon: <ExclamationCircleOutlined />,
    content: _content,
    okText: "Chấp Nhận",
    cancelText: "Bỏ Qua",
    onOk: onOk,
  });
}
