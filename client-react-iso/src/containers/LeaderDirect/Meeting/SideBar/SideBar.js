import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { filterMeetingListInnerRedux, resetFilterMeetingRedux } from "@redux/meetings/actions";
import moment from "moment";
import "moment/locale/vi";
import locale from "antd/es/date-picker/locale/vi_VN";
import { Form, Row, Col, Card, Input, Checkbox, Radio, Space, Button } from "antd";
import { SearchOutlined, ClearOutlined } from "@ant-design/icons";
import { DateRangepicker } from "@components/uielements/datePicker";
import Scrollbar from "@components/utility/customScrollBar";

const CheckboxGroup = Checkbox.Group;

const SideBar = React.memo(({ categories }) => {
  const filterMeetings = useSelector((state) => state.meetings.filterMeetings);
  const meetingTypes = useSelector((state) => state.filterData.meetingTypes);
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const [criteria, setCriteria] = useState();

  const [checkedList, setCheckedList] = useState();
  const [indeterminate, setIndeterminate] = useState(false);
  const [checkAll, setCheckAll] = useState(false);
  const [checkboxOptions, setCheckboxOptions] = useState();

  useEffect(() => {
    if (meetingTypes?.[0]) {
      let mNameArr = meetingTypes.map((m) => m.name);
      setCheckboxOptions(mNameArr);
    }
  }, [meetingTypes]);

  useEffect(() => {
    if (criteria && filterMeetings?.[0]) {
      console.log(criteria);
      dispatch(filterMeetingListInnerRedux(criteria));
    }
  }, [criteria]);

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
      case "CAT":
        let valueMap = e.map((value) => meetingTypes.find((cat) => cat.name === value).id);
        setCriteria({ ...criteria, category: valueMap });
        setCheckedList(e);
        setIndeterminate(!!e.length && e.length < checkboxOptions.length);
        setCheckAll(e.length === checkboxOptions.length);
        break;
      case "ALL_CAT":
        if (!e.target.checked) {
          setCriteria({ ...criteria, category: [] });
        } else {
          let mIdArr = meetingTypes.map((m) => m.id);
          setCriteria({ ...criteria, category: mIdArr });
        }
        setCheckedList(e.target.checked ? checkboxOptions : []);
        setCheckAll(e.target.checked);
        setIndeterminate(false);
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

  const handleResetFilterCriteria = () => {
    dispatch(resetFilterMeetingRedux());
    form.resetFields();
    setCriteria([]);
    setCheckAll(false);
    setCheckedList([]);
    setIndeterminate(false);
  };

  return (
    <Scrollbar style={{ height: "calc(100vh - 140px)", marginBottom: "8px" }}>
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
        <Card size="small" title={"Loại Cuộc Họp"} style={{ margin: "15px" }}>
          <Row>
            <Form.Item>
              <Checkbox indeterminate={indeterminate} onChange={(e) => handleChangeFilter(e, "ALL_CAT")} checked={checkAll}>
                -- Chọn Tất Cả --
              </Checkbox>
              <CheckboxGroup
                value={checkedList}
                options={checkboxOptions}
                onChange={(v) => {
                  handleChangeFilter(v, "CAT");
                }}
              />
            </Form.Item>
          </Row>
        </Card>
        <Card size="small" title="Thời Gian" style={{ margin: "15px" }}>
          <Row>
            <Space direction="vertical">
              <Form.Item name="date_range">
                <Col span={24}>
                  <DateRangepicker
                    onChange={(e) => handleChangeFilter(e, "DATE_RANGE")}
                    locale={locale}
                    format="DD/MM/YYYY"
                    disabledDate={(date) => date > new Date()}
                  ></DateRangepicker>
                </Col>
              </Form.Item>

              <Col span={24}>
                <Form.Item name="radio">
                  <Radio.Group onChange={(e) => handleChangeFilter(e, "DATE_RADIO")}>
                    <Space direction="vertical">
                      <Radio value={"MONTH"}>Cuộc Họp Trong Tháng Này</Radio>
                      <Radio value={"YEAR"}>Cuộc Họp Trong Năm Nay</Radio>
                    </Space>
                  </Radio.Group>
                </Form.Item>
              </Col>
            </Space>
          </Row>
        </Card>
      </Form>
    </Scrollbar>
  );
});

export default SideBar;
