import * as directTypes from "@redux/directs/types";
import * as directApi from "@apis/directs";
import { getMeetingById } from "@redux/meetings/actions";

// ---------------------------------------------------------------------------------
// I. NON API DISPATCH SECTION
// ---------------------------------------------------------------------------------

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
export const getDirectByIds = (token, data) => {
  return (dispatch) => {
    dispatch(getDirectByIdsStart());
    directApi
      .getDirectByIds(token, data)
      .then((data) => {
        if (data.status === 200) {
          dispatch(getDirectByIdsSuccess(data.data));
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
