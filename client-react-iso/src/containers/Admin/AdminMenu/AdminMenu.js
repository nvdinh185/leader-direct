import React, { useState, useEffect } from "react";

import { Row, Col, Button, Table } from "antd";
import { Card } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getMenuApiAll } from "@redux/adminUsers/actions";
import { createColumnsFromObj } from "@lib/utils/antd-table";
import useWindowSize from "@lib/hooks/useWindowSize";

import Box from "@components/utility/box";
import PageHeader from "@components/utility/pageHeader";
import LayoutWrapper from "@components/utility/layoutWrapper";
import IntlMessages from "@components/utility/intlMessages";
import EditableCell from "@components/TableComp/EditableCell";
import EditableRow from "@components/TableComp/EditableRow";
import basicStyle from "@assets/styles/constants";
import MenuAddForm from "./MenuAddForm";

import "@assets/styles/containers/EditableCell.css";

export default function AdminUser() {
  const { rowStyle, colStyle, gutter } = basicStyle;
  const menus = useSelector((state) => state.adminUser.menus);
  const token = useSelector((state) => state.Auth.idToken);
  const dispatch = useDispatch();

  const [cols, setCols] = useState([]);
  const [modalMode, setModalMode] = useState("ADD");
  const [editMenu, setEditMenu] = useState();
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
    if (token && menus && menus.length === 0) {
      dispatch(getMenuApiAll(token));
    }
  }, [token, menus]);

  useEffect(() => {
    if (menus?.[0] && cols.length === 0) {
      let newCols = createColumnsFromObj(menus[0], handleChange);
      setCols(newCols);
    }
  }, [menus]);

  const handleChange = (row) => {
    setModalMode("EDIT");
    setEditMenu({ ...row });
  };

  useEffect(() => {
    if (editMenu) {
      setIsModalVisible(true);
    }
  }, [editMenu]);

  return (
    <LayoutWrapper>
      <PageHeader>{<IntlMessages id="sidebar.adminMenu" />}</PageHeader>
      <MenuAddForm
        width={size.width > 1200 ? size.width * 0.5 : size.width * 0.4}
        modalMode={modalMode}
        initialValues={modalMode === "EDIT" ? editMenu : {}}
        okText={modalMode === "ADD" ? "Thêm Mới" : "Thay Đổi"}
        cancelText="Bỏ Qua"
        title="Tạo Mới Menu"
        centered={true}
        destroyOnClose={true}
        isModalVisible={isModalVisible}
        handleCancel={handleCancel}
        setIsModalVisible={setIsModalVisible}
      ></MenuAddForm>
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
                    dataSource={menus && menus.length !== 0 ? menus : null}
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
