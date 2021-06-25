import React, { useState, useEffect } from "react";
import { Row, Col, Button, Table } from "antd";
import { Card } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getGrantedUserList } from "@redux/adminUsers/actions";
import Box from "@components/utility/box";
import PageHeader from "@components/utility/pageHeader";
import LayoutWrapper from "@components/utility/layoutWrapper";
import ContentHolder from "@components/utility/contentHolder";
import IntlMessages from "@components/utility/intlMessages";
import EditableCell from "@components/TableComp/EditableCell";
import EditableRow from "@components/TableComp/EditableRow";
import basicStyle from "@assets/styles/constants";
import { createColumnsFromObjOrConfig } from "@lib/utils/antd-table";

export default function AdminUser() {
  const { rowStyle, colStyle, gutter } = basicStyle;
  const users = useSelector((state) => state.adminUser.users);
  const token = useSelector((state) => state.Auth.idToken);
  const [cols, setCols] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token && users && users.length === 0) {
      dispatch(getGrantedUserList(token));
    }
  }, [token, users]);

  useEffect(() => {
    if (users?.[0] && cols.length === 0) {
      let newCols = createColumnsFromObjOrConfig(users[0], null, null, null);
      setCols(newCols);
    }
  }, [users]);

  return (
    <LayoutWrapper>
      <PageHeader>{<IntlMessages id="sidebar.adminUser" />}</PageHeader>
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
                    dataSource={users && users.length !== 0 ? users : null}
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
