// Đây là thủ tục tạo tự động từ ./test/create-api-functions/1-create-main-entries.js by cuong.dq

// xuất bản mô hình ra ngoài để sử dụng
            
module.exports = {
    models: require("./models"),
    queries: require("./queries"),
    // nhúng các giao tiếp phát sinh nghiệp vụ riêng - user-right.js
    userRight: require("./user-right"),
    // nhúng handler để xử lý - phải tạo file granted-handler và các mô hình ở models.js - phần giao tiếp
    grantedHandler: require("./granted-handler"),
    // nhúng bộ kiểm tra quyền để đưa vào các router - phải tạo file granted-handler ở trên
    checkRight: require("./granted-handler").checkRight
}