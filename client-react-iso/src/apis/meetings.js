import { callAPI, callAPIForm, baseURL } from "./config/index";

// ---------------------------------------------------------------------------------
// -------------------------------- MEETING DATA SECTION -------------------------------
// --------------------------------------------------------------------------------

export const getMeetingList = (token) => {
  return callAPI("post", baseURL + "/get-meeting", null, token);
};

export const getFilterMeetingList = (token, crit) => {
  return callAPI("post", baseURL + "/get-filter-meeting", crit, token);
};

export const getMeetingById = (token, data) => {
  return callAPI("post", baseURL + "/get-meeting-by-id", data, token);
};

export const createMeeting = (token, data) => {
  return callAPIForm(baseURL + "/create-meeting", data, token);
};

export const updateMeeting = (token, data) => {
  return callAPIForm(baseURL + "/update-meeting", data, token);
};

// ---------------------------------------------------------------------------------
// -------------------------------- ATTACHMENT DATA SECTION -------------------------------
// --------------------------------------------------------------------------------

export const getAttachmentById = (token, data) => {
  return callAPI("post", baseURL + "/get-attachment-by-id", data, token);
};

export const getAttachmentByIds = (token, data) => {
  return callAPI("post", baseURL + "/get-attachment-by-ids", data, token);
};

export const getFile = (token, data) => {
  return callAPI("post", baseURL + "/get-file", data, token);
};
