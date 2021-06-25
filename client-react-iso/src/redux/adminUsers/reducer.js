import * as userTypes from "@redux/adminUsers/types";

let defaultUser = {
  users: [],
  groups: [],
  menus: [],
  loading: false,
  err: "",
};

export default function adminUserReducer(state = defaultUser, action) {
  // ---------------------------------------------------------------------------------
  // 1 - MENU SECTION
  switch (action.type) {
    case userTypes.GET_MENU_API_ALL_START:
      return {
        ...state,
        loading: true,
      };
    case userTypes.GET_MENU_API_ALL_SUCCESS:
      return {
        ...state,
        menus: action.payload,
        loading: false,
      };
    case userTypes.GET_MENU_API_ALL_FAIL:
      console.log(action.payload);
      return {
        ...state,
        err: action.payload,
        loading: false,
      };

    // ---------------------------------------------------------------------------------
    // 2 - USER SECTION
    case userTypes.GET_GRANTED_USER_LIST_START:
      return {
        ...state,
        loading: true,
      };
    case userTypes.GET_GRANTED_USER_LIST_SUCCESS:
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    case userTypes.GET_GRANTED_USER_LIST_FAIL:
      console.log(action.payload);
      return {
        ...state,
        err: action.payload,
        loading: false,
      };

    // ---------------------------------------------------------------------------------
    // 3 - GROUPS SECTION
    case userTypes.GET_GROUP_USER_LIST_START:
      return {
        ...state,
        loading: true,
      };
    case userTypes.GET_GROUP_USER_LIST_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        groups: action.payload,
        loading: false,
      };
    case userTypes.GET_GRANTED_USER_LIST_FAIL:
      console.log(action.payload);
      return {
        ...state,
        err: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}
