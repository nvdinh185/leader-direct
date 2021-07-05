import * as filterTypes from "@redux/filterData/types";
import { successAlert, errorAlert } from "@components/AlertModal/ModalInfo";

let defaultFilter = {
  categories: [],
  loading: false,
  err: "",
};

export default function filterDataReducer(state = defaultFilter, action) {
  switch (action.type) {
    // ---------------------------------------------------------------------------------
    // 1 - MENU SECTION
    // ---------------------------------------------------------------------------------
    case filterTypes.GET_CATEGORY_LIST_START:
      return {
        ...state,
        loading: true,
      };
    case filterTypes.GET_CATEGORY_LIST_SUCCESS:
      if (action.payload.length === 0) {
        return state;
      }
      return {
        ...state,
        categories: action.payload,
        loading: false,
      };

    case filterTypes.GET_CATEGORY_LIST_FAIL:
      return {
        ...state,
        err: action.payload,
        loading: false,
      };

    // ---------------------------------------------------------------------------------
    case filterTypes.CREATE_CATEGORY_START:
      return {
        ...state,
        loading: true,
      };
    case filterTypes.CREATE_CATEGORY_SUCCESS:
      successAlert("Thành Công", "Bạn đã thêm mới cuộc họp thành công");
      return {
        ...state,
        createCategory: action.payload,
        loading: false,
      };
    case filterTypes.CREATE_CATEGORY_FAIL:
      errorAlert("Lỗi", "Lỗi khi thêm mới cuộc họp: " + action.payload.message);
      return {
        ...state,
        err: action.payload,
        loading: false,
      };
    // ---------------------------------------------------------------------------------
    case filterTypes.UPDATE_CATEGORY_START:
      return {
        ...state,
        loading: true,
      };
    case filterTypes.UPDATE_CATEGORY_SUCCESS:
      successAlert("Thành Công", "Bạn đã sửa thông tin danh mục thành công");
      return {
        ...state,
        updateCategory: action.payload,
        loading: false,
      };
    case filterTypes.UPDATE_CATEGORY_FAIL:
      errorAlert("Lỗi", "Lỗi khi sửa thông tin danh mục: " + action.payload.message);
      return {
        ...state,
        err: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}
