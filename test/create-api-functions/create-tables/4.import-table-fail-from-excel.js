// file excel chứa cấu trúc mô hình cơ sở dữ liệu tại sheet có tên là tables
const { excelFile, db } = require("../config");

const DEFAULT_MODEL_NAME = "granted_users";

// import components of orm model
const { excell2Database } = require("node-js-orm");

db.waitingConnected()
  .then(async (ok) => {
    // 1. Khởi tạo mô hình dữ liệu (ktra phải có sheet tables để có mô hình)
    let models = await excell2Database.createExcel2Models(db, excelFile, DEFAULT_MODEL_NAME);
    console.log(
      "Result of create model:",
      models
        .filter((x) => x.getName() === DEFAULT_MODEL_NAME)
        .map((x) => x.getStructure())[0]
    );
    console.log(
      "Result of create model:",
      models.map((x) => x.getName())
    );

    // 2. Liệt kê các bảng bị lỗi để import xem lỗi gì qua isDebug=true
    let tableNames = ["function_granted"];

    // 3. Thực hiện import dữ liệu, nhớ xem biến true debug để xem kết quả import có bị lỗi ở đâu không nhé
    let resultImport = await excell2Database.importExcel2Database(
      models,
      excelFile,
      tableNames,
      100, // số lượng bảng ghi thực hiện đồng thời
      true // xem lỗi gì khi chèn
    );
    // console.log("Results of import db:", resultImport);

    console.log("Results of import db:", JSON.stringify(resultImport, null, 2));
    // console.log("Results of reject:", resultImport.map(o => o["rejects"].map(x=>x["reason"])));

    console.log(`****> THE END.`);
    process.exit(0);

  });
