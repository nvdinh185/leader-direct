import * as userTypes from "@redux/adminUsers/types";
import { successAlert, errorAlert } from "@components/AlertModal/ModalInfo";

let defaultUser = {
  users: [],
  groups: [],
  menus: [],
  loading: false,
  err: "",
};

export default function adminUserReducer(state = defaultUser, action) {
  switch (action.type) {
    // ---------------------------------------------------------------------------------
    // 1 - MENU SECTION
    // ---------------------------------------------------------------------------------
    case userTypes.GET_MENU_API_ALL_START:
      return {
        ...state,
        loading: true,
      };
    case userTypes.GET_MENU_API_ALL_SUCCESS:
      if (action.payload.length === 0) {
        return { ...state, loading: false, err: "" };
      }
      return {
        ...state,
        menus: action.payload,
        loading: false,
      };

    case userTypes.GET_MENU_API_ALL_FAIL:
      return {
        ...state,
        err: action.payload,
        loading: false,
      };

    // ---------------------------------------------------------------------------------
    case userTypes.CREATE_MENU_API_START:
      return {
        ...state,
        loading: true,
      };
    case userTypes.CREATE_MENU_API_SUCCESS:
      successAlert("Thành Công", "Bạn đã thêm mới menu thành công");
      return {
        ...state,
        createMenu: action.payload,
        loading: false,
      };
    case userTypes.CREATE_MENU_API_FAIL:
      errorAlert("Lỗi", "Lỗi khi thêm mới menu: " + action.payload);
      return {
        ...state,
        err: action.payload,
        loading: false,
      };
    // ---------------------------------------------------------------------------------
    case userTypes.UPDATE_MENU_API_START:
      return {
        ...state,
        loading: true,
      };
    case userTypes.UPDATE_MENU_API_SUCCESS:
      successAlert("Thành Công", "Bạn đã sửa thông tin menu thành công");
      return {
        ...state,
        updateMenu: action.payload,
        loading: false,
      };
    case userTypes.UPDATE_MENU_API_FAIL:
      errorAlert("Lỗi", "Lỗi khi sửa thông tin menu: " + action.payload);
      return {
        ...state,
        err: action.payload,
        loading: false,
      };

    // ---------------------------------------------------------------------------------
    // 2 - USER SECTION
    // ---------------------------------------------------------------------------------
    case userTypes.GET_GRANTED_USER_LIST_START:
      return {
        ...state,
        loading: true,
      };
    case userTypes.GET_GRANTED_USER_LIST_SUCCESS:
      if (action.payload.length === 0) {
        return { ...state, loading: false, err: "" };
      }
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    case userTypes.GET_GRANTED_USER_LIST_FAIL:
      return {
        ...state,
        err: action.payload,
        loading: false,
      };

    // ---------------------------------------------------------------------------------
    case userTypes.CREATE_GRANTED_USER_START:
      return {
        ...state,
        loading: true,
      };
    case userTypes.CREATE_GRANTED_USER_SUCCESS:
      successAlert("Thành Công", "Bạn đã thêm mới người dùng thành công");
      return {
        ...state,
        createGrantedUser: action.payload,
        loading: false,
      };
    case userTypes.CREATE_GRANTED_USER_FAIL:
      errorAlert("Lỗi", "Lỗi khi thêm mới người dùng: " + action.payload);
      return {
        ...state,
        err: action.payload,
        loading: false,
      };
    // ---------------------------------------------------------------------------------
    case userTypes.UPDATE_GRANTED_USER_START:
      return {
        ...state,
        loading: true,
      };
    case userTypes.UPDATE_GRANTED_USER_SUCCESS:
      successAlert("Thành Công", "Bạn đã thay đổi thông tin đơn vị thành công");
      return {
        ...state,
        updateGrantedUser: action.payload,
        loading: false,
      };
    case userTypes.UPDATE_GRANTED_USER_FAIL:
      errorAlert("Lỗi", "Lỗi khi thay đổi thông tin người dùng: " + action.payload);
      return {
        ...state,
        err: action.payload,
        loading: false,
      };

    // ---------------------------------------------------------------------------------
    // 3 - GROUPS SECTION
    // ---------------------------------------------------------------------------------
    case userTypes.GET_GRANTED_GROUP_ALL_START:
      return {
        ...state,
        loading: true,
      };
    case userTypes.GET_GRANTED_GROUP_ALL_SUCCESS:
      if (action.payload.length === 0) {
        return { ...state, loading: false, err: "" };
      }
      return {
        ...state,
        groups: action.payload,
        loading: false,
      };
    case userTypes.GET_GRANTED_GROUP_ALL_FAIL:
      return {
        ...state,
        err: action.payload,
        loading: false,
      };

    // ---------------------------------------------------------------------------------
    case userTypes.CREATE_FUNCTION_GROUP_START:
      return {
        ...state,
        loading: true,
      };
    case userTypes.CREATE_FUNCTION_GROUP_SUCCESS:
      successAlert("Thành Công", "Bạn đã thêm mới nhóm thành công");

      return {
        ...state,
        createFuncGroup: action.payload,
        loading: false,
      };
    case userTypes.CREATE_FUNCTION_GROUP_FAIL:
      errorAlert("Lỗi", "Có lỗi khi thêm mới nhóm: " + action.payload);

      return {
        ...state,
        err: action.payload,
        loading: false,
      };
    // ---------------------------------------------------------------------------------
    case userTypes.GRANT_FUNCTIONS_TO_GROUP_START:
      return {
        ...state,
        loading: true,
      };
    case userTypes.GRANT_FUNCTIONS_TO_GROUP_SUCCESS:
      successAlert("Thành Công", "Bạn đã thay đổi thông tin nhóm thành công");
      return {
        ...state,
        grantFuncToGroup: action.payload,
        loading: false,
      };
    case userTypes.GRANT_FUNCTIONS_TO_GROUP_FAIL:
      errorAlert("Lỗi", "Lỗi khi thay đổi thông tin nhóm: " + action.payload);
      return {
        ...state,
        err: action.payload,
        loading: false,
      };

    // ---------------------------------------------------------------------------------
    // 4 - FUNCTION APIS SECTION
    // ---------------------------------------------------------------------------------
    case userTypes.GET_ALL_FUNCTION_API_START:
      return {
        ...state,
        loading: true,
      };
    case userTypes.GET_ALL_FUNCTION_API_SUCCESS:
      if (action.payload.length === 0) {
        return { ...state, loading: false, err: "" };
      }
      return {
        ...state,
        apis: action.payload,
        loading: false,
      };
    case userTypes.GET_ALL_FUNCTION_API_FAIL:
      return {
        ...state,
        err: action.payload,
        loading: false,
      };
    // ---------------------------------------------------------------------------------
    // 4 - ORGANIZATIONS APIS SECTION
    // ---------------------------------------------------------------------------------
    case userTypes.GET_ALL_ORGANIZATION_START:
      return {
        ...state,
        loading: true,
      };
    case userTypes.GET_ALL_ORGANIZATION_SUCCESS:
      if (action.payload.length === 0) {
        return { ...state, loading: false, err: "" };
      }
      return {
        ...state,
        organizations: action.payload,
        loading: false,
      };
    case userTypes.GET_ALL_ORGANIZATION_FAIL:
      return {
        ...state,
        err: action.payload,
        loading: false,
      };
    // ---------------------------------------------------------------------------------
    case userTypes.CREATE_ORGANIZATION_START:
      return {
        ...state,
        loading: true,
      };
    case userTypes.CREATE_ORGANIZATION_SUCCESS:
      successAlert("Thành Công", "Bạn đã thêm mới đơn vị thành công");
      return {
        ...state,
        createOrganization: action.payload,
        loading: false,
      };
    case userTypes.CREATE_ORGANIZATION_FAIL:
      errorAlert("Lỗi", "Lỗi khi thêm mới đơn vị: " + action.payload);
      return {
        ...state,
        err: action.payload,
        loading: false,
      };
    // ---------------------------------------------------------------------------------
    case userTypes.UPDATE_ORGANIZATION_START:
      return {
        ...state,
        loading: true,
      };
    case userTypes.UPDATE_ORGANIZATION_SUCCESS:
      successAlert("Thành Công", "Bạn đã thay đổi thông tin đơn vị thành công");
      return {
        ...state,
        updateOrganization: action.payload,
        loading: false,
      };
    case userTypes.UPDATE_ORGANIZATION_FAIL:
      errorAlert("Lỗi", "Lỗi khi thay đổi thông tin đơn vị: " + action.payload);
      return {
        ...state,
        err: action.payload,
        loading: false,
      };

    default:
      return state;
  }
}
