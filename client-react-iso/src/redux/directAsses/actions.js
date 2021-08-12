import * as directAssTypes from "@redux/directAsses/types";
import * as directAssApi from "@apis/directAss";

// ---------------------------------------------------------------------------------
// I. NON API DISPATCH SECTION
// ---------------------------------------------------------------------------------
// export const clearCurrentMeetingDirectIds = () => {
//   return {
//     type: directAssTypes.CLEAR_CURRENT_MEETING_DIRECT_IDS,
//   };
// };

export const setBoardUpdateArr = (updateArr) => {
  return {
    type: directAssTypes.SET_BOARD_ASS_UPDATE_ARR,
    payload: updateArr,
  };
};

export const filterOrgRedux = (orgArr) => {
  return {
    type: directAssTypes.FILTER_ORG_ARR_REDUX,
    payload: orgArr,
  };
};

export const callFilterDirectAss = (token, dispatch, newCriteria, oldCriteria) => {
  if (newCriteria.month) {
    if (newCriteria.month != oldCriteria.month) {
      dispatch(getFilterDirectAss(token));
    }
  }
};

// ---------------------------------------------------------------------------------
// II. API DISPATCH SECTION
// ---------------------------------------------------------------------------------
// 1 - GET DIRECT LIST
export const getFilterDirectAss = (token, form) => {
  return (dispatch) => {
    dispatch(getFilterDirectAssStart());
    directAssApi
      .getFilterDirectAss(token, form)
      .then((data) => {
        if (data.status === 200) {
          dispatch(getFilterDirectAssSuccess(data.data, form));
        } else {
          dispatch(getFilterDirectAssFail(data));
        }
      })
      .catch((err) => {
        dispatch(getFilterDirectAssFail(err.reponse ? err.response.data : err));
      });
  };
};

export const getFilterDirectAssStart = () => {
  return {
    type: directAssTypes.GET_FILTER_DIRECT_ASS_START,
  };
};

export const getFilterDirectAssSuccess = (data, form) => {
  return {
    type: directAssTypes.GET_FILTER_DIRECT_ASS_SUCCESS,
    payload: { data, form },
  };
};

export const getFilterDirectAssFail = (error) => {
  return {
    type: directAssTypes.GET_FILTER_DIRECT_ASS_FAIL,
    payload: error,
  };
};

// ---------------------------------------------------------------------------------
// 1 - GET DIRECT LIST
export const getFilterDirectExe = (token, form) => {
  return (dispatch) => {
    dispatch(getFilterDirectExeStart());
    directAssApi
      .getFilterDirectExe(token, form)
      .then((data) => {
        if (data.status === 200) {
          dispatch(getFilterDirectExeSuccess(data.data, form));
        } else {
          dispatch(getFilterDirectExeFail(data));
        }
      })
      .catch((err) => {
        dispatch(getFilterDirectExeFail(err.reponse ? err.response.data : err));
      });
  };
};

export const getFilterDirectExeStart = () => {
  return {
    type: directAssTypes.GET_FILTER_DIRECT_EXE_START,
  };
};

export const getFilterDirectExeSuccess = (data, form) => {
  return {
    type: directAssTypes.GET_FILTER_DIRECT_EXE_SUCCESS,
    payload: { data, form },
  };
};

export const getFilterDirectExeFail = (error) => {
  return {
    type: directAssTypes.GET_FILTER_DIRECT_EXE_FAIL,
    payload: error,
  };
};
// ---------------------------------------------------------------------------------
// 1 - GET DIRECT LIST
export const getFilterDirectAssLogs = (token, form) => {
  return (dispatch) => {
    dispatch(getFilterDirectAssLogsStart());
    directAssApi
      .getFilterDirectAssLogs(token, form)
      .then((data) => {
        if (data.status === 200) {
          dispatch(getFilterDirectAssLogsSuccess(data.data, form));
        } else {
          dispatch(getFilterDirectAssLogsFail(data));
        }
      })
      .catch((err) => {
        dispatch(getFilterDirectAssLogsFail(err.reponse ? err.response.data : err));
      });
  };
};

export const getFilterDirectAssLogsStart = () => {
  return {
    type: directAssTypes.GET_FILTER_DIRECT_ASS_LOGS_START,
  };
};

export const getFilterDirectAssLogsSuccess = (data, form) => {
  return {
    type: directAssTypes.GET_FILTER_DIRECT_ASS_LOGS_SUCCESS,
    payload: { data, form },
  };
};

export const getFilterDirectAssLogsFail = (error) => {
  return {
    type: directAssTypes.GET_FILTER_DIRECT_ASS_LOGS_FAIL,
    payload: error,
  };
};
