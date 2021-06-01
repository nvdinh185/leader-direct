// Đây là thủ tục tạo tự động từ ./test/cretae-models - cuong.dq

// Đây là ngõ ra xuất bản các mô hình để các module sử dụng

const db = require("../config");

module.exports = {
    // các mô hình được xuất bản:
    jsonModels: require("./json-text-models"),
    meetings: new (require("./meetings"))(db),
    // directs: new (require("./directs"))(db),
    // direct_orgs: new (require("./direct_orgs"))(db),
    // direct_executes: new (require("./direct_executes"))(db),
    // statuses: new (require("./statuses"))(db),
    // attachments: new (require("./attachments"))(db),
    // categories: new (require("./categories"))(db),
    // users: new (require("./users"))(db),
    // organizations: new (require("./organizations"))(db),
    // menus: new (require("./menus"))(db),

    // khai báo các mô hình dữ liệu khác nếu cần 
    // ...
}