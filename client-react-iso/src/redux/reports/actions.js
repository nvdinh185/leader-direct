import * as reportApis from "@apis/reports";
import * as reportTypes from "@redux/reports/types";
// ---------------------------------------------------------------------------------
// I. NON API DISPATCH SECTION
// ---------------------------------------------------------------------------------
export const wipeReportExcelData = () => {
  return {
    type: reportTypes.WIPE_REPORT_EXCEL_DATA,
  };
};
// ---------------------------------------------------------------------------------
// II. API DISPATCH SECTION
// ---------------------------------------------------------------------------------

// 1 -- GET REPORT DIRECT AGGREGATION
export const getReportDirectAgg = (token, data) => {
  return (dispatch) => {
    dispatch(getReportDirectAggStart());
    reportApis
      .getReportDirectAggExcel(token, data)
      .then((data) => {
        if (data.status === 200) {
          dispatch(getReportDirectAggSuccess(data.data));
        } else {
          dispatch(getReportDirectAggFail(data));
        }
      })
      .catch((err) => {
        dispatch(getReportDirectAggFail(err.reponse ? err.response.data : err));
      });
  };
};
export const getReportDirectAggStart = (token, data) => {
  return {
    type: reportTypes.GET_REPORT_DIRECT_AGG_EXCEL_START,
    payload: { token, data },
  };
};
export const getReportDirectAggSuccess = (data) => {
  return {
    type: reportTypes.GET_REPORT_DIRECT_AGG_EXCEL_SUCCESS,
    payload: data,
  };
};
export const getReportDirectAggFail = (err) => {
  return {
    type: reportTypes.GET_REPORT_DIRECT_AGG_EXCEL_FAIL,
    payload: err,
  };
};

// ---------------------------------------------------------------------------------
// 2 -- GET REPORT DIRECT DETAIL
export const getReportDirectDetail = (token, data) => {
  return (dispatch) => {
    dispatch(getReportDirectDetailStart());
    reportApis
      .getReportDirectDetailExcel(token, data)
      .then((data) => {
        if (data.status === 200) {
          dispatch(getReportDirectDetailSuccess(data.data));
        } else {
          dispatch(getReportDirectDetailFail(data));
        }
      })
      .catch((err) => {
        dispatch(getReportDirectDetailFail(err.reponse ? err.response.data : err));
      });
  };
};
export const getReportDirectDetailStart = (token, data) => {
  return {
    type: reportTypes.GET_REPORT_DIRECT_DETAIL_EXCEL_START,
    payload: { token, data },
  };
};
export const getReportDirectDetailSuccess = (data) => {
  return {
    type: reportTypes.GET_REPORT_DIRECT_DETAIL_EXCEL_SUCCESS,
    payload: data,
  };
};
export const getReportDirectDetailFail = (err) => {
  return {
    type: reportTypes.GET_REPORT_DIRECT_DETAIL_EXCEL_FAIL,
    payload: err,
  };
};
