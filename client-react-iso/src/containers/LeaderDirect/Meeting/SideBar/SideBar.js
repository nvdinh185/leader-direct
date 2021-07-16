import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { filterMeetingListInnerRedux, resetFilterMeetingRedux } from "@redux/meetings/actions";
import moment from "moment";
import "moment/locale/vi";
import locale from "antd/es/date-picker/locale/vi_VN";
import { Form, Row, Col, Card, Input, Checkbox, Radio, Space, Button } from "antd";
import { SearchOutlined, ClearOutlined } from "@ant-design/icons";
import { DateRangepicker } from "@components/uielements/datePicker";

const SideBar = React.memo(({ categories }) => {
  const filterMeetings = useSelector((state) => state.meetings.filterMeetings);
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const [criteria, setCriteria] = useState();

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
        let nameValue = e.target.name;
        if (e.target.checked) {
          if (!criteria?.category) {
            setCriteria({ ...criteria, category: [nameValue] });
            return;
          }
          setCriteria({ ...criteria, category: [...criteria.category, nameValue] });
          return;
        }
        let removeCatIdx = criteria.category.indexOf(nameValue);
        criteria.category.splice(removeCatIdx, 1);
        setCriteria({ ...criteria, category: [...criteria.category] });
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
            Reset các giá trị filter
          </Button>
        </Card>
        <Card size="small" title="Loại Cuộc Họp" style={{ margin: "15px" }}>
          <Row>
            <Form.Item name="category">
              {categories
                .filter((cat) => cat.parent_id === 4)
                .map((cat, idx) => (
                  <Col key={idx} span={24}>
                    <Checkbox name={cat.id} onChange={(e) => handleChangeFilter(e, "CAT")}>
                      {cat.name}
                    </Checkbox>
                  </Col>
                ))}
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
    </div>
  );
});

export default SideBar;
