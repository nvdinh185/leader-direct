import { callAPI, baseURL } from "./config/index";

// ---------------------------------------------------------------------------------
// -------------------------------- USER DATA SECTION -------------------------------
// --------------------------------------------------------------------------------

export const getCategoryList = (token) => {
  return callAPI("post", baseURL + "/get-category", null, token);
};

export const createCategory = (token, data) => {
  return callAPI("post", baseURL + "/create-category", data, token);
};

export const updateCategory = (token, data) => {
  return callAPI("post", baseURL + "/update-category", data, token);
};
