import { authServerUrl, callUserRightAPI, baseUserRightURL } from "./config/index";

// --------------------------------------------------------------------------------
// AUTH SECTION
export const logInSocket = (token, data) => {
  return callUserRightAPI("post", authServerUrl + "/user-login", data, null);
};

export const getGrantedUserApis = (token) => {
  return callUserRightAPI("get", baseUserRightURL + "/get-granted-user", null, token);
};

export const getGrantedUserInfo = (token) => {
  return callUserRightAPI("get", baseUserRightURL + "/get-granted-user", null, token);
};
