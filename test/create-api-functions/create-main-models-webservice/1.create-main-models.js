/**
 * Start server rồi khai báo đường dẫn api, token để thực hiện
 */



const { main_link, token, MODEL_NAME, db_connection, excelFile } = require("./config");

const { webService } = require("cng-node-js-utils");

const { excell2Database } = require("node-js-orm");


(async () => {

    // 1. Khởi tạo một mô hình mới - kiểm tra kết nối csdl trước - nếu đã tồn tại thì sử dụng nó
    // bao gồm luôn cả việc tạo bảng lưu cấu trúc csdl của mô hình đó (cấu trúc tables)
    let cLog = await webService.POST(
        `${main_link}/models/create-model/${MODEL_NAME}`,
        {
            db_connection, // chuỗi kết nối csdl db-ccdc-tscd = dbCcdcTscd
            // db_type: "mongodb",
            // db_name: "ccdc-tscd-20201125",
            name: "Quản lý CCDC Tài sản cố định",
            updated_user: "init"
        },
        token
    ).catch(err => {
        console.log('1. Lỗi tạo mô hình: ', err);
    });

    console.log(`1. Kết quả khởi tạo mô hình ${MODEL_NAME}`, cLog);

    // 2. đọc excel để lấy danh sách mô hình để import lên cấu trúc
    let arrTables = await excell2Database.excel2Array(excelFile, MODEL_NAME)
        .catch(err => {
            console.log('2. ***>Lỗi Đọc excel lấy danh mục từ điển SQL', err);
        });
    console.log(`2. Kết quả đọc từ SHEET=${MODEL_NAME} của file excel ${excelFile} có số bảng ghi là:`, arrTables.length);


    // 3. Import danh sách mô hình được đọc từ excel
    let cSLog = await webService.POST(
        `${main_link}/models/import-model/${MODEL_NAME}`,
        {
            datas: arrTables
            , where_keys: ["table_name", "field_name"]
        },
        token
    )
        .catch(err => {
            console.log('3. ***>Lỗi importModelStructure cho mô hình', err);
        });
    console.log(`3. Kết quả importModelStructure mô hình ${MODEL_NAME}`, cSLog);

    // 4. Đồng bộ bảng và trường csdl thực với mô hình (tạo bảng)
    let sLog = await webService.POST(
        `${main_link}/models/sync-model/${MODEL_NAME}`,
        {},
        token
    )
        .catch(err => {
            console.log('4. ***>Lỗi syncRealDatabase', err);
        });
    console.log(`4. Kết quả tạo các bảng csdl chính của mô hình ${MODEL_NAME}`, sLog);

    console.log(`****> THE END.`);
    process.exit(0);
})();