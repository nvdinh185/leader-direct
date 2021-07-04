import { authServerUrl, callUserRightAPI, baseUserRightURL } from "./config/index";

// --------------------------------------------------------------------------------
// AUTH SECTION
export const logInSocket = (data) => {
  return callUserRightAPI("post", authServerUrl + "/user-login", data, null);
};
// CHECK AUTH SECTION
export const checkTokenInfo = (token) => {
  return callUserRightAPI("get", authServerUrl + "/get-token-info", null, token);
};

export const getGrantedUserApis = (token) => {
  return callUserRightAPI("get", baseUserRightURL + "/get-granted-user", null, token);
};

export const getGrantedUserInfo = (token) => {
  return callUserRightAPI("get", baseUserRightURL + "/get-granted-user", null, token);
};
