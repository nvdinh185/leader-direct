import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import "moment/locale/vi";
import locale from "antd/es/date-picker/locale/vi_VN";
import { Row, Col, Card, Input, Checkbox, Radio, Space, Form, Button } from "antd";
import { DateRangepicker } from "@components/uielements/datePicker";
import { SearchOutlined, ClearOutlined } from "@ant-design/icons";
import { filterDirectListInnerRedux, resetFilterDirectCriteria } from "@redux/directs/actions";

export default function ({ categories, organizations }) {
  const filterDirects = useSelector((state) => state.directs.filterDirects);
  const dispatch = useDispatch();
  const [criteria, setCriteria] = useState();

  const [form] = Form.useForm();

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
      case "ORG":
      case "LEADER":
        let selectValue = e.target.select;
        if (e.target.checked) {
          if (!criteria || !criteria[e.target.name]) {
            setCriteria({ ...criteria, [e.target.name]: [selectValue] });
            return;
          }
          setCriteria({ ...criteria, [e.target.name]: [...criteria[e.target.name], selectValue] });
          return;
        }
        let removeCatIdx = criteria[e.target.name].indexOf(selectValue);
        criteria[e.target.name].splice(removeCatIdx, 1);
        setCriteria({ ...criteria, [e.target.name]: [...criteria[e.target.name]] });
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
                {organizations?.map((org, idx) => (
                  <Col key={idx} span={24}>
                    <Checkbox name="organization" select={org.id} onChange={(e) => handleChangeFilter(e, "ORG")}>
                      {org.name}
                    </Checkbox>
                  </Col>
                ))}
              </Row>
            </Form.Item>
          </div>
        </Card>
        <Card size="small" title="Loại Chỉ Đạo" style={{ margin: "15px" }}>
          <Form.Item name="category">
            <Row>
              {categories
                .filter((cat) => cat.parent_id === 3)
                .map((cat, idx) => (
                  <Col key={idx} span={24}>
                    <Checkbox name="category" select={cat.id} onChange={(e) => handleChangeFilter(e, "CAT")}>
                      {cat.name}
                    </Checkbox>
                  </Col>
                ))}
            </Row>
          </Form.Item>
        </Card>
        <Card size="small" title="Chỉ Đạo Của" style={{ margin: "15px" }}>
          <Form.Item name="leader">
            <Row>
              {categories
                .filter((cat) => cat.parent_id === 7)
                .map((cat, idx) => (
                  <Col key={idx} span={24}>
                    <Checkbox name="leader" select={cat.id} onChange={(e) => handleChangeFilter(e, "LEADER")}>
                      {cat.name}
                    </Checkbox>
                  </Col>
                ))}
            </Row>
          </Form.Item>
        </Card>
      </Form>
    </div>
  );
}
