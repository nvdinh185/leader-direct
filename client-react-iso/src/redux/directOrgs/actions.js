import * as directOrgTypes from "@redux/directOrgs/types";
import * as directOrgApi from "@apis/directOrgs";
import * as attchmentApi from "@apis/attachments";
import modalActions from "@redux/modal/actions";

// ---------------------------------------------------------------------------------
// I. NON API DISPATCH SECTION
// ---------------------------------------------------------------------------------
// export const clearCurrentMeetingDirectIds = () => {
//   return {
//     type: directOrgTypes.CLEAR_CURRENT_MEETING_DIRECT_IDS,
//   };
// };

// export const setCurrentViewDirectDetail = (direct) => {
//   return {
//     type: directOrgTypes.SET_CURRENT_VIEW_DIRECT_DETAIL,
//     payload: direct,
//   };
// };
// ---------------------------------------------------------------------------------
// II. API DISPATCH SECTION
// ---------------------------------------------------------------------------------
// 1 - GET DIRECT LIST
export const getDirectOrgAll = (token) => {
  return (dispatch) => {
    dispatch(getDirectOrgAllStart());
    directOrgApi
      .getDirectOrgAll(token)
      .then((data) => {
        if (data.status === 200) {
          let uuidArr = data.data.map((data) => data.uuid);
          dispatch(getDirectOrgAllSuccess(data.data));
          dispatch(getDirectExeByDOs(token, { uuidArr }));
          dispatch(modalActions.closeModal());
        } else {
          dispatch(getDirectOrgAllFail(data));
        }
      })
      .catch((err) => {
        dispatch(getDirectOrgAllFail(err.reponse ? err.response.data : err));
      });
  };
};

export const getDirectOrgAllStart = () => {
  return {
    type: directOrgTypes.GET_DIRECT_ORG_ALL_START,
  };
};

export const getDirectOrgAllSuccess = (data) => {
  return {
    type: directOrgTypes.GET_DIRECT_ORG_ALL_SUCCESS,
    payload: data,
  };
};

export const getDirectOrgAllFail = (error) => {
  return {
    type: directOrgTypes.GET_DIRECT_ORG_ALL_FAIL,
    payload: error,
  };
};

// ---------------------------------------------------------------------------------
// 2 - GET DIRECT EXE BY DIRECT ORGS UUID
// data có định dạng là {uuidArr: []}
export const getDirectExeByDOs = (token, data) => {
  return (dispatch) => {
    dispatch(getDirectExeByDOsStart());
    directOrgApi
      .getDirectExeByDOs(token, data)
      .then((data) => {
        if (data.status === 200) {
          dispatch(getDirectExeByDOsSuccess(data.data));
        } else {
          dispatch(getDirectExeByDOsFail(data));
        }
      })
      .catch((err) => {
        dispatch(getDirectExeByDOsFail(err.reponse ? err.response.data : err));
      });
  };
};

export const getDirectExeByDOsStart = () => {
  return {
    type: directOrgTypes.GET_DIRECT_EXE_BY_DOS_START,
  };
};

export const getDirectExeByDOsSuccess = (data) => {
  return {
    type: directOrgTypes.GET_DIRECT_EXE_BY_DOS_SUCCESS,
    payload: data,
  };
};

export const getDirectExeByDOsFail = (error) => {
  return {
    type: directOrgTypes.GET_DIRECT_EXE_BY_DOS_FAIL,
    payload: error,
  };
};

// ---------------------------------------------------------------------------------
// 3 - GET ATTACHMENTS BY IDS
export const getAttachmentByIds = (token, form) => {
  return (dispatch) => {
    dispatch(getAttachmentByIdsStart());
    attchmentApi
      .getAttachmentByIds(token, form)
      .then((data) => {
        if (data.status === 200) {
          dispatch(getAttachmentByIdsSuccess(data.data));
        } else {
          dispatch(getAttachmentByIdsFail(data));
        }
      })
      .catch((err) => {
        dispatch(getAttachmentByIdsFail(err.response ? err.response.data : err));
      });
  };
};

export const getAttachmentByIdsStart = () => {
  return {
    type: directOrgTypes.GET_DO_ATTACHMENTS_START,
  };
};

export const getAttachmentByIdsSuccess = (data) => {
  return {
    type: directOrgTypes.GET_DO_ATTACHMENTS_SUCCESS,
    payload: data,
  };
};

export const getAttachmentByIdsFail = (error) => {
  return {
    type: directOrgTypes.GET_DO_ATTACHMENTS_FAIL,
    payload: error,
  };
};

// ---------------------------------------------------------------------------------------------------
// 3 - UPDATE DIRECT EXECUTES AND DO
export const updateDirectOrgExecStatus = (token, form) => {
  return (dispatch) => {
    dispatch(updateDirectOrgExecStatusStart());
    directOrgApi
      .updateDirectOrgExecStatus(token, form)
      .then((data) => {
        if (data.status === 200) {
          dispatch(updateDirectOrgExecStatusSuccess(data.data));
          // Sau khi update thành công thì gọi luôn cái hàm để get tất cả về
          dispatch(getDirectOrgAll(token));
        } else {
          dispatch(updateDirectOrgExecStatusFail(data));
        }
      })
      .catch((err) => {
        dispatch(updateDirectOrgExecStatusFail(err.reponse ? err.response.data : err));
      });
  };
};

export const updateDirectOrgExecStatusStart = () => {
  return {
    type: directOrgTypes.UPDATE_DIRECT_EXECUTES_DO_START,
  };
};

export const updateDirectOrgExecStatusSuccess = (data) => {
  console.log(data);
  return {
    type: directOrgTypes.UPDATE_DIRECT_EXECUTES_DO_SUCCESS,
    payload: data,
  };
};

export const updateDirectOrgExecStatusFail = (error) => {
  return {
    type: directOrgTypes.UPDATE_DIRECT_EXECUTES_DO_FAIL,
    payload: error,
  };
};

// ------------------------------------------------------------------------------------------
export const getFilterDirectOrgStart = (token, data) => {
  return {
    type: directOrgTypes.GET_FILTER_DIRECT_ORG_START,
    payload: { token, data },
  };
};
export const getFilterDirectOrgSuccess = (data) => {
  return {
    type: directOrgTypes.GET_FILTER_DIRECT_ORG_SUCCESS,
    payload: data,
  };
};
export const getFilterDirectOrgFail = (err) => {
  return {
    type: directOrgTypes.GET_FILTER_DIRECT_ORG_FAIL,
    payload: err,
  };
};
