// file excel chứa cấu trúc mô hình cơ sở dữ liệu tại sheet có tên là tables
const { excelFile, db, sheetConfigName } = require("./config");

const SHEET_NAME = sheetConfigName || "tables";

// import components of orm model
const { excell2Database } = require("node-js-orm");

db.waitingConnected()
  .then(async (ok) => {
    // 1. init model from excel file
    let dynamicModels = await excell2Database.createExcel2Models(
      db,
      excelFile,
      SHEET_NAME
    );
    console.log(
      "Result of create model:",
      dynamicModels
        .filter((x) => x.getName() === SHEET_NAME)
        .map((x) => x.getStructure())[0]
    );
    //   console.log("Result of create model:", models.map(x => x.getName()));

    // 2. Create table and index
    let resultTable = await excell2Database.createExcel2Tables(dynamicModels);
    console.log("Result of create table:", resultTable);
    // 3. List tables/sheets to import
    // liệt kê các bảng chứa dữ liệu cần import từ excel vào csdl luôn

    /* 
    // không làm thủ tục chèn vào mô hình ở đây (không sử dụng)
    // đọc bảng dữ liệu ra array
    let arrData = await excell2Database.excel2Array(excelFile, SHEET_NAME);

    let uModel = dynamicModels[0];

    for (let model of dynamicModels) {
      if (model.getName() === SHEET_NAME) {
        uModel = model;
      }
    }

    // 4. Do import into db from sheets of excel listed above
    let resultImport = await excell2Database.importArray2Database(
      uModel,
      arrData,
      // 100
      // true
    );
    console.log("Results of import db:", resultImport);

    // 5. Do update
    let resultImportUpdate = await excell2Database.updateArray2Database(
      uModel,
      arrData,
      ["table_name", "field_name"],
      100
      // true
    );
    console.log("Results of import update db:", resultImportUpdate);
     */

    console.log(`****> THE END.`);
    process.exit(0);
  })
  .catch((err) => {
    console.log("***>Lỗi kết nối CSDL:", err);
    process.exit(0);
  });
