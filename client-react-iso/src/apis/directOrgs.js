import { callAPI, callAPIForm, baseURL } from "./config/index";

// ---------------------------------------------------------------------------------
// -------------------------------- DIRECT SECTION -------------------------------
// --------------------------------------------------------------------------------

export const getDirectOrgAll = (token) => {
  return callAPI("post", baseURL + "/get-direct-org-all", null, token);
};

export const getDirectExeByDOs = (token, data) => {
  return callAPI("post", baseURL + "/get-direct-exe-by-dos", data, token);
};

export const getFilterDirectOrg = (token, data) => {
  console.log(token);
  return callAPI("post", baseURL + "/get-filter-direct-org", data, token);
};

export const updateDirectOrgExecStatus = (token, data) => {
  return callAPI("post", baseURL + "/update-direct-org-exec-status", data, token);
};
