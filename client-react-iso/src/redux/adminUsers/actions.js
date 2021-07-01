import * as userTypes from "@redux/adminUsers/types";
import * as userApi from "@apis/adminUsers";

// ---------------------------------------------------------------------------------------------------
// 1 - GET USER LIST
export const getGrantedUserList = (token) => {
  return (dispatch) => {
    dispatch(getGrantedUserListStart());
    userApi
      .getGrantedUserList(token)
      .then((data) => {
        if (data.status === 200) {
          dispatch(getGrantedUserListSuccess(data.data.data));
        } else {
          dispatch(getGrantedUserListFail(data));
        }
      })
      .catch((err) => {
        dispatch(getGrantedUserListFail(err));
      });
  };
};

export const getGrantedUserListStart = () => {
  return {
    type: userTypes.GET_GRANTED_USER_LIST_START,
  };
};

export const getGrantedUserListSuccess = (data) => {
  return {
    type: userTypes.GET_GRANTED_USER_LIST_SUCCESS,
    payload: data,
  };
};

export const getGrantedUserListFail = (error) => {
  return {
    type: userTypes.GET_GRANTED_USER_LIST_FAIL,
    payload: error,
  };
};

// ---------------------------------------------------------------------------------------------------
// 2 - GET MENU LIST
export const getMenuApiAll = (token) => {
  return (dispatch) => {
    dispatch(getMenuApiAllStart());
    userApi
      .getMenuApiAll(token)
      .then((data) => {
        if (data.status === 200) {
          dispatch(getMenuApiAllSuccess(data.data));
        } else {
          dispatch(getMenuApiAllFail(data));
        }
      })
      .catch((err) => {
        dispatch(getMenuApiAllFail(err));
      });
  };
};

export const getMenuApiAllStart = () => {
  return {
    type: userTypes.GET_MENU_API_ALL_START,
  };
};

export const getMenuApiAllSuccess = (data) => {
  return {
    type: userTypes.GET_MENU_API_ALL_SUCCESS,
    payload: data,
  };
};

export const getMenuApiAllFail = (error) => {
  return {
    type: userTypes.GET_MENU_API_ALL_FAIL,
    payload: error,
  };
};

// ---------------------------------------------------------------------------------------------------
// 3 - CREATE MENU API
export const createMenuApi = (token, form) => {
  return (dispatch) => {
    dispatch(createMenuApiStart(token, form));
    userApi
      .createMenuApi(token, form)
      .then((data) => {
        if (data.status === 200) {
          dispatch(createMenuApiSuccess(data.data));
        } else {
          dispatch(createMenuApiFail(data));
        }
      })
      .catch((err) => {
        dispatch(createMenuApiFail(err));
      });
  };
};

export const createMenuApiStart = () => {
  return {
    type: userTypes.CREATE_MENU_API_START,
  };
};

export const createMenuApiSuccess = (data) => {
  console.log(data);
  return {
    type: userTypes.CREATE_MENU_API_SUCCESS,
    payload: data,
  };
};

export const createMenuApiFail = (error) => {
  return {
    type: userTypes.CREATE_MENU_API_FAIL,
    payload: error,
  };
};

// ---------------------------------------------------------------------------------------------------
// 4 - UPDATE MENU API
export const updateMenuApi = (token, form) => {
  return (dispatch) => {
    dispatch(updateMenuApiStart(token, form));
    userApi
      .updateMenuApi(token, form)
      .then((data) => {
        if (data.status === 200) {
          dispatch(updateMenuApiSuccess(data.data));
          // Sau khi update thành công thì gọi luôn cái hàm để get tất cả về
          // Hơi tốn request tí nhưng được cái đồng bộ redux với server luôn
          dispatch(getMenuApiAll(token));
        } else {
          dispatch(updateMenuApiFail(data));
        }
      })
      .catch((err) => {
        dispatch(updateMenuApiFail(err));
      });
  };
};

export const updateMenuApiStart = () => {
  return {
    type: userTypes.CREATE_MENU_API_START,
  };
};

export const updateMenuApiSuccess = (data) => {
  console.log(data);
  return {
    type: userTypes.CREATE_MENU_API_SUCCESS,
    payload: data,
  };
};

export const updateMenuApiFail = (error) => {
  return {
    type: userTypes.CREATE_MENU_API_FAIL,
    payload: error,
  };
};

// ---------------------------------------------------------------------------------------------------
// 5 - GET GROUPS MENU
export const getGrantedGroups = (token) => {
  return (dispatch) => {
    dispatch(getGrantedGroupsStart());
    userApi
      .getGrantedGroups(token)
      .then((data) => {
        if (data.status === 200) {
          dispatch(getGrantedGroupsSuccess(data.data.data));
        } else {
          dispatch(getGrantedGroupsFail(data));
        }
      })
      .catch((err) => {
        dispatch(getGrantedGroupsFail(err));
      });
  };
};

export const getGrantedGroupsStart = () => {
  return {
    type: userTypes.GET_GRANTED_GROUP_ALL_START,
  };
};

export const getGrantedGroupsSuccess = (data) => {
  return {
    type: userTypes.GET_GRANTED_GROUP_ALL_SUCCESS,
    payload: data,
  };
};

export const getGrantedGroupsFail = (error) => {
  return {
    type: userTypes.GET_GRANTED_GROUP_ALL_FAIL,
    payload: error,
  };
};

// ---------------------------------------------------------------------------------------------------
// 4 - ADD FUNCTION GROUP
export const createFunctionGroup = (token, form) => {
  return (dispatch) => {
    dispatch(createFunctionGroupStart(token, form));
    userApi
      .createFunctionGroup(token, form)
      .then((data) => {
        if (data.status === 200) {
          dispatch(createFunctionGroupSuccess(data.data));
          // Sau khi update thành công thì gọi luôn cái hàm để get tất cả về
          // Hơi tốn request tí nhưng được cái đồng bộ redux với server luôn
          dispatch(getGrantedGroups(token));
        } else {
          dispatch(createFunctionGroupFail(data));
        }
      })
      .catch((err) => {
        dispatch(createFunctionGroupFail(err));
      });
  };
};

export const createFunctionGroupStart = () => {
  return {
    type: userTypes.CREATE_FUNCTION_GROUP_START,
  };
};

export const createFunctionGroupSuccess = (data) => {
  return {
    type: userTypes.CREATE_FUNCTION_GROUP_SUCCESS,
    payload: data,
  };
};

export const createFunctionGroupFail = (error) => {
  return {
    type: userTypes.CREATE_FUNCTION_GROUP_FAIL,
    payload: error,
  };
};
// ---------------------------------------------------------------------------------------------------
// 4 - UPDATE FUNCTION GROUP
export const grantFunctionsToGroup = (token, form) => {
  return (dispatch) => {
    dispatch(grantFunctionsToGroupStart(token, form));
    userApi
      .grantFunctionsToGroup(token, form)
      .then((data) => {
        if (data.status === 200) {
          dispatch(grantFunctionsToGroupSuccess(data.data));
          // Sau khi update thành công thì gọi luôn cái hàm để get tất cả về
          // Hơi tốn request tí nhưng được cái đồng bộ redux với server luôn
          dispatch(getGrantedGroups(token));
        } else {
          dispatch(grantFunctionsToGroupFail(data));
        }
      })
      .catch((err) => {
        dispatch(grantFunctionsToGroupFail(err));
      });
  };
};

export const grantFunctionsToGroupStart = () => {
  return {
    type: userTypes.GRANT_FUNCTIONS_TO_GROUP_START,
  };
};

export const grantFunctionsToGroupSuccess = (data) => {
  return {
    type: userTypes.GRANT_FUNCTIONS_TO_GROUP_SUCCESS,
    payload: data,
  };
};

export const grantFunctionsToGroupFail = (error) => {
  return {
    type: userTypes.GRANT_FUNCTIONS_TO_GROUP_FAIL,
    payload: error,
  };
};

// ---------------------------------------------------------------------------------------------------
// 6 - GET ALL FUNCTIONS
export const getFunctions = (token) => {
  return (dispatch) => {
    dispatch(getFunctionsStart());
    userApi
      .getFunctions(token)
      .then((data) => {
        if (data.status === 200) {
          dispatch(getFunctionsSuccess(data.data.data));
        } else {
          dispatch(getFunctionsFail(data));
        }
      })
      .catch((err) => {
        dispatch(getFunctionsFail(err));
      });
  };
};

export const getFunctionsStart = () => {
  return {
    type: userTypes.GET_ALL_FUNCTION_API_START,
  };
};

export const getFunctionsSuccess = (data) => {
  return {
    type: userTypes.GET_ALL_FUNCTION_API_SUCCESS,
    payload: data,
  };
};

export const getFunctionsFail = (error) => {
  return {
    type: userTypes.GET_ALL_FUNCTION_API_FAIL,
    payload: error,
  };
};

// ---------------------------------------------------------------------------------------------------
// 7 - GET ALL ORGANIZATIONS
export const getAllOrganization = (token) => {
  return (dispatch) => {
    dispatch(getAllOrganizationStart());
    userApi
      .getAllOrganization(token)
      .then((data) => {
        if (data.status === 200) {
          dispatch(getAllOrganizationSuccess(data.data));
        } else {
          dispatch(getAllOrganizationFail(data));
        }
      })
      .catch((err) => {
        dispatch(getAllOrganizationFail(err));
      });
  };
};

export const getAllOrganizationStart = () => {
  return {
    type: userTypes.GET_ALL_ORGANIZATION_START,
  };
};

export const getAllOrganizationSuccess = (data) => {
  return {
    type: userTypes.GET_ALL_ORGANIZATION_SUCCESS,
    payload: data,
  };
};

export const getAllOrganizationFail = (error) => {
  return {
    type: userTypes.GET_ALL_ORGANIZATION_FAIL,
    payload: error,
  };
};

// ---------------------------------------------------------------------------------------------------
// 8 - UPDATE ORGANIZATION API
export const updateOrganization = (token, form) => {
  return (dispatch) => {
    dispatch(updateOrganizationStart(token, form));
    userApi
      .updateOrganization(token, form)
      .then((data) => {
        if (data.status === 200) {
          dispatch(updateOrganizationSuccess(data.data));
          // Sau khi update thành công thì gọi luôn cái hàm để get tất cả về
          // Hơi tốn request tí nhưng được cái đồng bộ redux với server luôn
          dispatch(getAllOrganization(token));
        } else {
          dispatch(updateOrganizationFail(data));
        }
      })
      .catch((err) => {
        dispatch(updateOrganizationFail(err));
      });
  };
};

export const updateOrganizationStart = () => {
  return {
    type: userTypes.UPDATE_ORGANIZATION_START,
  };
};

export const updateOrganizationSuccess = (data) => {
  console.log(data);
  return {
    type: userTypes.UPDATE_ORGANIZATION_SUCCESS,
    payload: data,
  };
};

export const updateOrganizationFail = (error) => {
  return {
    type: userTypes.UPDATE_ORGANIZATION_FAIL,
    payload: error,
  };
};

// ---------------------------------------------------------------------------------------------------
// 9 - CREATE MENU API
export const createOrganization = (token, form) => {
  return (dispatch) => {
    dispatch(createOrganizationStart(token, form));
    userApi
      .createOrganization(token, form)
      .then((data) => {
        if (data.status === 200) {
          dispatch(createOrganizationSuccess(data.data));
          dispatch(getAllOrganization(token));
        } else {
          dispatch(createOrganizationFail(data));
        }
      })
      .catch((err) => {
        dispatch(createOrganizationFail(err));
      });
  };
};

export const createOrganizationStart = () => {
  return {
    type: userTypes.CREATE_ORGANIZATION_START,
  };
};

export const createOrganizationSuccess = (data) => {
  console.log(data);
  return {
    type: userTypes.CREATE_ORGANIZATION_SUCCESS,
    payload: data,
  };
};

export const createOrganizationFail = (error) => {
  return {
    type: userTypes.CREATE_ORGANIZATION_FAIL,
    payload: error,
  };
};
