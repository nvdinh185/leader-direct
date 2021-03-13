module.exports = {
  // kết nối csdl phân quyền
  ...require("./params"),
  // Sử dụng kết nối theo csdl phân quyền được khai báo
  db: require("../../../db/db-connection-pool-right"),
};
