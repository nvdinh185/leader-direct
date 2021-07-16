import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import "moment/locale/vi";
import locale from "antd/es/date-picker/locale/vi_VN";
import { Row, Col, Card, Input, Checkbox, Radio, Space, Form, Button } from "antd";
import { DateRangepicker } from "@components/uielements/datePicker";
import { SearchOutlined, ClearOutlined } from "@ant-design/icons";
import { filterDirectListInnerRedux, resetFilterDirectCriteria } from "@redux/directs/actions";

const CheckboxGroup = Checkbox.Group;

export default function ({ categories }) {
  const filterDirects = useSelector((state) => state.directs.filterDirects);
  const organizations = useSelector((state) => state.adminUser.organizations);
  const directTypes = useSelector((state) => state.filterData.directTypes);
  const leaderTypes = useSelector((state) => state.filterData.leaderTypes);
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const [criteria, setCriteria] = useState();

  // STATE OF ORGANIZATION CHECK GROUP
  const [checkedOrgList, setCheckedOrgList] = useState();
  const [indeterminateOrg, setIndeterminateOrg] = useState(false);
  const [checkOrgAll, setCheckOrgAll] = useState(false);
  const [checkboxOrgOptions, setCheckboxOrgOptions] = useState();
  // STATE OF CATEGORY CHECK GROUP
  const [checkedCatList, setCheckedCatList] = useState();
  const [indeterminateCat, setIndeterminateCat] = useState(false);
  const [checkCatAll, setCheckCatAll] = useState(false);
  const [checkboxCatOptions, setCheckboxCatOptions] = useState();
  // STATE OF ORGANIZATION CHECK GROUP
  const [checkedLeaderList, setCheckedLeaderList] = useState();
  const [indeterminateLeader, setIndeterminateLeader] = useState(false);
  const [checkLeaderAll, setCheckLeaderAll] = useState(false);
  const [checkboxLeaderOptions, setCheckboxLeaderOptions] = useState();

  const [general, setGeneral] = useState();

  useEffect(() => {
    if (organizations?.[0] && directTypes?.[0] && leaderTypes?.[0]) {
      let mNameOrgArr = organizations.map((m) => m.name);
      let mNameCatArr = directTypes.map((m) => m.name);
      let mNameLeaArr = leaderTypes.map((m) => m.name);
      setCheckboxOrgOptions(mNameOrgArr);
      setCheckboxCatOptions(mNameCatArr);
      setCheckboxLeaderOptions(mNameLeaArr);
      setGeneral({
        category: {
          list: checkedCatList,
          optionList: checkboxCatOptions,
          reduxList: directTypes,
          setListFunc: setCheckedCatList,
          setCheckAllFunc: setCheckCatAll,
          setInDeterFunc: setIndeterminateCat,
        },
        organization: {
          list: checkedOrgList,
          optionList: checkboxOrgOptions,
          reduxList: organizations,
          setListFunc: setCheckedOrgList,
          setCheckAllFunc: setCheckOrgAll,
          setInDeterFunc: setIndeterminateOrg,
        },
        leader: {
          list: checkedLeaderList,
          optionList: checkboxLeaderOptions,
          reduxList: leaderTypes,
          setListFunc: setCheckedLeaderList,
          setCheckAllFunc: setCheckLeaderAll,
          setInDeterFunc: setIndeterminateLeader,
        },
      });
    }
  }, [organizations, directTypes, leaderTypes]);

  const handleChangeFilter = (e, mode) => {
    switch (mode) {
      case "DATE_RANGE":
        console.log(e);
        if (e) {
          let critCreatedTime = { from: moment(e[0]).valueOf(), to: moment(e[1]).valueOf() + 43400000 };
          setCriteria({ ...criteria, created_time: critCreatedTime });
        }
        // TODO: handle khi bỏ qua thời gian (lấy mặc định meetings trong tháng)
        break;
      case "CATEGORY":
      case "ORGANIZATION":
      case "LEADER":
        let modeName = mode.toLowerCase();
        console.log(general[modeName]);
        let valueMap = e.map((value) => general[modeName].reduxList.find((cat) => cat.name === value).id);
        setCriteria({ ...criteria, [modeName]: valueMap });
        general[modeName].setListFunc(e);
        general[modeName].setInDeterFunc(!!e.length && e.length < general[modeName].optionList.length);
        general[modeName].setCheckAllFunc(e.length === general[modeName].optionList.length);
        break;
      case "ALL_CATEGORY":
      case "ALL_ORGANIZATION":
      case "ALL_LEADER":
        let modeField = mode.split("_")[1].toLowerCase();
        if (!e.target.checked) {
          setCriteria({ ...criteria, [modeField]: [] });
        } else {
          let mIdArr = general[modeField].reduxList.map((m) => m.id);
          setCriteria({ ...criteria, [modeField]: mIdArr });
        }
        general[modeField].setListFunc(e.target.checked ? general[modeField].optionList : []);
        general[modeField].setCheckAllFunc(e.target.checked);
        general[modeField].setInDeterFunc(false);
        break;
      case "DATE_RADIO":
        if (e.target.value === "MONTH") {
        }
        console.log(e);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (criteria && filterDirects?.[0]) {
      console.log(criteria);
      dispatch(filterDirectListInnerRedux(criteria));
    }
  }, [criteria]);

  const handleResetFilterCriteria = () => {
    dispatch(resetFilterDirectCriteria());
    form.resetFields();
    setCriteria([]);
    const checkboxList = ["category", "organization", "leader"];
    checkboxList.forEach((cb) => {
      general[cb].setCheckAllFunc(false);
      general[cb].setListFunc([]);
      general[cb].setInDeterFunc(false);
    });
  };

  return (
    <div style={{ position: "sticky", overflowY: "scroll", height: "calc(100vh - 140px)", top: "75px", marginBottom: "8px" }}>
      <Form form={form}>
        <Card size="small" style={{ background: "none" }}>
          <Form.Item name="search">
            <Input size="large" placeholder="Tìm Kiếm" prefix={<SearchOutlined />} />
          </Form.Item>
        </Card>
        <Card size="small" style={{ background: "none", border: "none" }}>
          <Button type="primary" size="large" block icon={<ClearOutlined />} onClick={handleResetFilterCriteria}>
            Reset bộ lọc
          </Button>
        </Card>
        <Card size="small" title="Thời Gian" style={{ margin: "15px" }}>
          <Row>
            <Space direction="vertical">
              <Form.Item name="date_range">
                <Col span={24}>
                  <DateRangepicker
                    locale={locale}
                    format="DD/MM/YYYY"
                    disabledDate={(date) => date > new Date()}
                    onChange={(e) => handleChangeFilter(e, "DATE_RANGE")}
                  ></DateRangepicker>
                </Col>
              </Form.Item>
              <Form.Item name="month_year">
                <Col span={24}>
                  <Radio.Group onChange={(e) => handleChangeFilter(e, "DATE_RADIO")}>
                    <Space direction="vertical">
                      <Radio value={1}>Chỉ Đạo Trong Tháng Này</Radio>
                      <Radio value={3}>Chỉ Đạo Trong Năm Nay</Radio>
                    </Space>
                  </Radio.Group>
                </Col>
              </Form.Item>
            </Space>
          </Row>
        </Card>
        <Card size="small" title="Chọn Đơn Vị" style={{ margin: "15px" }}>
          <div style={{ overflow: "auto", height: "200px" }}>
            <Form.Item name="organization">
              <Row>
                <Checkbox
                  indeterminate={indeterminateOrg}
                  onChange={(e) => handleChangeFilter(e, "ALL_ORGANIZATION")}
                  checked={checkOrgAll}
                >
                  -- Chọn Tất Cả --
                </Checkbox>
                <CheckboxGroup
                  value={checkedOrgList}
                  options={checkboxOrgOptions}
                  onChange={(v) => {
                    handleChangeFilter(v, "ORGANIZATION");
                  }}
                />
              </Row>
            </Form.Item>
          </div>
        </Card>
        <Card size="small" title="Loại Chỉ Đạo" style={{ margin: "15px" }}>
          <Form.Item name="category">
            <Row>
              <Checkbox
                indeterminate={indeterminateCat}
                onChange={(e) => handleChangeFilter(e, "ALL_CATEGORY")}
                checked={checkCatAll}
              >
                -- Chọn Tất Cả --
              </Checkbox>
              <CheckboxGroup
                value={checkedCatList}
                options={checkboxCatOptions}
                onChange={(v) => {
                  handleChangeFilter(v, "CATEGORY");
                }}
              />
            </Row>
          </Form.Item>
        </Card>
        <Card size="small" title="Chỉ Đạo Của" style={{ margin: "15px" }}>
          <Form.Item name="leader">
            <Row>
              <Checkbox
                indeterminate={indeterminateLeader}
                onChange={(e) => handleChangeFilter(e, "ALL_LEADER")}
                checked={checkLeaderAll}
              >
                -- Chọn Tất Cả --
              </Checkbox>
              <CheckboxGroup
                value={checkedLeaderList}
                options={checkboxLeaderOptions}
                onChange={(v) => {
                  handleChangeFilter(v, "LEADER");
                }}
              />
            </Row>
          </Form.Item>
        </Card>
      </Form>
    </div>
  );
}
