import React, { useState, useEffect, useCallback } from "react";

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
import PageHeader from "@components/utility/pageHeader";
import LayoutWrapper from "@components/utility/layoutWrapper";
import IntlMessages from "@components/utility/intlMessages";
import EditableCell from "@components/TableComp/EditableCell";
import EditableRow from "@components/TableComp/EditableRow";
import basicStyle from "@assets/styles/constants";
import MeetingAddForm from "./MeetingAddForm";
import { ButtonAdd } from "@components/Admin/ButtonAdd";

import "@assets/styles/containers/EditableCell.css";

export default function MeetingView() {
  const history = useHistory();
  const match = useRouteMatch();

  const { rowStyle, colStyle, gutter } = basicStyle;
  const organizations = useSelector((state) => state.adminUser.organizations);
  const meetings = useSelector((state) => state.directMeeting.meetings);
  const categories = useSelector((state) => state.filterData.categories);
  const token = useSelector((state) => state.Auth.idToken);
  const dispatch = useDispatch();

  const [cols, setCols] = useState([]);
  const [modalMode, setModalMode] = useState("ADD");
  const [editGroup, setEditGroup] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [meetingTypes, setMeetingTypes] = useState([]);
  const [meetingDisplay, setMeetingDisplay] = useState([]);

  const size = useWindowSize();

  const handCallAddModal = () => {
    setModalMode("ADD");
    showModal();
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

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

  // Effect để set cột lần đầu khi chưa có dữ liệu
  useEffect(() => {
    if (meetings?.[0] && cols.length === 0 && categories?.[0] && meetingDisplay.length === 0) {
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

  useEffect(() => {
    if (editGroup) {
      setIsModalVisible(true);
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
    setModalMode("EDIT");
    let originMeeting = meetings.find((meet) => meet.id === row.id);
    setEditGroup({ ...originMeeting });
  };

  const handleMeetingRowClick = (record) => {
    history.push({ pathname: `${match.path}/${record.id}`, state: record });
  };

  return (
    <LayoutWrapper>
      <PageHeader>{<IntlMessages id="sidebar.leaderMeeting" />}</PageHeader>
      <MeetingAddForm
        organizations={organizations}
        meetingTypes={meetingTypes}
        meetings={meetings}
        width={size.width > 1200 ? size.width * 0.7 : size.width * 0.6}
        modalMode={modalMode}
        initialValues={modalMode === "EDIT" ? editGroup : {}}
        okText={modalMode === "ADD" ? "Thêm Mới" : "Thay Đổi"}
        cancelText="Bỏ Qua"
        title={modalMode === "ADD" ? "Tạo Mới Cuộc Họp" : "Điều Chỉnh Cuộc Họp " + editGroup.id}
        centered={true}
        destroyOnClose={true}
        isModalVisible={isModalVisible}
        handleCancel={handleCancel}
        setIsModalVisible={setIsModalVisible}
      ></MeetingAddForm>
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
    </LayoutWrapper>
  );
}
