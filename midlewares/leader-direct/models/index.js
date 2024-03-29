// Đây là thủ tục tạo tự động từ ./test/cretae-models - cuong.dq

// Đây là ngõ ra xuất bản các mô hình để các module sử dụng

const db = require("../config");

module.exports = {
    // các mô hình được xuất bản:
    jsonModels: require("./json-text-models"),
    meetings: new (require("./meetings"))(db),
    directs: new (require("./directs"))(db),
    direct_loops: new (require("./direct_loops"))(db),
    direct_orgs: new (require("./direct_orgs"))(db),
    direct_executes: new (require("./direct_executes"))(db),
    direct_assessments: new (require("./direct_assessments"))(db),
    direct_assess_logs: new (require("./direct_assess_logs"))(db),
    attachments: new (require("./attachments"))(db),
    categories: new (require("./categories"))(db),

    // khai báo các mô hình dữ liệu khác nếu cần 
    // ...
}