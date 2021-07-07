import { Modal } from "antd";

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
