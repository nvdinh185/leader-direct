import React from "react";
import { Tooltip, Button, Tag, Space } from "antd";
import { EditOutlined, FileAddOutlined, EyeFilled } from "@ant-design/icons";
import DateCell from "@components/Admin/DateCell";
import { ButtonAdd } from "@components/Admin/ButtonAdd";
import { returnHexColor } from "@lib/utils/string";

export const createMeetingColsFn = (fnHandleChange, fnCallDrawer, handleMeetingRowClick, categories) => {
  return [
    {
      title: "Hành Động",
      key: "operation",
      fixed: true,
      width: 3,
      render: (text, record, idx) => (
        <Space>
          <Tooltip placement="topLeft" title={"Sửa Thông Tin Cuộc Họp"}>
            <Button type="primary" shape="round" icon={<EditOutlined />} onClick={() => fnHandleChange(record)}></Button>
          </Tooltip>
          <Tooltip placement="topLeft" title={"Thêm Chỉ Đạo Vào Cuộc Họp"}>
            <Button type="default" shape="round" icon={<FileAddOutlined />} onClick={() => fnCallDrawer(record)}></Button>
          </Tooltip>
          <Tooltip placement="topLeft" title={"Xem Chi Tiết Cuộc Họp"}>
            <ButtonAdd
              type="default"
              shape="round"
              icon={<EyeFilled />}
              color="#e9c46a"
              onClick={() => handleMeetingRowClick(record)}
            ></ButtonAdd>
          </Tooltip>
        </Space>
      ),
    },
    {
      title: "Mã ID",
      width: 1,
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên Cuộc Họp",
      width: 3,
      dataIndex: "name",
      key: "name",
      ellipsis: {
        showTitle: true,
      },
      render: (col) => (
        <Tooltip placement="topLeft" title={col}>
          {col}
        </Tooltip>
      ),
    },
    {
      title: "Mô Tả",
      width: 5,
      dataIndex: "description",
      key: "description",
      ellipsis: {
        showTitle: true,
      },
      render: (col) => (
        <Tooltip placement="topLeft" title={col}>
          {col}
        </Tooltip>
      ),
    },
    {
      title: "Phân Loại",
      width: 3,
      dataIndex: "category",
      key: "category",
      render: (col, record) => {
        let meetingCat = categories.find((cat) => cat.id === col);
        let bgColorCat = returnHexColor(meetingCat.bg_color);
        if (bgColorCat) {
          return <Tag color={bgColorCat}>{meetingCat.name}</Tag>;
        }
        return meetingCat.name;
      },
    },
    {
      title: "Số lượng Chỉ Đạo",
      width: 3,
      dataIndex: "directs",
      key: "directs",
      render: (col) => {
        let noDirect = col ? JSON.parse(col).length : 0;
        return noDirect;
      },
    },
    {
      title: "Ngày tạo",
      width: 3,
      dataIndex: "created_time",
      key: "created_time",
      render: (col) => {
        return <DateCell date={col} format="DD/MM/YYYY HH:mm"></DateCell>;
      },
    },
    {
      title: "TK Tạo",
      width: 3,
      dataIndex: "created_user",
      key: "created_user",
    },
    {
      title: "Trạng thái",
      width: 3,
      dataIndex: "status",
      key: "status",
      render: (col) => {
        return <Tag color={col === 1 ? "green" : "volcano"}>{col === 1 ? "Hoạt Động" : "Không Hoạt Động"}</Tag>;
      },
    },
  ];
};
