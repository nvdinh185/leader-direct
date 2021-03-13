module.exports = {
    // đường dẫn root của dự án này
    ROOT: __dirname.substring(0, __dirname.length - 17),
    // danh sách các tên file không được copy đè qua, vì liên quan việc thiết lập ban đầu cho nó rồi
    EXCLUDE_FILES: [
        "sync-test-libs.js",
        "create-test.js",
        ".gitignore",
        "README.md",
        "package.json",
        "server.js",
        "run-service.sh",
        "restart-service.sh",
        "restart-service-win.js",
        "run-service-dos.bat",
        "cfg",
        "ddos",
        "db",
        "excel.js",
        "params.js",
        "index.js",
        "db-connection-any.js",
        "db-connection-des.js",
        "db-connection-pool-main.js",
        "db-connection-pool-right.js",
        "db-connection-pool-logs.js",
        "db-connection-pool.js",
        "db-connection-src.js",
        "ddos-config.js",
    ],
    // đường dẫn cần đồng bộ file từ thư viện để đảm bảo code mới nhất chung không phải nhớ code nào sửa
    SUB_DIR: "",
}