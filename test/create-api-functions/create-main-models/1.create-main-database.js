/**
 * Thủ tục này sẽ định nghĩa một mô hình mới có tên đặt ở file cấu hình ./config/params.js
 * - thử kết nối csdl chính thông qua chuỗi kết nối khai fix - hoặc khai động thành công thì
 * - chèn một bảng ghi vào bảng model của csdl mô hình
 * - tạo một bảng có tên như tên mô hình (lưu ý tên mô hình phải đặt như đặt tên bảng trong csdl DBMS) 
 * - đọc sheet có tên trùng tên với tên mô hình lấy cấu trúc csdl chính
 * - import dữ liệu đó vào bảng ghi cấu trúc của mô hình
 * - thực hiện đồng bộ từng bảng csdl chính với từng mô hình trong cấu trúc vừa định nghĩa
 * - quá trình kết thúc là các bảng của csdl chính đã được tạo (đồng bộ) với từng bảng của mô hình
 */

// khai báo các biến dùng chung ở file tham số
const { MODEL_NAME, db_connection, excelFile } = require("../config/params");


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


const { excell2Database } = require("node-js-orm");


// Định nghĩa Tập Mô Hình động qua csdl API + mô hình 
let listModels = new ListModels(dbModels);

// đợi csdl kết nối thành công
dbModels.waitingConnected()
    .then(async ok => {

        // 1. Tạo một bảng ghi để lưu mô hình trong bảng models
        let cLog = await listModels.createOneModel(MODEL_NAME, {
            db_connection, // chuỗi kết nối csdl db-ccdc-tscd = dbCcdcTscd
            name: "Quản lý CCDC Tài sản cố định",
            updated_user: "init"
        })
            .catch(err => {
                console.log('1. ***>Lỗi Khởi tạo bảng mô hình', err);
            });

        console.log(`2. Kết quả khởi tạo mô hình ${MODEL_NAME}`, cLog);

        // 3. tạo bảng để lưu cấu trúc csdl của mô hình
        let cSLog = await listModels.createModelStructure(MODEL_NAME)
            .catch(err => {
                console.log('3. ***>Lỗi Tạo bảng lưu cấu trúc cho mô hình', err);
            });
        console.log(`4. Kết quả tạo bảng lưu cấu trúc cho mô hình ${MODEL_NAME}`, cSLog);

        // 5. Đọc excel để lấy cấu trúc csdl thực (Từ điển SQL)
        let arrTables = await excell2Database.excel2Array(excelFile, MODEL_NAME)
            .catch(err => {
                console.log('5. ***>Lỗi Đọc excel lấy danh mục từ điển SQL', err);
            });
        console.log(`6. Kết quả đọc từ SHEET=${MODEL_NAME} của file excel ${excelFile} có số bảng ghi là:`, arrTables.length);

        // 7. Import một cấu trúc mô hình mẫu của một bảng test có 2 cột
        let iLog = await listModels.importModelStructure(MODEL_NAME
            , arrTables
        )
            .catch(err => {
                console.log('7. ***>Lỗi importModelStructure', err);
            });
        console.log('8. Kết quả import cấu trúc csdl của mô hình:', iLog);


        // 9. Đồng bộ bảng và trường csdl thực với mô hình (tạo bảng)
        let sLog = await listModels.syncRealDatabase(MODEL_NAME)
            .catch(err => {
                console.log('9. ***>Lỗi syncRealDatabase', err);
            });
        console.log(`10. Kết quả tạo các bảng csdl chính của mô hình ${MODEL_NAME}`, sLog);

        // công việc còn lại là import dữ liệu mẫu vào csdl chính này

        console.log(`****> THE END.`);
        process.exit(0);

    })
    .catch(err => {
        console.log('***--->Lỗi TOÀN CỤC: ', err);
        process.exit(0);
    });

