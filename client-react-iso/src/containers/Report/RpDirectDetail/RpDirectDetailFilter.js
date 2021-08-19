import React, { useState, useEffect } from "react";
import * as COMMON from "@constants/fileTypes";
import { useSelector, useDispatch } from "react-redux";
import { returnFromToUnixFromMomentMonth } from "@lib/utils/date";
import { getReportDirectDetail, wipeReportExcelData } from "@redux/reports/actions";

import "moment/locale/vi";
import moment from "moment";
import locale from "antd/es/date-picker/locale/vi_VN";

import { DatePicker, Row, Select, Col, Button } from "antd";
import { FileExcelOutlined } from "@ant-design/icons";
import Label from "@components/utility/label";
import { confirmAlert, errorAlert } from "@components/AlertModal/ModalInfo";
import { getReportDirectDetailExcel } from "@apis/reports";
import { base64toBlob } from "@lib/utils/file";

const { Option } = Select;

export default function RpDirectAggFilter() {
  const loadingStatus = useSelector((state) => state.reports.loading);
  const token = useSelector((state) => state.Auth.idToken);
  const organizations = useSelector((state) => state.adminUser.organizations);
  const leaders = useSelector((state) => state.filterData.leaderTypes);
  const statuses = useSelector((state) => state.filterData.statuses);
  const dispatch = useDispatch();

  const [monthPicked, setMonthPicked] = useState(moment(new Date()));
  const [selectedOrg, setSelectedOrg] = useState([-1]);
  const [selectedLeader, setSelectedLeader] = useState([-1]);
  const [selectedStatus, setSelectedStatus] = useState([-1]);
  const [isOpen, setIsOpen] = useState(false);

  const [excelLoading, setExcelLoading] = useState(false);

  const fullWidthCol = { lg: 24, md: 24, sm: 24, xs: 24 };
  const halfWidthCol = { lg: 12, md: 12, sm: 24, xs: 24 };
  //   const thirdWidthCol = { lg: 8, md: 12, sm: 24, xs: 24 };

  const handleChangeFilter = (e, mode) => {
    switch (mode) {
      case "SELECT_ORG":
        setSelectedOrg(e);
        break;
      case "SELECT_LEADER":
        setSelectedLeader(e);
        break;
      case "SELECT_STATUS":
        setSelectedStatus(e);
        break;
      case "MONTH":
        setMonthPicked(e);
        const newMonth = moment(e);
        const { from, to } = returnFromToUnixFromMomentMonth(newMonth.startOf("month"));
        break;

      default:
        break;
    }
  };

  const handleOnClick = () => {
    if (monthPicked) {
      const { from, to } = returnFromToUnixFromMomentMonth(moment(monthPicked).startOf("month"));
      dispatch(
        getReportDirectDetail(token, {
          created_time: { from, to },
          isExcelExport: false,
          organizations: selectedOrg,
          leaders: selectedLeader,
          statuses: selectedStatus,
        })
      );
    }
  };

  const handleOnClickExcel = () => {
    confirmAlert("Xác Nhận", "Bạn có muốn xuất excel báo cáo tổng hợp chỉ đạo lãnh đạo?", () => {
      setExcelLoading(true);
      const { from, to } = returnFromToUnixFromMomentMonth(moment(monthPicked).startOf("month"));
      getReportDirectDetailExcel(token, {
        created_time: { from, to },
        isExcelExport: true,
        organizations: selectedOrg,
        leaders: selectedLeader,
        statuses: selectedStatus,
      })
        .then((response) => {
          setExcelLoading(false);
          let blob = base64toBlob(response.data, COMMON.xlsMime);
          let url = window.URL.createObjectURL(blob);
          let a = document.createElement("a");
          a.href = url;
          a.target = "_blank";
          a.download = `bao-cao-chi-tiet-${new Date().getTime()}.xlsx`;
          a.click();
          // window.location.href = response.url;
          window.URL.revokeObjectURL(url);
        })
        .catch((err) => {
          setExcelLoading(false);
          errorAlert("Lỗi", "Lỗi khi xuất file excel báo cáo: " + err);
        });
    });
  };

  // Effect dùng để làm trống dữ liệu sau khi thoát khỏi view
  useEffect(() => {
    dispatch(wipeReportExcelData());
  }, []);

  return (
    <Row>
      <Col {...halfWidthCol}>
        <Label>Chọn Đơn Vị</Label>
        <Select
          size={"large"}
          placeholder="Chọn Đơn Vị"
          maxTagTextLength={10}
          maxTagCount={4}
          value={selectedOrg}
          onChange={(v) => handleChangeFilter(v, "SELECT_ORG")}
          mode="multiple"
          allowClear
          style={{ width: "100%", minHeight: "35px" }}
        >
          <Option key={-1} value={-1}>
            {" "}
            ---- Tất Cả
          </Option>
          {organizations?.[0]
            ? organizations.map((org, idx) => (
                <Option key={idx} value={org.id}>
                  {org.name}
                </Option>
              ))
            : null}
        </Select>
      </Col>
      <Col {...halfWidthCol}>
        <Label>Tháng Báo Cáo</Label>
        <DatePicker
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
            height: "40px",
            width: "100%",
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
      <Col {...halfWidthCol} style={{ marginTop: "20px" }}>
        <Label>Chỉ Đạo Của Lãnh Đạo</Label>
        <Select
          size={"large"}
          placeholder="Chọn Lãnh Đạo"
          maxTagTextLength={10}
          maxTagCount={4}
          value={selectedLeader}
          onChange={(v) => handleChangeFilter(v, "SELECT_LEADER")}
          mode="multiple"
          allowClear
          style={{ width: "100%", minHeight: "35px" }}
        >
          <Option key={-1} value={-1}>
            {" "}
            ---- Tất Cả
          </Option>
          {leaders?.[0]
            ? leaders.map((leader, idx) => (
                <Option key={idx} value={leader.id}>
                  {leader.name}
                </Option>
              ))
            : null}
        </Select>
      </Col>
      <Col {...halfWidthCol} style={{ marginTop: "20px" }}>
        <Label>Tiến Độ</Label>
        <Select
          size={"large"}
          placeholder="Trạng Thái"
          maxTagTextLength={10}
          maxTagCount={4}
          value={selectedStatus}
          onChange={(v) => handleChangeFilter(v, "SELECT_STATUS")}
          mode="multiple"
          allowClear
          style={{ width: "100%", minHeight: "35px" }}
        >
          <Option key={-1} value={-1}>
            {" "}
            ---- Tất Cả
          </Option>
          {statuses?.[0]
            ? statuses.map((stt, idx) => {
                if (stt.id < 100)
                  return (
                    <Option key={idx} value={stt.id}>
                      {stt.name}
                    </Option>
                  );
              })
            : null}
        </Select>
      </Col>
      <Col {...halfWidthCol}>
        <Button loading={loadingStatus} style={{ marginTop: "10px" }} block size="large" type="primary" onClick={handleOnClick}>
          Báo Cáo
        </Button>
      </Col>
      <Col {...halfWidthCol}>
        <Button
          icon={<FileExcelOutlined />}
          loading={excelLoading}
          style={{ marginTop: "10px" }}
          block
          size="large"
          type="default"
          onClick={handleOnClickExcel}
        >
          Tải File Excel
        </Button>
      </Col>
    </Row>
  );
}
