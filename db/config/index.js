const path = require("path");

// khai báo fix cứng cấu hình máy chủ của oracle
module.exports = {
  // khai báo đường dẫn tuyệt đối gốc phía trước ứng dụng này
  // để có thể chuyển csdl sqlite ra khỏi git và quản lý độc lập không phụ thuộc vào kho git của mình
  ROOT_APP: __dirname
    .split(path.sep)
    .slice(0, __dirname.split(path.sep).length - 3)
    .join(path.sep),

  // đường dẫn ghi cơ sở dữ liệu sqlite3 độc lập tách khỏi dự án
  ROOT_SQLITE_DB: `${__dirname
    .split(path.sep)
    .slice(0, __dirname.split(path.sep).length - 3)
    .join(path.sep)}/DB-SQLITE3-C3`,

  // đường dẫn tuyệt đối xuất cho các lớp phía trong sử dụng
  ROOT_DIR: __dirname.substring(
    0,
    __dirname
      .split(path.sep)
      .slice(0, __dirname.split(path.sep).length - 2)
      .join(path.sep)
  ),

  // tham số kết nối csdl riêng của dự án
  // oracle12c: {}, //require("../../cfg/oracle-12c-cdkh"),

  // mongodb3553: {}, //require("../../cfg/mongo-3553-4.4.0-cty3"),

  mongodb69: require("../../cfg/mongo-69-4.4.0-cty3"),

  // danh sách các file excel chứa csdl chính thức cần import
  excel: require("./excel"),
};
