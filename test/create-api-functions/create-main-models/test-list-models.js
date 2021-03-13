/**
 * Thủ tục này test thử các phương thức của list-models.js trong mô hình động
 * 
 */
// khai báo giao tiếp mô hình csdl để phân quyền truy cập mức bảng trong csdl
// user sẽ có quyền select, insert, update, delete tùy vào phân quyền của user đó
const midlewares = require("../../../midlewares");

// lớp xử lý bảng mô hình gồm đọc bảng mô hình, đối tượng chứa các mô hình đã khởi tạo trong csdl này
const {
    ListModels
} = midlewares.dynamicModels;

const dbConfig = require("../../../midlewares/dynamic-models/config");
const { dbModels } = dbConfig;


let model_name = "test-model";

let listModels = new ListModels(dbModels);

dbModels.waitingConnected()
    .then(async ok => {

        // // 1. xóa một mô hình có sẵn
        // let dlog = await listModels.deleteOneModel(model_name)
        //     .catch(err => {
        //         console.log('1. ***>Lỗi deleteOneModel', err);
        //     });
        // console.log('1. deleteOneModel', dlog);

        // 2. Tạo một mô hình mới (chưa có trong bảng models)
        let cLog = await listModels.createOneModel(model_name, {
            db_type: "sqlite3",
            db_name: model_name,
            name: "test",
            updated_user: "test"
        })
            .catch(err => {
                console.log('2. ***>Lỗi createOneModel', err);
            });

        console.log('2. createOneModel', cLog);

        // 3. update một mô hình có sẵn
        let uLog = await listModels.editOneModel(model_name, {
            db_type: "sqlite3",
            db_name: model_name,
            name: "test",
            updated_user: "test"
        })
            .catch(err => {
                console.log('3. ***>Lỗi editOneModel', err);
            });
        console.log('3. editOneModel', uLog);


        // 4. tạo cấu trúc của mô hình
        let cSLog = await listModels.createModelStructure(model_name)
            .catch(err => {
                console.log('4. ***>Lỗi createModelStructure', err);
            });
        console.log('4. createModelStructure', cSLog);


        // 5. Import một cấu trúc mô hình mẫu của một bảng test có 2 cột
        let iLog = await listModels.importModelStructure(model_name
            , [
                {
                    table_name: "test",
                    field_name: "id",
                    orm_data_type: "INTEGER",
                    orm_not_null: 1
                },
                {
                    table_name: "test",
                    field_name: "name",
                    orm_data_type: "STRING",
                    orm_length: 255
                }
            ]
        )
            .catch(err => {
                console.log('5. ***>Lỗi importModelStructure', err);
            });
        console.log('5. importModelStructure', iLog);


        // 6. Tạo bảng csdl thực (tạo toàn bộ)
        let sLog = await listModels.syncRealDatabase(model_name)
            .catch(err => {
                console.log('6. ***>Lỗi syncRealDatabase', err);
            });
        console.log('6. syncRealDatabase', sLog);


        // 7. Khởi tạo một tập mô hình dữ liệu để truy vấn (tức là reload đó)
        let myModels = await listModels.getTableModels(model_name, true)
            .catch(err => {
                console.log('7. ***>Lỗi getTableModels', err);
            });
        console.log('7. getTableModels', Object.keys(myModels));

        // 8. Lấy một mô hình vừa tạo để CRUD
        let myModel = listModels.getTableModel(model_name, "test");
        console.log('8. getTableModel OK:', typeof myModel);
        // chèn dữ liệu vào bảng mô hình
        // select dữ liệu ra từ bảng mô hình

        if (myModel) {
            let iiLog = await myModel.insertOneRecord({ id: 1, name: "test" })
                .catch(err => {
                    console.log('9. ***>Lỗi insertOneRecord', err);
                });
            console.log('9. insertOneRecord:', iiLog);

            myModel.getCount()
                .then(data => {
                    console.log('10. Data: ', data);
                })
                .catch(err => {
                    console.log('10. Lỗi: ', err);
                });
        }



    })

