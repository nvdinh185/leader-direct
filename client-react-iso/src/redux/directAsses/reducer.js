import * as directAssTypes from "@redux/directAsses/types";
import { successAlert, errorAlert, warningAlert } from "@components/AlertModal/ModalInfo";

let defaultDirectAss = {
  directAsses: [],
  loading: false,
  err: "",
};

export default function directAssReducer(state = defaultDirectAss, action) {
  switch (action.type) {
    // ---------------------------------------------------------------------------------
    // 0 - NON API DIRECT ORGS SECTION
    // ---------------------------------------------------------------------------------
    case directAssTypes.SET_BOARD_ASS_UPDATE_ARR:
      return {
        ...state,
        boardUpdateArr: action.payload,
      };

    case directAssTypes.FILTER_ORG_ARR_REDUX:
      let orgArr = action.payload;
      let newOrgArrData = state.directAsses?.filter((da) => orgArr.includes(da.organization_exe));
      return {
        ...state,
        directAssesFilter: newOrgArrData,
      };
    // ---------------------------------------------------------------------------------
    // 1 - CALL API DIRECT ORGS SECTION
    // ---------------------------------------------------------------------------------
    case directAssTypes.GET_FILTER_DIRECT_ASS_START:
      return {
        ...state,
        loading: true,
      };
    case directAssTypes.GET_FILTER_DIRECT_ASS_SUCCESS:
      if (action.payload.length === 0) {
        return { ...state, loading: false, err: "" };
      }
      return {
        ...state,
        err: "",
        directAsses: action.payload.data,
        directAssesFilter: action.payload.data,
        formFilter: action.payload.form,
        loading: false,
      };

    case directAssTypes.GET_FILTER_DIRECT_ASS_FAIL:
      return {
        ...state,
        err: action.payload,
        loading: false,
      };

    default:
      return state;
  }
}
