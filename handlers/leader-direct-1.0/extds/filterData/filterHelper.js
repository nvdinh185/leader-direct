const formatTime = (milisecond, mode) => {
  var date = new Date(milisecond);
  const day = mode === "to" ? date.getDate() + 1 : date.getDate();
  const dd = String(day).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
  const yyyy = date.getFullYear();
  return `${yyyy}-${mm}-${dd}`;
};

const filterCriteriaBuilder = (reqJsonData, ...fields) => {
  console.log(fields);
  let jsonWhere = {};
  fields.forEach((field) => {
    if (field.includes("time") || field.includes("date")) {
      let from = formatTime(reqJsonData[field].from, (mode = "from"));
      let to = formatTime(reqJsonData[field].to, (mode = "to"));
      jsonWhere[field] = { $gte: from, $lte: to };
      return;
    }
    const filedData = reqJsonData[field];
    const fieldWhere = typeof filedData === "object" && filedData && filedData.length > 0 ? { $in: filedData } : filedData;
    jsonWhere[field] = fieldWhere;
    return;
  });
  console.log("DEBUG JSON-WHERE ------------------------------------------------------------- \n", jsonWhere);
  return jsonWhere;
};

module.exports = { filterCriteriaBuilder };
