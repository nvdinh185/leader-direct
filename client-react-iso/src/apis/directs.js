import { callAPI, callAPIForm, baseURL } from "./config/index";

// ---------------------------------------------------------------------------------
// -------------------------------- DIRECT SECTION -------------------------------
// --------------------------------------------------------------------------------

export const getDirectsAll = (token) => {
  return callAPI("post", baseURL + "/get-direct", null, token);
};

export const getDirectByIds = (token, data) => {
  return callAPI("post", baseURL + "/get-direct-by-ids", data, token);
};

export const getFilterDirect = (token, data) => {
  return callAPI("post", baseURL + "/get-filter-direct", data, token);
};

export const createDirect = (token, data) => {
  return callAPI("post", baseURL + "/create-direct", data, token);
};

export const updateDirect = (token, data) => {
  return callAPI("post", baseURL + "/update-direct", data, token);
};

export const updateDirectCriteria = (token, data) => {
  return callAPI("post", baseURL + "/update-direct-criteria", data, token);
};
