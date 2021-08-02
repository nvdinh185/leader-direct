import React, { useState, useEffect } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { getFilterDirectCrit } from "@redux/directCrits/actions";

import { Row, Col, Button, Input, DatePicker } from "antd";
import { EditOutlined, CheckOutlined, DeleteOutlined } from "@ant-design/icons";
import { TaskDescription } from "@containers/LeaderDirect/Meeting/Meeting.style";
import { updateDirectCriteria } from "@apis/directs";
import { errorAlert, successAlert } from "@components/AlertModal/ModalInfo";

export default function OrgCritEdit({ currentDirect, criteria, criteriaArr, userInfo }) {
  const view = useSelector((state) => state.App.view);
  const token = useSelector((state) => state.Auth.idToken);
  const organizations = useSelector((state) => state.adminUser.organizations);
  const dispatch = useDispatch();

  const [form, setForm] = useState({});
  const [editCrit, setEditCrit] = useState(false);

  const handleFormChange = (e, mode) => {
    switch (mode) {
      case "DATE":
        setForm({ ...form, due_date: e });
        break;
      case "CRIT":
        setForm({ ...form, description: e.target.value });
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (criteria) {
      setForm({ ...criteria, due_date: moment(new Date(criteria.due_date)) });
    }
  }, [criteria]);

  const handleSwitchEditCrit = () => {
    setEditCrit(!editCrit);
  };

  const createFormPost = (newCrit, oldCrit, critArr) => {
    let oldDirectCrits = [];
    // Nếu có thông tin rồi thì phải tìm cái cũ rồi add cái mớI vào
    if (critArr.length > 0) {
      let idx = critArr.findIndex((odCrit) => odCrit.id === oldCrit.id);
      critArr.splice(idx, 1, newCrit);
      return critArr;
    }
    oldDirectCrits.push(newCrit);
    return oldDirectCrits;
  };

  const handleSubmitEditCrit = () => {
    let foundOrganization = organizations.find((org) => org.id === userInfo.organization);
    let newCrit = {
      ...form,
      id: new Date().getTime(),
      created_time: new Date(),
      organization: { id: userInfo.organization, name: foundOrganization.name },
    };
    // Khi edit thì lấy thông tin cũ ra rồi thay bằng cái mới vào
    // Tách logic này thành hàm riêng do để nhiều dòng rồi mắt
    let newCritArray = createFormPost(newCrit, criteria, criteriaArr);
    let formToPost = {
      assess_criteria: newCritArray,
      direct_uuid: currentDirect.uuid,
    };
    // Gọi hàm update thông tin ở đây - khỏi qua redux chi cho mất công
    // Sau khi cập nhập thành công thì dispatch lấy lại direct để cập nhập lại thông tin
    updateDirectCriteria(token, formToPost)
      .then((res) => {
        successAlert("Thành Công", "Bạn đã cập nhập chỉ tiêu cho chỉ đạo thành công");
        dispatch(getFilterDirectCrit(token, { status: 1 }));
      })
      .catch((err) => {
        errorAlert("Thất Bại", "Có lỗi khi cập nhập chỉ tiêu " + err);
      });
    setEditCrit(false);
  };

  const handleSubmitDelCrit = () => {
    let foundIdx = criteriaArr.findIndex((crit) => crit.id === criteria.id);
    criteriaArr.splice(foundIdx, 1);
    let formToPost = {
      assess_criteria: criteriaArr,
      direct_uuid: currentDirect.uuid,
    };
    updateDirectCriteria(token, formToPost)
      .then((res) => {
        successAlert("Thành Công", "Bạn đã xoá chỉ tiêu cho chỉ đạo thành công");
        dispatch(getFilterDirectCrit(token, { status: 1 }));
      })
      .catch((err) => {
        errorAlert("Thất Bại", "Có lỗi khi xoá chỉ tiêu " + err);
      });
  };

  return (
    <TaskDescription>
      <Row>
        <Col span={22}>
          {/* // --------------------------------------------------------------------------------	 */}
          {/* // CRIT EDIT SECTION	 */}
          {editCrit ? (
            <>
              <Row style={{ paddingRight: "5px" }}>
                <Col span={8} style={{ paddingRight: "5px" }}>
                  <DatePicker
                    value={form.due_date}
                    style={{ width: "100%", paddingRight: "5px" }}
                    placeholder="Chọn Ngày"
                    format="DD/MM/yyyy"
                    onChange={(e) => handleFormChange(e, "DATE")}
                  ></DatePicker>
                </Col>
                <Col span={16}>
                  <Input
                    placeholder="Nhập Chỉ Tiêu"
                    value={form?.description}
                    onChange={(e) => handleFormChange(e, "CRIT")}
                  ></Input>
                </Col>
              </Row>
            </>
          ) : (
            <p>
              [{criteria?.organization?.name}] -{" "}
              <span style={{ color: "red", fontWeight: "bold" }}>{moment(criteria?.due_date).format("DD/MM/yyyy")}</span> :{" "}
              {criteria?.description}
            </p>
          )}
        </Col>
        {userInfo?.isAdmin || userInfo?.organization === criteria?.organization?.id ? (
          <Col span={2}>
            {editCrit ? (
              <Button type={"primary"} icon={<CheckOutlined />} onClick={handleSubmitEditCrit}></Button>
            ) : (
              <Button icon={<EditOutlined />} onClick={handleSwitchEditCrit}></Button>
            )}
            <Button danger icon={<DeleteOutlined />} onClick={handleSubmitDelCrit}></Button>
          </Col>
        ) : null}
      </Row>
    </TaskDescription>
  );
}
