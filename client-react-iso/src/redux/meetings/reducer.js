import * as meetingTypes from "@redux/meetings/types";
import { successAlert, errorAlert } from "@components/AlertModal/ModalInfo";
import { filterMeetingInRedux } from "@lib/utils/array";

let defaultMeetings = {
  defaultMeetings: [],
  currentMeeting: {},
  searchText: "",
  loading: false,
  err: "",
  filterCriteria: "",
};

export default function meetingReducer(state = defaultMeetings, action) {
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

    case meetingTypes.RESET_FILTER_MEETING_REDUX:
      return {
        ...state,
        filterInnerMeetings: [...state.defaultMeetings],
        filterMeetings: [...state.defaultMeetings],
        filterCriteria: "",
      };

    case meetingTypes.FILTER_MEETING_INNER_REDUX:
      let filteredMeetingList = filterMeetingInRedux(action.payload, state.filterMeetings);
      return {
        ...state,
        filterInnerMeetings: filteredMeetingList,
        filterCriteria: action.payload,
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
        return { ...state, loading: false, err: "" };
      }
      return {
        ...state,
        defaultMeetings: action.payload,
        filterMeetings: action.payload,
        filterInnerMeetings: action.payload,
        loading: false,
      };

    case meetingTypes.GET_MEETING_LIST_FAIL:
      return {
        ...state,
        err: action.payload,
        loading: false,
      };

    // ---------------------------------------------------------------------------------
    case meetingTypes.GET_FILTER_MEETING_LIST_START:
      return {
        ...state,
        loading: true,
      };
    case meetingTypes.GET_FILTER_MEETING_LIST_SUCCESS:
      if (action.payload.length === 0) {
        return { ...state, loading: false, err: "" };
      }
      return {
        ...state,
        filterMeetings: action.payload.data,
        filterCriteria: action.payload.criteria,
        loading: false,
      };

    case meetingTypes.GET_FILTER_MEETING_LIST_FAIL:
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
        return { ...state, loading: false, err: "" };
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
        updateMeeting: action.payload,
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
        return { ...state, loading: false, err: "" };
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
