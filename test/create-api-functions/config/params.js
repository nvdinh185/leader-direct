module.exports = {
  // khai báo file excel csdl cho các hàm chức năng, phân quyền, lưu giữ mô hình và cấu trúc csdl của các mô hình
  // mỗi mô hình có tên mô hình thì sheet cấu trúc phải khai tương ứng (không cần định nghĩa cấu trúc bảng)
  excelFile: require("../../../db").excelFile,
  // đường dẫn gốc để tạo các handlers, routes, ...
  rootEntry: __dirname.substring(0, __dirname.length - 33),
  // đường dẫn tạo giao tiếp models với csdl
  mainEntry: `/midlewares/granted-users`,
  // ngõ vào chính để khai báo các routes
  routesMain: `/routes`,
  // ngõ vào để khai báo các routers
  routersEntry: `/routers`,
  // ngõ vào chính để khai báo các handlers
  handlersMain: `/handlers`,
  // ngõ vào để khai báo các handlers
  handlersEntry: `/logs-1.0`,
  // cấu hình tên của route phía sau api-route-${}
  routeName: `logs-1.0`,

  // port cho máy chủ
  port: 9232,
  // base cho máy chủ
  baseDirectory: "/leader-direct",

  // tên mô hình được khai báo cố định ở đây
  MODEL_NAME: "logs",
  // tên kết nối csdl lưu các bảng dữ liệu của dự án
  db_connection: "db-main-resource", // === khai ở ./midlewares/dynamic-models/config/index.js xuất bảng một biến có dạng === dbAdminUsers
  // file dữ liệu mẫu cần import vào csdl chính
  excelData: require("../../../db").excelFileData

};
