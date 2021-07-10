import * as directTypes from "@redux/directs/types";
import * as meetingTypes from "@redux/meetings/types";
import * as meetingApi from "@apis/meetings";

// ---------------------------------------------------------------------------------
// I. NON API DISPATCH SECTION
// ---------------------------------------------------------------------------------

export const setCurrentMeetingDetail = (meeting) => {
  return {
    type: meetingTypes.SET_CURRENT_MEETING_DETAIL,
    payload: meeting,
  };
};

export const clearCurrentMeetingDetail = () => {
  return (dispatch) => {
    dispatch({ type: meetingTypes.CLEAR_CURRENT_MEETING_DETAIL });
    dispatch({ type: directTypes.CLEAR_CURRENT_MEETING_DIRECT_IDS });
  };
};

// ---------------------------------------------------------------------------------
// II. API DISPATCH SECTION
// ---------------------------------------------------------------------------------

// ---------------------------------------------------------------------------------
// 1 - GET MEETING LIST
export const getMeetingList = (token) => {
  return (dispatch) => {
    dispatch(getMeetingListStart());
    meetingApi
      .getMeetingList(token)
      .then((data) => {
        if (data.status === 200) {
          dispatch(getMeetingListSuccess(data.data));
        } else {
          dispatch(getMeetingListFail(data));
        }
      })
      .catch((err) => {
        dispatch(getMeetingListFail(err.response ? err.response.data : err));
      });
  };
};

export const getMeetingListStart = () => {
  return {
    type: meetingTypes.GET_MEETING_LIST_START,
  };
};

export const getMeetingListSuccess = (data) => {
  return {
    type: meetingTypes.GET_MEETING_LIST_SUCCESS,
    payload: data,
  };
};

export const getMeetingListFail = (error) => {
  return {
    type: meetingTypes.GET_MEETING_LIST_FAIL,
    payload: error,
  };
};

// ---------------------------------------------------------------------------------
// 2 - GET MENU LIST
export const createMeeting = (token, form) => {
  return (dispatch) => {
    dispatch(createMeetingStart());
    meetingApi
      .createMeeting(token, form)
      .then((data) => {
        if (data.status === 200) {
          dispatch(createMeetingSuccess(data.data));
          dispatch(getMeetingList(token));
        } else {
          dispatch(createMeetingFail(data));
        }
      })
      .catch((err) => {
        dispatch(createMeetingFail(err.response ? err.response.data : err));
      });
  };
};

export const createMeetingStart = () => {
  return {
    type: meetingTypes.CREATE_MEETING_START,
  };
};

export const createMeetingSuccess = (data) => {
  return {
    type: meetingTypes.CREATE_MEETING_SUCCESS,
    payload: data,
  };
};

export const createMeetingFail = (error) => {
  return {
    type: meetingTypes.CREATE_MEETING_FAIL,
    payload: error,
  };
};

// ---------------------------------------------------------------------------------
// 3 - UPDATE MENU API
export const updateMeeting = (token, form) => {
  return (dispatch) => {
    dispatch(updateMeetingStart());
    meetingApi
      .updateMeeting(token, form)
      .then((data) => {
        if (data.status === 200) {
          dispatch(updateMeetingSuccess(data.data));
          // Sau khi update thành công thì gọi luôn cái hàm để get tất cả về
          dispatch(getMeetingList(token));
        } else {
          dispatch(updateMeetingFail(data));
        }
      })
      .catch((err) => {
        // Hơi tốn request tí nhưng được cái đồng bộ redux với server luôn
        dispatch(updateMeetingFail(err.response ? err.response.data : err));
      });
  };
};

export const updateMeetingStart = () => {
  return {
    type: meetingTypes.UPDATE_MEETING_START,
  };
};

export const updateMeetingSuccess = (data) => {
  console.log(data);
  return {
    type: meetingTypes.UPDATE_MEETING_SUCCESS,
    payload: data,
  };
};

export const updateMeetingFail = (error) => {
  return {
    type: meetingTypes.UPDATE_MEETING_FAIL,
    payload: error,
  };
};

// ---------------------------------------------------------------------------------
// 4 - GET ATTACHMENTS BY IDS
export const getAttachmentByIds = (token, form) => {
  return (dispatch) => {
    dispatch(getAttachmentByIdsStart());
    meetingApi
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
    type: meetingTypes.GET_ATTACHMENT_BY_IDS_START,
  };
};

export const getAttachmentByIdsSuccess = (data) => {
  return {
    type: meetingTypes.GET_ATTACHMENT_BY_IDS_SUCCESS,
    payload: data,
  };
};

export const getAttachmentByIdsFail = (error) => {
  return {
    type: meetingTypes.GET_ATTACHMENT_BY_IDS_FAIL,
    payload: error,
  };
};

export const deleteAttachmentsArr = (error) => {
  return {
    type: meetingTypes.DELETE_ATTACHMENT_ARR,
  };
};

// ---------------------------------------------------------------------------------
// 5 - GET UPDATED CURRENT MEETING DETAIL
export const getMeetingById = (token, data) => {
  return (dispatch) => {
    dispatch(getMeetingByIdStart());
    meetingApi
      .getMeetingById(token, data)
      .then((data) => {
        if (data.status === 200) {
          dispatch(getMeetingByIdSuccess(data.data));
        } else {
          dispatch(getMeetingByIdFail(data));
        }
      })
      .catch((err) => {
        dispatch(getMeetingByIdFail(err.response ? err.response.data : err));
      });
  };
};

export const getMeetingByIdStart = () => {
  return {
    type: meetingTypes.GET_MEETING_BY_ID_START,
  };
};

export const getMeetingByIdSuccess = (data) => {
  return {
    type: meetingTypes.GET_MEETING_BY_ID_SUCCESS,
    payload: data,
  };
};

export const getMeetingByIdFail = (error) => {
  return {
    type: meetingTypes.GET_MEETING_BY_ID_FAIL,
    payload: error,
  };
};
