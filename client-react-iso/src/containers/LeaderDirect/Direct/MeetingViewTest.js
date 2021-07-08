import React, { useState, useEffect } from "react";

import { Row, Col, Table } from "antd";
import { Card } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useRouteMatch } from "react-router-dom";
import { getMeetingList } from "@redux/meetings/actions";
import { getCategoryList } from "@redux/filterData/actions";
import { createMeetingColsFn } from "@config/tables/MeetingCols";
import drawerActions from "@redux/drawer/actions";
import useWindowSize from "@lib/hooks/useWindowSize";

import Box from "@components/utility/box";
import EditableCell from "@components/TableComp/EditableCell";
import EditableRow from "@components/TableComp/EditableRow";
import basicStyle from "@assets/styles/constants";
import { ButtonAdd } from "@components/Admin/ButtonAdd";

import "@assets/styles/containers/EditableCell.css";
import modalActions from "@redux/modal/actions";

export default function MeetingTableView() {
  const history = useHistory();
  const match = useRouteMatch();

  const { rowStyle, colStyle, gutter } = basicStyle;
  const organizations = useSelector((state) => state.adminUser.organizations);
  const meetings = useSelector((state) => state.directMeeting.meetings);
  const categories = useSelector((state) => state.filterData.categories);
  const token = useSelector((state) => state.Auth.idToken);
  const dispatch = useDispatch();

  const [cols, setCols] = useState([]);
  const [editGroup, setEditGroup] = useState();
  const [meetingTypes, setMeetingTypes] = useState([]);
  const [meetingDisplay, setMeetingDisplay] = useState([]);
  const [initModalProps, setInitModalProps] = useState();

  const size = useWindowSize();

  const handCallAddModal = () => {
    dispatch(
      modalActions.openModal({
        ...initModalProps,
        modalProps: { ...initModalProps.modalProps, title: "Tạo Mới Cuộc Họp", okText: "Thêm Mới", modalMode: "ADD" },
      })
    );
  };

  // Effect để lấy các dữ liệu từ api
  useEffect(() => {
    if (token && categories && categories.length === 0) {
      dispatch(getCategoryList(token));
    }
  }, [token, categories]);

  useEffect(() => {
    if (token && meetings && meetings.length === 0) {
      dispatch(getMeetingList(token));
    }
  }, [token, meetings]);

  // Sau khi có đủ các dữ liệu từ store thì set giá trị ban đầu cần truyền cho modal
  useEffect(() => {
    if (organizations?.[0] && meetingTypes?.[0] && meetings?.[0]) {
      setInitModalProps({
        modalType: "MEETING_ADD_EDIT_MODAL",
        modalProps: {
          organizations: organizations,
          meetingTypes: meetingTypes,
          meetings: meetings,
          width: size.width > 1200 ? size.width * 0.7 : size.width * 0.6,
          centered: true,
          initialValues: {},
          cancelText: "Bỏ Qua",
          destroyOnClose: true,
        },
      });
    }
  }, [organizations, meetingTypes, meetings]);

  // Effect để set cột lần đầu khi chưa có dữ liệu
  useEffect(() => {
    if (meetings?.[0] && categories?.[0]) {
      let newCols = createMeetingColsFn(handleChange, fnCallDrawer, handleMeetingRowClick);
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
    if (meetings?.[0]) {
      let newDisplayInfo = meetings.map((meeting) => {
        let _category = categories.find((cat) => "" + cat.id === "" + meeting.category);
        return { ...meeting, category: _category ? _category.name : "" };
      });
      setMeetingDisplay(newDisplayInfo);
    }
  }, [meetings]);

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

  useEffect(() => {
    if (categories.length > 0 && meetingTypes.length === 0) {
      setMeetingTypes(categories.filter((cat) => cat.parent_id === 4));
    }
  }, [categories]);

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
    <>
      <Row style={rowStyle} gutter={gutter} justify="start">
        <Col span={24} style={colStyle}>
          <Box>
            <Row>
              <Col md={24} sm={24} xs={24} style={{ padding: "0 8px" }}>
                <Card>
                  <Row>
                    <Col md={24} sm={24} xs={24}>
                      <ButtonAdd size="large" shape="round" type="link" onClick={handCallAddModal}>
                        + Thêm Mới
                      </ButtonAdd>
                    </Col>
                  </Row>
                  <br />
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
          </Box>
        </Col>
      </Row>
    </>
  );
}
