import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createColumnsFromObj } from "@lib/utils/antd-table";

import { Row, Col, Table } from "antd";
import EditableCell from "@components/TableComp/EditableCell";
import EditableRow from "@components/TableComp/EditableRow";
import useWindowSize from "@lib/hooks/useWindowSize";

export default function RpDirectAggTable() {
  const reportAgg = useSelector((state) => state.reports.reportAgg);
  // const [cols, setCols] = useState([]);

  // useEffect(() => {
  //   if (reportAgg?.[0] && cols.length === 0) {
  //     let newCols = createColumnsFromObj(reportAgg);
  //     setCols(newCols);
  //   }
  // }, [reportAgg]);

  const size = useWindowSize();

  const columns = [
    { title: "STT", dataIndex: "stt", key: "stt", width: "2%", align: "center" },
    { title: "Đơn Vị", dataIndex: "organization", key: "organization", width: "7%", align: "left" },
    { title: "Chỉ Đạo Được Giao", dataIndex: "countDirect", key: "countDirect", width: "3%", align: "center" },
    { title: "Hoàn Thành", dataIndex: "countDirectComplete", key: "countDirectComplete", width: "3%", align: "center" },
    {
      title: "Hoàn Thành Chưa Phê Duyệt",
      dataIndex: "countDirectCompleteNotAssess",
      key: "countDirectCompleteNotAssess",
      width: "3%",
      align: "center",
    },
    {
      title: "Hoàn Thành Chậm",
      dataIndex: "countDirectCompleteLate",
      key: "countDirectCompleteLate",
      width: "3%",
      align: "center",
    },
    { title: "Đang Thực Hiện", dataIndex: "countDirectOngoing", key: "countDirectOngoing", width: "3%", align: "center" },
    { title: "Đang Chậm", dataIndex: "countDirectOverdue", key: "countDirectOverdue", width: "3%", align: "center" },
    { title: "Chỉ Đạo Gia Hạn (lần 1)", dataIndex: "countDirectExt1", key: "countDirectOverdue", width: "3%", align: "center" },
    { title: "Chỉ Đạo Gia Hạn (lần 2)", dataIndex: "countDirectExt2", key: "countDirectOverdue", width: "3%", align: "center" },
    {
      title: "Chỉ Đạo Gia Hạn Hoàn Thành",
      dataIndex: "countDirectExtComplete",
      key: "countDirectExtComplete",
      width: "3%",
      align: "center",
    },
    {
      title: "Chỉ Đạo Gia Hạn Chưa Hoàn Thành",
      dataIndex: "countDirectExtNotComplete",
      key: "countDirectExtNotComplete",
      width: "3%",
      align: "center",
    },
    {
      title: "Chỉ Đạo Gia Hạn Đang Quá Hạn",
      dataIndex: "countDirectExtOverdue",
      key: "countDirectExtOverdue",
      width: "3%",
      align: "center",
    },
  ];

  return (
    <Table
      // loading={loading}
      childrenColumnName="antdChildren"
      columns={columns}
      bordered={true}
      rowClassName={() => "editable-row"}
      dataSource={reportAgg?.[0] ? reportAgg : []}
      scroll={{ y: "50vh" }}
      pagination={{
        pageSize: 30,
        showSizeChanger: true,
        pageSizeOptions: ["10", "20", "30", "50", "100"],
      }}
      rowKey="organization"
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
