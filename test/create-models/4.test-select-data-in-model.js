// khai báo lấy thử một mô hình từ mô hình đã tạo
const { mainEntry } = require("./config/params");
const objModels = require(`../..${mainEntry}/models`);

// lấy một mô hình đầu tiên trong mảng mô hình đã tạo để select dữ liệu thử - cho tổng quát
const uModel = objModels[Object.keys(objModels)[1]];

console.log("SELECT tableName + databaseName --->", uModel.getName(), uModel.getDbName());
// let jsonWheres = { order_1: { $in: [ "3", "4A", "5"] } }
let jsonWheres = { }
// let jsonWheres = { order_1: { $lte: 5 } }
// let jsonWheres = { order_1: { $lte: "10" } }
// let jsonWheres = { order_1: { $gte: 5 , $lte: 7} }
// let jsonWheres = { table_name: "tables" }
// let jsonWheres = { order_1: { $regex: /5/g } }
// let jsonWheres = { order_1: { $like: "*5" } }
// let jsonWheres = { order_1: { $null: true } }
// let jsonWheres = { order_1: { $exists: false } }
// let jsonWheres = { order_1: { $ne: "10" } }
// let jsonWheres = { order_1: { $nin: [ "10", "2", "5"] } }

setTimeout(() => {

    console.log(`***>Tên Mô hình: ${uModel.getName()}\n-Các khóa chính: ${JSON.stringify(uModel.getUniques())}`);

    // thử thực hiện select dữ liệu sau khi csdl đã kết nối thành công?
    uModel.getAllData(jsonWheres
        , {} // fields
        , {} // order
        , { limit: 1, offset: 0 })
        .then(data => {
            console.log('getAllData: ', data);
        })
        .catch(err => {
            console.log('Lỗi getAllData: ', err);
        });

    // đếm số lượng bảng ghi
    uModel.getCount(jsonWheres)
        .then(data => {
            console.log('getCount: ', data);
        })
        .catch(err => {
            console.log('Lỗi getCount: ', err);
        });

    // lấy số lượng bảng ghi theo trang
    uModel.getPage(
        jsonWheres
        , {  }
        , {  }
        , { limit: 2, page: 2 }
    )
        .then(data => {
            console.log('getPage: ', data);
            // process.exit(0);
        })
        .catch(err => {
            console.log('Lỗi getPage: ', err);
            // process.exit(0);
        });

}, 3000)