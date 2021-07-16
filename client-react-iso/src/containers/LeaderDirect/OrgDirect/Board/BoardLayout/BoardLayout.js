import React, { useState, useEffect } from "react";
import * as COMMON from "@constants/common";
import { connect } from "react-redux";
import { useSelector, useDispatch } from "react-redux";
import modalActions from "@redux/modal/actions";
import scrumBoardActions from "@redux/scrumBoard/actions";
import { getDirectOrgAll, getDirectExeByDOs } from "@redux/directOrgs/actions";
import { Link } from "react-router-dom";

import { Layout, Menu, Dropdown, Popover, Checkbox, Button } from "antd";
import { CaretDownOutlined, DownOutlined, LoadingOutlined } from "@ant-design/icons";
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
import { ButtonAdd } from "@components/Admin/ButtonAdd";
import { warningAlert } from "@components/AlertModal/ModalInfo";
import useWindowSize from "@lib/hooks/useWindowSize";

const { Content } = Layout;

const BoardLayout = ({ children, setSearchText, boards, currentBoard = "", openModal }) => {
  const backgrounds = useSelector((state) => state.filterData.backgrounds);
  const token = useSelector((state) => state.Auth.idToken);
  const directOrgs = useSelector((state) => state.directOrgs.directOrgs);
  const boardDOs = useSelector((state) => state.scrumBoard.tasks);
  const [backgroundUrl, setBackgroundUrl] = useState();

  const size = useWindowSize();

  const dispatch = useDispatch();

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

  function returnChangedDOArr(_directOrgs, _boardDOs) {
    let updateArr = _directOrgs.reduce((agg, directOrg) => {
      let boardItemStt = parseInt(boardDOs[directOrg.uuid].column_id.split("-")[1]);
      if (boardItemStt !== directOrg.exec_status) {
        return [...agg, { uuid: directOrg.uuid, exec_status: boardItemStt, description: directOrg.description }];
      }
      return agg;
    }, []);
    return updateArr;
  }

  function handleUpdateDOStatus() {
    let updateArr = returnChangedDOArr(directOrgs, boardDOs);
    if (updateArr.length > 0) {
      dispatch(
        openModal({
          modalType: COMMON.UPDATE_TASK_DESC_MODAL,
          modalProps: {
            width: size.width > 1200 ? size.width * 0.7 : size.width * 0.9,
            title: "Cập Nhập Trạng Thái Chỉ Đạo",
            updateArr: updateArr,
            centered: true,
            initialValues: {},
            okText: "Cập Nhập",
            cancelText: "Bỏ Qua",
            destroyOnClose: true,
          },
        })
      );
      // Time out to test alert overlay of modal
      // setTimeout(() => {
      //   confirmAlert("Xác Nhận", `Bạn thực hiện ${updateArr.length} sự thay đổi!`, () => successAlert("Thành Công"));
      // }, 1000);
      return;
    }
    warningAlert("Thông Báo", "Bạn không thực hiện thay đổi gì cả!");
  }

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

  // Effect call khi có sự thay đổi directOrg ở redux thì gọi API lấy lại direct exe
  // useEffect(() => {
  //   if (directOrgs?.[0]) {
  //     let uuidArr = directOrgs.map((dO) => dO.uuid);
  //     dispatch(getDirectExeByDOs(token, { uuidArr }));
  //   }
  // }, [directOrgs]);

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
          <Filters>
            <div>
              Labels <CaretDownOutlined />
            </div>

            <div>
              Assignee
              <CaretDownOutlined />
            </div>
          </Filters>
          <ButtonAdd style={{ fontWeight: "bold" }} className="btnUpdateDOStatus" size="large" onClick={handleUpdateDOStatus}>
            Cập Nhập Dữ Liệu
          </ButtonAdd>
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
