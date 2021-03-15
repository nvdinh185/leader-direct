/**
 * Khai báo kết nối database theo mô hình sẽ cho phép nối bất kỳ db nào trong thư viện
 * Cấu hình csdl trên mongodb cho csdl đích
 */

// khai báo file cấu hình trước khi dùng
module.exports = require("./db-connection-any")("sqlite3", "lucky-draws");