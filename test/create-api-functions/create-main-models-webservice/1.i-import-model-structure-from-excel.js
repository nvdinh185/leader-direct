/**
 * Thủ tục này khai báo để import sheet chứa cấu trúc csdl của mô hình vào csdl api chứa cấu trúc mô hình
 * 1. Đọc file excel - tên sheet chứa cấu trúc csdl của mô hình
 * 2. Import cấu trúc bằng dịch vụ web-api trực tiếp bằng nodejs luôn
 */



const { main_link, MODEL_NAME, token, excelFile } = require("./config");

const { webService } = require("cng-node-js-utils");

const { excell2Database } = require("node-js-orm");


(async () => {

    // 2. đọc file excel tại sheet có tên khai trong biến MODEL_NAME
    // để lấy danh sách mô hình để import lên cấu trúc
    let arrTables = await excell2Database.excel2Array(excelFile, MODEL_NAME)
        .catch(err => {
            console.log('2. ***>Lỗi Đọc excel lấy danh mục cấu trúc csdl', err);
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

    console.log(`****> THE END.`);
    process.exit(0);
})();