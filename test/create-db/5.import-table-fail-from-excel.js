// file excel chứa cấu trúc mô hình cơ sở dữ liệu tại sheet có tên là tables
const { excelFile, db, sheetConfigName, excelFileData } = require("./config");

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
    // console.log(
    //   "Result of create model:",
    //   dynamicModels
    //     .filter((x) => x.getName() === SHEET_NAME)
    //     .map((x) => x.getStructure())[0]
    // );

    let tableCHECK = "admin_users";

    for (let model of dynamicModels) {
      let tableName = model.getName();

      
      if (tableName === tableCHECK) {

        console.log("MODEL=", tableName, tableCHECK);
        // đọc bảng dữ liệu ra array
        let arrData = await excell2Database.excel2Array(excelFileData, tableName);

        // do bảng lấy maxid nên cần tuần tự import từng bảng ghi, không chạy song song 100 bảng ghi được vì sẽ sinh id sai
        let importResult = await model.importRows(arrData, 1).catch((err) => {
          console.log(`Lỗi import nhiều dòng cho bảng ${tableName}`, err);
        });

        console.log(
          `KẾT QUẢ import nhiều dòng cho bảng ${tableName}:`,
          JSON.stringify(importResult, null, 2)
        );
      }
    }

    console.log(`****> THE END.`);
    process.exit(0);
  })
  .catch((err) => {
    console.log("***>Lỗi kết nối CSDL:", err);
    process.exit(0);
  });
