import React, { useState, useEffect, useRef } from "react";
import * as COMMON from "@constants/common";
import moment from "moment";
import { connect } from "react-redux";
import { useSelector, useDispatch } from "react-redux";
import modalActions from "@redux/modal/actions";
import scrumBoardActions from "@redux/scrumBoard/actions";
import { filterDirectOrgRedux, getFilterDirectOrg, setBoardUpdateArr } from "@redux/directOrgs/actions";

import "moment/locale/vi";
import locale from "antd/es/date-picker/locale/vi_VN";
import { Layout, Row, DatePicker, Select, Spin } from "antd";
import PageHeader from "@components/utility/pageHeader";
import SearchInput from "@components/ScrumBoard/SearchInput/SearchInput";
import { variables } from "@assets/styles/variables";
import { Scrollbars } from "react-custom-scrollbars";
import { DateRangepicker } from "@components/uielements/datePicker";

import "@assets/styles/containers/BoardLayout.css";

import { Filters, HeaderSecondary } from "./BoardLayout.style";
import { ButtonAdd } from "@components/Admin/ButtonAdd";
import { warningAlert } from "@components/AlertModal/ModalInfo";
import useWindowSize from "@lib/hooks/useWindowSize";
import { returnFromToUnixFromMomentMonth } from "@lib/utils/date";

const { Option } = Select;
const { Content } = Layout;

const BoardLayout = ({ children, setSearchText, boards, currentBoard = "", openModal }) => {
  const backgrounds = useSelector((state) => state.filterData.backgrounds);
  const token = useSelector((state) => state.Auth.idToken);
  const userInfo = useSelector((state) => state.Auth.grantedUserInfo);
  const directs = useSelector((state) => state.directOrgs.directs);
  const directOrgs = useSelector((state) => state.directOrgs.directOrgs);
  const directOrgFilter = useSelector((state) => state.directOrgs.directOrgFilter);
  const organizations = useSelector((state) => state.adminUser.organizations);
  const boardDOs = useSelector((state) => state.scrumBoard.tasks);
  const loading = useSelector((state) => state.directOrgs.loading);
  const dispatch = useDispatch();

  const [backgroundUrl, setBackgroundUrl] = useState();
  const [monthPicked, setMonthPicked] = useState(moment(new Date()));
  const [fromToPicked, setFromToPicked] = useState([]);
  const [selectedOrg, setSelectedOrg] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const size = useWindowSize();

  function returnChangedDOArr(_directOrgs, _boardDOs, _directs) {
    if (_directOrgs && _directOrgs.length > 0) {
      let updateArr = _directOrgs.reduce((agg, directOrg) => {
        let boardItemStt = parseInt(boardDOs[directOrg.uuid]?.column_id.split("-")[1]);
        let foundDirect = _directs?.find((direct) => direct.uuid === directOrg.direct_uuid);
        if (boardItemStt !== directOrg.exec_status) {
          return [
            ...agg,
            {
              uuid: directOrg.uuid,
              organization_id: directOrg.organization_id,
              direct_uuid: directOrg.direct_uuid,
              exec_status: boardItemStt,
              description: foundDirect?.description,
            },
          ];
        }
        return agg;
      }, []);
      return updateArr;
    }
  }

  function handleUpdateDOStatus() {
    let updateArr = returnChangedDOArr(directOrgFilter, boardDOs, directs);
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
    switch (mode) {
      case "DATE_RANGE":
        if (e) {
          // TODO: dispatch action to filter data here
          // Khi date range thay đổi thì bỏ month pick đi
          setMonthPicked("");
          setFromToPicked([e[0].startOf("day"), e[1].endOf("day")]);
          let dateRange = [e[0].startOf("day"), e[1].endOf("day")];
          let dateRangeUnix = [moment(dateRange[0]).valueOf(), moment(dateRange[1]).valueOf()];
          dispatch(getFilterDirectOrg(token, { created_time: { from: dateRangeUnix[0], to: dateRangeUnix[1] } }));
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
        dispatch(getFilterDirectOrg(token, { created_time: { from: from, to: to } }));
        setIsOpen(false);
        break;
      default:
        break;
    }
  };

  // ------------------------------------------------------------------------------------------
  // Mới vào chương trình thì chạy cái này để lấy chỉ đạo theo đơn vị của mình
  useEffect(() => {
    // Nếu có token và userInfo thì mới gọi hàm dispatch lấy dữ liệu (và set selectedOrg là organization của user luôn)
    if (token && userInfo) {
      const newMonth = moment(new Date());
      const { from, to } = returnFromToUnixFromMomentMonth(newMonth.startOf("month"));
      if (userInfo.isAdmin) {
        dispatch(getFilterDirectOrg(token, { created_time: { from: from, to: to } }));
        return;
      }
      dispatch(getFilterDirectOrg(token, { created_time: { from: from, to: to }, organization_id: userInfo.organization }));
      setSelectedOrg([userInfo.organization]);
    }
  }, [token, userInfo]);

  // Effect theo dõi sự thay đổi của select org rồi dispatch action để thay đổi
  useEffect(() => {
    // Nếu có sự thay đổi của dữ liệu dass thì cũng dispatch cái để thay đổi select org này
    if (directOrgs?.[0]) {
      dispatch(filterDirectOrgRedux(selectedOrg));
      return;
    }
    if (selectedOrg.length === 0) {
      dispatch(filterDirectOrgRedux([]));
    }
  }, [selectedOrg, directOrgs]);

  // Khi có backgrounds trong store thì set riêng giá trị background
  useEffect(() => {
    if (backgrounds && backgrounds?.[0] && !backgroundUrl) {
      let bg = backgrounds.find((bg) => bg.code === COMMON.BG_DIRECT_ORG);
      if (bg.status == 1) {
        setBackgroundUrl(bg);
        return;
      }
    }
  }, [backgrounds]);

  // Khi giá trị task trong board thay chuyển từ cột này qua cột khác thì dispatch function để update arr thay đổi
  useEffect(() => {
    if (Object.keys(boardDOs).length > 0) {
      let updateBoarArr = returnChangedDOArr(directOrgFilter, boardDOs);
      dispatch(setBoardUpdateArr(updateBoarArr));
    }
  }, [boardDOs, selectedOrg]);

  // ------------------------------------------------------------------------------------------

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
              {/* Nếu là admin thì dựng cái select theo organization lên (ko thì bỏ qua) */}
              {userInfo?.isAdmin ? (
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
              ) : null}

              <ButtonAdd style={{ fontWeight: "bold" }} className="btnUpdateDOStatus" size="large" onClick={handleUpdateDOStatus}>
                Cập Nhập Dữ Liệu
              </ButtonAdd>
            </Filters>
          </Row>
        </HeaderSecondary>
        {/* // ---------------------------------------------------------------------------------  */}
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
