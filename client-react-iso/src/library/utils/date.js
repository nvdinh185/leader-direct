export const formatTime = (milisecond, mode) => {
  var date = new Date(milisecond);
  const day = mode === "to" ? date.getDate() + 1 : date.getDate();
  const dd = String(day).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
  const yyyy = date.getFullYear();
  return `${yyyy}-${mm}-${dd}`;
};
