import { callAPI, callAPIForm, baseURL } from "./config/index";

// ---------------------------------------------------------------------------------
// -------------------------------- USER DATA SECTION -------------------------------
// --------------------------------------------------------------------------------

export const getAttachmentById = (token) => {
  return callAPI("post", baseURL + "/get-attachment-by-id", null, token);
};

export const deleteAttachment = (token, data) => {
  return callAPI("post", baseURL + "/delete-attachment", data, token);
};
