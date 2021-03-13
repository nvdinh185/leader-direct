// file excel chứa cấu trúc mô hình cơ sở dữ liệu tại sheet có tên là tables
const { excelFile, sheetConfigName } = require("./config/params");

// import components of orm model
const { excell2Database, json2Model } = require("node-js-orm");

// xuất cấu trúc từ bảng có tên là "tables" chuyển đổi thành file jsonText cấu trúc
excell2Database.excel2Array(excelFile, sheetConfigName || "tables")
    .then(async arrayTables => {
        let jsonTextModel = json2Model.array2JsonTexts(arrayTables);
        // tự động xuất đến đường dẫn > ./midlewares/<your-model-name>/models/json-text-models.js 
        // nếu trên unix thì ok, win thì tạo tay và copy vào
        console.log(`// Database structure created from file: ${excelFile}\nmodule.exports = `, jsonTextModel);
        process.exit(0);
    })
    .catch(err => {
        console.log('Lỗi: ', err);
        process.exit(0);
    });

