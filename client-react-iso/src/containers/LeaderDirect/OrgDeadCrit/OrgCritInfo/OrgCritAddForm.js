import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, DatePicker, Divider, Input, Space } from "antd";
import { getFilterDirectCrit } from "@redux/directCrits/actions";
import { errorAlert, successAlert } from "@components/AlertModal/ModalInfo";
import { updateDirectCriteria } from "@apis/directs";

export default function OrgCritAddForm({ currentDirect, criteriaArr, setIsEdit }) {
  console.log(criteriaArr);

  const token = useSelector((state) => state.Auth.idToken);
  const userInfo = useSelector((state) => state.Auth.grantedUserInfo);
  const organizations = useSelector((state) => state.adminUser.organizations);
  const dispatch = useDispatch();

  const [form, setForm] = useState();

  const handleChangeCritInput = (e, mode) => {
    switch (mode) {
      case "DATE":
        setForm({ ...form, due_date: e });
        return;
      case "CRIT":
        setForm({ ...form, description: e.target.value });
        return;
      default:
        break;
    }
  };

  const handleSubmitForm = () => {
    if (Object.keys(form).length > 0) {
      // TODO: Call api to update crit and due date here
      let foundOrganization = organizations.find((org) => org.id === userInfo.organization);
      let newCrit = {
        ...form,
        id: new Date().getTime(),
        created_time: new Date(),
        organization: { id: userInfo.organization, name: foundOrganization.name },
      };
      let formToPost = {
        assess_criteria: [...criteriaArr, newCrit],
        direct_uuid: currentDirect.uuid,
      };
      // Gọi hàm update thông tin ở đây - khỏi qua redux chi cho mất công
      updateDirectCriteria(token, formToPost)
        .then((res) => {
          successAlert("Thành Công", "Bạn đã cập nhập chỉ tiêu cho chỉ đạo thành công");
          dispatch(getFilterDirectCrit(token, { status: 1 }));
        })
        .catch((err) => {
          errorAlert("Thất Bại", "Có lỗi khi cập nhập chỉ tiêu " + err);
        });
      setIsEdit(false);
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
