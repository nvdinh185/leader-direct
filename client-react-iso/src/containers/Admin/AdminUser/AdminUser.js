import React, { useState, useEffect } from "react";

import { Row, Col, Button, Table } from "antd";
import { Card } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getGrantedUserList, getGrantedGroups } from "@redux/adminUsers/actions";
import { createColumnsFromObj } from "@lib/utils/antd-table";
import useWindowSize from "@lib/hooks/useWindowSize";

import Box from "@components/utility/box";
import PageHeader from "@components/utility/pageHeader";
import LayoutWrapper from "@components/utility/layoutWrapper";
import IntlMessages from "@components/utility/intlMessages";
import EditableCell from "@components/TableComp/EditableCell";
import EditableRow from "@components/TableComp/EditableRow";
import basicStyle from "@assets/styles/constants";
import UserAddForm from "./UserAddForm";

import "@assets/styles/containers/EditableCell.css";

export default function AdminUser() {
  const { rowStyle, colStyle, gutter } = basicStyle;
  const apis = useSelector((state) => state.adminUser.apis);
  const users = useSelector((state) => state.adminUser.users);
  const groups = useSelector((state) => state.adminUser.groups);
  const organizations = useSelector((state) => state.adminUser.organizations);
  const token = useSelector((state) => state.Auth.idToken);
  const dispatch = useDispatch();

  const [cols, setCols] = useState([]);
  const [modalMode, setModalMode] = useState("ADD");
  const [editUser, setEditUser] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
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
    if (token && users && users.length === 0 && groups.length === 0) {
      dispatch(getGrantedUserList(token));
      dispatch(getGrantedGroups(token));
    }
  }, [token, users, groups]);

  useEffect(() => {
    if (users?.[0] && cols.length === 0) {
      let newCols = createColumnsFromObj(users, handleChange);
      setCols(newCols);
    }
  }, [users]);

  const handleChange = (row) => {
    setModalMode("EDIT");
    setEditUser({ ...row });
  };

  useEffect(() => {
    if (editUser) {
      setIsModalVisible(true);
    }
  }, [editUser]);

  return (
    <LayoutWrapper>
      <PageHeader>{<IntlMessages id="sidebar.adminUser" />}</PageHeader>
      <UserAddForm
        organizations={organizations}
        apis={apis}
        groups={groups}
        width={size.width > 1200 ? size.width * 0.8 : size.width * 0.7}
        modalMode={modalMode}
        initialValues={modalMode === "EDIT" ? editUser : {}}
        okText={modalMode === "ADD" ? "Thêm Mới" : "Thay Đổi"}
        cancelText="Bỏ Qua"
        title="Tạo Mới Menu"
        centered={true}
        destroyOnClose={true}
        isModalVisible={isModalVisible}
        handleCancel={handleCancel}
        setIsModalVisible={setIsModalVisible}
      ></UserAddForm>

      <Row style={rowStyle} gutter={gutter} justify="start">
        <Col span={24} style={colStyle}>
          <Box>
            <Row>
              <Col md={24} sm={24} xs={24} style={{ padding: "0 8px" }}>
                <Card
                  title={
                    <Button
                      size="large"
                      shape="round"
                      type="link"
                      style={{ background: "#87d068", color: "white" }}
                      onClick={handCallAddModal}
                    >
                      + Thêm Mới
                    </Button>
                  }
                >
                  <Table
                    // loading={loading}
                    columns={cols}
                    rowClassName={() => "editable-row"}
                    dataSource={users && users.length !== 0 ? users : null}
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
                    scroll={{ x: size.width }}
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
