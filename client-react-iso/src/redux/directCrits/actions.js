import * as directCritTypes from "@redux/directCrits/types";
import * as directApi from "@apis/directs";

// ---------------------------------------------------------------------------------
// I. NON API DISPATCH SECTION
// ---------------------------------------------------------------------------------
export const changeDirectCrit = (uuid) => {
  return {
    type: directCritTypes.CHANGE_DIRECT_CRIT,
    payload: uuid,
  };
};
// ---------------------------------------------------------------------------------
// II. API DISPATCH SECTION
// ---------------------------------------------------------------------------------
// 1 - GET DIRECT LIST
export const getFilterDirectCrit = (token, form) => {
  return (dispatch) => {
    dispatch(getFilterDirectCritStart());
    directApi
      .getFilterDirect(token, form)
      .then((data) => {
        if (data.status === 200) {
          dispatch(getFilterDirectCritSuccess(data.data, form));
        } else {
          dispatch(getFilterDirectCritFail(data));
        }
      })
      .catch((err) => {
        dispatch(getFilterDirectCritFail(err.reponse ? err.response.data : err));
      });
  };
};

export const getFilterDirectCritStart = () => {
  return {
    type: directCritTypes.GET_FILTER_DIRECT_CRIT_START,
  };
};

export const getFilterDirectCritSuccess = (data, form) => {
  return {
    type: directCritTypes.GET_FILTER_DIRECT_CRIT_SUCCESS,
    payload: { data, form },
  };
};

export const getFilterDirectCritFail = (error) => {
  return {
    type: directCritTypes.GET_FILTER_DIRECT_CRIT_FAIL,
    payload: error,
  };
};
