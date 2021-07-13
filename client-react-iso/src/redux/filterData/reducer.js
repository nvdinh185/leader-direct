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
        return { ...state, loading: false, err: "" };
      }
      let status = action.payload.filter((cat) => cat.parent_id === 1);
      let orgRoles = action.payload.filter((cat) => cat.parent_id === 2);
      let directTypes = action.payload.filter((cat) => cat.parent_id === 3);
      let meetingTypes = action.payload.filter((cat) => cat.parent_id === 4);
      let exeTypes = action.payload.filter((cat) => cat.parent_id === 5);
      let assTypes = action.payload.filter((cat) => cat.parent_id === 6);
      let leaderTypes = action.payload.filter((cat) => cat.parent_id === 7);
      let backgrounds = action.payload.filter((cat) => cat.parent_id === 8);
      return {
        ...state,
        categories: action.payload,
        status: status,
        orgRoles: orgRoles,
        directTypes: directTypes,
        meetingTypes: meetingTypes,
        exeTypes: exeTypes,
        assTypes: assTypes,
        leaderTypes: leaderTypes,
        backgrounds: backgrounds,
        loading: false,
        err: "",
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
