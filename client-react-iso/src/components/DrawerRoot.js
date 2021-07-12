import React from "react";
import { Drawer } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { createGlobalStyle } from "styled-components";
import drawerActions from "@redux/drawer/actions";
import { DRAWER_COMPONENTS } from "@config/drawer.types";

const DrawerStyles = createGlobalStyle`
.ant-drawer {}
.ant-drawer-content-wrapper{
  width: 100% !important;
  @media (min-width: 768px){
    width: 500px!important;
  }
  @media (min-width: 1200px){
    width: 700px!important;
  }
}
`;

export default function DrawerRoot() {
  const drawerVisibility = useSelector((state) => state.drawer.drawerVisibility);
  const drawerType = useSelector((state) => state.drawer.drawerType);
  const drawerProps = useSelector((state) => state.drawer.drawerProps);

  const dispatch = useDispatch();

  const handleCloseDrawer = () => {
    dispatch(drawerActions.closeDrawer());
  };

  const handleOpenDrawer = () => {
    dispatch(drawerActions.openDrawer());
  };

  const SpecificDrawer = DRAWER_COMPONENTS[drawerType];

  if (!drawerType) {
    return null;
  }

  return (
    <Drawer
      placement="right"
      closable={false}
      onClose={handleCloseDrawer}
      visible={drawerVisibility}
      // width={700}
      destroyOnClose={true}
    >
      <DrawerStyles />
      <SpecificDrawer {...drawerProps} openDrawer={handleOpenDrawer} closeDrawer={handleCloseDrawer} />
    </Drawer>
  );
}
