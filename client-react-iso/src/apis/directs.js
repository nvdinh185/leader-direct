import { callAPI, callAPIForm, baseURL } from "./config/index";

// ---------------------------------------------------------------------------------
// -------------------------------- DIRECT SECTION -------------------------------
// --------------------------------------------------------------------------------

export const getDirectsAll = (token) => {
  return callAPI("post", baseURL + "/get-direct", null, token);
};

export const createDirect = (token, data) => {
  return callAPIForm(baseURL + "/create-direct", data, token);
};

export const updateDirect = (token, data) => {
  return callAPIForm(baseURL + "/update-direct", data, token);
};
