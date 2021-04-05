// Đây là thủ tục tạo tự động từ ./test/cretae-models - cuong.dq

// Đây là ngõ ra xuất bản các mô hình để các module sử dụng

const db = require("../config");

module.exports = {
    // các mô hình được xuất bản:
    jsonModels: require("./json-text-models"),
    ideas: new (require("./ideas"))(db),
    ideas_attachs: new (require("./ideas_attachs"))(db),
    ideas_categories: new (require("./ideas_categories"))(db),
    ideas_statuses: new (require("./ideas_statuses"))(db),

    // khai báo các mô hình dữ liệu khác nếu cần 
    // ...
}