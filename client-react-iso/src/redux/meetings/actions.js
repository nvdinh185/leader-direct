import * as meetingTypes from "@redux/meetings/types";
import * as meetingApi from "@apis/meetings";

// ---------------------------------------------------------------------------------------------------
// 1 - GET USER LIST
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
        dispatch(getMeetingListFail(err.response.data));
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

// ---------------------------------------------------------------------------------------------------
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
        dispatch(createMeetingFail(err.response.data));
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

// ---------------------------------------------------------------------------------------------------
// 4 - UPDATE MENU API
export const updateMeeting = (token, form) => {
  return (dispatch) => {
    dispatch(updateMeetingStart());
    meetingApi
      .updateMeeting(token, form)
      .then((data) => {
        if (data.status === 200) {
          dispatch(updateMeetingSuccess(data.data));
          // Sau khi update thành công thì gọi luôn cái hàm để get tất cả về
          // Hơi tốn request tí nhưng được cái đồng bộ redux với server luôn
          dispatch(getMeetingList(token));
        } else {
          dispatch(updateMeetingFail(data));
        }
      })
      .catch((err) => {
        dispatch(updateMeetingFail(err.response.data));
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
