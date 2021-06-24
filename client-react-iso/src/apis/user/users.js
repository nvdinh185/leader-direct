import { callAPIAuth, authServerUrl } from "../config/index";

// --------------------------------------------------------------------------------
// USER SECTION
export const getUserList = (token) => {
  return callUserRightAPI("get", authServerUrl + "/get-user-list", null, null);
};
