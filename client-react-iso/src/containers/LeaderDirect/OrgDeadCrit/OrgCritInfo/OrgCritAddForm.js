import React, { useEffect, useState } from "react";
import { Button, DatePicker, Divider, Input, Space } from "antd";

export default function OrgCritAddForm({ currentDirect, criteriaArr, setIsEdit, handleCreateFormPost }) {
  const [form, setForm] = useState();

  const handleSubmitForm = () => {
    if (Object.keys(form).length > 0) {
      // TODO: Call api to update crit and due date here
      console.log(form);
      setIsEdit(false);
    }
  };

  const handleChangeCritInput = (e, mode) => {
    switch (mode) {
      case "CRIT":
        setForm({ ...form, criteria: e.target.value });
        return;
      case "DATE":
        setForm({ ...form, due_date: new Date(e) });
        return;
      default:
        break;
    }
  };

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Input.TextArea placeholder="Nhập Thông Tin Chỉ Tiêu" onChange={(e) => handleChangeCritInput(e, "CRIT")}></Input.TextArea>
      <DatePicker
        style={{ width: "100%" }}
        placeholder="Chọn Ngày Hết Hạn"
        format="DD/MM/yyyy"
        onChange={(e) => handleChangeCritInput(e, "DATE")}
      ></DatePicker>
      <Button onClick={handleSubmitForm} type="primary" block>
        Cập Nhập Thông Tin
      </Button>
    </Space>
  );
}
