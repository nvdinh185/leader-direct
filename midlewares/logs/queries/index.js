// Đây là thủ tục tạo tự động từ ./test/create-models by cuong.dq

// khai báo giao tiếp csdl
const db = require("../config");

module.exports = {
    joinQueries: new (require("./join-queries"))(db),
    runSqls: new (require("./run-sqls"))(db),
    // khai báo các model để xuất ra ngoài sử dụng
    //...
}