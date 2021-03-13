// 4. Kiểm thử dữ liệu của mô hình
// khai báo lấy thử một mô hình từ mô hình đã tạo
const { mainEntry } = require("../config/params");
const { function_granted } = require(`../../..${mainEntry}/models`);

// let jsonWheres = { order_1: { $in: [ "3", "4A", "5"] } }
// let jsonWheres = { order_1: { $lte: "10" } }
// let jsonWheres = { order_1: { $gte: 5 , $lte: 7} }
// let jsonWheres = { table_name: "function_granted" }
// let jsonWheres = { order_1: { $regex: /5/g } }
// let jsonWheres = { order_1: { $like: "*5" } }
// let jsonWheres = { order_1: { $null: true } }
// let jsonWheres = { order_1: { $exists: false } }
// let jsonWheres = { order_1: { $ne: "10" } }
// let jsonWheres = { order_1: { $nin: [ "10", "2", "5"] } }
// let jsonWheres = { username: "0123456789" }
let jsonWheres = {};

setTimeout(async () => {

    // thử select 
    let data1 = await function_granted.getFirstRecord({ username: '0123456789' }, { username: 1, function_groups: 1, function_apis: 1, table_groups: 1, table_models: 1 })
        .catch((err) => {
            console.log("1. Lỗi select One: ", err);
        });

    console.log("1. select One. Result = ", data1);

    // select tất cả
    let data2 = await function_granted.getAllData({ username: '0123456789' }, { username: 1, description: 1 })
        .catch((err) => {
            console.log("2. Lỗi select all: ", err);
        });
    console.log("2. select all with where. Result = ", data2);


    // select số lượng
    let data3 = await function_granted.getCount({username:{$like:"*09*"}})
        .catch((err) => {
            console.log("3. Lỗi count: ", err);
        });
    console.log("3. select count like %09% kỳ vọng =2. Result ", data3);


    // thử insert 1 bảng ghi
    let data4 = await function_granted.insertOneRecord({ username: "111", function_apis: "[1,2,3]" })
        .catch((err) => {
            console.log("4. Lỗi insert: ", err);
        });

    console.log("4. Insert status (Kỳ vọng insert thành công hoặc trùng key báo lỗi) . Result = ", data4);

    // thử select 111
    let data5 = await function_granted.getFirstRecord({ username: '111' }, { username: 1, function_apis: 1 })
        .catch((err) => {
            console.log("5. Lỗi select One 111: ", err);
        });

    console.log("5. select One 111 kỳ vọng = { username: '111', function_apis: '[1,2,3]' }. Result = ", data5);
    // update thử 
    let data6 = await function_granted.updateOneRecord({ username: "111", function_apis: "[4,5,6]" }, { username: "111" })
        .catch((err) => {
            console.log("6. Lỗi update: ", err);
        });

    console.log("6. update status. Result = ", data6);

    // thử kiểm tra lại
    let data7 = await function_granted.getFirstRecord({ username: '111' }, { username: 1, function_apis: 1 })
        .catch((err) => {
            console.log("7. Lỗi select One 111: ", err);
        });

    console.log("7. select One 111 kỳ vọng = { username: '111', function_apis: '[4,5,6]' }. Result = ", data7);

    let data8 = await function_granted.deleteOneRecord({ username: "111" })
        .catch((err) => {
            console.log("8. Lỗi delete: ", err);
        });

    console.log("8. delete status. Result = ", data8);

    let data9 = await function_granted.getFirstRecord({ username: '111' }, { username: 1, function_apis: 1 })
        .catch((err) => {
            console.log("9. Lỗi select One 111: ", err);
        });
    console.log("9. select One Kỳ vọng = {} hoặc null vì bị xóa rồi. Result = ", data9);

    // 10. lấy số lượng bảng ghi theo trang
    let data10 = await function_granted.getPage(
        { status: 1 }
        , {}
        , {}
        , { limit: 2, page: 1 }
    )
        .catch(err => {
            console.log('10. Lỗi: ', err);
        });
    console.log("10. Lấy theo trang, kỳ vọng 2 bảng ghi với số trang là 1. Result = ", data10);

    console.log(`****> THE END.`);
    process.exit(0);

}, 3000)