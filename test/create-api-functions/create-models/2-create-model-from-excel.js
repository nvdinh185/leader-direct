// 2. Xuất file excel chứa cấu trúc mô hình cơ sở dữ liệu tại sheet có tên là tables
const excelFile = require("../config/params").excelFile;

const DEFAULT_MODEL_NAME = "granted_users";

// import components of orm model
const { excell2Database, json2Model } = require("node-js-orm");

(async () => {
    let arrayTables = await excell2Database.excel2Array(excelFile, DEFAULT_MODEL_NAME);
    let jsonTextModel = json2Model.array2JsonTexts(arrayTables);
    // tự động xuất đến đường dẫn > ./midlewares/xxx/models/json-text-models.js
    // trường hợp chạy trên hệ điều hành window, định dạng font chữ cho file bị lỗi, nên phải tạo file bằng tay, và copy nội dung vào
    console.log(`// Model create by: ${excelFile}\nmodule.exports = `, jsonTextModel);
    process.exit(0);
})();
