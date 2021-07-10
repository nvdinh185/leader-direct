import React, { useState, useEffect } from "react";

import { useDispatch } from "react-redux";
import { useHistory, useRouteMatch } from "react-router-dom";
import { createMeetingColsFn } from "@config/tables/MeetingCols";
import drawerActions from "@redux/drawer/actions";
import modalActions from "@redux/modal/actions";

import { Row, Col, Table, Card } from "antd";
import Box from "@components/utility/box";
import EditableCell from "@components/TableComp/EditableCell";
import EditableRow from "@components/TableComp/EditableRow";
import basicStyle from "@assets/styles/constants";
import { ButtonAdd } from "@components/Admin/ButtonAdd";

import "@assets/styles/containers/EditableCell.css";

export default function MeetingTableView({ meetings, organizations, size, initModalProps, categories, ...props }) {
  const history = useHistory();
  const match = useRouteMatch();
  const dispatch = useDispatch();

  const [cols, setCols] = useState([]);
  const [editGroup, setEditGroup] = useState();
  const [meetingDisplay, setMeetingDisplay] = useState([]);

  const { rowStyle, colStyle, gutter } = basicStyle;

  // Effect để set cột lần đầu khi chưa có dữ liệu
  useEffect(() => {
    if (meetings?.[0] && categories) {
      let newCols = createMeetingColsFn(handleChange, fnCallDrawer, handleMeetingRowClick, categories);
      let newDisplayInfo = meetings.map((meeting) => {
        let _category = categories.find((cat) => "" + cat.id === "" + meeting.category);
        return { ...meeting, category: _category ? _category.name : "" };
      });
      setMeetingDisplay(newDisplayInfo);
      setCols(newCols);
    }
  }, [meetings, categories]);

  // Effect để cập nhập dữ liệu khi meetings thay đổi
  useEffect(() => {
    if ((meetings?.[0], categories?.[0])) {
      let newDisplayInfo = meetings.map((meeting) => {
        let _category = categories.find((cat) => "" + cat.id === "" + meeting.category);
        return { ...meeting, category: _category ? _category.name : "" };
      });
      setMeetingDisplay(newDisplayInfo);
    }
  }, [meetings, categories]);

  // Khi bấm vào nút sửa từng dòng làm cho editGroup thay đổi thì bắn dữ liệu vào modal
  useEffect(() => {
    if (editGroup) {
      dispatch(
        modalActions.openModal({
          ...initModalProps,
          modalProps: {
            ...initModalProps.modalProps,
            title: "Chỉnh Sửa Cuộc Họp",
            okText: "Thay Đổi",
            initialValues: editGroup,
            modalMode: "EDIT",
          },
        })
      );
    }
  }, [editGroup]);

  const fnCallDrawer = (record) => {
    dispatch(drawerActions.openDrawer({ drawerType: "MEETING_DETAIL_DRAWER", drawerProps: { meeting: record } }));
  };

  const handleChange = (row) => {
    let originMeeting = meetings.find((meet) => meet.id === row.id);
    setEditGroup({ ...originMeeting });
  };

  const handleMeetingRowClick = (record) => {
    history.push({ pathname: `${match.path}/${record.id}`, state: record });
  };

  return (
    <div style={{ padding: "0 15px 0 15px" }}>
      <Row style={rowStyle} gutter={gutter} justify="start">
        <Col span={24} style={colStyle}>
          <Card>
            <Table
              // loading={loading}
              columns={cols}
              rowClassName={() => "editable-row"}
              dataSource={meetingDisplay && meetingDisplay.length !== 0 ? meetingDisplay : null}
              scroll={{ y: 400 }}
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
          </Card>
        </Col>
      </Row>
    </div>
  );
}
