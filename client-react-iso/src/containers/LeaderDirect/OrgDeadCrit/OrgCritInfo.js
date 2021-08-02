import React, { useEffect, useState } from "react";
import { PlusCircleFilled, UpOutlined } from "@ant-design/icons";
import DescriptionIcon from "@assets/images/icon/06-icon.svg";
import HeadingWithIcon from "@components/ScrumBoard/HeadingWithIcon";
import { Button, Divider, Space } from "antd";
import OrgCritAddForm from "./OrgCritInfo/OrgCritAddForm";
import OrgCritEdit from "./OrgCritInfo/OrgCritEdit";

export default function OrgCritInfo({ currentDirect }) {
  const [isEdit, setIsEdit] = useState(false);
  const [criteriaArr, setCriteriaArr] = useState();

  useEffect(() => {
    if (currentDirect?.assess_criteria) {
      setCriteriaArr(JSON.parse(currentDirect.assess_criteria));
      setIsEdit(false);
      return;
    }
    setCriteriaArr([]);
    setIsEdit(false);
  }, [currentDirect]);

  const changeEditForm = () => {
    setIsEdit(!isEdit);
  };

  // --------------------------------------------------------------------------------
  return (
    <>
      <div>
        <HeadingWithIcon heading="Chỉ tiêu và hạn hoàn thành" iconSrc={DescriptionIcon} />
        <Space direction="vertical" style={{ width: "100%" }}>
          <Button icon={!isEdit ? <PlusCircleFilled style={{ color: "green" }} /> : <UpOutlined />} onClick={changeEditForm}>
            {isEdit ? null : "Thêm Mới"}
          </Button>
          {isEdit ? (
            <OrgCritAddForm currentDirect={currentDirect} criteriaArr={criteriaArr} setIsEdit={setIsEdit}></OrgCritAddForm>
          ) : (
            <>
              {criteriaArr && criteriaArr[0]
                ? criteriaArr.map((crit, idx) => (
                    <OrgCritEdit key={idx} criteria={crit} criteriaArr={criteriaArr} currentDirect={currentDirect}></OrgCritEdit>
                  ))
                : null}
            </>
          )}
        </Space>

        <Divider></Divider>
      </div>
    </>
  );
}
