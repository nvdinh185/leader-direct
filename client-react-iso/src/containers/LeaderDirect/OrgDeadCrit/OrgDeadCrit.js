import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Layout } from "antd";
import PageHeader from "@components/utility/pageHeader";
import OrgDeadCritList from "@components/OrgDCrit/OrgDeadCritList";
import Scrollbar from "@components/utility/customScrollBar";
import { OrgDeadCritWrapper } from "./OrgDeadCrit.style";
import { getFilterDirectCrit } from "@redux/directCrits/actions";
import DetailView from "@components/Directs/DetailView";
import { changeDirectCrit } from "@redux/directCrits/actions";
import OrgCritInfo from "./OrgCritInfo";
import moment from "moment";
import { returnFromToUnixFromMomentMonth } from "@lib/utils/date";

const { Content } = Layout;

export default function OrgDeadCrit() {
  const token = useSelector((state) => state.Auth.idToken);
  const userInfo = useSelector((state) => state.Auth.grantedUserInfo);
  const { filterDirectCrits, selectedId } = useSelector((state) => state.directCrits);

  const dispatch = useDispatch();

  const [assessCrits, setAssessCrits] = useState([]);

  const selectedDCrit = selectedId ? assessCrits.filter((fdc) => fdc.uuid === selectedId)[0] : null;

  // Mới vào thì lấy tất cả direct có status là 1 (mới nhập và chưa có crit hay deadline)
  useEffect(() => {
    dispatch(getFilterDirectCrit(token, { status: 1 }));
  }, []);

  // Khi có dữ liệu filterDirectCrits rồi thì lọc lại lấy danh sách direct của đơn vị
  useEffect(() => {
    if (filterDirectCrits?.[0] && userInfo) {
      // Nếu là admin thì set là mảng filterDirects đó luôn
      if (userInfo.isAdmin) {
        setAssessCrits(filterDirectCrits);
        return;
      }
      // Kiểm tra assessor có trong mảng filter direct đó hay không
      let assFilters = filterDirectCrits.filter((direct) => {
        let assessors = JSON.parse(direct.assessors);
        let assessCritArr = direct?.assess_criteria ? JSON.parse(direct.assess_criteria) : [];
        // Kiểm tra org của user đã tồn tại trong assessCritArr chưa (có rồi thì thêm 1 cờ is_assesed vào item)

        if (assessors.includes(userInfo.organization)) {
          return true;
        }
        return false;
      });
      setAssessCrits(assFilters);
      return;
    }
    setAssessCrits([]);
  }, [filterDirectCrits, userInfo]);

  const handleGetEditedCrit = (month, e) => {
    const newMonth = moment(month);
    if (!newMonth) {
      dispatch(getFilterDirectCrit(token, { status: e }));
      return;
    }
    const { from, to } = returnFromToUnixFromMomentMonth(newMonth.startOf("month"));
    dispatch(getFilterDirectCrit(token, { status: e, created_time: { from: from, to: to } }));
  };

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
            handleGetEditedCrit={handleGetEditedCrit}
            directs={assessCrits}
            selectedDCrit={selectedDCrit}
            changeDirectCrit={(uuid) => dispatch(changeDirectCrit(uuid))}
          />
        </div>
        {/* -------------------------------------- Detail Info View ----------------------------------------- */}
        <Layout className="isoContactBoxWrapper">
          <Content className="isoContactBox">
            <Scrollbar className="contactBoxScrollbar">
              {selectedDCrit ? (
                <DetailView currentDirect={selectedDCrit} showPageHeader={false}>
                  <OrgCritInfo currentDirect={selectedDCrit}></OrgCritInfo>
                </DetailView>
              ) : null}
            </Scrollbar>
          </Content>
        </Layout>
      </OrgDeadCritWrapper>
    </Layout>
  );
}
