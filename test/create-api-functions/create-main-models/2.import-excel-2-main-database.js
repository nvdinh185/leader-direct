/**
 * Đảm bảo mô hình chính ở bước 1 đã được tạo
 * Thủ tục này sẽ đọc file data (excel) hoặc mô hình nguồn (các bảng ở csdl nguồn),
 * thực hiện import lần lược các bảng vào csdl mô hình này
 * 
 */

// sử dụng lại tên mô hình
const { MODEL_NAME, excelData } = require("../config/params");

// khai báo giao tiếp mô hình csdl để phân quyền truy cập mức bảng trong csdl
// user sẽ có quyền select, insert, update, delete tùy vào phân quyền của user đó
const midlewares = require("../../../midlewares");

// lớp xử lý bảng mô hình gồm đọc bảng mô hình, đối tượng chứa các mô hình đã khởi tạo trong csdl này
const {
    ListModels
} = midlewares.dynamicModels;

// kết nối csdl phân quyền và lưu trữ cấu trúc csdl (từ điển SQL của từng bảng)
const dbConfig = require("../../../midlewares/dynamic-models/config");
const { dbModels } = dbConfig;

// đối tượng chuyển đổi đọc file excel và mảng
const { excell2Database } = require("node-js-orm");

// Định nghĩa Tập Mô Hình động qua csdl API + mô hình 
let listModels = new ListModels(dbModels);

// đợi csdl kết nối thành công
dbModels.waitingConnected()
    .then(async ok => {

        // 1.Lấy tập mô hình đã lưu trong csdl
        let myModels = await listModels.getTableModels(MODEL_NAME)
            .catch(err => {
                console.log('1. ***>Lỗi getTableModels', err);
            });

        let tableNames = Object.keys(myModels);
        console.log('2. Số bảng của Mô hình là', tableNames.length);

        // 3. Thực hiện import dữ liệu, nhớ xem biến true debug để xem kết quả import có bị lỗi ở đâu không nhé
        let resultImport = await excell2Database.importExcel2Database(
            Object.values(myModels),
            excelData,
            tableNames,
            100, // số lượng bảng ghi thực hiện đồng thời
            // true // xem lỗi gì khi chèn
        );
        console.log("3. Results of import db:", JSON.stringify(resultImport, null, 2));

        console.log(`****> THE END.`);
        process.exit(0);
    })
    .catch(err => {
        console.log('***--->Lỗi TOÀN CỤC: ', err);
        process.exit(0);
    });

