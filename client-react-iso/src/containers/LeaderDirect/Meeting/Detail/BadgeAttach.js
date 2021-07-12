import React from "react";
import { Space, Tag, Tooltip } from "antd";
import { DeleteOutlined, DownloadOutlined } from "@ant-design/icons";

export default function BadgeAttach({ uuid, url, handleDeleteAttachMent, handleDownloadAttachment, ...props }) {
  return (
    <Tag color={props.color ? props.color : "green"}>
      <Space>
        {props.children}
        <>{props.fileName}</>
        <Tooltip title="Xoá Tệp Đính Kèm">
          <DeleteOutlined onClick={() => handleDeleteAttachMent(uuid)} />
        </Tooltip>
        <Tooltip title="Download Tệp Đính Kèm">
          <DownloadOutlined onClick={() => handleDownloadAttachment(uuid, url, props.fileType, props.fileName)} />
        </Tooltip>
      </Space>
    </Tag>
  );
}
