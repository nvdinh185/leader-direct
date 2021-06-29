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
