// Đây là thủ tục tạo tự động từ ./test/cretae-models - cuong.dq

// Đây là ngõ ra xuất bản các mô hình để các module sử dụng

const db = require("../config");

module.exports = {
    // các mô hình được xuất bản:
    jsonModels: require("./json-text-models"),
    organizations: new (require("./organizations"))(db),
}