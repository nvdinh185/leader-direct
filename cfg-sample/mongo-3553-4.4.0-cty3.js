module.exports = Object.freeze({
    type: "mongodb", //  "mongodb" | "oracle" | "sqlite3"
    auto_increment_support: false,
    serverCfg: {
        // phần giành cho các csdl có xác thực
        hosts: [{ host: "xxx", port: 27017 }],
        username: "yyy",
        password: "zzz",
    },
    options: {
        // phần giành cho mongodb thêm
        //   repSet: "rs0", // Khai báo bộ db replicate
        isRoot: true, // nếu user của mongo có quyền root
    },
    // tham số phụ thêm vào để xác định csdl có hỗ trợ tự tạo auto_increment không?
    // nếu csdl nào không hổ trợ thì tắt nó đi và sử dụng mô hình model để tạo id tự động
    // isDebug: true,
});