// file excel chứa cấu trúc mô hình cơ sở dữ liệu tại sheet có tên là tables
const { excelFile, db } = require("../config");

const DEFAULT_MODEL_NAME = "granted_users";

// import components of orm model
const { excell2Database } = require("node-js-orm");

db.waitingConnected()
  .then(async (ok) => {

    // 1. init model from excel file
    let models = await excell2Database.createExcel2Models(db, excelFile, DEFAULT_MODEL_NAME);
    console.log(
      "Result of create model:",
      models
        .filter((x) => x.getName() === "function_apis")
        .map((x) => x.getStructure())[0]
    );
    //   console.log("Result of create model:", models.map(x => x.getName()));

    // 2. Create table and index
    let resultTable = await excell2Database.createExcel2Tables(models);
    console.log("Result of create table:", resultTable);

    // 3. List tables/sheets to import
    // liệt kê các bảng chứa dữ liệu cần import từ excel vào csdl luôn
    let tableNames = ["tables"];

    // 4. Do import into db from sheets of excel listed above
    let resultImport = await excell2Database.importExcel2Database(
      models,
      excelFile,
      tableNames,
      100
      // true
    );

    console.log("Results of import db:", resultImport);

    console.log(`****> THE END.`);
    process.exit(0);

  });
