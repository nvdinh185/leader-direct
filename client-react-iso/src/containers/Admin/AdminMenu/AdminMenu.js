import React, { useState, useEffect } from "react";
import { Row, Col, Button, Table } from "antd";
import { Card } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getMenuApiAll } from "@redux/adminUsers/actions";
import Box from "@components/utility/box";
import PageHeader from "@components/utility/pageHeader";
import LayoutWrapper from "@components/utility/layoutWrapper";
import IntlMessages from "@components/utility/intlMessages";
import EditableCell from "@components/TableComp/EditableCell";
import EditableRow from "@components/TableComp/EditableRow";
import basicStyle from "@assets/styles/constants";
import { createColumnsFromObjOrConfig } from "@lib/utils/antd-table";

export default function AdminUser() {
  const { rowStyle, colStyle, gutter } = basicStyle;
  const menus = useSelector((state) => state.adminUser.menus);
  const token = useSelector((state) => state.Auth.idToken);
  const [cols, setCols] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token && menus && menus.length === 0) {
      dispatch(getMenuApiAll(token));
    }
  }, [token, menus]);

  useEffect(() => {
    if (menus?.[0] && cols.length === 0) {
      let newCols = createColumnsFromObjOrConfig(menus[0], null, null, null);
      setCols(newCols);
    }
  }, [menus]);

  return (
    <LayoutWrapper>
      <PageHeader>{<IntlMessages id="sidebar.adminMenu" />}</PageHeader>
      <Row style={rowStyle} gutter={gutter} justify="start">
        <Col span={24} style={colStyle}>
          <Box
          // title={<h2>Danh Sách Người Dùng</h2>}
          // subtitle={<IntlMessages id="uiElements.cards.gridCardSubTitle" />}
          >
            {/* <ContentHolder style={{ overflow: "hidden" }}>
              
            </ContentHolder> */}
            <Row>
              <Col md={24} sm={24} xs={24} style={{ padding: "0 8px" }}>
                <Card
                  title={
                    <Button type="link" style={{ background: "#87d068", color: "white" }}>
                      + Thêm Mới
                    </Button>
                  }
                >
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
                    rowKey="fid"
                    components={{
                      body: {
                        row: EditableRow,
                        cell: EditableCell,
                      },
                    }}
                    // sticky
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
