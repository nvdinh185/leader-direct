import axios from "axios";

export const baseURL = process.env.REACT_APP_BASE_URL;
// export const baseURL = "http://10.16.150.69:9232/leader-direct/api";

export const baseUserRightURL = process.env.REACT_APP_BASE_USER_RIGHT_URL;
// export const baseUserRightURL = "http://10.16.150.69:9232/leader-direct/user-rights";

export const authServerUrl = "https://c3.mobifone.vn/socket/api";

const requestTimeOut = process.env.AXIOS_REQUEST_TIME_OUT;

export const callAPIAuth = (method, url, data, token, params) => {
  return axios({
    baseURL: authServerUrl,
    timeout: requestTimeOut,
    headers: {
      "content-type": "application/json",
      // 'Ocp-Apim-Subscription-Key': '149de49b198446478de94394aced5677',
      Authorization: token,
    },
    method,
    url,
    data,
    params,
  });
};

export const callAPI = (method, url, data, token, params) => {
  return axios({
    baseURL: baseURL,
    timeout: requestTimeOut,
    headers: {
      "content-type": "application/json",
      // 'Ocp-Apim-Subscription-Key': '149de49b198446478de94394aced5677',
      Authorization: token,
    },
    method,
    url,
    data,
    params,
  });
};

export const callUserRightAPI = (method, url, data, token, params) => {
  return axios({
    baseURL: baseUserRightURL,
    timeout: requestTimeOut,
    headers: {
      "content-type": "application/json",
      // 'Ocp-Apim-Subscription-Key': '149de49b198446478de94394aced5677',
      Authorization: token,
    },
    method,
    url,
    data,
    params,
  });
};

export const callAPIExcel = (method, url, data, token, params) => {
  return axios({
    baseURL: baseURL,
    timeout: requestTimeOut,
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": "attachment; filename=salary4PrintExcel.xlsx",
      // 'Ocp-Apim-Subscription-Key': '149de49b198446478de94394aced5677',
      Authorization: token,
    },
    responseType: "base64",
    method,
    url,
    data,
    params,
  });
};

export const callAPIForm = (method, url, formData, token) => {
  return axios({
    baseURL: baseURL,
    timeout: requestTimeOut,
    headers: {
      "content-type": "multipart/form-data",
      // 'Ocp-Apim-Subscription-Key': '149de49b198446478de94394aced5677',
      Authorization: token,
    },
    method,
    url,
    formData,
  });
};
