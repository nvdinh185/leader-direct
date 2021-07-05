import React, { useState, useEffect } from "react";

import { Row, Col, Button, Table } from "antd";
import { Card } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getMeetingList } from "@redux/meetings/actions";
import { getCategoryList } from "@redux/filterData/actions";
import { createColumnsFromObj } from "@lib/utils/antd-table";
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

export default function Meeting() {
  const { rowStyle, colStyle, gutter } = basicStyle;
  const organizations = useSelector((state) => state.adminUser.organizations);
  //   const categories = useSelector((state) => state.adminUser.categories);
  const meetings = useSelector((state) => state.directMeeting.meetings);
  const categories = useSelector((state) => state.filterData.categories);
  const token = useSelector((state) => state.Auth.idToken);
  const auth = useSelector((state) => state.Auth.data);
  const dispatch = useDispatch();

  const [cols, setCols] = useState([]);
  const [modalMode, setModalMode] = useState("ADD");
  const [editGroup, setEditGroup] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [meetingTypes, setMeetingTypes] = useState([]);
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

  useEffect(() => {
    if (meetings?.[0] && cols.length === 0) {
      let newCols = createColumnsFromObj(meetings, handleChange);
      setCols(newCols);
    }
  }, [meetings]);

  useEffect(() => {
    if (editGroup) {
      setIsModalVisible(true);
    }
  }, [editGroup]);

  useEffect(() => {
    if (categories.length > 0) {
      setMeetingTypes(categories.filter((cat) => cat.parent_id === 4));
    }
  }, [categories]);

  const handleChange = (row) => {
    setModalMode("EDIT");
    setEditGroup({ ...row });
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
                    dataSource={meetings && meetings.length !== 0 ? meetings : null}
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
