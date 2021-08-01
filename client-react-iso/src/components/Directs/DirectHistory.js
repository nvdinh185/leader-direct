import React from "react";
import { Layout, Menu, Dropdown, Popover, Checkbox, Button, Form, Row, Col, DatePicker } from "antd";
import "moment/locale/vi";
import locale from "antd/es/date-picker/locale/vi_VN";
import TitleIcon from "@assets/images/icon/17.svg";
import HeadingWithIcon from "@components/ScrumBoard/HeadingWithIcon";

export default function DirectHistory() {
  return (
    <>
      <HeadingWithIcon heading={"Thực Hiện Từng Đơn Vị"} iconSrc={TitleIcon} />
      <Row>
        <Col span={24}></Col>
      </Row>
    </>
  );
}
