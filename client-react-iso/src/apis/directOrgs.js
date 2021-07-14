import { callAPI, callAPIForm, baseURL } from "./config/index";

// ---------------------------------------------------------------------------------
// -------------------------------- DIRECT SECTION -------------------------------
// --------------------------------------------------------------------------------

export const getDirectOrgAll = (token) => {
  return callAPI("post", baseURL + "/get-direct-org-all", null, token);
};

// export const getDirectByIds = (token, data) => {
//   return callAPI("post", baseURL + "/get-direct-by-ids", data, token);
// };

// export const createDirect = (token, data) => {
//   return callAPI("post", baseURL + "/create-direct", data, token);
// };

export const updateDirectOrgExecStatus = (token, data) => {
  return callAPI("post", baseURL + "/update-direct-org-exec-status", data, token);
};
