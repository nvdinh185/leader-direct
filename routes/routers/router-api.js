// Đây là thủ tục tạo tự động từ ./test/create-api-functions/x-create-api-routers-handlers.js by cuong.dq
// Dữ liệu gốc từ file excel ./db/excel/sqlite-inovation-manager-v2.xlsx
// Được tạo và lúc 2021-04-02 09:56:34

"use strict";

// ĐÂY LÀ ĐƯỜNG DẪN API như nào  thì khai như thế
// (xem đường dẫn khai ở tham số path trong file ./routes/api-api-2.0-socket-token.js gọi đến router này)
//và khai đúng như vậy
const API = "/api";


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
const { apiHandler } = require("../../handlers/logs-1.0");
// thực hiện viết các handler để xử lý dữ liệu, trả kết quả về cho các function của api

// gán req.finalJson = json để tự động trả kết quả, hoặc lỗi thì gán req.error = json
const funcPaths = {

    // Các lệnh GET của /api này:

    GET: {
        /**
         * (2) GET /innovations/api/get-user-info
         * 
         * 
         * 
         * 
         * 
         * 
         * SAMPLE INPUTS:  
         */
        '/get-user-info': [
            // ... chèn hàm tiền xử lý vào đây ví dụ: (req, res, next) => { console.log('In ra ip', req.clientIp); next() },
            
            apiHandler.getUserInfo
            // kết quả của bộ xử lý Hander sẽ cho ra req.finalJson nếu thành công hoặc req.error là thất bại
            // bộ Util-Router sẽ tự trả kết quả dựa trên 2 tham số trên (ưu tiên req.error trước)
        ],

        /**
         * (3) GET /innovations/api/get-idea-parameters
         * 
         * 
         * 
         * 
         * 
         * 
         * SAMPLE INPUTS:  
         */
        '/get-idea-parameters': [
            // ... chèn hàm tiền xử lý vào đây ví dụ: (req, res, next) => { console.log('In ra ip', req.clientIp); next() },
            
            apiHandler.getIdeaParameters
            // kết quả của bộ xử lý Hander sẽ cho ra req.finalJson nếu thành công hoặc req.error là thất bại
            // bộ Util-Router sẽ tự trả kết quả dựa trên 2 tham số trên (ưu tiên req.error trước)
        ],

        /**
         * (4) GET /innovations/api/get-ideas
         * 
         * 
         * 
         * 
         * 
         * 
         * SAMPLE INPUTS:  
         */
        '/get-ideas': [
            // ... chèn hàm tiền xử lý vào đây ví dụ: (req, res, next) => { console.log('In ra ip', req.clientIp); next() },
            
            apiHandler.getIdeas
            // kết quả của bộ xử lý Hander sẽ cho ra req.finalJson nếu thành công hoặc req.error là thất bại
            // bộ Util-Router sẽ tự trả kết quả dựa trên 2 tham số trên (ưu tiên req.error trước)
        ],

        /**
         * (5) GET /innovations/api/get-idea
         * 
         * 
         * 
         * 
         * 
         * 
         * SAMPLE INPUTS:  
         */
        '/get-idea': [
            // ... chèn hàm tiền xử lý vào đây ví dụ: (req, res, next) => { console.log('In ra ip', req.clientIp); next() },
            
            apiHandler.getIdea
            // kết quả của bộ xử lý Hander sẽ cho ra req.finalJson nếu thành công hoặc req.error là thất bại
            // bộ Util-Router sẽ tự trả kết quả dựa trên 2 tham số trên (ưu tiên req.error trước)
        ],

        /**
         * (6) GET /innovations/api/get-attach-files
         * 
         * 
         * 
         * 
         * 
         * 
         * SAMPLE INPUTS:  
         */
        '/get-attach-files': [
            // ... chèn hàm tiền xử lý vào đây ví dụ: (req, res, next) => { console.log('In ra ip', req.clientIp); next() },
            
            apiHandler.getAttachFiles
            // kết quả của bộ xử lý Hander sẽ cho ra req.finalJson nếu thành công hoặc req.error là thất bại
            // bộ Util-Router sẽ tự trả kết quả dựa trên 2 tham số trên (ưu tiên req.error trước)
        ],

        /**
         * (7) GET /innovations/api/get-file-id
         * 
         * 
         * 
         * 
         * 
         * 
         * SAMPLE INPUTS:  
         */
        '/get-file-id': [
            // ... chèn hàm tiền xử lý vào đây ví dụ: (req, res, next) => { console.log('In ra ip', req.clientIp); next() },
            
            apiHandler.getFileId
            // kết quả của bộ xử lý Hander sẽ cho ra req.finalJson nếu thành công hoặc req.error là thất bại
            // bộ Util-Router sẽ tự trả kết quả dựa trên 2 tham số trên (ưu tiên req.error trước)
        ],

        /**
         * (8) GET /innovations/api/get-questions
         * 
         * 
         * 
         * 
         * 
         * 
         * SAMPLE INPUTS:  
         */
        '/get-questions': [
            // ... chèn hàm tiền xử lý vào đây ví dụ: (req, res, next) => { console.log('In ra ip', req.clientIp); next() },
            
            apiHandler.getQuestions
            // kết quả của bộ xử lý Hander sẽ cho ra req.finalJson nếu thành công hoặc req.error là thất bại
            // bộ Util-Router sẽ tự trả kết quả dựa trên 2 tham số trên (ưu tiên req.error trước)
        ],

        /**
         * (9) GET /innovations/api/user-mark-idea
         * 
         * 
         * 
         * 
         * 
         * 
         * SAMPLE INPUTS:  
         */
        '/user-mark-idea': [
            // ... chèn hàm tiền xử lý vào đây ví dụ: (req, res, next) => { console.log('In ra ip', req.clientIp); next() },
            
            apiHandler.userMarkIdea
            // kết quả của bộ xử lý Hander sẽ cho ra req.finalJson nếu thành công hoặc req.error là thất bại
            // bộ Util-Router sẽ tự trả kết quả dựa trên 2 tham số trên (ưu tiên req.error trước)
        ],

    },

    // Các lệnh POST của /api này:

    POST: {
        /**
         * (10) POST /innovations/api/create-user
         * 
         * 
         * 
         * 
         * 
         * 
         * SAMPLE INPUTS:  
         */
        '/create-user': [
            // ... chèn hàm tiền xử lý vào đây ví dụ: (req, res, next) => { console.log('In ra ip', req.clientIp); next() },
            // Hàm xử lý POST json data trả về req.json_data
            postHandler.jsonProcess,
            apiHandler.createUser
            // kết quả của bộ xử lý Hander sẽ cho ra req.finalJson nếu thành công hoặc req.error là thất bại
            // bộ Util-Router sẽ tự trả kết quả dựa trên 2 tham số trên (ưu tiên req.error trước)
        ],

        /**
         * (11) POST /innovations/api/edit-user
         * 
         * 
         * 
         * 
         * 
         * 
         * SAMPLE INPUTS:  
         */
        '/edit-user': [
            // ... chèn hàm tiền xử lý vào đây ví dụ: (req, res, next) => { console.log('In ra ip', req.clientIp); next() },
            // Hàm xử lý POST json data trả về req.json_data
            postHandler.jsonProcess,
            apiHandler.editUser
            // kết quả của bộ xử lý Hander sẽ cho ra req.finalJson nếu thành công hoặc req.error là thất bại
            // bộ Util-Router sẽ tự trả kết quả dựa trên 2 tham số trên (ưu tiên req.error trước)
        ],

        /**
         * (12) POST /innovations/api/create-idea
         * 
         * 
         * 
         * 
         * 
         * 
         * SAMPLE INPUTS:  
         */
        '/create-idea': [
            // ... chèn hàm tiền xử lý vào đây ví dụ: (req, res, next) => { console.log('In ra ip', req.clientIp); next() },
            // Hàm xử lý POST json data trả về req.json_data
            postHandler.jsonProcess,
            apiHandler.createIdea
            // kết quả của bộ xử lý Hander sẽ cho ra req.finalJson nếu thành công hoặc req.error là thất bại
            // bộ Util-Router sẽ tự trả kết quả dựa trên 2 tham số trên (ưu tiên req.error trước)
        ],

        /**
         * (13) POST /innovations/api/edit-idea
         * 
         * 
         * 
         * 
         * 
         * 
         * SAMPLE INPUTS:  
         */
        '/edit-idea': [
            // ... chèn hàm tiền xử lý vào đây ví dụ: (req, res, next) => { console.log('In ra ip', req.clientIp); next() },
            // Hàm xử lý POST json data trả về req.json_data
            postHandler.jsonProcess,
            apiHandler.editIdea
            // kết quả của bộ xử lý Hander sẽ cho ra req.finalJson nếu thành công hoặc req.error là thất bại
            // bộ Util-Router sẽ tự trả kết quả dựa trên 2 tham số trên (ưu tiên req.error trước)
        ],

        /**
         * (14) POST /innovations/api/delete-idea
         * 
         * 
         * 
         * 
         * 
         * 
         * SAMPLE INPUTS:  
         */
        '/delete-idea': [
            // ... chèn hàm tiền xử lý vào đây ví dụ: (req, res, next) => { console.log('In ra ip', req.clientIp); next() },
            // Hàm xử lý POST json data trả về req.json_data
            postHandler.jsonProcess,
            apiHandler.deleteIdea
            // kết quả của bộ xử lý Hander sẽ cho ra req.finalJson nếu thành công hoặc req.error là thất bại
            // bộ Util-Router sẽ tự trả kết quả dựa trên 2 tham số trên (ưu tiên req.error trước)
        ],

        /**
         * (15) POST /innovations/api/like-idea
         * 
         * 
         * 
         * 
         * 
         * 
         * SAMPLE INPUTS:  
         */
        '/like-idea': [
            // ... chèn hàm tiền xử lý vào đây ví dụ: (req, res, next) => { console.log('In ra ip', req.clientIp); next() },
            // Hàm xử lý POST json data trả về req.json_data
            postHandler.jsonProcess,
            apiHandler.likeIdea
            // kết quả của bộ xử lý Hander sẽ cho ra req.finalJson nếu thành công hoặc req.error là thất bại
            // bộ Util-Router sẽ tự trả kết quả dựa trên 2 tham số trên (ưu tiên req.error trước)
        ],

        /**
         * (16) POST /innovations/api/comment-idea
         * 
         * 
         * 
         * 
         * 
         * 
         * SAMPLE INPUTS:  
         */
        '/comment-idea': [
            // ... chèn hàm tiền xử lý vào đây ví dụ: (req, res, next) => { console.log('In ra ip', req.clientIp); next() },
            // Hàm xử lý POST json data trả về req.json_data
            postHandler.jsonProcess,
            apiHandler.commentIdea
            // kết quả của bộ xử lý Hander sẽ cho ra req.finalJson nếu thành công hoặc req.error là thất bại
            // bộ Util-Router sẽ tự trả kết quả dựa trên 2 tham số trên (ưu tiên req.error trước)
        ],

        /**
         * (17) POST /innovations/api/mark-idea
         * 
         * 
         * 
         * 
         * 
         * 
         * SAMPLE INPUTS:  
         */
        '/mark-idea': [
            // ... chèn hàm tiền xử lý vào đây ví dụ: (req, res, next) => { console.log('In ra ip', req.clientIp); next() },
            // Hàm xử lý POST json data trả về req.json_data
            postHandler.jsonProcess,
            apiHandler.markIdea
            // kết quả của bộ xử lý Hander sẽ cho ra req.finalJson nếu thành công hoặc req.error là thất bại
            // bộ Util-Router sẽ tự trả kết quả dựa trên 2 tham số trên (ưu tiên req.error trước)
        ],

    },
};
module.exports = (new Router(funcPaths, API)).getExpressRouter();