import * as filterTypes from "@redux/filterData/types";
import * as filterApi from "@apis/filterData";

// ---------------------------------------------------------------------------------------------------
// 1 - GET USER LIST
export const getCategoryList = (token) => {
  return (dispatch) => {
    dispatch(getCategoryListStart());
    filterApi
      .getCategoryList(token)
      .then((data) => {
        if (data.status === 200) {
          dispatch(getCategoryListSuccess(data.data));
        } else {
          dispatch(getCategoryListFail(data));
        }
      })
      .catch((err) => {
        dispatch(getCategoryListFail(err.response.data));
      });
  };
};

export const getCategoryListStart = () => {
  return {
    type: filterTypes.GET_CATEGORY_LIST_START,
  };
};

export const getCategoryListSuccess = (data) => {
  return {
    type: filterTypes.GET_CATEGORY_LIST_SUCCESS,
    payload: data,
  };
};

export const getCategoryListFail = (error) => {
  return {
    type: filterTypes.GET_CATEGORY_LIST_FAIL,
    payload: error,
  };
};

// ---------------------------------------------------------------------------------------------------
// 2 - GET MENU LIST
export const createCategory = (token, form) => {
  return (dispatch) => {
    dispatch(createCategoryStart());
    filterApi
      .createCategory(token, form)
      .then((data) => {
        if (data.status === 200) {
          dispatch(createCategorySuccess(data.data));
        } else {
          dispatch(createCategoryFail(data));
        }
      })
      .catch((err) => {
        dispatch(createCategoryFail(err.response.data));
      });
  };
};

export const createCategoryStart = () => {
  return {
    type: filterTypes.CREATE_CATEGORY_START,
  };
};

export const createCategorySuccess = (data) => {
  return {
    type: filterTypes.CREATE_CATEGORY_SUCCESS,
    payload: data,
  };
};

export const createCategoryFail = (error) => {
  return {
    type: filterTypes.CREATE_CATEGORY_FAIL,
    payload: error,
  };
};

// ---------------------------------------------------------------------------------------------------
// 4 - UPDATE MENU API
export const updateCategory = (token, form) => {
  return (dispatch) => {
    dispatch(updateCategoryStart());
    filterApi
      .updateCategory(token, form)
      .then((data) => {
        if (data.status === 200) {
          dispatch(updateCategorySuccess(data.data));
          // Sau khi update thành công thì gọi luôn cái hàm để get tất cả về
          // Hơi tốn request tí nhưng được cái đồng bộ redux với server luôn
          dispatch(getCategoryList(token));
        } else {
          dispatch(updateCategoryFail(data));
        }
      })
      .catch((err) => {
        dispatch(updateCategoryFail(err.response.data));
      });
  };
};

export const updateCategoryStart = () => {
  return {
    type: filterTypes.UPDATE_CATEGORY_START,
  };
};

export const updateCategorySuccess = (data) => {
  console.log(data);
  return {
    type: filterTypes.UPDATE_CATEGORY_SUCCESS,
    payload: data,
  };
};

export const updateCategoryFail = (error) => {
  return {
    type: filterTypes.UPDATE_CATEGORY_FAIL,
    payload: error,
  };
};
