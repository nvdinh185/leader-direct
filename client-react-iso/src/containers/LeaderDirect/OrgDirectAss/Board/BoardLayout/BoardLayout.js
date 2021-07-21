import React, { useState, useEffect } from "react";
import * as COMMON from "@constants/common";
import moment from "moment";
import { connect } from "react-redux";
import { useSelector, useDispatch } from "react-redux";
import modalActions from "@redux/modal/actions";
import scrumBoardActions from "@redux/scrumBoard/actions";
import { getDirectExeByDOs, getFilterDirectOrgStart, setBoardUpdateArr } from "@redux/directOrgs/actions";

import "moment/locale/vi";
import locale from "antd/es/date-picker/locale/vi_VN";
import { Layout, Menu, Dropdown, Popover, Checkbox, Button, Form, Row, Col, DatePicker, Select } from "antd";
import PageHeader from "@components/utility/pageHeader";
import SearchInput from "@components/ScrumBoard/SearchInput/SearchInput";
import { variables } from "@assets/styles/variables";
import { Scrollbars } from "react-custom-scrollbars";
import { DateRangepicker } from "@components/uielements/datePicker";
import { Filters, Header, HeaderSecondary } from "./BoardLayout.style";
import { ButtonAdd } from "@components/Admin/ButtonAdd";
import { warningAlert } from "@components/AlertModal/ModalInfo";
import useWindowSize from "@lib/hooks/useWindowSize";

import "@assets/styles/containers/BoardLayout.css";
const { Option } = Select;
const { Content } = Layout;

const BoardLayout = ({ children, setSearchText, boards, currentBoard = "", openModal }) => {
  const token = useSelector((state) => state.Auth.idToken);
  const backgrounds = useSelector((state) => state.filterData.backgrounds);
  const organizations = useSelector((state) => state.adminUser.organizations);
  const directOrgs = useSelector((state) => state.directOrgs.directOrgs);
  const boardDOs = useSelector((state) => state.scrumBoard.tasks);
  const [backgroundUrl, setBackgroundUrl] = useState();
  const [form] = Form.useForm();

  const [monthPicked, setMonthPicked] = useState();
  const [isOpen, setIsOpen] = useState(false);

  const size = useWindowSize();

  const dispatch = useDispatch();

  function returnChangedDOArr(_directOrgs, _boardDOs) {
    let updateArr = _directOrgs.reduce((agg, directOrg) => {
      let boardItemStt = parseInt(boardDOs[directOrg.uuid].column_id.split("-")[1]);
      if (boardItemStt !== directOrg.exec_status) {
        return [...agg, { uuid: directOrg.uuid, exec_status: boardItemStt, description: directOrg.description }];
      }
      return agg;
    }, []);
    return updateArr;
  }

  function handleUpdateDOStatus() {
    let updateArr = returnChangedDOArr(directOrgs, boardDOs);
    if (updateArr.length > 0) {
      dispatch(
        openModal({
          modalType: COMMON.UPDATE_TASK_DESC_MODAL,
          modalProps: {
            width: size.width > 1200 ? size.width * 0.7 : size.width * 0.9,
            title: "Cập Nhập Trạng Thái Chỉ Đạo",
            updateArr: updateArr,
            centered: true,
            initialValues: {},
            okText: "Cập Nhập",
            cancelText: "Bỏ Qua",
            destroyOnClose: true,
          },
        })
      );
      return;
    }
    warningAlert("Thông Báo", "Bạn không thực hiện thay đổi gì cả!");
  }

  const handleChangeFilter = (e, mode) => {
    console.log(e);
  };

  // Khi có backgrounds trong store thì set riêng giá trị background
  useEffect(() => {
    if (backgrounds && backgrounds?.[0] && !backgroundUrl) {
      let bg = backgrounds.find((bg) => bg.code === COMMON.BG_DIRECT_ORG_ASS);
      if (bg.status == 1) {
        setBackgroundUrl(bg);
        return;
      }
    }
  }, [backgrounds]);

  // Mới vào chương trình thì chạy cái này để lấy chỉ đạo theo đơn vị của mình
  useEffect(() => {
    if (token) {
      dispatch(getFilterDirectOrgStart(token, { organization_role: [21], status: 1 }));
    }
  }, [token]);

  // Effect call khi có sự thay đổi directOrgs ở redux thì gọi API lấy lại direct exe
  useEffect(() => {
    if (directOrgs?.[0]) {
      let uuidArr = directOrgs.map((dO) => dO.uuid);
      dispatch(getDirectExeByDOs(token, { uuidArr }));
    }
  }, [directOrgs]);

  // Khi giá trị task trong board thay chuyển từ cột này qua cột khác thì dispatch function để update arr thay đổi
  useEffect(() => {
    if (Object.keys(boardDOs).length > 0) {
      let updateBoarArr = returnChangedDOArr(directOrgs, boardDOs);
      dispatch(setBoardUpdateArr(updateBoarArr));
    }
  }, [boardDOs]);

  return (
    <>
      <Layout
        style={{
          backgroundColor: `${variables.WHITE_COLOR}`,
          backgroundImage: backgroundUrl?.description ? backgroundUrl?.description : "",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <PageHeader style={{ marginBottom: "10px" }} titleColor={backgroundUrl?.text_color ? backgroundUrl.text_color : null}>
          {"Chỉ Đạo Của Đơn Vị"}
        </PageHeader>
        <HeaderSecondary>
          <SearchInput searchColor="white" onChange={(value) => setSearchText(value)} />
          {/* // --------------------------------------------------------------------------------- 
          // TODO: RENDER YOUR OWN FILTER HERE
          // ---------------------------------------------------------------------------------  */}
          <Form form={form}>
            <Filters>
              <Form.Item name="date_range">
                <Col span={24}>
                  <DateRangepicker
                    style={{
                      color: "white",
                      fontSize: "14px",
                      fontWeight: "bold",
                      border: "1px line white",
                      backgroundColor: "#ffffff2b",
                    }}
                    onChange={(e) => handleChangeFilter(e, "DATE_RANGE")}
                    locale={locale}
                    format="DD/MM/YYYY"
                    disabledDate={(date) => date > new Date()}
                  ></DateRangepicker>
                </Col>
              </Form.Item>
              <Form.Item name="date">
                <Col span={24}>
                  <DatePicker
                    onChange={(e) => {
                      console.log("CHANGED");
                    }}
                    format="MM/YYYY"
                    value={monthPicked}
                    locale={locale}
                    mode="month"
                    open={isOpen}
                    onOpenChange={() => {
                      setIsOpen(!isOpen);
                    }}
                    onPanelChange={(v) => {
                      let datepicked = v.startOf("month");
                      setMonthPicked(datepicked);
                      setIsOpen(false);
                    }}
                    onChange={() => {
                      if (monthPicked) {
                        setMonthPicked("");
                      }
                    }}
                    style={{
                      color: "white",
                      fontSize: "14px",
                      fontWeight: "bold",
                      border: "1px line white",
                      backgroundColor: "#ffffff2b",
                    }}
                    disabledDate={(date) => date > new Date()}
                    name="date"
                  ></DatePicker>
                </Col>
              </Form.Item>
              <Form.Item name="date">
                <Select mode="multiple" allowClear style={{ width: "100%" }} placeholder="Please select">
                  {organizations ? organizations.map((org, idx) => <Option key={idx} value={org.id}>{org.name}</Option>) : null}
                </Select>
              </Form.Item>
            </Filters>
          </Form>
          <ButtonAdd style={{ fontWeight: "bold" }} className="btnUpdateDOStatus" size="large" onClick={handleUpdateDOStatus}>
            Cập Nhập Dữ Liệu
          </ButtonAdd>
        </HeaderSecondary>

        <Content
          style={{
            padding: "0 24px",
            width: "100%",
          }}
        >
          <Scrollbars
            style={{
              width: "100%",
              height: "calc(100vh - 200px)",
            }}
            autoHide
          >
            {children}
          </Scrollbars>
        </Content>
      </Layout>
    </>
  );
};

export default connect(null, { ...modalActions, ...scrumBoardActions })(BoardLayout);
