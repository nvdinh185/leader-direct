import React from "react";
import { Space, Tag, Tooltip } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

export default function BadgeAttach({ uuid, handleDeleteAttachMent, ...props }) {
  return (
    <Tag color={props.color ? props.color : "green"}>
      <Space>
        {props.fileType ? props.fileType : null} <>{props.fileName}</>
        <Tooltip title="Xoá Tệp Đính Kèm">
          <DeleteOutlined onClick={() => handleDeleteAttachMent(uuid)} />
        </Tooltip>
      </Space>
    </Tag>
  );
}
