import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategoryList } from "@redux/filterData/actions";
import { successAlert } from "@components/AlertModal/ModalInfo";
import modalActions from "@redux/modal/actions";
import useWindowSize from "@lib/hooks/useWindowSize";

import { Col, Row } from "antd";
import PlusIcon from "@assets/images/icon/09-icon.svg";
import HeadingWithIcon from "@components/LeaderDirect/HeadingWithIcon";
import { ButtonAdd } from "@components/Admin/ButtonAdd";
import ListItem from "@containers/LeaderDirect/Direct/DirectGLItem";

export default function DetailDirects({ meeting, directs, ...props }) {
  const token = useSelector((state) => state.Auth.idToken);
  const organizations = useSelector((state) => state.adminUser.organizations);
  const categories = useSelector((state) => state.filterData.categories);
  const dispatch = useDispatch();

  const [directComps, setDirectComps] = useState();
  const [leaderTypes, setLeaderTypes] = useState([]);
  const [directTypes, setDirectTypes] = useState([]);

  const size = useWindowSize();

  function renderDirects(_directs) {
    return _directs
      ? _directs.map((direct, i) => {
        let directCat = categories.find((cat) => {
          return direct.category === cat.id;
        });
        let leaderCat = categories.find((cat) => cat.id === parseInt(direct.leader));

        return (
          <Col span={24} key={direct.id}>
            <ListItem
              leaderCat={leaderCat}
              categoryName={directCat.name}
              code={directCat?.code}
              bgColor={directCat?.bg_color}
              index={i}
              direct={direct}
              view={"list"}
              meeting={meeting}
              leaderTypes={leaderTypes}
              directTypes={directTypes}
              organizations={organizations}
              {...direct}
            />
          </Col>
        );
      })
      : null;
  }

  // Effect gọi lấy data khi chưa có
  useEffect(() => {
    if (!categories || categories.length === 0) {
      dispatch(getCategoryList(token));
    }
  }, [categories]);

  useEffect(() => {
    if (directs?.[0] && categories?.[0]) {
      setDirectComps(renderDirects(directs));
    }
  }, [directs, categories]);

  // Sau khi có categories thì tạo 2 state directTypes và leaderTypes
  useEffect(() => {
    if (categories?.[0]) {
      setLeaderTypes(categories.filter((cat) => cat.parent_id === 6));
      setDirectTypes(categories.filter((cat) => cat.parent_id === 3));
    }
  }, [categories]);

  const handleAddDirect = () => {
    dispatch(
      modalActions.openModal({
        modalType: "DIRECT_ADD_EDIT_MODAL",
        modalProps: {
          title: "Thêm Mới Chỉ Đạo",
          meeting: meeting,
          organizations: organizations,
          directTypes: directTypes,
          leaderTypes: leaderTypes,
          modalMode: "ADD",
          okText: "Thêm Mới",
          width: size.width > 1200 ? size.width * 0.7 : size.width * 0.6,
          centered: true,
          initialValues: {},
          cancelText: "Bỏ Qua",
          destroyOnClose: true,
        },
      })
    );
  };

  return (
    <>
      <HeadingWithIcon heading="Danh Sách Chỉ Đạo" iconSrc={PlusIcon} />
      {/* TODO: List of Chi Dao Lanh Dao Here */}
      <Row>
        <Col span={24}>
          <ButtonAdd block size="large" onClick={handleAddDirect}>
            + Thêm Chỉ Đạo
          </ButtonAdd>
        </Col>
      </Row>
      <br />
      <Row>{directComps}</Row>
    </>
  );
}
