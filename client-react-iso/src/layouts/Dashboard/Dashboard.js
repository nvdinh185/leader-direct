import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Layout } from "antd";
import { getFunctions, getMenuApiAll, getGrantedGroups, getGrantedUserList, getAllOrganization } from "@redux/adminUsers/actions";

import useWindowSize from "@lib/hooks/useWindowSize";
import appActions from "@redux/app/actions";
import siteConfig from "@config/site.config";

import ThemeSwitcher from "@containers/ThemeSwitcher/ThemeSwitcher";
import Sidebar from "@layouts/Sidebar/Sidebar";
import Topbar from "@layouts/Topbar/Topbar";
import DashboardRoutes from "./DashboardRoutes";

import { DashboardContainer, DashboardGlobalStyles } from "./Dashboard.styles";

const { Content, Footer } = Layout;
const { toggleAll } = appActions;
const styles = {
  layout: { flexDirection: "row", overflowX: "hidden" },
  content: {
    padding: "70px 0 0",
    flexShrink: "0",
    background: "#f1f3f6",
    position: "relative",
  },
  footer: {
    background: "#ffffff",
    textAlign: "center",
    borderTop: "1px solid #ededed",
  },
};

export default function Dashboard() {
  const dispatch = useDispatch();
  const appHeight = useSelector((state) => state.App.height);
  const token = useSelector((state) => state.Auth.idToken);
  const { width, height } = useWindowSize();

  // TODO: Call dispatch to get init data here (menu, user menu, filter data)
  React.useEffect(() => {
    dispatch(toggleAll(width, height));
    dispatch(getFunctions(token));
    dispatch(getMenuApiAll(token));
    dispatch(getGrantedGroups(token));
    dispatch(getGrantedUserList(token));
    dispatch(getAllOrganization(token));
  }, [width, height, dispatch]);

  return (
    <DashboardContainer>
      <DashboardGlobalStyles />
      <Layout style={{ height: height }}>
        <Topbar />
        <Layout style={styles.layout}>
          <Sidebar />
          <Layout
            className="isoContentMainLayout"
            style={{
              height: appHeight,
            }}
          >
            <Content className="isomorphicContent" style={styles.content}>
              <DashboardRoutes />
            </Content>
            <Footer style={styles.footer}>{siteConfig.footerText}</Footer>
          </Layout>
        </Layout>
        <ThemeSwitcher />
      </Layout>
    </DashboardContainer>
  );
}
