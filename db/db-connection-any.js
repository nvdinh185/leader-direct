//  nhúng thành phần kết nối csdl
const { dbConnectionPool } = require("node-js-orm");
const { mongodb69, oracle12c,ROOT_APP, ROOT_DIR, ROOT_SQLITE_DB } = require("./config");

const fs = require("fs");
// tạo sẵn đường dẫn chứa csdl sqlite bên ngoài dự án để đảm bảo cho công tác backup độc lập, không phụ thuộc vào kho git của dự án
if (!fs.existsSync(ROOT_SQLITE_DB)){
  fs.mkdirSync(ROOT_SQLITE_DB);
}

// Đây là kết nối csdl sử dụng để lưu các cấu hình csdl động
module.exports = (dbType, dbName) => {
  switch (dbType) {
    case "sqlite3":
      return dbConnectionPool(
        "sqlite3",
        true, // tự đông tạo id
        `${ROOT_SQLITE_DB}/${dbName}.db`,
        null, // sqlite không cần server
        null, // không cần option
        true // cần debug
      );
    case "mongodb":
      return dbConnectionPool(
        "mongodb",
        false, // mongo nó không hỗ trợ tạo tự động id
        dbName,
        mongodb69.serverCfg,
        mongodb69.options,
        mongodb69.isDebug
      );
    case "oracle":
      return dbConnectionPool(
        "oracle",
        true, // 12c nên tự động tạo id nếu khai trường tự động
        oracle12c.serviceName,
        oracle12c.serverCfg,
        oracle12c.options,
        oracle12c.isDebug
      );
    default:
      return dbConnectionPool(
        "sqlite3",
        true, // tự đông tạo id
        `${ROOT_SQLITE_DB}/${dbName}.db`,
        null, // sqlite không cần server
        null, // không cần option
        true // cần debug
      );
  }
};