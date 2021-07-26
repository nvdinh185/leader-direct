import moment from "moment";

export const formatTime = (milisecond, mode) => {
  var date = new Date(milisecond);
  const day = mode === "to" ? date.getDate() + 1 : date.getDate();
  const dd = String(day).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
  const yyyy = date.getFullYear();
  return `${yyyy}-${mm}-${dd}`;
};

/**
 * Hàm trả về {from, to} định dạng unix timestamp để gọi trong api
 * @param {moment} momentMonth
 * @returns {from: 123, to: 123}
 */
export const returnFromToUnixFromMomentMonth = (momentMonth) => {
  let month = momentMonth?.valueOf();
  let monthAdd = moment(momentMonth?.add(1, "M"))?.valueOf();
  return { from: month, to: monthAdd };
};
