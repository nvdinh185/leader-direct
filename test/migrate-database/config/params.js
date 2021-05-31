module.exports = {
    // khai báo tên file excel chứa cấu hình csdl, mô hình giao tiếp
    //`./db/excel/api-functions-granted-user-admin-users-socket-2020-11-24.xlsx`,
    excelFile: require("../../../db").excelFile,   
    // mặt định có tên là tables trong file excel
    sheetConfigName: require("../../../db").sheetConfigName || "tables", 
    // khai báo tên file excel chứa các sheet chứa dữ liệu của csdl tài nguyên này
    excelFileData: require("../../../db").excelFileData,
}