// cấu hình csdl excel, sqlite dùng trong kết nối csdl
module.exports = {
    // khai báo file excel chứa cấu trúc file thiết kế csdl
    excelFile: require("./config").excel.dbGrantedUsers,
    // tên sheet chứa cấu trúc thiết kế csdl
    sheetConfigName: "media_files",      // tên sheet chứa cấu trúc csdl mô hình tài nguyên
    rootEntry: __dirname.substring(0, __dirname.length - 3),
    mainEntry: `/midlewares/media_files`,
    excelFileData: require("./config").excel.dbMainResource,
}