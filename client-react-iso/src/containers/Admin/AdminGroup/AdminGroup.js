import React, { useState, useEffect } from "react";

import { Row, Col, Button, Table } from "antd";
import { Card } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getGrantedGroups } from "@redux/adminUsers/actions";
import { createColumnsFromObj } from "@lib/utils/antd-table";
import useWindowSize from "@lib/hooks/useWindowSize";

import Box from "@components/utility/box";
import PageHeader from "@components/utility/pageHeader";
import LayoutWrapper from "@components/utility/layoutWrapper";
import IntlMessages from "@components/utility/intlMessages";
import EditableCell from "@components/TableComp/EditableCell";
import EditableRow from "@components/TableComp/EditableRow";
import basicStyle from "@assets/styles/constants";
import GroupAddForm from "./GroupAddForm";

import "@assets/styles/containers/EditableCell.css";

export default function AdminUser() {
  const { rowStyle, colStyle, gutter } = basicStyle;
  const groups = useSelector((state) => state.adminUser.groups);
  const apis = useSelector((state) => state.adminUser.apis);
  const menus = useSelector((state) => state.adminUser.menus);
  const token = useSelector((state) => state.Auth.idToken);
  const auth = useSelector((state) => state.Auth.data);
  const dispatch = useDispatch();

  const [cols, setCols] = useState([]);
  const [modalMode, setModalMode] = useState("ADD");
  const [editGroup, setEditGroup] = useState();
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
    if (token && groups && groups.length === 0) {
      dispatch(getGrantedGroups(token));
    }
  }, [token, groups]);

  useEffect(() => {
    if (groups?.[0] && cols.length === 0) {
      let newCols = createColumnsFromObj(groups, handleChange);
      setCols(newCols);
    }
  }, [groups]);

  const handleChange = (row) => {
    setModalMode("EDIT");
    setEditGroup({ ...row });
  };

  useEffect(() => {
    if (editGroup) {
      setIsModalVisible(true);
    }
  }, [editGroup]);

  return (
    <LayoutWrapper>
      <PageHeader>{<IntlMessages id="sidebar.adminUserGroup" />}</PageHeader>
      <GroupAddForm
        auth={auth}
        apis={apis}
        menus={menus}
        width={size.width > 1200 ? size.width * 0.8 : size.width * 0.7}
        modalMode={modalMode}
        initialValues={modalMode === "EDIT" ? editGroup : {}}
        okText={modalMode === "ADD" ? "Thêm Mới" : "Thay Đổi"}
        cancelText="Bỏ Qua"
        title={modalMode === "ADD" ? "Tạo Mới Group" : "Điều Chỉnh Group ID " + editGroup.id}
        centered={true}
        destroyOnClose={true}
        isModalVisible={isModalVisible}
        handleCancel={handleCancel}
        setIsModalVisible={setIsModalVisible}
      ></GroupAddForm>
      <Row style={rowStyle} gutter={gutter} justify="start">
        <Col span={24} style={colStyle}>
          <Box>
            <Row>
              <Col md={24} sm={24} xs={24} style={{ padding: "0 8px" }}>
                <Card>
                  <Row>
                    <Col md={24} sm={24} xs={24}>
                      <Button
                        size="large"
                        shape="round"
                        type="link"
                        style={{ background: "#87d068", color: "white" }}
                        onClick={handCallAddModal}
                      >
                        + Thêm Mới
                      </Button>
                    </Col>
                  </Row>
                  <br />
                  <Table
                    // loading={loading}
                    columns={cols}
                    rowClassName={() => "editable-row"}
                    dataSource={groups && groups.length !== 0 ? groups : null}
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
