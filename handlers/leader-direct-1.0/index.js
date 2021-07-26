// Đây là thủ tục tạo tự động từ ./test/create-api-functions/x-create-api-routers-handlers.js by cuong.dq
// Dữ liệu gốc từ file excel ./db/excel/api-function-granted-users-cdld.xlsx
// Được tạo và lúc 2021-05-31 15:44:25

// Xuất bản các handler để các router nhúng vào gọi xử lý được
module.exports = {
  userRightsHandler: require("./user-rights-handler"),

  userTablesHandler: require("./user-tables-handler"),

  modelsHandler: require("./models-handler"),

  apiHandler: require("./api-handler"),
};
