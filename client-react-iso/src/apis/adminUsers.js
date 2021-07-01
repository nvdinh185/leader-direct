import { callUserRightAPI, baseUserRightURL } from "./config/index";

// ---------------------------------------------------------------------------------
// -------------------------------- USER DATA SECTION -------------------------------
// --------------------------------------------------------------------------------

export const getGrantedUserList = (token) => {
  console.log(token);
  return callUserRightAPI("get", baseUserRightURL + "/get-granted-users", null, token);
};

export const getGrantedUserInfo = (token) => {
  return callUserRightAPI("post", baseUserRightURL + "/get-granted-user", null, token);
};

export const createGrantedUser = (token, data) => {
  return callUserRightAPI("post", baseUserRightURL + "/create-user", data, token);
};

export const updateGrantedUser = (token, data) => {
  return callUserRightAPI("post", baseUserRightURL + "/update-user", data, token);
};

// ---------------------------------------------------------------------------------
// ------------------------------- MENU DATA SECTION ----------------------------
// --------------------------------------------------------------------------------

export const getMenuApiAll = (token) => {
  return callUserRightAPI("post", baseUserRightURL + "/get-menu-api", null, token); // this func get all menus
};
export const createMenuApi = (token, data) => {
  return callUserRightAPI("post", baseUserRightURL + "/create-menu-api", data, token);
};

export const updateMenuApi = (token, data) => {
  return callUserRightAPI("post", baseUserRightURL + "/update-menu-api", data, token);
};

// ---------------------------------------------------------------------------------
// ------------------------------- GROUPS DATA SECTION ----------------------------
// --------------------------------------------------------------------------------

export const getGrantedGroups = (token) => {
  return callUserRightAPI("get", baseUserRightURL + "/get-granted-groups", null, token);
};

export const createFunctionGroup = (token, data) => {
  return callUserRightAPI("post", baseUserRightURL + "/create-function-group", data, token);
};

export const grantFunctionsToGroup = (token, data) => {
  return callUserRightAPI("post", baseUserRightURL + "/grant-functions-2-group", data, token);
};

// ---------------------------------------------------------------------------------
// -------------------------------- APIS DATA SECTION -------------------------------
// --------------------------------------------------------------------------------

export const getFunctions = (token) => {
  return callUserRightAPI("get", baseUserRightURL + "/get-functions", null, token);
};

// ---------------------------------------------------------------------------------
// -------------------------------- ORGANIZATIONS DATA SECTION -------------------------------
// --------------------------------------------------------------------------------

export const getAllOrganization = (token) => {
  return callUserRightAPI("post", baseUserRightURL + "/get-organizations", null, token);
};

export const createOrganization = (token, data) => {
  return callUserRightAPI("post", baseUserRightURL + "/create-organization", data, token);
};

export const updateOrganization = (token, data) => {
  return callUserRightAPI("post", baseUserRightURL + "/update-organization", data, token);
};
