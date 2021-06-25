import { callUserRightAPI, baseUserRightURL } from "../config/index";

// ---------------------------------------------------------------------------------
// -------------------------------- GET DATA SECTION -------------------------------
// --------------------------------------------------------------------------------

// USER SECTION
export const getGrantedUserList = (token) => {
  return callUserRightAPI("get", baseUserRightURL + "/get-granted-users", null, token);
};

export const getGrantedGroups = (token) => {
  return callUserRightAPI("get", baseUserRightURL + "/get-granted-groups", null, token);
};

// MENU SECTION
export const getMenuApi = (token) => {
  return callUserRightAPI("post", baseUserRightURL + "/get-menu-api", null, token);
};

// ---------------------------------------------------------------------------------
// ------------------------------- UPDATE DATA SECTION ----------------------------
// --------------------------------------------------------------------------------

// MENU SECTION
export const createMenuApi = (token) => {
  return callUserRightAPI("get", baseUserRightURL + "/create-menu-api", null, token);
};

export const updateMenuApi = (token) => {
  return callUserRightAPI("post", baseUserRightURL + "/update-menu-api", null, token);
};
