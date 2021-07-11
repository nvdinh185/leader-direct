import * as directTypes from "@redux/directs/types";
import { successAlert, errorAlert } from "@components/AlertModal/ModalInfo";

let defaultDirects = {
  directs: [],
  loading: false,
  err: "",
};

export default function directReducer(state = defaultDirects, action) {
  switch (action.type) {
    case directTypes.CLEAR_CURRENT_MEETING_DIRECT_IDS:
      return {
        ...state,
        directIds: [],
      };
    // ---------------------------------------------------------------------------------
    // 1 - MENU SECTION
    // ---------------------------------------------------------------------------------
    case directTypes.GET_ALL_DIRECTS_START:
      return {
        ...state,
        loading: true,
      };
    case directTypes.GET_ALL_DIRECTS_SUCCESS:
      if (action.payload.length === 0) {
        return { ...state, loading: false, err: "" };
      }
      return {
        ...state,
        err: "",
        directs: action.payload,
        loading: false,
      };

    case directTypes.GET_ALL_DIRECTS_FAIL:
      return {
        ...state,
        err: action.payload,
        loading: false,
      };

    // ---------------------------------------------------------------------------------
    case directTypes.GET_DIRECT_BY_IDS_START:
      return {
        ...state,
        loading: true,
      };
    case directTypes.GET_DIRECT_BY_IDS_SUCCESS:
      if (action.payload.length === 0) {
        return { ...state, loading: false };
      }
      return {
        ...state,
        err: "",
        directIds: action.payload,
        loading: false,
      };

    case directTypes.GET_DIRECT_BY_IDS_FAIL:
      return {
        ...state,
        err: action.payload,
        loading: false,
      };

    // ---------------------------------------------------------------------------------
    case directTypes.CREATE_DIRECT_START:
      return {
        ...state,
        loading: true,
      };
    case directTypes.CREATE_DIRECT_SUCCESS:
      successAlert("Thành Công", "Bạn đã thêm mới chỉ đạo thành công");
      return {
        ...state,
        err: "",
        createDirect: action.payload,
        loading: false,
      };
    case directTypes.CREATE_DIRECT_FAIL:
      errorAlert("Lỗi", "Lỗi khi thêm mới chỉ đạo: " + action.payload.message);
      return {
        ...state,
        err: action.payload,
        loading: false,
      };
    // ---------------------------------------------------------------------------------
    case directTypes.UPDATE_DIRECT_START:
      return {
        ...state,
        loading: true,
      };
    case directTypes.UPDATE_DIRECT_SUCCESS:
      successAlert("Thành Công", "Bạn đã sửa thông tin chỉ đạo thành công");
      return {
        ...state,
        err: "",
        updateDirect: action.payload,
        loading: false,
      };
    case directTypes.UPDATE_DIRECT_FAIL:
      errorAlert("Lỗi", "Lỗi khi sửa thông tin chỉ đạo: " + action.payload.message);
      return {
        ...state,
        err: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}
