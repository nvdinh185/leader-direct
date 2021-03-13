/**
 * Start server rồi khai báo đường dẫn api, token để thực hiện
 *
 * Thực hiện import bảng nếu trùng thì update theo key
 */

const { main_link, token, MODEL_NAME, excelData } = require("./config");

const { webService } = require("cng-node-js-utils");

const { excell2Database } = require("node-js-orm");

(async () => {
  // 1. reload lại mô hình trong csdl để đảm bảo có cấu trúc mô hình đầy đủ
  let tables = await webService
    .POST(
      `${main_link}/models/reload-model/${MODEL_NAME}`,
      { model_name: MODEL_NAME },
      token
    )
    .catch((err) => {
      console.log("1. ***>Lỗi load mô hình", err);
    });
  console.log(`1. Kết quả reload mô hình ${MODEL_NAME}`, tables);

  // for (let tableName of tables) {
  let tableName = "extras"; // test thử một bảng thử xem update thế nào nhé
  // mỗi tên bảng sẽ đọc trong excel lần lượt để lấy mảng dữ liệu để import
  // 2. đọc excel để lấy danh sách mô hình để import lên cấu trúc
  let arrTables = await excell2Database
    .excel2Array(excelData, tableName)
    .catch((err) => {
      console.log(`2. ***>Lỗi Đọc excel tại sheet ${tableName}`, err);
    });
  console.log(
    `2. Kết quả đọc từ SHEET=${MODEL_NAME} của file excel ${excelData} có số bảng ghi là:`,
    arrTables.length
  );

  // 3. Import dữ liệu excel đọc dược ở trên vào bảng thuộc mô hình
  let cSLog = await webService
    .POST(
      `${main_link}/models/import/${MODEL_NAME}/${tableName}`,
      {
        datas: arrTables,
        where_keys: ["id"],
      },
      token
    )
    .catch((err) => {
      console.log(
        `3. ***>Lỗi import dữ liệu vào bảng ${MODEL_NAME}/${tableName}`,
        err
      );
    });
  console.log(`3. Kết quả import cho bảng ${MODEL_NAME}/${tableName}`, cSLog);

  // }

  console.log(`****> THE END.`);
  process.exit(0);
})();
