import * as directOrgTypes from "@redux/directOrgs/types";
import * as directOrgApi from "@apis/directOrgs";
import { getMeetingById } from "@redux/meetings/actions";

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
          dispatch(getDirectOrgAllSuccess(data.data));
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
