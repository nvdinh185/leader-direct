// file excel chứa cấu trúc mô hình cơ sở dữ liệu tại sheet có tên là tables
const { excelFile, db, sheetConfigName } = require("./config");

const SHEET_NAME = sheetConfigName || "tables";

// import components of orm model
const { excell2Database, database } = require("node-js-orm");

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
      dynamicModels.map((x) => x.getName())
    );
    //   console.log("Result of create model:", models.map(x => x.getName()));

    // 2. Create table and index
    // let resultTable = await excell2Database.createExcel2Tables(dynamicModels);
    // console.log("Result of create table:", resultTable);

    let dbDao = db.getDbInstance();
    // console.log("Kiểu Mongo", dbDao instanceof database.MongoDAO);
    if (dbDao instanceof database.MongoDAO) {
      for (let model of dynamicModels) {
        let jsonStructure = JSON.parse(model.getStructure());
        // console.log("xxx>", model.getName(), model.getStructure());
        // model là đối tượng sử dụng để có thể sync() là tạo bảng bình thường như các csdl khác
        // sử dụng tính năng lấy instance để trả về db gốc và gọi lệnh tạo table riêng ở db gốc đó
        // db là đối tượng database chung cho tất cả các loại
        // chuyển lấy đối tượng DAO gốc
        // tạo bảng và index nếu có khai chỉ lưu 1M dữ liệu thôi, và quay vòng
        // .createTable(model.getName(), jsonStructure, 1024 * 1, 1000) // 1M dữ liệu với 1000 bảng ghi tối đa chứa trong bảng thì nó sẽ quay vòng
        let result = await dbDao
          .createTable(model.getName(), jsonStructure, 1024 * 1024 * 500) // cỡ tối đa lưu trữ trong file log là 1GB
          .catch((err) => {
            console.log("Lỗi tạo bảng:", err);
          });
        console.log("xxx> KQ tạo bảng:", model.getName(), result);
      }
    }
    console.log(`****> THE END.`);
    process.exit(0);
  })
  .catch((err) => {
    console.log("***>Lỗi kết nối CSDL:", err);
    process.exit(0);
  });
