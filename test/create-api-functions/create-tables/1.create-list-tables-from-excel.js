const DEFAULT_MODEL_NAME = "granted_users";

// file excel chứa cấu trúc mô hình cơ sở dữ liệu tại sheet có tên là tables
const { excelFile } = require("../config/params");

// import components of orm model
const { excell2Database, json2Model } = require("node-js-orm");

(async () => {
    // đọc sheet chứa cấu trúc 
    let arrayTables = await excell2Database.excel2Array(excelFile, DEFAULT_MODEL_NAME);
    let jsonTextModel = json2Model.array2JsonTexts(arrayTables);
    for (const property in jsonTextModel) {
        console.log(`, '${property}'`);
    }
    console.log(`****> THE END.`);
    process.exit(0);
})();