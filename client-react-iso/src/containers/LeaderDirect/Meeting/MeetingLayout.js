import React, { useEffect, useState } from "react";

import * as COMMON from "@constants/common";

import { useDispatch, useSelector } from "react-redux";
import { getMeetingList } from "@redux/meetings/actions";
import { getCategoryList } from "@redux/filterData/actions";
import modalActions from "@redux/modal/actions";
import useWindowSize from "@lib/hooks/useWindowSize";

import { Col, Row, Layout } from "antd";
import { BarsOutlined, AppstoreOutlined, TableOutlined } from "@ant-design/icons";
import Toggle from "@components/GridListLayout/Toggle";
import MeetingView from "@containers/LeaderDirect/Meeting/MeetingTableView";
import IntlMessages from "@components/utility/intlMessages";
import { SortableCardWrapper } from "@components/GridListLayout/GridList.style";
import { ButtonAdd } from "@components/Admin/ButtonAdd";
import PageHeader from "@components/utility/pageHeader";
import ListItem from "@containers/LeaderDirect/Meeting/MeetingGLItem";
import Sidebar from "@containers/LeaderDirect/Meeting/SideBar/SideBar";

export default function () {
  const meetings = useSelector((state) => state.meetings.filterMeetings);
  const filterMeetings = useSelector((state) => state.meetings.filterInnerMeetings);
  const organizations = useSelector((state) => state.adminUser.organizations);
  const categories = useSelector((state) => state.filterData.categories);
  const meetingTypes = useSelector((state) => state.filterData.meetingTypes);
  const backgrounds = useSelector((state) => state.filterData.backgrounds);
  const token = useSelector((state) => state.Auth.idToken);
  const App = useSelector((state) => state.App);

  const dispatch = useDispatch();

  const [meetingList, setMeetingList] = useState([]);
  const [initModalProps, setInitModalProps] = useState();
  const [backgroundUrl, setBackgroundUrl] = useState();

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

  function renderMeetings() {
    if (filterMeetings?.[0]) {
      return filterMeetings.map((meeting, i) => {
        // let width = state.view === "grid" ? 8 : 24;
        let meetingCat = categories.find((cat) => {
          return parseInt(meeting.category) === cat.id;
        });
        return (
          <Col key={meeting.id} {...returnListItemColSpan()}>
            <ListItem
              categoryName={meetingCat.name}
              code={meetingCat.code}
              key={meeting.id}
              view={state.view}
              index={i}
              meeting={meeting}
              {...meeting}
              bgColor={meetingCat?.bg_color}
            />
          </Col>
        );
      });
    }
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

  // ---------------------------------------------------------------------------------
  // NHÓM EFFECT ĐỂ LẤY DỮ LIỆU API
  // Effect để lấy meeing mặc định trong tháng từ api
  useEffect(() => {
    if ((token && !meetings) || meetings.length === 0) {
      dispatch(getMeetingList(token));
    }
  }, [token, meetings]);

  // Effect để lấy các dữ liệu filter data từ api
  useEffect(() => {
    if (token && categories && categories.length === 0) {
      dispatch(getCategoryList(token));
    }
  }, [token, categories]);

  // Sau khi có đủ các dữ liệu từ store thì set giá trị ban đầu cần truyền cho modal
  useEffect(() => {
    if (organizations?.[0] && meetingTypes?.[0] && filterMeetings?.[0]) {
      setInitModalProps({
        modalType: COMMON.MEETING_ADD_EDIT_MODAL,
        modalProps: {
          organizations: organizations,
          meetings: filterMeetings,
          meetingTypes: meetingTypes,
          width: size.width > 1200 ? size.width * 0.7 : size.width * 0.6,
          centered: true,
          initialValues: {},
          cancelText: "Bỏ Qua",
          destroyOnClose: true,
        },
      });
    }
  }, [organizations, meetingTypes, meetings]);

  // ---------------------------------------------------------------------------------
  // NHÓM EFFECT SET GIAO DIỆN CHO LAYOUT
  useEffect(() => {
    if (categories?.[0]) {
      setMeetingList(renderMeetings());
    }
  }, [filterMeetings, categories]);

  useEffect(() => {
    if (filterMeetings?.[0]) {
      setMeetingList(renderMeetings());
    }
  }, [state.view]);

  // Khi có backgrounds trong store thì set riêng giá trị background
  useEffect(() => {
    if (backgrounds && backgrounds?.[0] && !backgroundUrl) {
      let bg = backgrounds.find((bg) => bg.code === COMMON.BG_MEETING);
      if (bg.status == 1) {
        setBackgroundUrl(bg);
        return;
      }
    }
  }, [backgrounds]);

  return (
    <Layout
      style={{
        backgroundImage: backgroundUrl?.description ? backgroundUrl?.description : "",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <PageHeader style={{ marginBottom: "10px" }} titleColor={backgroundUrl?.text_color ? backgroundUrl.text_color : null}>
        {<IntlMessages id="sidebar.leaderMeeting" />}
      </PageHeader>
      <Row>
        <Col sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 4 }}>
          {state.view === "table" ? (
            <>
              <ButtonAdd size="large" shape="round" onClick={handleOpenModal} style={{ margin: "15px" }}>
                + Thêm Mới
              </ButtonAdd>
            </>
          ) : (
            <>
              <Sidebar categories={categories}></Sidebar>
            </>
          )}
        </Col>
        <Col sm={{ span: 24 }} md={{ span: 19 }} lg={{ span: 20 }}>
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
            {state.view === "table" ? null : <Row>{meetingList}</Row>}
          </SortableCardWrapper>
        </Col>
        {state.view === "table" ? (
          <Col span={24}>
            <MeetingView
              meetings={filterMeetings}
              categories={categories}
              organizations={organizations}
              size={size}
              initModalProps={initModalProps}
            ></MeetingView>
          </Col>
        ) : null}
      </Row>
    </Layout>
  );
}
