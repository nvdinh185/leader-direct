import { authServerUrl, callUserRightAPI } from "../config/index";

// --------------------------------------------------------------------------------
// AUTH SECTION
export const logInSocket = (token, data) => {
  return callUserRightAPI("post", authServerUrl + "/user-login", data, null);
};
