import React, { useState, useEffect } from "react";
import * as COMMON from "@constants/common";
import { connect } from "react-redux";
import { useSelector } from "react-redux";
import modalActions from "@redux/modal/actions";
import scrumBoardActions from "@redux/scrumBoard/actions";
import { Link } from "react-router-dom";

import { Layout, Menu, Dropdown, Popover, Checkbox } from "antd";
import { CaretDownOutlined, DownOutlined } from "@ant-design/icons";
import PageHeader from "@components/utility/pageHeader";
import SearchInput from "@components/ScrumBoard/SearchInput/SearchInput";
import { variables } from "@assets/styles/variables";
import AvatarIcon from "@assets/images/icon/08-icon.svg";
import { Scrollbars } from "react-custom-scrollbars";

import {
  ProjectInfoCard,
  Avatar,
  Category,
  Title,
  InfoWrapper,
  DropdownHeader,
  ViewAll,
  CreateProject,
  Filters,
  Header,
  HeaderSecondary,
} from "./BoardLayout.style";

const { Content } = Layout;

const BoardLayout = ({ children, setSearchText, boards, currentBoard = "" }) => {
  const backgrounds = useSelector((state) => state.filterData.backgrounds);
  const [backgroundUrl, setBackgroundUrl] = useState();

  const menu = (
    <Menu>
      <Menu.Item>
        <DropdownHeader>Projects</DropdownHeader>
      </Menu.Item>

      {Object.values(boards).map((board) => (
        <Menu.Item key={board.id}>
          <Link to={`/dashboard/scrum-board/project/${board.id}`}>
            <ProjectInfoCard>
              <Avatar src={AvatarIcon} />
              <InfoWrapper>
                <Title>{board.title}</Title>
                <Category>{board.category}</Category>
              </InfoWrapper>
            </ProjectInfoCard>
          </Link>
        </Menu.Item>
      ))}

      <Menu.Item>
        <ViewAll>
          <Link to="/dashboard/scrum-board">View All Projects</Link>
        </ViewAll>
      </Menu.Item>
      <Menu.Item>
        <CreateProject>
          <Link to="/dashboard/scrum-board/new">Create New Project</Link>
        </CreateProject>
      </Menu.Item>
    </Menu>
  );

  // Khi có backgrounds trong store thì set riêng giá trị background
  useEffect(() => {
    if (backgrounds && backgrounds?.[0] && !backgroundUrl) {
      let bg = backgrounds.find((bg) => bg.code === COMMON.BG_DIRECT_ORG);
      if (bg.status == 1) {
        setBackgroundUrl(bg);
        return;
      }
    }
  }, [backgrounds]);

  return (
    <>
      <Layout
        style={{
          backgroundColor: `${variables.WHITE_COLOR}`,
          backgroundImage: backgroundUrl?.description ? backgroundUrl?.description : "",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <PageHeader style={{ marginBottom: "10px" }} titleColor={backgroundUrl?.text_color ? backgroundUrl.text_color : null}>
          {"Chỉ Đạo Của Đơn Vị"}
        </PageHeader>
        <HeaderSecondary>
          <SearchInput searchColor="white" onChange={(value) => setSearchText(value)} />

          {/* // --------------------------------------------------------------------------------- 
          // TODO: RENDER YOUR OWN FILTER HERE
          // ---------------------------------------------------------------------------------  */}
          {/* <Filters>
            <Popover
              placement="bottom"
              overlayClassName="scrum-popover"
              content={<Checkbox.Group options={LABELS} onChange={(value) => setSearchText(...value)} />}
              trigger="click"
            >
              <div>
                Labels <CaretDownOutlined />
              </div>
            </Popover>

            <Popover
              placement="bottom"
              overlayClassName="scrum-popover"
              content={<Checkbox.Group options={ASSIGNEES} onChange={(value) => setSearchText(...value)} />}
              trigger="click"
            >
              <div>
                Assignee
                <CaretDownOutlined />
              </div>
            </Popover>
          </Filters> */}
        </HeaderSecondary>

        <Content
          style={{
            padding: "0 24px",
            width: "100%",
          }}
        >
          <Scrollbars
            style={{
              width: "100%",
              height: "calc(100vh - 200px)",
            }}
            autoHide
          >
            {children}
          </Scrollbars>
        </Content>
      </Layout>
    </>
  );
};

export default connect(null, { ...modalActions, ...scrumBoardActions })(BoardLayout);
