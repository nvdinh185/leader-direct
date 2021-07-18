import React, { useState, useEffect } from "react";
import moment from "moment";
import { useSelector } from "react-redux";
import { returnHexColor } from "@lib/utils/string";
import { Col, Row, Tag } from "antd";
import { TaskDescription, ClockIcon } from "@containers/LeaderDirect/Meeting/Meeting.style";
import Clock from "@assets/images/icon/17.svg";
import TitleIcon from "@assets/images/icon/05-icon.svg";
import DescriptionIcon from "@assets/images/icon/06-icon.svg";
import HeadingWithIcon from "@components/ScrumBoard/HeadingWithIcon";

export default function (props) {
  const categories = useSelector((state) => state.filterData.categories);
  const currentDirect = useSelector((state) => state.directs.currentDirect);

  const [categoryDisplay, setCatgoryDisplay] = useState();

  // Trường hợp refresh lại page thì chỉ có

  useEffect(() => {
    if (categories?.[0] && currentDirect) {
      let directCat = categories.find((cat) => cat.id === currentDirect.category);
      console.log(directCat);
      let bgColorCat = returnHexColor(directCat.bg_color);
      setCatgoryDisplay({ name: directCat.name, bgColor: bgColorCat });
    }
  }, [categories, currentDirect]);

  return (
    <>
      <HeadingWithIcon heading={"Chi Tiết Chỉ Đạo"} iconSrc={TitleIcon} />
      <Row>
        <Col span={8}>
          <HeadingWithIcon heading="Phân Loại" />
          <p>
            <Tag color={categoryDisplay?.bgColor}>{categoryDisplay?.name}</Tag>
          </p>
        </Col>
        <Col span={8}>
          <HeadingWithIcon heading="Ngày Tạo" />
          <ClockIcon src={Clock} />
          {moment(currentDirect?.created_time).format("DD/MM/YYYY HH:mm")}
        </Col>
      </Row>
      <div style={{ clear: "both", paddingTop: "10px" }}>
        <HeadingWithIcon heading="Mô Tả" iconSrc={DescriptionIcon} />
        <TaskDescription>{currentDirect?.description}</TaskDescription>
      </div>
    </>
  );
}
