import { callAPI, callAPIExcel, baseURL } from "./config/index";

// ---------------------------------------------------------------------------------
// -------------------------------- DIRECT SECTION -------------------------------
// --------------------------------------------------------------------------------

export const getReportDirectAggExcel = (token, data) => {
  return callAPIExcel("post", baseURL + "/get-report-direct-agg-excel", data, token);
};

export const getReportDirectDetailExcel = (token, data) => {
  return callAPIExcel("post", baseURL + "/get-report-direct-detail-excel", data, token);
};
