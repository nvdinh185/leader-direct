import React, { useState, useEffect } from "react";

import { Row, Col, Table, Card } from "antd";
import { useDispatch, useSelector } from "react-redux";
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
import CatAddForm from "./CatAddForm";

import "@assets/styles/containers/EditableCell.css";
import { ButtonAdd } from "@components/Admin/ButtonAdd";

export default function AdminCategory() {
  const { rowStyle, colStyle, gutter } = basicStyle;
  const categories = useSelector((state) => state.filterData.categories);
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
    if (token && categories && categories.length === 0) {
      dispatch(getCategoryList(token));
    }
  }, [token, categories]);

  useEffect(() => {
    if (categories?.[0] && cols.length === 0) {
      let newCols = createColumnsFromObj(categories, handleChange);
      setCols(newCols);
    }
  }, [categories]);

  const handleChange = (row) => {
    setModalMode("EDIT");
    setEditMenu({ ...row });
  };

  useEffect(() => {
    if (editMenu) {
      setIsModalVisible(true);
    }
  }, [editMenu]);

  useEffect(() => {
    console.log(categories);
  }, [categories]);

  return (
    <LayoutWrapper>
      <PageHeader>{<IntlMessages id="admin.adminCategory" />}</PageHeader>
      <CatAddForm
        width={size.width > 1200 ? size.width * 0.5 : size.width * 0.4}
        modalMode={modalMode}
        initialValues={modalMode === "EDIT" ? editMenu : {}}
        okText={modalMode === "ADD" ? "Thêm Mới" : "Thay Đổi"}
        cancelText="Bỏ Qua"
        title="Tạo Mới Danh Mục"
        centered={true}
        destroyOnClose={true}
        isModalVisible={isModalVisible}
        handleCancel={handleCancel}
        setIsModalVisible={setIsModalVisible}
      ></CatAddForm>
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
                  {categories?.length > 0 ? (
                    <Table
                      // loading={loading}
                      columns={cols}
                      rowClassName={() => "editable-row"}
                      dataSource={categories && categories.length !== 0 ? categories : []}
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
                  ) : null}
                </Card>
              </Col>
            </Row>
          </Box>
        </Col>
      </Row>
    </LayoutWrapper>
  );
}
