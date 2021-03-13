//  nhúng thành phần kết nối csdl
const { dbConnectionPool } = require("node-js-orm");
const { mongodb3553 } = require("./config");
const dbName = "server-logs";

module.exports = dbConnectionPool(
  "mongodb",
  mongodb3553.auto_increment_support, 
  dbName,
  mongodb3553.serverCfg,
  mongodb3553.options,
  mongodb3553.isDebug
);
