// Đây là thủ tục tạo tự động từ ./test/create-api-functions/x-create-api-routers-handlers.js by cuong.dq
// Dữ liệu gốc từ file excel ./db/excel/media.xlsx
// Được tạo và lúc 2021-03-13 09:23:59

"use strict";

// ĐÂY LÀ ĐƯỜNG DẪN API như nào  thì khai như thế
// (xem đường dẫn khai ở tham số path trong file ./routes/api-api-2.0-socket-token.js gọi đến router này)
//và khai đúng như vậy
const API = "/user-rights";


// bộ xử lý dữ liệu postHandler = post + getToken để trả về req.token, req.json_data, json.form_data
const { postHandler, Router, expHandlers } = require("cng-node-js-utils");

// ----- PHÂN QUYỀN --- //
// nhúng bộ xác thực token proxy, nhằm yêu cầu chức năng có token mới thực hiện
const { verifyToken } = require("../../midlewares/verify-token");
// chuỗi kiểm tra token hợp lệ như sau
const verifyTokenChain = [
    // Hàm tự động lấy token trên các lệnh POST, GET, OPTIONS và trả về req.token 
    // (tiếp đầu ngữ thường dùng mặt định là Bear trên header)
    postHandler.getToken
    // thực hiện kiểm tra tính hợp lệ của token và trả về req.user nếu thành công hoặc req.error nếu thất bại
    // phương thức xác thực bằng socketClient - nhớ định nghĩa kênh liên lạc socket
    , verifyToken
    // nếu thất bại - có lỗi trong phân quyền, trả kết quả ngay cho client
    // sử dụng hàm khai sẵn luôn đỡ mất công
    , expHandlers.checkErrorBeforeResource
];

// nhúng bộ phân quyền chức năng của user, user được cấp quyền mới được truy vấn api
const { checkRight } = require("../../midlewares/granted-users");
// chuỗi kiểm tra quyền hợp lệ như sau:
const verifyGrantedChain = [
    ...verifyTokenChain
    // trả kết quả req.functionCode = req.path 
    // (thay thế bằng hàm setRequestParameter bên trong (utils 0.0.26))
    // , expHandlers.setFunctionFromPath
    // chuẩn bị các tham số để xác thực quyền
    , checkRight(API)
    // nếu thất bại - có lỗi trong phân quyền, trả kết quả ngay cho client
    // sử dụng hàm khai sẵn luôn đỡ mất công
    , expHandlers.checkErrorBeforeResource
];

// ----- END PHÂN QUYỀN --- //


// bộ xử lý máy chủ trả kết quả xử lý hander
const { userRightsHandler } = require("../../handlers/logs-1.0");
// thực hiện viết các handler để xử lý dữ liệu, trả kết quả về cho các function của api

// gán req.finalJson = json để tự động trả kết quả, hoặc lỗi thì gán req.error = json
const funcPaths = {

    // Các lệnh GET của /user-rights này:

    GET: {
        /**
         * (1) GET /media/user-rights/test-get
         * 
         * Các hàm API của hệ thống
         * Trả về các chức năng cần phân quyền (has_granted), để thực hiện gán quyền cho nhóm quyền hoặc user
         * 
         * - Yêu cầu CÓ TOKEN
         * 
         * SAMPLE INPUTS:  "page=1&limit=100"
         */
        '/test-get': [
            // ... chèn hàm tiền xử lý vào đây ví dụ: (req, res, next) => { console.log('In ra ip', req.clientIp); next() },
            // 
            
            // Chuỗi hàm yêu cầu CÓ TOKEN
            ...verifyTokenChain,
            userRightsHandler.testGet
            // kết quả của bộ xử lý Hander sẽ cho ra req.finalJson nếu thành công hoặc req.error là thất bại
            // bộ Util-Router sẽ tự trả kết quả dựa trên 2 tham số trên (ưu tiên req.error trước)
        ],

    },

    // Các lệnh POST của /user-rights này:

    POST: {
        /**
         * (2) POST /media/user-rights/test-post
         * 
         * Lấy danh sách nhóm quyền
         * Trả về danh sách nhóm quyền
         * 
         * - Yêu cầu CÓ TOKEN
         * 
         * SAMPLE INPUTS:  {name: "Abc"}
         */
        '/test-post': [
            // ... chèn hàm tiền xử lý vào đây ví dụ: (req, res, next) => { console.log('In ra ip', req.clientIp); next() },
            // 
            
            // Chuỗi hàm yêu cầu CÓ TOKEN
            ...verifyTokenChain,// Hàm xử lý POST json data trả về req.json_data
            postHandler.jsonProcess,
            userRightsHandler.testPost
            // kết quả của bộ xử lý Hander sẽ cho ra req.finalJson nếu thành công hoặc req.error là thất bại
            // bộ Util-Router sẽ tự trả kết quả dựa trên 2 tham số trên (ưu tiên req.error trước)
        ],

    },
};
module.exports = (new Router(funcPaths, API)).getExpressRouter();