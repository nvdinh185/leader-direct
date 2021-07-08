import React from "react";
import FlipMove from "react-flip-move";
import throttle from "lodash/throttle";
import articles from "./config";
import Toggle from "@components/GridListLayout/Toggle";
import ListItem from "@components/GridListLayout/GridListItem";
import MeetingView from "@containers/LeaderDirect/Meeting/MeetingView";
import IntlMessages from "@components/utility/intlMessages";
import { SortableCardWrapper } from "@components/GridListLayout/GridList.style";
import { BarsOutlined, AppstoreOutlined, UpOutlined, DownOutlined, TableOutlined } from "@ant-design/icons";
import { ButtonAdd } from "@components/Admin/ButtonAdd";

export default function () {
  const [state, setState] = React.useState({
    removedArticles: [],
    view: "grid",
    order: "asc",
    sortingMethod: "chronological",
    enterLeaveAnimation: "accordionVertical",
    articles,
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

  function toggleSort() {
    const sortAsc = (a, b) => a.timestamp - b.timestamp;
    const sortDesc = (a, b) => b.timestamp - a.timestamp;

    setState({
      ...state,
      order: state.order === "asc" ? "desc" : "asc",
      sortingMethod: "chronological",
      articles: state.articles.sort(state.order === "asc" ? sortDesc : sortAsc),
    });
  }

  function moveArticle(source, dest, id) {
    const sourceArticles = state[source].slice();
    let destArticles = state[dest].slice();

    if (!sourceArticles.length) return;

    // Find the index of the article clicked.
    // If no ID is provided, the index is 0
    const i = id ? sourceArticles.findIndex((article) => article.id === id) : 0;

    // If the article is already removed, do nothing.
    if (i === -1) return;

    destArticles = [].concat(sourceArticles.splice(i, 1), destArticles);

    setState({
      ...state,
      [source]: sourceArticles,
      [dest]: destArticles,
    });
  }

  function renderArticles() {
    return state.articles.map((article, i) => {
      return (
        <ListItem
          key={article.id}
          view={state.view}
          index={i}
          clickHandler={throttle(() => moveArticle("articles", "removedArticles", article.id), 800)}
          {...article}
        />
      );
    });
  }

  return (
    <SortableCardWrapper id="shuffle" className={`isomorphicSortableCardsHolder ${state.view}`}>
      <header className="isoControlBar">
        <div className="isoViewBtnGroup">
          <ButtonAdd size="large" shape="round" type="link">
            + Thêm Mới
          </ButtonAdd>
        </div>
        <div className="isoControlBtnGroup">
          <Toggle
            clickHandler={toggleSort}
            text={state.order === "asc" ? <IntlMessages id="toggle.ascending" /> : <IntlMessages id="toggle.descending" />}
            icon={state.order === "asc" ? <UpOutlined /> : <DownOutlined />}
            active={state.sortingMethod === "chronological"}
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
          <Toggle
            clickHandler={toggleTable}
            // text={<IntlMessages id="toggle.grid" />}
            icon={<TableOutlined />}
            active={state.view === "table"}
          />
        </div>
      </header>
      {state.view === "table" ? (
        <MeetingView></MeetingView>
      ) : (
        <div className="isoSortableCardsContainer">
          <FlipMove
            staggerDurationBy="30"
            duration={500}
            enterAnimation={state.enterLeaveAnimation}
            leaveAnimation={state.enterLeaveAnimation}
            typeName="ul"
          >
            {renderArticles()}
          </FlipMove>
        </div>
      )}
    </SortableCardWrapper>
  );
}
