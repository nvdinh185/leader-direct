import React from "react";

const MeetingAddForm = React.lazy(() => import("@containers/LeaderDirect/Meeting/MeetingAddForm"));

export const MODAL_COMPONENTS = {
  MEETING_ADD_EDIT_MODAL: MeetingAddForm,
  /* other modals */
};
