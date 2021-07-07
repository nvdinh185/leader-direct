import * as actionTypes from "@redux/auth/types";
import * as authApi from "@apis/auth";

export const checkAuthorization = () => {
  const token = localStorage.getItem("idToken");
  const userInfo = JSON.parse(localStorage.getItem("userInfoLeader"));
  return (dispatch) => {
    // Mới vào chương trình thì kiểm tra token ở local còn hiệu lực hay không
    if (token) {
      // authApi
      //   .checkTokenInfo(token)
      //   .then((res) => {
      //     // Kiểm tra nếu ngày hết hạn lớn hơn hiện tại thì tức token còn hiệu lực
      //     if (new Date() < res.data?.exp) {
      //       dispatch(authSuccess({ token, userInfo: { ...userInfo, iat: res.data.iat, exp: res.data.exp } }));
      //       return;
      //     }
      //   })
      //   .catch((err) => {
      //     dispatch(authFail(err.response ? err.response.data : err));
      //   });
      dispatch(authSuccess({ token, userInfo }));
    }
  };
};

export const login = ({ username, password, expired }) => {
  return (dispatch) => {
    dispatch(authStart());
    authApi
      .logInSocket({ username, password, expired })
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
        dispatch(authFail(err.response ? err.response.data : err));
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

// ---------------------------------------------------------------------------------
// GRANTED USER
// ---------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------
// 1 - GET USER LIST
export const getGrantedUserInfo = (token) => {
  return (dispatch) => {
    dispatch(getGrantedUserInfoStart());
    authApi
      .getGrantedUserInfo(token)
      .then((data) => {
        if (data.status === 200) {
          dispatch(getGrantedUserInfoSuccess(data.data));
        } else {
          dispatch(getGrantedUserInfoFail(data));
        }
      })
      .catch((err) => {
        dispatch(getGrantedUserInfoFail(err.response ? err.response.data : err));
      });
  };
};

export const getGrantedUserInfoStart = () => {
  return {
    type: actionTypes.GET_GRANTED_USER_INFO_START,
  };
};

export const getGrantedUserInfoSuccess = (data) => {
  return {
    type: actionTypes.GET_GRANTED_USER_INFO_SUCCESS,
    payload: data,
  };
};

export const getGrantedUserInfoFail = (error) => {
  return {
    type: actionTypes.GET_GRANTED_USER_INFO_FAIL,
    payload: error,
  };
};
