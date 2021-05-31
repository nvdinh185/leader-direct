/**
 * Test thử migrate dữ liệu từ csdl A sang csdl B
 * Đảm bảo cùng một cấu trúc mô hình được định nghĩa trước, và chỉ migrate những trường dữ liệu theo mô hình mà thôi
 * các trường dữ liệu không có trong mô hình thì sẽ tự động lấy giá trị mặt định hoặc null
 *
 */

// khai cấu hình test thử, nếu chèn bị lỗi ở bảng nào?
const DEBUG = {
  isDebug: true,
  table_test: "server_keys",
  // cac bang loi: sites_infras (56)
  // loại trừ các bảng không cần migrate, vì nó tạo ngay trong file excel
  exclude_tables: ["social_users"]
};

const { db, db_src } = require("./config");

// giả sử ta có csdl gốc là từ sqlite theo kết nối dbSource
const dbSource = db_src;
// ta muốn export tất cả các bảng có trong db source kia sang dbDestination
const dbDestination = db;

// Giả sử ta có một mô hình dữ liệu đọc được trong file excel
// const excelModel = "./db/excel/admin-users-orm.xlsx";
// mô hình trên là phù hợp với dữ liệu của cấu trúc cho dbSource
// khai báo nhúng file excel vào create-db-from-excel.js và create-text-model-from-excel.js
// thực hiện khai báo nhúng kết nối dữ liệu phù hợp với file excel để tạo csdl mới
// tiến hành tạo csdl cho mô hình sqlite3
// # Tạo csdl từ mô hình - cho bất kỳ loại csdl nào
// node ./test/migrate-database/create-db-from-excel.js
// # Tạo cấu trúc mô hình của các bảng để lưu lại trong file: json-models.js
// node ./test/migrate-database/create-text-model-from-excel.js
// copy mô hình dữ liệu vào file json-models.js

// Đến đoạn này, csdl destination đã có cấu trúc, chưa có dữ liệu, và mô hình đã khai báo phù hợp trong json-models.js

// khai báo mô hình đã tạo:
const jsonTextModels = require("./json-models");

// nhúng gói giao tiếp csdl và mô hình vào
const { DynamicModel } = require("node-js-orm");

dbSource
  .waitingConnected()
  .then(async (ok) => {
    let desOk = await dbDestination.waitingConnected().catch((err) => {
      throw err;
    });

    // thực hiện tạo các lớp dữ liệu mô hình ORM như sau
    for (let tableName in jsonTextModels) {
      // lấy mô hình của một bảng
      let modelText = jsonTextModels[tableName];

      // tạo đối tượng mô hình liên kết với dữ liệu nguồn
      let srcModel = new DynamicModel(dbSource, tableName, modelText);

      // tạo đối tượng mô hình đích liên kết với dữ liệu đích
      let desModel = new DynamicModel(dbDestination, tableName, modelText);

      // đọc toàn bộ dữ liệu nguồn, import vào dữ liệu đích là xong
      let arrSdata = await srcModel.getAllData()
        .catch(err => {
          console.log("Lỗi truy vấn bảng gốc", err);
        });

      let importOK = await desModel
        .importArray2Database(arrSdata)
        .catch((err) => {
          console.log(`ERROR: Import des data for table ${tableName} ERROR:`, err);
        });

      console.log(`Import des data for table ${tableName}`, importOK);
    }

    // import xong thì thoát ra

    process.exit(0);
  })
  .catch((err) => {
    console.log(`Lỗi toàn cục`, err);
    process.exit(0);
  });
