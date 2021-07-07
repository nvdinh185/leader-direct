import React from "react";

const DetailDrawer = React.lazy(() => import("@containers/LeaderDirect/Meeting/Detail/DetailDrawer"));

export const DRAWER_COMPONENTS = {
  MEETING_DETAIL_DRAWER: DetailDrawer,
  /* other modals */
};
