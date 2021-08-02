import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Layout } from "antd";
import PageHeader from "@components/utility/pageHeader";
import Button from "@components/uielements/button";
import OrgDeadCritList from "@components/OrgDCrit/OrgDeadCritList";
import Scrollbar from "@components/utility/customScrollBar";
import { OrgDeadCritWrapper } from "./OrgDeadCrit.style";
import { getFilterDirectCrit } from "@redux/directCrits/actions";
import DetailView from "@components/Directs/DetailView";
import { changeDirectCrit } from "@redux/directCrits/actions";
import OrgCritInfo from "./OrgCritInfo";

const { Content } = Layout;

export default function OrgDeadCrit() {
  const token = useSelector((state) => state.Auth.idToken);
  const { filterDirectCrits, selectedId } = useSelector((state) => state.directCrits);
  const dispatch = useDispatch();

  const selectedDCrit = selectedId ? filterDirectCrits.filter((fdc) => fdc.uuid === selectedId)[0] : null;

  // Mới vào thì lấy tất cả direct có status là 1 (mới nhập và chưa có crit hay deadline)
  useEffect(() => {
    dispatch(getFilterDirectCrit(token, { status: 1 }));
  }, []);

  return (
    <Layout
      style={
        {
          // backgroundImage: backgroundUrl?.description ? backgroundUrl?.description : "",
          // backgroundRepeat: "no-repeat",
          // backgroundSize: "cover",
        }
      }
    >
      <PageHeader>{"Cập Nhập DeadLine, Chỉ Số"}</PageHeader>
      <OrgDeadCritWrapper className="isomorphicContacts" style={{ background: "none" }}>
        {/* -------------------------------------- List Card View ----------------------------------------- */}
        <div className="isoContactListBar">
          <OrgDeadCritList
            directs={filterDirectCrits}
            selectedDCrit={selectedDCrit}
            changeDirectCrit={(uuid) => dispatch(changeDirectCrit(uuid))}
          />
        </div>
        {/* -------------------------------------- Detail Info View ----------------------------------------- */}
        <Layout className="isoContactBoxWrapper">
          <Content className="isoContactBox">
            <Scrollbar className="contactBoxScrollbar">
              <DetailView currentDirect={selectedDCrit} showPageHeader={false}>
                <OrgCritInfo currentDirect={selectedDCrit}></OrgCritInfo>
              </DetailView>
            </Scrollbar>
          </Content>
        </Layout>
      </OrgDeadCritWrapper>
    </Layout>
  );
}
