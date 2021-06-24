import * as actionTypes from "@redux/auth/types";
import { logInSocket } from "@apis/auth";

export const checkAuthorization = () => {
  const token = localStorage.getItem("idToken");
  const userInfo = JSON.parse(localStorage.getItem("userInfoLeader"));
  return (dispatch) => {
    // TODO: add logic to check token info
    if (token) {
      dispatch(authSuccess({ token, userInfo }));
      return;
    }
    dispatch(authFail("Chưa Xác Thực"));
  };
};

export const login = (username, password) => {
  return (dispatch) => {
    dispatch(authStart());
    logInSocket(null, { username, password })
      .then((res, rej) => {
        if (res.status === 200) {
          localStorage.setItem("idToken", res.data.token);
          localStorage.setItem("userInfoLeader", JSON.stringify(res.data.userInfo));
          dispatch(authSuccess(res.data));
          return;
        }
        dispatch(authFail("Lỗi api khi kiểm tra xác thực!"));
        return;
      })
      .catch((err) => {
        dispatch(authFail(err));
      });
  };
};

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (data) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    payload: data,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    payload: error,
  };
};

export const logOut = () => {
  return {
    type: actionTypes.LOG_OUT,
  };
};