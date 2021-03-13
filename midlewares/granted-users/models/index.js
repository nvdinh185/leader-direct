// Đây là thủ tục tạo tự động từ ./test/create-api-functions/3-create-models-interface-granted.js - cuong.dq

// Đây là ngõ ra xuất bản các mô hình để các module sử dụng

const db = require("../config");

module.exports = {
    // các mô hình được xuất bản:
    jsonModels: require("./json-text-models"),
    models: new (require("./models"))(db),
    table_models: new (require("./table_models"))(db),
    table_groups: new (require("./table_groups"))(db),
    api_routers: new (require("./api_routers"))(db),
    function_apis: new (require("./function_apis"))(db),
    function_groups: new (require("./function_groups"))(db),
    function_granted: new (require("./function_granted"))(db),

    // khai báo các mô hình dữ liệu khác nếu cần 
    // ...
}