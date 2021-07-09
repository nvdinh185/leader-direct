import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Toggle from "@components/GridListLayout/Toggle";
import ListItem from "@containers/LeaderDirect/Meeting/MeetingGLItem";
import MeetingView from "@containers/LeaderDirect/Meeting/MeetingTableView";
import IntlMessages from "@components/utility/intlMessages";
import { SortableCardWrapper } from "@components/GridListLayout/GridList.style";
import { BarsOutlined, AppstoreOutlined, TableOutlined } from "@ant-design/icons";
import { ButtonAdd } from "@components/Admin/ButtonAdd";
import { getMeetingList } from "@redux/meetings/actions";
import { Col, Row } from "antd";
import PageHeader from "@components/utility/pageHeader";
import Sidebar from "@containers/LeaderDirect/Meeting/SideBar/SideBar";

export default function () {
  const meetings = useSelector((state) => state.directMeeting.meetings);
  const token = useSelector((state) => state.Auth.idToken);

  const dispatch = useDispatch();

  const [meetingList, setMeetingList] = useState([]);

  const [state, setState] = useState({
    removedArticles: [],
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
        <Col span={width}>
          <ListItem key={meeting.id} view={state.view} index={i} meeting={meeting} {...meeting} />
        </Col>
      );
    });
  }

  useEffect(() => {
    if (meetings?.[0]) {
      setMeetingList(renderMeetings());
    }
  }, [meetings]);

  useEffect(() => {
    setMeetingList(renderMeetings());
  }, [state.view]);

  useEffect(() => {
    if (token && meetings && meetings.length === 0) {
      dispatch(getMeetingList(token));
    }
  }, [token, meetings]);

  return (
    <>
      <PageHeader style={{ marginBottom: "10px" }}>{<IntlMessages id="sidebar.leaderMeeting" />}</PageHeader>
      <Row>
        <Col sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }}>
          {state.view === "table" ? null : (
            <>
              <Sidebar></Sidebar>
            </>
          )}
        </Col>
        <Col sm={{ span: 24 }} md={{ span: 16 }} lg={{ span: 18 }}>
          <SortableCardWrapper id="shuffle" className={`isomorphicSortableCardsHolder ${state.view}`}>
            <header className="isoControlBar">
              <div className="isoViewBtnGroup">
                {state.view !== "table" ? (
                  <ButtonAdd size="middle" shape="round">
                    + Thêm Mới
                  </ButtonAdd>
                ) : null}
              </div>
              <div className="isoControlBtnGroup">
                <Toggle
                  clickHandler={toggleTable}
                  // text={<IntlMessages id="toggle.grid" />}
                  icon={<TableOutlined />}
                  active={state.view === "table"}
                />
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
            <MeetingView></MeetingView>
          </Col>
        ) : null}
      </Row>
    </>
  );
}
