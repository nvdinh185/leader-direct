import { callUserRightAPI, baseUserRightURL } from "./config/index";

// ---------------------------------------------------------------------------------
// -------------------------------- GET DATA SECTION -------------------------------
// --------------------------------------------------------------------------------

// USER SECTION
export const getGrantedUserList = (token) => {
  console.log(token);
  return callUserRightAPI("get", baseUserRightURL + "/get-granted-users", null, token);
};

export const getGrantedUserInfo = (token) => {
  return callUserRightAPI("post", baseUserRightURL + "/get-granted-user", null, token);
};

export const getGrantedGroups = (token) => {
  return callUserRightAPI("get", baseUserRightURL + "/get-granted-groups", null, token);
};

// MENU SECTION
export const getMenuApiAll = (token) => {
  return callUserRightAPI("post", baseUserRightURL + "/get-menu-api", null, token); // this func get all menus
};

// ---------------------------------------------------------------------------------
// ------------------------------- UPDATE DATA SECTION ----------------------------
// --------------------------------------------------------------------------------

// MENU SECTION
export const createMenuApi = (token, data) => {
  return callUserRightAPI("post", baseUserRightURL + "/create-menu-api", data, token);
};

export const updateMenuApi = (token) => {
  return callUserRightAPI("post", baseUserRightURL + "/update-menu-api", null, token);
};
