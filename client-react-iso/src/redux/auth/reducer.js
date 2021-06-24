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
    error: null,
    loading: false,
  };
};

const authFail = (state, action) => {
  return { ...state, error: action.payload, loading: false };
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
    default:
      return state;
  }
};

export default reducer;
