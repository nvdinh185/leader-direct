import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Layout, Menu } from "antd";
import { createNestedMenuFromDb } from "@lib/utils/tree-helper";
import useGetUserAuthOrg from "@lib/hooks/useOrganization";
import Scrollbars from "@components/utility/customScrollBar";
import appActions from "@redux/app/actions";
import Logo from "@components/utility/logo";
import SidebarWrapper from "./Sidebar.styles";
import SidebarMenu from "./SidebarMenu";
import useUserMenu from "@lib/hooks/useUserMenu";
const { Sider } = Layout;

const { toggleOpenDrawer, changeOpenKeys, changeCurrent, toggleCollapsed } = appActions;

export default function Sidebar() {
  const menus = useUserMenu();
  const { view, openKeys, collapsed, openDrawer, current, height } = useSelector((state) => state.App);
  const customizedTheme = useSelector((state) => state.ThemeSwitcher.sidebarTheme);
  const dispatch = useDispatch();
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (menus?.[0] && options.length === 0) {
      // Lọc lần đầu level đầu tiên để đưa vào thuật toán
      let parentMenu = menus.filter((menu) => !menu.parent_id);
      const menuMap = [
        { keyName: "key", dbName: "page" },
        { keyName: "label", dbName: "name" },
        { keyName: "leftIcon", dbName: "icon" },
      ];
      let newMenus = createNestedMenuFromDb(menus, menuMap, ...parentMenu).filter((menu) => !menu.parent_id);
      console.log(newMenus);
      setOptions(newMenus);
    }
  }, [menus]);

  function handleClick(e) {
    dispatch(changeCurrent([e.key]));
    if (view === "MobileView") {
      setTimeout(() => {
        dispatch(toggleCollapsed());
        // dispatch(toggleOpenDrawer());
      }, 100);

      // clearTimeout(timer);
    }
  }
  function onOpenChange(newOpenKeys) {
    const latestOpenKey = newOpenKeys.find((key) => !(openKeys.indexOf(key) > -1));
    const latestCloseKey = openKeys.find((key) => !(newOpenKeys.indexOf(key) > -1));
    let nextOpenKeys = [];
    if (latestOpenKey) {
      nextOpenKeys = getAncestorKeys(latestOpenKey).concat(latestOpenKey);
    }
    if (latestCloseKey) {
      nextOpenKeys = getAncestorKeys(latestCloseKey);
    }
    dispatch(changeOpenKeys(nextOpenKeys));
  }
  const getAncestorKeys = (key) => {
    const map = {
      sub3: ["sub2"],
    };
    return map[key] || [];
  };

  const isCollapsed = collapsed && !openDrawer;
  const mode = isCollapsed === true ? "vertical" : "inline";
  const onMouseEnter = (event) => {
    if (collapsed && openDrawer === false) {
      dispatch(toggleOpenDrawer());
    }
    return;
  };
  const onMouseLeave = () => {
    if (collapsed && openDrawer === true) {
      dispatch(toggleOpenDrawer());
    }
    return;
  };
  const styling = {
    backgroundColor: customizedTheme.backgroundColor,
  };
  const submenuStyle = {
    backgroundColor: "rgba(0,0,0,0.3)",
    color: customizedTheme.textColor,
  };
  const submenuColor = {
    color: customizedTheme.textColor,
  };

  return (
    <SidebarWrapper>
      <Sider
        trigger={null}
        collapsible={true}
        collapsed={isCollapsed}
        width={240}
        className="isomorphicSidebar"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        style={styling}
      >
        <Logo collapsed={isCollapsed} />
        <Scrollbars style={{ height: height - 70 }}>
          <Menu
            onClick={handleClick}
            theme="dark"
            className="isoDashboardMenu"
            mode={mode}
            openKeys={isCollapsed ? [] : openKeys}
            selectedKeys={current}
            onOpenChange={onOpenChange}
          >
            {options?.map((singleOption) => (
              <SidebarMenu
                key={singleOption.key}
                submenuStyle={submenuStyle}
                submenuColor={submenuColor}
                singleOption={singleOption}
              />
            ))}
          </Menu>
        </Scrollbars>
      </Sider>
    </SidebarWrapper>
  );
}
