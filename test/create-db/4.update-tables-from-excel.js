// Thủ tục này update lại tất cả các dữ liệu trong bảng đã có (khi có thay đổi dữ liệu cần load lại)
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
    console.log(
      "Result of create model:",
      dynamicModels
        .filter((x) => x.getName() === SHEET_NAME)
        .map((x) => x.getStructure())[0]
    );

    for (let model of dynamicModels) {
      let tableName = model.getName();
      // đọc bảng dữ liệu ra array
      let arrData = await excell2Database.excel2Array(excelFileData, tableName);

      console.log("MODEL=", tableName);

      // update dựa theo các unique được khai báo trong mô hình
      let importResult = await model.updateRows(arrData).catch((err) => {
        console.log(`Lỗi import UPDATE nhiều dòng cho bảng ${tableName}`, err);
      });

      console.log(
        `KẾT QUẢ import UPDATE nhiều dòng cho bảng ${tableName}:`,
        importResult
      );
    }

    console.log(`****> THE END.`);
    process.exit(0);
  })
  .catch((err) => {
    console.log("***>Lỗi kết nối CSDL:", err);
    process.exit(0);
  });
