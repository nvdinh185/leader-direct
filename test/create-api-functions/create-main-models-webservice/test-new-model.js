/**
 * Start server rồi khai báo đường dẫn api, token để thực hiện
 */



const { main_link, token } = require("./config");

const MODEL_NAME = "test-model-curl";


const { webService } = require("cng-node-js-utils");

(async () => {

    // 1. Khởi tạo một mô hình mới - kiểm tra kết nối csdl trước - nếu đã tồn tại thì sử dụng nó
    // bao gồm luôn cả việc tạo bảng lưu cấu trúc csdl của mô hình đó (cấu trúc tables)
    let cLog = await webService.POST(
        `${main_link}/models/create-model/${MODEL_NAME}`,
        {
            db_type: "sqlite3"
            , db_name: MODEL_NAME
            , name: "Test mô hình mới"
            , description: "Mô hình mẫu thử"
        },
        token
    ).catch(err => {
        console.log('1. Lỗi tạo mô hình: ', err);
    });

    console.log(`1. Kết quả khởi tạo mô hình ${MODEL_NAME}`, cLog);


    let arrTables = [{
        table_name: "test_id"
        , field_name: "id"
        , description: "test"
        , orm_data_type: "INTEGER"
    }
        , {
        table_name: "test_id"
        , field_name: "name"
        , description: "test"
        , orm_data_type: "STRING"
        , length: 255
    }]

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

    // Gán quyền quản trị các bảng cho user thì mới truy cập bảng này được
    let adminUser = await webService.POST(
        `${main_link}/user-tables/grant-table-root-2-user`,
        { username: "0903500888" },
        token
    )
        .catch(err => {
            console.log('x. ***>Lỗi gán quyền quản trị', err);
        });
    console.log(`x. Gán quyền quản trị bảng cho user ${MODEL_NAME}`, adminUser);


    // # chèn một dòng dữ liệu mới vào mô hình vửa tạo?
    // curl -d '{"data":{"id":1,"name":"ABC"}}' -H "Accept: application/json" -H "Content-Type: application/json" 
    // -X POST "http://localhost:8080/ccdc-tscd/models/insert/test-model-curl/test_id"
    let iLog = await webService.POST(
        `${main_link}/models/insert/${MODEL_NAME}/test_id`,
        { data: { id: 1, name: "ABC" } },
        token
    )
        .catch(err => {
            console.log('5. ***>Lỗi chèn dữ liệu', err);
        });
    console.log(`5. Kết quả chèn dữ liệu cho ${MODEL_NAME}/test_id`, iLog);

    // # Đọc một bảng ghi dữ liệu theo mệnh đề where trong bảng vừa chèn
    // curl -d '{"wheres":{"id":{"$lte":100}},"fields":{"id":1,"name":1},"sorts":{"id":-1}}' -H "Accept: application/json"
    // POST "http://localhost:8080/ccdc-tscd/models/post-1-record/test-model-curl/test_id"

    // # cập nhập các dòng dữ liệu với mệnh đề where id<=3
    // curl -d '{"data":{"name":"yyy-$lte:3"},"where":{"id":{"$lte":3}}}' -H "Accept: application/json"
    //  POST "http://localhost:8080/ccdc-tscd/models/update/test-model-curl/test_id"

    // # Xóa một tập bảng ghi trong bảng dữ liệu của mô hình where id < 3 
    // curl -d '{"where":{"id":{"$lt":3}}}' -H "Accept: application/json" -H "Content-Type: application/json" 
    // POST "http://localhost:8080/ccdc-tscd/models/delete/test-model-curl/test_id"

    console.log(`****> THE END.`);
    process.exit(0);

})();