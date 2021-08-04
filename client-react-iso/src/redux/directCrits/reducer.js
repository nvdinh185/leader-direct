import * as directCritTypes from "@redux/directCrits/types";
import { successAlert, errorAlert } from "@components/AlertModal/ModalInfo";
import { filterListInRedux } from "@lib/utils/array";

let defaultDirectCrits = {
  directCrits: [],
  filterDirectCrits: [],
  searchText: "",
  loading: false,
  err: "",
  filterCriteria: "",
};

export default function directCritReducer(state = defaultDirectCrits, action) {
  switch (action.type) {
    // ---------------------------------------------------------------------------------
    // I. NON API SECTION
    case directCritTypes.CHANGE_DIRECT_CRIT:
      return {
        ...state,
        selectedId: action.payload,
      };
    // ---------------------------------------------------------------------------------
    // II. API SECTION
    // ---------------------------------------------------------------------------------
    // 1. GET FILTER DIRECT CRIT
    case directCritTypes.GET_FILTER_DIRECT_CRIT_START:
      return {
        ...state,
        loading: true,
      };
    case directCritTypes.GET_FILTER_DIRECT_CRIT_SUCCESS:
      if (state.selectedId) {
        return {
          ...state,
          directCrits: action.payload.data,
          filterDirectCrits: action.payload.data,
          loading: false,
        };
      }
      return {
        ...state,
        directCrits: action.payload.data,
        filterDirectCrits: action.payload.data,
        selectedId: action.payload.data[0]?.uuid || "",
        loading: false,
      };

    case directCritTypes.GET_FILTER_DIRECT_CRIT_FAIL:
      return {
        ...state,
        err: action.payload,
        loading: false,
      };

    // ---------------------------------------------------------------------------------
    default:
      return state;
  }
}
