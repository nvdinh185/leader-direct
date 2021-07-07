import React, { useState, useEffect } from "react";

import { Row, Col, Table, Card } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrganization } from "@redux/adminUsers/actions";
import { createColumnsFromObj } from "@lib/utils/antd-table";
import useWindowSize from "@lib/hooks/useWindowSize";

import Box from "@components/utility/box";
import PageHeader from "@components/utility/pageHeader";
import LayoutWrapper from "@components/utility/layoutWrapper";
import IntlMessages from "@components/utility/intlMessages";
import EditableCell from "@components/TableComp/EditableCell";
import EditableRow from "@components/TableComp/EditableRow";
import basicStyle from "@assets/styles/constants";
import OrgAddForm from "./OrgAddForm";

import "@assets/styles/containers/EditableCell.css";
import { ButtonAdd } from "@components/Admin/ButtonAdd";

export default function AdminOrg() {
  const { rowStyle, colStyle, gutter } = basicStyle;
  const organizations = useSelector((state) => state.adminUser.organizations);
  const auth = useSelector((state) => state.Auth.data);
  const token = useSelector((state) => state.Auth.idToken);
  const dispatch = useDispatch();

  const [cols, setCols] = useState([]);
  const [modalMode, setModalMode] = useState("ADD");
  const [editOrg, setEditOrg] = useState();
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
    if (token && organizations && organizations.length === 0) {
      dispatch(getAllOrganization(token));
    }
  }, [token, organizations]);

  useEffect(() => {
    if (organizations?.[0] && cols.length === 0) {
      let newCols = createColumnsFromObj(organizations, handleChange);
      setCols(newCols);
    }
  }, [organizations]);

  const handleChange = (row) => {
    setModalMode("EDIT");
    setEditOrg({ ...row });
  };

  useEffect(() => {
    if (editOrg) {
      setIsModalVisible(true);
    }
  }, [editOrg]);

  return (
    <LayoutWrapper>
      <PageHeader>{<IntlMessages id="sidebar.adminOrganization" />}</PageHeader>
      <OrgAddForm
        auth={auth}
        organizations={organizations}
        width={size.width > 1200 ? size.width * 0.5 : size.width * 0.4}
        modalMode={modalMode}
        initialValues={modalMode === "EDIT" ? editOrg : {}}
        okText={modalMode === "ADD" ? "Thêm Mới" : "Thay Đổi"}
        cancelText="Bỏ Qua"
        title="Tạo Mới Đơn Vị"
        centered={true}
        destroyOnClose={true}
        isModalVisible={isModalVisible}
        handleCancel={handleCancel}
        setIsModalVisible={setIsModalVisible}
      ></OrgAddForm>
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
                    dataSource={organizations && organizations.length !== 0 ? organizations : null}
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
