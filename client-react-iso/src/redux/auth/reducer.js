import * as actionTypes from "@redux/auth/types";

const initialState = {
  // data: null,
  data: JSON.parse(localStorage.getItem("userInfoLeader")) || null,
  error: null,
  loading: false,
};

const authStart = (state) => {
  return { ...state, error: null, loading: true };
};

const authSuccess = (state, action) => {
  return {
    ...state,
    idToken: action.payload.token,
    data: action.payload.userInfo,
    errorAuth: null,
    error: null,
    loading: false,
  };
};

const authFail = (state, action) => {
  return { ...state, errorAuth: action.payload, loading: false };
};

const logOut = (state, action) => {
  localStorage.removeItem("userInfoLeader");
  localStorage.removeItem("idToken");
  return {
    ...state,
    idToken: null,
    data: null,
    error: null,
    loading: false,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.LOG_OUT:
      return logOut(state, action);
    case actionTypes.GET_GRANTED_USER_INFO_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.GET_GRANTED_USER_INFO_SUCCESS:
      if (action.payload.length === 0) {
        return { ...state, loading: false, err: "" };
      }
      return {
        ...state,
        grantedUserInfo: action.payload.grantedUser,
        grantedApis: action.payload.data,
        loading: false,
      };
    case actionTypes.GET_GRANTED_USER_INFO_FAIL:
      return {
        ...state,
        err: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default reducer;
