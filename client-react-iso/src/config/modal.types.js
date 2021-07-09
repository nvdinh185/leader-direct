import React from "react";

const MeetingAddForm = React.lazy(() => import("@containers/LeaderDirect/Meeting/MeetingAddForm"));
const DirectAddForm = React.lazy(() => import("@containers/LeaderDirect/Direct/DirectAddForm"));

export const MODAL_COMPONENTS = {
  MEETING_ADD_EDIT_MODAL: MeetingAddForm,
  DIRECT_ADD_EDIT_MODAL: DirectAddForm,
  /* other modals */
};
