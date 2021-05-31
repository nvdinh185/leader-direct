/**
 * Thủ tục này để lấy mô hình định nghĩa cho mô hình giao tiếp dữ liệu, sau khi đã tạo thành công db
 * Dùng để in ra và copy dán vào các mô hình muốn định nghĩa trước
 * Sử dụng lệnh sau:
 * node ./test/migrate-database/create-text-model-from-excel.js > ./test/migrate-database/json-model.js
 * Mô hình sẽ tự tạo vào json-model
 */
// file excel chứa cấu trúc mô hình cơ sở dữ liệu tại sheet có tên là tables
const { excelFile, sheetConfigName } = require("./config/params");

// import components of orm model
const { excell2Database, json2Model } = require("node-js-orm");

excell2Database.excel2Array(excelFile, sheetConfigName)
    .then(arrayTables => {
        let jsonTextModel = json2Model.array2JsonTexts(arrayTables);
        console.log(`//Create model from file: ${excelFile}\nmodule.exports = `, jsonTextModel);
        process.exit(0);
    })
    .catch(err => {
        console.log('Lỗi: ', err);
        process.exit(0);
    });