import React from "react";
import * as COMMON from "@constants/common";

const DetailDrawer = React.lazy(() => import("@containers/LeaderDirect/Meeting/Detail/DetailDrawer"));
const TaskDetail = React.lazy(() => import("@containers/LeaderDirect/OrgDirect/TaskDetail"));

export const DRAWER_COMPONENTS = {
  MEETING_DETAIL_DRAWER: DetailDrawer,
  [COMMON.DRAWER_TASK_DETAIL]: TaskDetail,
  /* other modals */
};
