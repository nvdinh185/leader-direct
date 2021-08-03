import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { PlusCircleFilled, UpOutlined } from "@ant-design/icons";
import DescriptionIcon from "@assets/images/icon/06-icon.svg";
import HeadingWithIcon from "@components/ScrumBoard/HeadingWithIcon";
import { Button, Divider, Space } from "antd";
import OrgCritAddForm from "./OrgCritInfo/OrgCritAddForm";
import OrgCritEdit from "./OrgCritInfo/OrgCritEdit";

export default function OrgCritInfo({ currentDirect, isInDrawer }) {
  const userInfo = useSelector((state) => state.Auth.grantedUserInfo);
  const [isEdit, setIsEdit] = useState(false);
  const [isAssessor, setIsAssessor] = useState(false);
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

  useEffect(() => {
    if (userInfo) {
      try {
        let isAssess = JSON.parse(currentDirect?.assessors)?.includes(userInfo.organization);
        setIsAssessor(isAssess);
      } catch (error) {
        return;
      }
    }
  }, [userInfo]);

  // --------------------------------------------------------------------------------
  return (
    <>
      <div style={{ width: "100%" }}>
        <HeadingWithIcon heading="Chỉ tiêu và hạn hoàn thành" iconSrc={DescriptionIcon} />
        <Space direction="vertical" style={{ width: "100%" }}>
          {(userInfo?.isAdmin || isAssessor) && !isInDrawer ? (
            <Button icon={!isEdit ? <PlusCircleFilled style={{ color: "green" }} /> : <UpOutlined />} onClick={changeEditForm}>
              {isEdit ? null : "Thêm Mới"}
            </Button>
          ) : null}
          {isEdit ? (
            <OrgCritAddForm currentDirect={currentDirect} criteriaArr={criteriaArr} setIsEdit={setIsEdit}></OrgCritAddForm>
          ) : (
            <>
              {criteriaArr && criteriaArr[0]
                ? criteriaArr.map((crit, idx) => (
                    <OrgCritEdit
                      isInDrawer={isInDrawer}
                      key={idx}
                      criteria={crit}
                      criteriaArr={criteriaArr}
                      currentDirect={currentDirect}
                      userInfo={userInfo}
                    ></OrgCritEdit>
                  ))
                : null}
            </>
          )}
        </Space>
        <Divider style={{ margin: "10px" }}></Divider>
      </div>
    </>
  );
}
