import React, { useState, useEffect } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, DatePicker, Row, Select, Tooltip } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import { InputSearch } from "@components/uielements/input";
import { OrgDeadCritListWrapper, OrgDeadCritSingleItemWrapper } from "./OrgDeadCritList.style";
import Scrollbar from "@components/utility/customScrollBar";

const { Option } = Select;

export default function OrgDeadCritList({ handleGetEditedCrit, ...props }) {
  const directTypes = useSelector((state) => state.filterData.directTypes);
  const userInfo = useSelector((state) => state.Auth.grantedUserInfo);

  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [monthPicked, setMonthPicked] = useState();
  const [selectStatus, setSelectStatus] = useState(1);

  // ---------------------------------------------------------------------------------
  function singleContact(direct, _directTypes, props, userInfo) {
    const { selectedDCrit, changeDirectCrit } = props;
    const activeClass = selectedDCrit?.uuid === direct.uuid ? "active" : "";
    const onChange = () => changeDirectCrit(direct.uuid);
    const directCatInfo = _directTypes?.find((cat) => cat.id === direct.category);

    // Check nếu trong assess_crit có đơn vị của user thì hiện nút check đã nhập crit
    let critArr = direct.assess_criteria ? JSON.parse(direct.assess_criteria) : null;
    let isInCritArr = false;
    if (critArr) {
      let foundCrit = critArr.find((crit) => {
        return crit.organization.id === userInfo.organization;
      });
      isInCritArr = foundCrit ? true : false;
    }

    return (
      <OrgDeadCritSingleItemWrapper key={direct.uuid} bgColor={directCatInfo?.bg_color} selectedId={activeClass}>
        <div className={`${activeClass} isoSingleContact`} onClick={onChange}>
          <div className="isoAvatar">{directCatInfo?.code ? directCatInfo.code : null}</div>
          <div className="isoContactName" style={{ width: "100%" }}>
            <Tooltip placement="topLeft" title={direct.description ? direct.description : "No Description"}>
              <p>{direct.description ? direct.description : "No Description"}</p>
            </Tooltip>
          </div>
          {/* TODO: Add more button here */}
          {isInCritArr ? <CheckCircleOutlined style={{ color: "green" }} /> : null}
        </div>
      </OrgDeadCritSingleItemWrapper>
    );
  }
  // ---------------------------------------------------------------------------------

  function filterContacts(directs, search) {
    search = search.toUpperCase();
    return search ? directs.filter((direct) => direct.description.toUpperCase().includes(search)) : directs;
  }

  function onChange(event) {
    setSearch(event.target.value);
  }

  const contacts = filterContacts(props.directs, search);

  useEffect(() => {
    if (monthPicked || selectStatus) {
      handleGetEditedCrit(monthPicked, selectStatus);
      return;
    }
  }, [selectStatus, monthPicked]);

  // ---------------------------------------------------------------------------------
  return (
    <OrgDeadCritListWrapper className="isoContactListWrapper">
      <InputSearch placeholder={"Tìm Kiếm"} value={search} onChange={onChange} className="isoSearchBar" />
      <Row>
        <Col span={12}>
          <Select defaultValue={1} style={{ width: "100%" }} onChange={(e) => setSelectStatus(e)}>
            <Option value={1}>Chưa Cập Nhập Đủ</Option>
            <Option value={2}>Đã Cập Nhập Đủ</Option>
          </Select>
        </Col>
        <Col span={12}>
          <DatePicker
            open={isOpen}
            onChange={() => {
              if (monthPicked) {
                setMonthPicked("");
              }
            }}
            onOpenChange={() => {
              setIsOpen(!isOpen);
            }}
            onPanelChange={(v) => {
              setMonthPicked(v);
              setIsOpen(false);
            }}
            value={monthPicked}
            style={{ width: "100%" }}
            placeholder="Chọn Tháng"
            format="MM/YYYY"
            mode="month"
          ></DatePicker>
        </Col>
      </Row>
      {contacts && contacts.length > 0 ? (
        <div className="isoContactList">
          <Scrollbar className="contactListScrollbar" style={{ height: "calc(100vh - 200px)" }}>
            {contacts.map((contact) => singleContact(contact, directTypes, props, userInfo))}
          </Scrollbar>
        </div>
      ) : (
        <span className="isoNoResultMsg">{"Không Tìm Thấy Kết Quả"}</span>
      )}
    </OrgDeadCritListWrapper>
  );
}
