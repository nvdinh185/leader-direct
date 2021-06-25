import * as userTypes from "@redux/adminUsers/types";
import * as userApi from "@apis/adminUsers";

// ---------------------------------------------------------------------------------------------------
// 1 - GET USER LIST
export const getGrantedUserList = (token) => {
  return (dispatch) => {
    dispatch(getGrantedUserListStart());
    userApi
      .getGrantedUserList(token)
      .then((data) => {
        if (data.status === 200) {
          dispatch(getGrantedUserListSuccess(data.data.data));
        } else {
          dispatch(getGrantedUserListFail(data));
        }
      })
      .catch((err) => {
        dispatch(getGrantedUserListFail(err));
      });
  };
};

export const getGrantedUserListStart = () => {
  return {
    type: userTypes.GET_GRANTED_USER_LIST_START,
  };
};

export const getGrantedUserListSuccess = (data) => {
  return {
    type: userTypes.GET_GRANTED_USER_LIST_SUCCESS,
    payload: data,
  };
};

export const getGrantedUserListFail = (error) => {
  return {
    type: userTypes.GET_GRANTED_USER_LIST_FAIL,
    payload: error,
  };
};

// ---------------------------------------------------------------------------------------------------
// 2 - GET MENU LIST
export const getMenuApiAll = (token) => {
  return (dispatch) => {
    dispatch(getMenuApiAllStart());
    userApi
      .getMenuApiAll(token)
      .then((data) => {
        if (data.status === 200) {
          dispatch(getMenuApiAllSuccess(data.data));
        } else {
          dispatch(getMenuApiAllFail(data));
        }
      })
      .catch((err) => {
        dispatch(getMenuApiAllFail(err));
      });
  };
};

export const getMenuApiAllStart = () => {
  return {
    type: userTypes.GET_MENU_API_ALL_START,
  };
};

export const getMenuApiAllSuccess = (data) => {
  console.log(data);
  return {
    type: userTypes.GET_MENU_API_ALL_SUCCESS,
    payload: data,
  };
};

export const getMenuApiAllFail = (error) => {
  return {
    type: userTypes.GET_MENU_API_ALL_FAIL,
    payload: error,
  };
};
