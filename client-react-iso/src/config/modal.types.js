import React from "react";
import * as COMMON from "@constants/common";

const MeetingAddForm = React.lazy(() => import("@containers/LeaderDirect/Meeting/MeetingAddForm"));
const DirectAddForm = React.lazy(() => import("@containers/LeaderDirect/Direct/DirectAddForm"));
const UpdateTaskDescModal = React.lazy(() => import("@containers/LeaderDirect/OrgDirect/UpdateTaskDescModal"));

export const MODAL_COMPONENTS = {
  MEETING_ADD_EDIT_MODAL: MeetingAddForm,
  DIRECT_ADD_EDIT_MODAL: DirectAddForm,
  [COMMON.UPDATE_TASK_DESC_MODAL]: UpdateTaskDescModal,
  /* other modals */
};
