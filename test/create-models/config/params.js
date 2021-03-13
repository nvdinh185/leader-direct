module.exports = {
    // khai báo tên file excel chứa cấu hình csdl, mô hình giao tiếp
    excelFile: require("../../../db").excelFile,
    // tên sheet chứa cấu trúc csdl mặt định có tên là tables trong file excel
    sheetConfigName: require("../../../db").sheetConfigName || "tables", 
    // trả về đường dẫn gốc của chương trình này
    rootEntry: __dirname.substring(0, __dirname.length - 26),
    // khai báo định nghĩa đường dẫn chứa mô hình giao tiếp csdl
    mainEntry: require("../../../db").mainEntry 
}