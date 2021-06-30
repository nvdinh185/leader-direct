// Đây là thủ tục tạo tự động từ ./test/cretae-models - cuong.dq

// Đây là ngõ ra xuất bản các mô hình để các module sử dụng

const db = require("../config");

module.exports = {
    // các mô hình được xuất bản:
    jsonModels: require("./json-text-models"),
    hacks: new (require("./hacks"))(db),
    fails: new (require("./fails"))(db),
    blocks: new (require("./blocks"))(db),
    errors: new (require("./errors"))(db),
    cors: new (require("./cors"))(db),
    access: new (require("./access"))(db),

    // khai báo các mô hình dữ liệu khác nếu cần 
    // ...
}