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
      if (!action.payload) {
        return {
          ...state,
        };
      }
      if (action.payload?.length === 0) {
        return {
          ...state,
          directAssesFilter: state.directAsses,
        };
      }
      let newOrgArrData = state.directAsses?.filter((da) => action.payload.includes(da.organization_exe));
      return {
        ...state,
        directAssesFilter: newOrgArrData,
      };
    // ---------------------------------------------------------------------------------
    // 1 - CALL API DIRECT ORGS SECTION
    case directAssTypes.GET_FILTER_DIRECT_ASS_START:
      return {
        ...state,
        loading: true,
      };
    case directAssTypes.GET_FILTER_DIRECT_ASS_SUCCESS:
      if (action.payload.length === 0) {
        return { ...state, directAssesFilter: [], loading: false, err: "" };
      }
      return {
        ...state,
        err: "",
        directs: action.payload.data.directs || [],
        directAsses: action.payload.data.directAsses,
        directAssesFilter: action.payload.data.directAsses,
        formFilter: action.payload.form,
        loading: false,
      };

    case directAssTypes.GET_FILTER_DIRECT_ASS_FAIL:
      return {
        ...state,
        err: action.payload,
        loading: false,
      };
    // ---------------------------------------------------------------------------------
    // 2 - CALL API DIRECT EXE SECTION
    case directAssTypes.GET_FILTER_DIRECT_EXE_START:
      return {
        ...state,
        loading: true,
      };
    case directAssTypes.GET_FILTER_DIRECT_EXE_SUCCESS:
      if (action.payload.length === 0) {
        return { ...state, directExes: [], loading: false, err: "" };
      }
      return {
        ...state,
        directExes: action.payload.data,
        formExeFilter: action.payload.form,
        loading: false,
        err: "",
      };

    case directAssTypes.GET_FILTER_DIRECT_EXE_FAIL:
      return {
        ...state,
        err: action.payload,
        loading: false,
      };
    // ---------------------------------------------------------------------------------
    // 2 - CALL API DIRECT EXE SECTION
    case directAssTypes.GET_FILTER_DIRECT_ASS_LOGS_START:
      return {
        ...state,
        loading: true,
      };
    case directAssTypes.GET_FILTER_DIRECT_ASS_LOGS_SUCCESS:
      if (action.payload.length === 0) {
        return { ...state, directAssLogs: [], loading: false, err: "" };
      }
      return {
        ...state,
        directAssLogs: action.payload.data,
        formAssLogsFilter: action.payload.form,
        loading: false,
        err: "",
      };

    case directAssTypes.GET_FILTER_DIRECT_ASS_LOGS_FAIL:
      return {
        ...state,
        err: action.payload,
        loading: false,
      };

    default:
      return state;
  }
}
