import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getMeetingList } from "@redux/meetings/actions";
import { getCategoryList } from "@redux/filterData/actions";
import modalActions from "@redux/modal/actions";
import useWindowSize from "@lib/hooks/useWindowSize";

import { Col, Row } from "antd";
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
  const meetings = useSelector((state) => state.directMeeting.meetings);
  const organizations = useSelector((state) => state.adminUser.organizations);
  const categories = useSelector((state) => state.filterData.categories);
  const token = useSelector((state) => state.Auth.idToken);
  const App = useSelector((state) => state.App);

  const dispatch = useDispatch();

  const [meetingList, setMeetingList] = useState([]);
  const [meetingTypes, setMeetingTypes] = useState([]);
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

  function renderMeetings() {
    return meetings.map((meeting, i) => {
      let width = state.view === "grid" ? 8 : 24;
      return (
        <Col key={meeting.id} {...returnListItemColSpan()}>
          <ListItem key={meeting.id} view={state.view} index={i} meeting={meeting} {...meeting} />
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
      return { xs: 24, sm: 12, md: 12, lg: 8, xl: 6 };
    }
    return obj;
  }

  // Effect để lấy các dữ liệu từ api
  useEffect(() => {
    if ((token && !meetings) || meetings.length === 0) {
      dispatch(getMeetingList(token));
    }
  }, [token, meetings]);

  // Effect để lấy các dữ liệu từ api
  useEffect(() => {
    if (token && categories && categories.length === 0) {
      dispatch(getCategoryList(token));
    }
  }, [token, categories]);

  // Sau khi có đủ các dữ liệu từ store thì set giá trị ban đầu cần truyền cho modal
  useEffect(() => {
    if (organizations?.[0] && meetingTypes?.[0] && meetings?.[0]) {
      setInitModalProps({
        modalType: "MEETING_ADD_EDIT_MODAL",
        modalProps: {
          organizations: organizations,
          meetings: meetings,
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

  useEffect(() => {
    if (categories.length > 0 && meetingTypes.length === 0) {
      setMeetingTypes(categories.filter((cat) => cat.parent_id === 4));
    }
  }, [categories]);

  useEffect(() => {
    if (meetings?.[0]) {
      setMeetingList(renderMeetings());
    }
  }, [meetings]);

  useEffect(() => {
    if (meetings?.[0]) {
      setMeetingList(renderMeetings());
    }
  }, [state.view]);

  return (
    <>
      <PageHeader style={{ marginBottom: "10px" }}>{<IntlMessages id="sidebar.leaderMeeting" />}</PageHeader>
      <Row>
        <Col sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }}>
          {state.view === "table" ? (
            <>
              <ButtonAdd size="large" shape="round" onClick={handleOpenModal} style={{ margin: "15px" }}>
                + Thêm Mới
              </ButtonAdd>
              {/* TODO: Add horizontal filter bar here */}
            </>
          ) : (
            <>
              <Sidebar categories={categories}></Sidebar>
            </>
          )}
        </Col>
        <Col sm={{ span: 24 }} md={{ span: 16 }} lg={{ span: 18 }}>
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
              meetings={meetings}
              categories={categories}
              organizations={organizations}
              size={size}
              initModalProps={initModalProps}
            ></MeetingView>
          </Col>
        ) : null}
      </Row>
    </>
  );
}
