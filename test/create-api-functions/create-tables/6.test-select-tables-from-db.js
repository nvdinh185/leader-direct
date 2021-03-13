const { db } = require("../config");

db.waitingConnected()
  .then(async (ok) => {

    // thử select 
    let data1 = await db.selectOne("function_granted", { username: '0123456789' }, { username: 1, function_groups: 1, function_apis: 1, table_groups: 1, table_models: 1 })
      .catch((err) => {
        console.log("1. Lỗi select One: ", err);
      });

    console.log("1. select One. Result = ", data1);

    // select tất cả
    let data2 = await db.selectAll("function_granted", { username: '0123456789' }, { username: 1, description: 1 })
      .catch((err) => {
        console.log("2. Lỗi select all: ", err);
      });
    console.log("2. select all with where. Result = ", data2);


    // select số lượng
    let data3 = await db.selectCount("function_granted")
      .catch((err) => {
        console.log("3. Lỗi count: ", err);
      });
    console.log("3. select count. Result ", data3);


    // thử insert 1 bảng ghi
    let data4 = await db.insertOne("function_granted", { username: "111", function_apis: "[1,2,3]" })
      .catch((err) => {
        console.log("4. Lỗi insert: ", err);
      });

    console.log("4. Insert status (Kỳ vọng insert thành công hoặc trùng key báo lỗi) . Result = ", data4);

    // thử select 111
    let data5 = await db.selectOne("function_granted", { username: '111' }, { username: 1, function_apis: 1 })
      .catch((err) => {
        console.log("5. Lỗi select One 111: ", err);
      });

    console.log("5. select One 111 kỳ vọng = { username: '111', function_apis: '[1,2,3]' }. Result = ", data5);
    // update thử 
    let data6 = await db.updateOne("function_granted", { username: "111", function_apis: "[4,5,6]" }, { username: "111" })
      .catch((err) => {
        console.log("6. Lỗi update: ", err);
      });

    console.log("6. update status. Result = ", data6);

    // thử kiểm tra lại
    let data7 = await db.selectOne("function_granted", { username: '111' }, { username: 1, function_apis: 1 })
      .catch((err) => {
        console.log("7. Lỗi select One 111: ", err);
      });

    console.log("7. select One 111 kỳ vọng = { username: '111', function_apis: '[4,5,6]' }. Result = ", data7);

    let data8 = await db.deleteOne("function_granted", { username: "111" })
      .catch((err) => {
        console.log("8. Lỗi delete: ", err);
      });

    console.log("8. delete status. Result = ", data8);

    let data9 = await db.selectOne("function_granted", { username: '111' }, { username: 1, function_apis: 1 })
      .catch((err) => {
        console.log("9. Lỗi select One 111: ", err);
      });
    console.log("9. select One Kỳ vọng = {} hoặc null vì bị xóa rồi. Result = ", data9);

    console.log(`****> THE END.`);
    process.exit(0);
  });
