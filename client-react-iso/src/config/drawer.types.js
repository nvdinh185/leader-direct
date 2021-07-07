import React from "react";

const MeetingDetailDrawer = React.lazy(() => import("@containers/LeaderDirect/Meeting/MeetingDetail"));

export const DRAWER_COMPONENTS = {
  MEETING_DETAIL_DRAWER: MeetingDetailDrawer,
  /* other modals */
};
