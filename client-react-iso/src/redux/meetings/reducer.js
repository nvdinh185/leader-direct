import * as meetingTypes from "@redux/meetings/types";
import { successAlert, errorAlert } from "@components/AlertModal/ModalInfo";

let defaultMeetings = {
  meetings: [],
  currentMeeting: {},
  loading: false,
  err: "",
};

export default function directMeetingReducer(state = defaultMeetings, action) {
  switch (action.type) {
    // ---------------------------------------------------------------------------------
    // I. NON API DISPATCH SECTION
    // ---------------------------------------------------------------------------------

    case meetingTypes.SET_CURRENT_MEETING_DETAIL:
      return {
        ...state,
        currentMeeting: action.payload,
      };

    case meetingTypes.CLEAR_CURRENT_MEETING_DETAIL:
      return {
        ...state,
        currentMeeting: {},
      };
    // ---------------------------------------------------------------------------------
    // II. API DISPATCH SECTION
    // ---------------------------------------------------------------------------------

    // ---------------------------------------------------------------------------------
    // 1 - MEETING SECTION
    // ---------------------------------------------------------------------------------
    case meetingTypes.GET_MEETING_LIST_START:
      return {
        ...state,
        loading: true,
      };
    case meetingTypes.GET_MEETING_LIST_SUCCESS:
      if (action.payload.length === 0) {
        return state;
      }
      return {
        ...state,
        meetings: action.payload,
        loading: false,
      };

    case meetingTypes.GET_MEETING_LIST_FAIL:
      return {
        ...state,
        err: action.payload,
        loading: false,
      };
    // ---------------------------------------------------------------------------------
    case meetingTypes.GET_MEETING_BY_ID_START:
      return {
        ...state,
        loading: true,
      };
    case meetingTypes.GET_MEETING_BY_ID_SUCCESS:
      if (action.payload.length === 0) {
        return state;
      }
      return {
        ...state,
        currentMeeting: action.payload,
        loading: false,
      };

    case meetingTypes.GET_MEETING_BY_ID_FAIL:
      return {
        ...state,
        err: action.payload,
        loading: false,
      };

    // ---------------------------------------------------------------------------------
    case meetingTypes.CREATE_MEETING_START:
      return {
        ...state,
        loading: true,
      };
    case meetingTypes.CREATE_MEETING_SUCCESS:
      successAlert("Thành Công", "Bạn đã thêm mới cuộc họp thành công");
      return {
        ...state,
        createMeeting: action.payload,
        loading: false,
      };
    case meetingTypes.CREATE_MEETING_FAIL:
      errorAlert("Lỗi", "Lỗi khi thêm mới cuộc họp: " + action.payload);
      return {
        ...state,
        err: action.payload,
        loading: false,
      };
    // ---------------------------------------------------------------------------------
    case meetingTypes.UPDATE_MEETING_START:
      return {
        ...state,
        loading: true,
      };
    case meetingTypes.UPDATE_MEETING_SUCCESS:
      successAlert("Thành Công", "Bạn đã sửa thông tin cuộc họp thành công");
      return {
        ...state,
        updateMenu: action.payload,
        loading: false,
      };
    case meetingTypes.UPDATE_MEETING_FAIL:
      errorAlert("Lỗi", "Lỗi khi sửa thông tin cuộc họp: " + action.payload);
      return {
        ...state,
        err: action.payload,
        loading: false,
      };

    // ---------------------------------------------------------------------------------
    // 2 - ATTACHMENTS SECTION
    // ---------------------------------------------------------------------------------
    case meetingTypes.GET_ATTACHMENT_BY_IDS_START:
      return {
        ...state,
        loading: true,
      };
    case meetingTypes.GET_ATTACHMENT_BY_IDS_SUCCESS:
      if (action.payload.length === 0) {
        return state;
      }
      return {
        ...state,
        attachments: action.payload,
        loading: false,
      };

    case meetingTypes.GET_ATTACHMENT_BY_IDS_FAIL:
      return {
        ...state,
        err: action.payload,
        loading: false,
      };

    case meetingTypes.DELETE_ATTACHMENT_ARR:
      return {
        ...state,
        attachments: [],
        loading: false,
      };

    default:
      return state;
  }
}
