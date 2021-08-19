import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createColumnsFromObj } from "@lib/utils/antd-table";

import { Row, Col, Table, Tooltip, Tag } from "antd";
import EditableCell from "@components/TableComp/EditableCell";
import EditableRow from "@components/TableComp/EditableRow";
import useWindowSize from "@lib/hooks/useWindowSize";

export default function RpDirectDetailTable() {
  const reportDetail = useSelector((state) => state.reports.reportDetail);
  const statuses = useSelector((state) => state.filterData.statuses);

  const size = useWindowSize();

  const columns = [
    { title: "STT", dataIndex: "stt", key: "stt", width: "2%", align: "center" },
    { title: "Cuộc Họp", dataIndex: "meetingName", key: "meetingName", width: "7%", align: "left" },
    { title: "Lãnh Đạo Chỉ Đạo", dataIndex: "leaderName", key: "leaderName", width: "5%", align: "center" },
    { title: "Ngày Chỉ Đạo", dataIndex: "directDate", key: "directDate", width: "5%", align: "center" },
    {
      title: "Nội Dung Chỉ Đạo",
      dataIndex: "directDescription",
      key: "directDescription",
      width: "10%",
      align: "left",
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
      title: "Hạn Hoàn Thành",
      dataIndex: "dueDate",
      key: "dueDate",
      width: "5%",
      align: "center",
    },
    { title: "Đơn Vị Thực Hiện", dataIndex: "organization", key: "organization", width: "5%", align: "center" },
    {
      title: "Nội Dung Thực Hiện",
      dataIndex: "directExeDescription",
      key: "directExeDescription",
      width: "15%",
      align: "left",
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
      title: "Tiến Độ Xử Lý",
      dataIndex: "execStatus",
      key: "execStatus",
      width: "5%",
      align: "center",
      render: (col) => {
        let status = statuses.find((stt) => stt.name === col);
        return <Tag color={status.bg_color}>{col}</Tag>;
      },
    },
    {
      title: "Ngày Cập Nhập",
      dataIndex: "updatedTime",
      key: "updatedTime",
      width: "5%",
      align: "center",
    },
    {
      title: "Ngày Hoàn Thành",
      dataIndex: "completeTime",
      key: "completeTime",
      width: "5%",
      align: "center",
    },
  ];

  return (
    <Table
      // loading={loading}
      childrenColumnName="antdChildren"
      columns={columns}
      rowClassName={() => "editable-row"}
      dataSource={reportDetail?.[0] ? reportDetail : []}
      scroll={{ y: "50vh" }}
      pagination={{
        pageSize: 30,
        showSizeChanger: true,
        pageSizeOptions: ["10", "20", "30", "50", "100"],
      }}
      rowKey="_id"
      components={{
        body: {
          row: EditableRow,
          cell: EditableCell,
        },
      }}
      sticky
      scroll={{ x: size.width, y: size.height * 0.5 }}
    />
  );
}
