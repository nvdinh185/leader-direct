import React from "react";
import * as COMMON from "@constants/common";

const DetailDrawer = React.lazy(() => import("@containers/LeaderDirect/Meeting/Detail/DetailDrawer"));
const TaskDetail = React.lazy(() => import("@containers/LeaderDirect/OrgDirect/TaskDetail"));
const TaskDetailAss = React.lazy(() => import("@containers/LeaderDirect/OrgDirectAss/TaskDetail"));

export const DRAWER_COMPONENTS = {
  MEETING_DETAIL_DRAWER: DetailDrawer,
  [COMMON.DRAWER_TASK_DETAIL]: TaskDetail,
  [COMMON.DRAWER_TASK_DETAIL_ASS]: TaskDetailAss,
  /* other modals */
};
