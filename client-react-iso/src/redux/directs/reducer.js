import * as directTypes from "@redux/directs/types";
import { successAlert, errorAlert } from "@components/AlertModal/ModalInfo";

let defaultDirects = {
  categories: [],
  loading: false,
  err: "",
};

export default function directReducer(state = defaultDirects, action) {
  switch (action.type) {
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
        return state;
      }
      return {
        ...state,
        categories: action.payload,
        loading: false,
      };

    case directTypes.GET_ALL_DIRECTS_FAIL:
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
