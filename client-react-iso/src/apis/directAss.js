import { callAPI, baseURL } from "./config/index";

// ---------------------------------------------------------------------------------
// --------------------------------------------------------------------------------

/**
 * Hàm lấy data động dựa vào model truyền vào
 * @param {*} token 
 * @param {*} data gồm 2 field model và jsonWhere
 * @returns 
 * SAMPLE INPUTS:
 * {
 *    model: "directs"
 *    jsonWhere: {
        category: [35],
        meeting_id: [1]
      }
 * }
 */
export const getFilterDirectAss = (token, data) => {
  return callAPI("post", baseURL + "/get-filter-direct-ass", data, token);
};

export const getFilterDirectExe = (token, data) => {
  return callAPI("post", baseURL + "/get-filter-direct-exe", data, token);
};
