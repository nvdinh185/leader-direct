// 5. Kiểm thử quyền từng chức năng của từng user được phân quyền trong bảng function_granted

const { userRight } = require("../../../midlewares/granted-users");

setTimeout(() => {

    // quyền của user phải false
    userRight("POST", "/user-rights", "/grant-groups-2-user", "0123456789")
        .then(ok => {
            console.log('1. Quyền của 0123456789 /grant-groups-2-user phải là false: ', ok);
        })
        .catch(err => {
            console.log('1. Quyền của 0123456789 /grant-groups-2-user phải là false không được phân quyền: ', err);
        });

    // quyền của user phải true
    userRight("GET", "/user-rights", "/get-granted-user", "0903500888")
        .then(ok => {
            console.log('2. Quyền của 0903500888 cho /get-granted-user phải là true: ', ok);
        })
        .catch(err => {
            console.log('2. Lỗi 0903500888 cho /get-granted-user: ', err);
        });

    // quyền của user admin
    userRight("GET", "/user-rights", "/get-granted-user", "cuong.dq")
        .then(ok => {
            console.log('3. Quyền của Admin cuong.dq cho /get-granted-user phải là true: ', ok);
        })
        .catch(err => {
            console.log('3. Lỗi cuong.dq cho /get-granted-user: ', err);
        });


    // quyền của user bất kỳ, nhưng chức năng chưa được khai báo
    userRight("GET", "/user-rights", "/get-api-routers", "any")
        .then(ok => {
            console.log('4. Quyền của any /get-api-routers phải là true: ', ok);
        })
        .catch(err => {
            console.log('4. Lỗi any /get-api-routers: ', err);
        });

    // quyền của user bất kỳ cho chức năng không ràng buộc yêu cầu
    userRight("POST", "/user-rights", "/grant-functions-2-user", "any")
        .then(ok => {
            console.log('5. Quyền của any no /grant-functions-2-user define api phải là false: ', ok);
        })
        .catch(err => {
            console.log('5. Quyền của any no /grant-functions-2-user phải false không phân quyền: ', err);
        });

}, 3000);
