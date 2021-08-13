import React, { useState, useEffect } from "react";
import * as COMMON from "@constants/common";
import moment from "moment";
import { connect } from "react-redux";
import { useSelector, useDispatch } from "react-redux";
import modalActions from "@redux/modal/actions";
import scrumBoardActions from "@redux/scrumBoard/actions";
import { filterOrgRedux, getFilterDirectAss } from "@redux/directAsses/actions";
import { getDirectExeByDOs } from "@redux/directOrgs/actions";

import "moment/locale/vi";
import locale from "antd/es/date-picker/locale/vi_VN";
import { Layout, Dropdown, Popover, DatePicker, Select, Row, Spin } from "antd";
import PageHeader from "@components/utility/pageHeader";
import SearchInput from "@components/ScrumBoard/SearchInput/SearchInput";
import { variables } from "@assets/styles/variables";
import { Scrollbars } from "react-custom-scrollbars";
import { DateRangepicker } from "@components/uielements/datePicker";
import { Filters, HeaderSecondary } from "./BoardLayout.style";
import useWindowSize from "@lib/hooks/useWindowSize";

import "@assets/styles/containers/BoardLayout.css";
import { returnFromToUnixFromMomentMonth } from "@lib/utils/date";
const { Option } = Select;
const { Content } = Layout;

const BoardLayout = ({ children, setSearchText, boards, currentBoard = "", openModal }) => {
  const token = useSelector((state) => state.Auth.idToken);
  const userInfo = useSelector((state) => state.Auth.grantedUserInfo);
  const directAsses = useSelector((state) => state.directAsses.directAssesFilter);
  const backgrounds = useSelector((state) => state.filterData.backgrounds);
  const organizations = useSelector((state) => state.adminUser.organizations);
  const directOrgs = useSelector((state) => state.directOrgs.directOrgs);
  const loading = useSelector((state) => state.directAsses.loading);
  const dispatch = useDispatch();

  const [backgroundUrl, setBackgroundUrl] = useState();
  const [monthPicked, setMonthPicked] = useState(moment(new Date()));
  const [fromToPicked, setFromToPicked] = useState([]);
  const [selectedOrg, setSelectedOrg] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const size = useWindowSize();

  const handleChangeFilter = (e, mode) => {
    switch (mode) {
      case "DATE_RANGE":
        if (e) {
          // TODO: dispatch action to filter data here
          // Khi date range thay đổi thì bỏ month pick đi
          setMonthPicked("");
          setFromToPicked([e[0].startOf("day"), e[1].endOf("day")]);
          let dateRange = [e[0].startOf("day"), e[1].endOf("day")];
          let dateRangeUnix = [moment(dateRange[0]).valueOf(), moment(dateRange[1]).valueOf()];
          dispatch(getFilterDirectAss(token, { created_time: { from: dateRangeUnix[0], to: dateRangeUnix[1] } }));
        }
        break;
      case "SELECT":
        // TODO: chỗ này thì gọi action để filter dữ liệu trong redux store (vì chắc chắn dữ liệu đã có rồi)
        setSelectedOrg(e);
        break;
      case "MONTH":
        // TODO: dispatch action to filter data here
        // Khi chọn month thì dẹp date range đi
        setFromToPicked([]);
        setMonthPicked(e);
        const newMonth = moment(e);
        const { from, to } = returnFromToUnixFromMomentMonth(newMonth.startOf("month"));
        dispatch(getFilterDirectAss(token, { created_time: { from: from, to: to } }));
        setIsOpen(false);
        break;
      default:
        break;
    }
  };

  // Effect theo dõi sự thay đổi của select org rồi dispatch action để thay đổi
  useEffect(() => {
    // Nếu có sự thay đổi của dữ liệu dass thì cũng dispatch cái để thay đổi select org này
    if (directAsses?.[0]) {
      dispatch(filterOrgRedux(selectedOrg));
      return;
    }
    dispatch(filterOrgRedux(selectedOrg));
  }, [selectedOrg, directAsses]);

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
    const newMonth = moment(new Date());
    const { from, to } = returnFromToUnixFromMomentMonth(newMonth.startOf("month"));
    if (token && userInfo) {
      if (userInfo.isAdmin) {
        dispatch(getFilterDirectAss(token, { created_time: { from: from, to: to } }));
        return;
      }
      dispatch(getFilterDirectAss(token, { created_time: { from: from, to: to }, organization_ass: userInfo.organization }));
    }
  }, [token, userInfo]);

  // Effect call khi có sự thay đổi directOrgs ở redux thì gọi API lấy lại direct exe
  useEffect(() => {
    if (directOrgs?.[0]) {
      let uuidArr = directOrgs.map((dO) => dO.uuid);
      dispatch(getDirectExeByDOs(token, { uuidArr }));
    }
  }, [directOrgs]);

  // Khi selectedorg thay đổi thì kéo theo sự thay đổi của dass filter luôn

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
          <Row style={{ width: "100%", justifyContent: "space-between" }}>
            <SearchInput searchColor="white" onChange={(value) => setSearchText(value)} />
            <Filters>
              <DateRangepicker
                value={fromToPicked}
                style={{
                  height: "33px",
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
                  handleChangeFilter(v, "MONTH");
                }}
                onChange={() => {
                  if (monthPicked) {
                    setMonthPicked("");
                  }
                }}
                style={{
                  height: "33px",
                  color: "white",
                  fontSize: "14px",
                  fontWeight: "bold",
                  border: "1px line white",
                  backgroundColor: "#ffffff2b",
                }}
                disabledDate={(date) => date > new Date()}
                name="date"
              ></DatePicker>
              <Select
                className="select-org-board"
                placeholder="Chọn Đơn Vị"
                maxTagTextLength={10}
                maxTagCount={4}
                value={selectedOrg}
                onChange={(v) => handleChangeFilter(v, "SELECT")}
                mode="multiple"
                allowClear
                style={{ minWidth: "200px", maxWidth: "60%", minHeight: "35px" }}
              >
                {organizations
                  ? organizations.map((org, idx) => (
                      <Option key={idx} value={org.id}>
                        {org.name}
                      </Option>
                    ))
                  : null}
              </Select>
            </Filters>
            {/* <ButtonAdd style={{ fontWeight: "bold" }} className="btnUpdateDOStatus" size="large" onClick={handleUpdateDOStatus}>
              Cập Nhập Dữ Liệu
            </ButtonAdd> */}
          </Row>
        </HeaderSecondary>
        {loading ? (
          <Spin tip="Đang tải dữ liệu">
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
          </Spin>
        ) : (
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
        )}
      </Layout>
    </>
  );
};

export default connect(null, { ...modalActions, ...scrumBoardActions })(BoardLayout);
