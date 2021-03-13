// file excel chứa cấu trúc mô hình cơ sở dữ liệu tại sheet có tên là tables
const { excelFile, sheetConfigName } = require("./config/params");

// import components of orm model
const { excell2Database, json2Model } = require("node-js-orm");

(async () => {
    let arrayTables = await excell2Database.excel2Array(excelFile, sheetConfigName);
    let jsonTextModel = json2Model.array2JsonTexts(arrayTables);
    for (const property in jsonTextModel) {
        console.log(`, '${property}'`);
    }
    console.log(`****> THE END.`);
    process.exit(0);
})();