import React from "react";

export default function DirectHistory() {
  return (
    <>
      <HeadingWithIcon heading={"Chi Tiết Chỉ Đạo"} iconSrc={TitleIcon} />
      <Row>
        <Col span={24}>
          <HeadingWithIcon heading="Phân Loại" />
        </Col>
      </Row>
    </>
  );
}
