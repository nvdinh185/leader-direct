import * as userTypes from "@redux/adminUsers/types";

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
        return state;
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
      return {
        ...state,
        createMenu: action.payload,
        loading: false,
      };
    case userTypes.CREATE_MENU_API_FAIL:
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
      return {
        ...state,
        updateMenu: action.payload,
        loading: false,
      };
    case userTypes.UPDATE_MENU_API_FAIL:
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
        return state;
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
    // 3 - GROUPS SECTION
    // ---------------------------------------------------------------------------------
    case userTypes.GET_GRANTED_GROUP_ALL_START:
      return {
        ...state,
        loading: true,
      };
    case userTypes.GET_GRANTED_GROUP_ALL_SUCCESS:
      if (action.payload.length === 0) {
        return state;
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
      return {
        ...state,
        createFuncGroup: action.payload,
        loading: false,
      };
    case userTypes.CREATE_FUNCTION_GROUP_FAIL:
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
      return {
        ...state,
        grantFuncToGroup: action.payload,
        loading: false,
      };
    case userTypes.GRANT_FUNCTIONS_TO_GROUP_FAIL:
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
        return state;
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
        return state;
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
      return {
        ...state,
        createOrganization: action.payload,
        loading: false,
      };
    case userTypes.CREATE_ORGANIZATION_FAIL:
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
      return {
        ...state,
        updateOrganization: action.payload,
        loading: false,
      };
    case userTypes.UPDATE_ORGANIZATION_FAIL:
      return {
        ...state,
        err: action.payload,
        loading: false,
      };

    default:
      return state;
  }
}
