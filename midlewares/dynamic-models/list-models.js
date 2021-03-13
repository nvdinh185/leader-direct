// khai báo xuất khẩu mô hình
const ListModels = require("./models/list-models");
const { dbModels } = require("./config");

/**
 * Khởi tạo lớp mô hình giao tiếp động
 */
module.exports = new ListModels(dbModels);
