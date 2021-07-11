import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getCategoryList } from "@redux/filterData/actions";
import { getAllDirect } from "@redux/directs/actions";
import modalActions from "@redux/modal/actions";
import useWindowSize from "@lib/hooks/useWindowSize";

import { Col, Row } from "antd";
import { BarsOutlined, AppstoreOutlined, TableOutlined } from "@ant-design/icons";
import Toggle from "@components/GridListLayout/Toggle";
import DirectView from "@containers/LeaderDirect/Direct/DirectTableView";
import IntlMessages from "@components/utility/intlMessages";
import { SortableCardWrapper } from "@components/GridListLayout/GridList.style";
import { ButtonAdd } from "@components/Admin/ButtonAdd";
import PageHeader from "@components/utility/pageHeader";
import ListItem from "@containers/LeaderDirect/Direct/DirectGLItem";
import Sidebar from "@containers/LeaderDirect/Direct/SideBar/SideBar";

export default function () {
  const directs = useSelector((state) => state.directs.directs);
  const organizations = useSelector((state) => state.adminUser.organizations);
  const categories = useSelector((state) => state.filterData.categories);
  const token = useSelector((state) => state.Auth.idToken);
  const App = useSelector((state) => state.App);

  const dispatch = useDispatch();

  const [directList, setDirectList] = useState([]);
  const [directTypes, setDirectTypes] = useState([]);
  const [initModalProps, setInitModalProps] = useState();

  const size = useWindowSize();

  const [state, setState] = useState({
    view: "grid",
    order: "asc",
    enterLeaveAnimation: "accordionVertical",
  });

  function toggleList() {
    setState({
      ...state,
      view: "list",
      enterLeaveAnimation: "accordionVertical",
    });
  }

  function toggleGrid() {
    setState({
      ...state,
      view: "grid",
      enterLeaveAnimation: "accordionHorizontal",
    });
  }

  function toggleTable() {
    setState({
      ...state,
      view: "table",
      enterLeaveAnimation: "accordionVertical",
    });
  }

  function renderDirects() {
    return directs.map((direct, i) => {
      // let width = state.view === "grid" ? 8 : 24;
      let directCat = categories.find((cat) => {
        return direct.category === cat.id;
      });
      return (
        <Col key={direct.id} {...returnListItemColSpan()}>
          <ListItem
            code={directCat.code}
            categoryName={directCat.name}
            bgColor={directCat?.bg_color}
            view={state.view}
            index={i}
            organizations={organizations}
            {...direct}
          />
        </Col>
      );
    });
  }

  function handleOpenModal() {
    dispatch(
      modalActions.openModal({
        ...initModalProps,
        modalProps: { ...initModalProps.modalProps, title: "Tạo Mới Cuộc Họp", okText: "Thêm Mới", modalMode: "ADD" },
      })
    );
  }

  function returnListItemColSpan() {
    let obj = { span: 24 };
    if (state.view === "grid") {
      return { xs: 24, sm: 12, md: 12, lg: 8, xl: 8 };
    }
    return obj;
  }

  // Effect để lấy các dữ liệu từ api
  useEffect(() => {
    if ((token && !directs) || directs.length === 0) {
      dispatch(getAllDirect(token));
    }
  }, [token, directs]);

  // Effect để lấy các dữ liệu từ api
  useEffect(() => {
    if (token && categories && categories.length === 0) {
      dispatch(getCategoryList(token));
    }
  }, [token, categories]);

  // Sau khi có đủ các dữ liệu từ store thì set giá trị ban đầu cần truyền cho modal
  useEffect(() => {
    if (organizations?.[0] && directTypes?.[0] && directs?.[0]) {
      setInitModalProps({
        modalType: "MEETING_ADD_EDIT_MODAL",
        modalProps: {
          organizations: organizations,
          directs: directs,
          directTypes: directTypes,
          width: size.width > 1200 ? size.width * 0.7 : size.width * 0.6,
          centered: true,
          initialValues: {},
          cancelText: "Bỏ Qua",
          destroyOnClose: true,
        },
      });
    }
  }, [organizations, directTypes, directs]);

  useEffect(() => {
    if (categories.length > 0 && directTypes.length === 0) {
      setDirectTypes(categories.filter((cat) => cat.parent_id === 4));
    }
  }, [categories]);

  useEffect(() => {
    if (directs?.[0] && categories?.[0]) {
      setDirectList(renderDirects());
    }
  }, [directs, categories]);

  useEffect(() => {
    if (directs?.[0]) {
      setDirectList(renderDirects());
    }
  }, [state.view]);

  return (
    <>
      <PageHeader style={{ marginBottom: "10px" }}>{<IntlMessages id="sidebar.leaderDirectMng" />}</PageHeader>
      <Row>
        <Col sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 5 }}>
          {state.view === "table" ? (
            <>
              <ButtonAdd size="large" shape="round" onClick={handleOpenModal} style={{ margin: "15px" }}>
                + Thêm Mới
              </ButtonAdd>
              {/* TODO: Add horizontal filter bar here */}
            </>
          ) : (
            <>
              <Sidebar categories={categories} organizations={organizations}></Sidebar>
            </>
          )}
        </Col>
        <Col sm={{ span: 24 }} md={{ span: 18 }} lg={{ span: 19 }}>
          <SortableCardWrapper id="shuffle" className={`isomorphicSortableCardsHolder ${state.view}`}>
            <header className="isoControlBar">
              <div className="isoViewBtnGroup">
                {state.view !== "table" ? (
                  <ButtonAdd size="middle" shape="round" onClick={handleOpenModal}>
                    + Thêm Mới
                  </ButtonAdd>
                ) : null}
              </div>
              <div className="isoControlBtnGroup">
                {App.view === "MobileView" ? null : (
                  <Toggle
                    clickHandler={toggleTable}
                    // text={<IntlMessages id="toggle.grid" />}
                    icon={<TableOutlined />}
                    active={state.view === "table"}
                  />
                )}

                <Toggle
                  clickHandler={toggleList}
                  // text={<IntlMessages id="toggle.list" />}
                  icon={<BarsOutlined />}
                  active={state.view === "list"}
                />
                <Toggle
                  clickHandler={toggleGrid}
                  // text={<IntlMessages id="toggle.grid" />}
                  icon={<AppstoreOutlined />}
                  active={state.view === "grid"}
                />
              </div>
            </header>
            {state.view === "table" ? null : <Row>{directList}</Row>}
          </SortableCardWrapper>
        </Col>
        {state.view === "table" ? (
          <Col span={24}>
            <DirectView
              directs={directs}
              categories={categories}
              organizations={organizations}
              size={size}
              initModalProps={initModalProps}
            ></DirectView>
          </Col>
        ) : null}
      </Row>
    </>
  );
}
