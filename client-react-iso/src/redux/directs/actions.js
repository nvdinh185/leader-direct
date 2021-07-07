import * as directTypes from "@redux/directs/types";
import * as directApi from "@apis/directs";

// ---------------------------------------------------------------------------------------------------
// 1 - GET USER LIST
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
// 2 - GET MENU LIST
export const createDirect = (token, form) => {
  return (dispatch) => {
    dispatch(createDirectStart());
    directApi
      .createCategory(token, form)
      .then((data) => {
        if (data.status === 200) {
          dispatch(createDirectSuccess(data.data));
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
// 4 - UPDATE MENU API
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

export const updateDirectFail = () => {
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
