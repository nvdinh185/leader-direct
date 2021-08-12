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

export default function ({ currentDirect }) {
  const categories = useSelector((state) => state.filterData.categories);
  const [categoryDisplay, setCatgoryDisplay] = useState();
  const organizations = useSelector((state) => state.adminUser.organizations);

  const [displayAssOrgs, setDisplayAssOrgs] = useState();
  const [displayExeOrgs, setDisplayExeOrgs] = useState();

  useEffect(() => {
    if (categories?.[0] && currentDirect) {
      let directCat = categories.find((cat) => cat.id === currentDirect.category);
      let bgColorCat = returnHexColor(directCat.bg_color);
      setCatgoryDisplay({ name: directCat.name, bgColor: bgColorCat });
    }
  }, [categories, currentDirect]);

  useEffect(() => {
    if (organizations?.[0] && currentDirect) {
      let exeOrgIds = JSON.parse(currentDirect.executors);
      let exeOrgs = organizations.filter((org) => {
        return exeOrgIds.includes(org.id);
      });
      let assOrgIds = JSON.parse(currentDirect.assessors);
      let assOrgs = organizations.filter((org) => {
        return assOrgIds.includes(org.id);
      });
      setDisplayExeOrgs(exeOrgs);
      setDisplayAssOrgs(assOrgs);
    }
  }, [currentDirect, organizations]);

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
        <Col span={8}>
          <HeadingWithIcon heading="Ngày Hết Hạn" />
          <ClockIcon src={Clock} />
          {currentDirect?.due_date ? moment(currentDirect?.due_date).format("DD/MM/YYYY HH:mm") : null}
        </Col>
      </Row>
      <div style={{ clear: "both", paddingTop: "10px" }}>
        <HeadingWithIcon heading="Mô Tả" iconSrc={DescriptionIcon} />
        <TaskDescription>{currentDirect?.description}</TaskDescription>
      </div>
      <div style={{ clear: "both", paddingTop: "10px" }}>
        <HeadingWithIcon heading="Đơn Vị Đánh Giá" iconSrc={DescriptionIcon} />
        {displayAssOrgs
          ? displayAssOrgs.map((org) => {
              return <Tag key={org.id}>{org.name}</Tag>;
            })
          : null}
      </div>
      <div style={{ clear: "both", paddingTop: "10px" }}>
        <HeadingWithIcon heading="Đơn Vị Thực Hiện" iconSrc={DescriptionIcon} />
        {displayExeOrgs
          ? displayExeOrgs.map((org) => {
              return <Tag key={org.id}>{org.name}</Tag>;
            })
          : null}
      </div>
    </>
  );
}
