import * as directTypes from "@redux/directs/types";
import * as directApi from "@apis/directs";
import { getMeetingById } from "@redux/meetings/actions";

// ---------------------------------------------------------------------------------
// I. NON API DISPATCH SECTION
// ---------------------------------------------------------------------------------
export const clearCurrentMeetingDirectIds = () => {
  return {
    type: directTypes.CLEAR_CURRENT_MEETING_DIRECT_IDS,
  };
};

export const setCurrentViewDirectDetail = (direct) => {
  return {
    type: directTypes.SET_CURRENT_VIEW_DIRECT_DETAIL,
    payload: direct,
  };
};

export const filterDirectListInnerRedux = (criteria) => {
  return (dispatch) => {
    if (criteria) {
      dispatch({
        type: directTypes.FILTER_DIRECT_INNER_REDUX,
        payload: criteria,
      });
    }
  };
};

export const resetFilterDirectCriteria = (direct) => {
  return {
    type: directTypes.RESET_FILTER_DIRECT_CRITERIA,
  };
};
// ---------------------------------------------------------------------------------
// II. API DISPATCH SECTION
// ---------------------------------------------------------------------------------
// 1 - GET DIRECT LIST
export const getAllDirect = (token) => {
  return (dispatch) => {
    dispatch(getAllDirectStart());
    directApi
      .getDirectsAll(token)
      .then((data) => {
        if (data.status === 200) {
          dispatch(getAllDirectSuccess(data.data));
        } else {
          dispatch(getAllDirectFail(data));
        }
      })
      .catch((err) => {
        dispatch(getAllDirectFail(err.reponse ? err.response.data : err));
      });
  };
};

export const getAllDirectStart = () => {
  return {
    type: directTypes.GET_ALL_DIRECTS_START,
  };
};

export const getAllDirectSuccess = (data) => {
  return {
    type: directTypes.GET_ALL_DIRECTS_SUCCESS,
    payload: data,
  };
};

export const getAllDirectFail = (error) => {
  return {
    type: directTypes.GET_ALL_DIRECTS_FAIL,
    payload: error,
  };
};

// ---------------------------------------------------------------------------------------------------
// 1' - GET DIRECT BY IDS
export const getDirectByIds = (token, data, mode = "MEETING_IDS") => {
  return (dispatch) => {
    dispatch(getDirectByIdsStart());
    directApi
      .getDirectByIds(token, data)
      .then((data) => {
        if (data.status === 200) {
          if (mode === "MEETING_IDS") {
            dispatch(getDirectByIdsSuccess(data.data));
            return;
          }
          dispatch(setCurrentViewDirectDetail(...data.data));
        } else {
          dispatch(getDirectByIdsFail(data));
        }
      })
      .catch((err) => {
        dispatch(getDirectByIdsFail(err.reponse ? err.response.data : err));
      });
  };
};

export const getDirectByIdsStart = () => {
  return {
    type: directTypes.GET_DIRECT_BY_IDS_START,
  };
};

export const getDirectByIdsSuccess = (data) => {
  return {
    type: directTypes.GET_DIRECT_BY_IDS_SUCCESS,
    payload: data,
  };
};

export const getDirectByIdsFail = (error) => {
  return {
    type: directTypes.GET_DIRECT_BY_IDS_FAIL,
    payload: error,
  };
};

// ---------------------------------------------------------------------------------------------------
// 2 - CREATE DIRECT
export const createDirect = (token, form) => {
  return (dispatch) => {
    dispatch(createDirectStart());
    directApi
      .createDirect(token, form)
      .then((data) => {
        if (data.status === 200) {
          dispatch(createDirectSuccess(data.data));
          dispatch(getMeetingById(token, { id: form.meeting_id }));
        } else {
          dispatch(createDirectFail(data));
        }
      })
      .catch((err) => {
        dispatch(createDirectFail(err.reponse ? err.response.data : err));
      });
  };
};

export const createDirectStart = () => {
  return {
    type: directTypes.CREATE_DIRECT_START,
  };
};

export const createDirectSuccess = (data) => {
  return {
    type: directTypes.CREATE_DIRECT_SUCCESS,
    payload: data,
  };
};

export const createDirectFail = (error) => {
  return {
    type: directTypes.CREATE_DIRECT_FAIL,
    payload: error,
  };
};

// ---------------------------------------------------------------------------------------------------
// 3 - UPDATE DIRECT API
export const updateDirect = (token, form) => {
  return (dispatch) => {
    dispatch(updateDirectStart());
    directApi
      .updateDirect(token, form)
      .then((data) => {
        if (data.status === 200) {
          dispatch(updateDirectSuccess(data.data));
          // Sau khi update thành công thì gọi luôn cái hàm để get tất cả về
          dispatch(getAllDirect(token));
          // Nếu update diễn ra ở meeting thì gọi lại thằng meetings về
          dispatch(getMeetingById(token, { id: form.meeting_id }));
        } else {
          dispatch(updateDirectFail(data));
        }
      })
      .catch((err) => {
        dispatch(updateDirectFail(err.reponse ? err.response.data : err));
      });
  };
};

export const updateDirectStart = () => {
  return {
    type: directTypes.UPDATE_DIRECT_START,
  };
};

export const updateDirectSuccess = (data) => {
  console.log(data);
  return {
    type: directTypes.UPDATE_DIRECT_SUCCESS,
    payload: data,
  };
};

export const updateDirectFail = (error) => {
  return {
    type: directTypes.UPDATE_DIRECT_FAIL,
    payload: error,
  };
};

// ---------------------------------------------------------------------------------
// 1 - GET DIRECT LIST
export const getFilterDirect = (token, form) => {
  return (dispatch) => {
    dispatch(getFilterDirectStart());
    directApi
      .getFilterDirect(token, form)
      .then((data) => {
        if (data.status === 200) {
          dispatch(getFilterDirectSuccess(data.data));
        } else {
          dispatch(getFilterDirectFail(data));
        }
      })
      .catch((err) => {
        dispatch(getFilterDirectFail(err.reponse ? err.response.data : err));
      });
  };
};

export const getFilterDirectStart = () => {
  return {
    type: directTypes.GET_FILTER_DIRECT_LIST_START,
  };
};

export const getFilterDirectSuccess = (data) => {
  return {
    type: directTypes.GET_FILTER_DIRECT_LIST_SUCCESS,
    payload: data,
  };
};

export const getFilterDirectFail = (error) => {
  return {
    type: directTypes.GET_FILTER_DIRECT_LIST_FAIL,
    payload: error,
  };
};
