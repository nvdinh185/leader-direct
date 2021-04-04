/**
 * Khai báo kết nối database theo mô hình sẽ cho phép nối bất kỳ db nào trong thư viện
 * Cơ sở dữ liệu nguồn là sqlite3
 */

// khai báo file cấu hình trước khi dùng
module.exports = require("./db-connection-any")("mongodb", "innovations");