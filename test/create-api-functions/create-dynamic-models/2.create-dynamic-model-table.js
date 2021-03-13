// Thủ tục này sẽ tạo một bảng trong csdl API - tên bảng trùng với tên mô hình - và cấu trúc bảng là cấu trúc chuẩn để lưu cấu trúc csdl thực (như sheet tables hoặc granted_users trong file excel)

// 1. Tạo 2 mô hình chuẩn của dự án db_connection = db-models (tương ứng với csdl granted-users) và db_resource-main (tương ứng với csdl main)

const {
  ListModels,
  config,
  listModels,
} = require("../../../midlewares/dynamic-models");

const { dbModels, dbMainResource } = config;

const { excell2Database } = require("node-js-orm");

const MODEL_NAME = "granted_users"; // tên mô hình trùng với tên bảng - phải sử dụng các ký tự [a-z_] mà thôi

// đợi csdl kết nối thành công
dbModels
  .waitingConnected()
  .then(async (ok) => {
    // 1. Tạo một bảng ghi để lưu mô hình trong bảng models
    let cLog = await listModels
      .createOneModel("granted_users", {
        db_connection: "db-models", // chuỗi kết nối csdl db-ccdc-tscd = dbCcdcTscd
        name: "Quản lý, phân quyền API và mô hình",
        description: "Quản lý, phân quyền API và tổ chức các mô hình động",
        updated_user: "node-./test-dynamic-models.js",
      })
      .catch((err) => {
        console.log("1. ***>Lỗi Khởi tạo bảng mô hình", err);
      });

    console.log(`1. Kết quả khởi tạo mô hình ${MODEL_NAME}`, cLog);

    // 2. tạo bảng để lưu cấu trúc csdl của mô hình
    let cSLog = await listModels
      .createModelStructure(MODEL_NAME)
      .catch((err) => {
        console.log("2. ***>Lỗi Tạo bảng lưu cấu trúc cho mô hình", err);
      });
    console.log(
      `2. KQ Tạo bảng ${MODEL_NAME} trong CSDL API:`,
      cSLog
    );

    // 3. sửa mô hình (chỉ tác động đến bảng models)
    let cLogU = await listModels
      .editOneModel("granted_users", {
        db_connection: "db-main-resource", // chuỗi kết nối db-main-resource dbMainResource
        name: "Mô hình giao tiếp tài nguyên hệ thống",
        description: "Quản lý tài nguyên hệ thống",
        updated_user: "node-./create-dynamic-model-table.js",
      })
      .catch((err) => {
        console.log("3. ***>Lỗi EDIT bảng mô hình", err);
      });

    console.log(`3. Kết quả EDIT mô hình ${MODEL_NAME}`, cLogU);

    // 4. Xóa mô hình (chỉ tác động đến bảng models)
    let cLogD = await listModels
      .deleteOneModel("granted_users")
      .catch((err) => {
        console.log("4. ***>Lỗi DELETE bảng mô hình", err);
      });

    console.log(`4. Kết quả DELETE mô hình ${MODEL_NAME}`, cLogD);

    console.log(`****> THE END.`);
    process.exit(0);
  })
  .catch((err) => {
    console.log("***--->Lỗi TOÀN CỤC: ", err);
  });
