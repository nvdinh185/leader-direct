import * as reportTypes from "@redux/reports/types";
import { successAlert, errorAlert, warningAlert } from "@components/AlertModal/ModalInfo";

let defaultReportState = {
  reportAgg: [],
  reportDetail: [],
  loading: false,
  err: "",
};

export default function reportReducer(state = defaultReportState, action) {
  switch (action.type) {
    // ---------------------------------------------------------------------------------
    // 0 - NON API DIRECT ORGS SECTION
    // ---------------------------------------------------------------------------------
    case reportTypes.WIPE_REPORT_EXCEL_DATA:
      return {
        ...state,
        reportAgg: [],
        reportDetail: [],
      };
    // ---------------------------------------------------------------------------------
    // 1 - CALL API DIRECT ORGS SECTION
    // ---------------------------------------------------------------------------------
    case reportTypes.GET_REPORT_DIRECT_AGG_EXCEL_START:
      return {
        ...state,
        loading: true,
      };
    case reportTypes.GET_REPORT_DIRECT_AGG_EXCEL_SUCCESS:
      if (action.payload.length === 0) {
        return { ...state, reportAgg: [], loading: false };
      }
      return {
        ...state,
        err: "",
        reportAgg: action.payload || [],
        formFilter: action.payload.form,
        loading: false,
      };

    case reportTypes.GET_REPORT_DIRECT_AGG_EXCEL_FAIL:
      return {
        ...state,
        err: action.payload,
        loading: false,
      };
    // ---------------------------------------------------------------------------------
    // 2 - CALL API GET REPORT DETAIL SECTION
    // ---------------------------------------------------------------------------------
    case reportTypes.GET_REPORT_DIRECT_DETAIL_EXCEL_START:
      return {
        ...state,
        loading: true,
      };
    case reportTypes.GET_REPORT_DIRECT_DETAIL_EXCEL_SUCCESS:
      if (action.payload.length === 0) {
        return { ...state, reportDetail: [], loading: false };
      }
      return {
        ...state,
        err: "",
        reportDetail: action.payload || [],
        formDetailFilter: action.payload.form,
        loading: false,
      };

    case reportTypes.GET_REPORT_DIRECT_DETAIL_EXCEL_FAIL:
      return {
        ...state,
        err: action.payload,
        loading: false,
      };

    default:
      return state;
  }
}
