import * as meetingTypes from "@redux/meetings/types";
import { successAlert, errorAlert } from "@components/AlertModal/ModalInfo";

let defaultMeetings = {
  meetings: [],
  loading: false,
  err: "",
};

export default function directMeetingReducer(state = defaultMeetings, action) {
  switch (action.type) {
    // ---------------------------------------------------------------------------------
    // 1 - MENU SECTION
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
    case meetingTypes.CREATE_MEETING_START:
      return {
        ...state,
        loading: true,
      };
    case meetingTypes.CREATE_MEETING_SUCCESS:
      successAlert("Thành Công", "Bạn đã thêm mới cuộc họp thành công");
      return {
        ...state,
        createMenu: action.payload,
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
    default:
      return state;
  }
}
