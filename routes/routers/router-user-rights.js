// Đây là thủ tục tạo tự động từ ./test/create-api-functions/x-create-api-routers-handlers.js by cuong.dq
// Dữ liệu gốc từ file excel ./db/excel/api-function-granted-users-cdld.xlsx
// Được tạo và lúc 2021-06-08 14:02:33

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
const { userRightsHandler } = require("../../handlers/leader-direct-1.0");
// thực hiện viết các handler để xử lý dữ liệu, trả kết quả về cho các function của api

// gán req.finalJson = json để tự động trả kết quả, hoặc lỗi thì gán req.error = json
const funcPaths = {

    // Các lệnh GET của /user-rights này:

    GET: {
        /**
         * (1) GET /leader-direct/user-rights/get-functions
         * 
         * Các hàm API của hệ thống
         * Trả về các chức năng cần phân quyền (has_granted), để thực hiện gán quyền cho nhóm quyền hoặc user
         * 
         * - Yêu cầu CÓ TOKEN
         * 
         * SAMPLE INPUTS:  
         */
        '/get-functions': [
            // ... chèn hàm tiền xử lý vào đây ví dụ: (req, res, next) => { console.log('In ra ip', req.clientIp); next() },
            // 

            // Chuỗi hàm yêu cầu CÓ TOKEN
            ...verifyTokenChain,
            userRightsHandler.getFunctions
            // kết quả của bộ xử lý Hander sẽ cho ra req.finalJson nếu thành công hoặc req.error là thất bại
            // bộ Util-Router sẽ tự trả kết quả dựa trên 2 tham số trên (ưu tiên req.error trước)
        ],

        /**
         * (2) GET /leader-direct/user-rights/get-granted-groups
         * 
         * Lấy danh sách nhóm quyền
         * Trả về danh sách nhóm quyền
         * 
         * - Yêu cầu CÓ TOKEN
         * 
         * SAMPLE INPUTS:  
         */
        '/get-granted-groups': [
            // ... chèn hàm tiền xử lý vào đây ví dụ: (req, res, next) => { console.log('In ra ip', req.clientIp); next() },
            // 

            // Chuỗi hàm yêu cầu CÓ TOKEN
            ...verifyTokenChain,
            userRightsHandler.getGrantedGroups
            // kết quả của bộ xử lý Hander sẽ cho ra req.finalJson nếu thành công hoặc req.error là thất bại
            // bộ Util-Router sẽ tự trả kết quả dựa trên 2 tham số trên (ưu tiên req.error trước)
        ],

        /**
         * (3) GET /leader-direct/user-rights/get-granted-group
         * 
         * Lấy các quyền của một group
         * Trả về quyền của một nhóm ?group_id=1
         * 
         * - Yêu cầu ĐƯỢC PHÂN QUYỀN
         * 
         * SAMPLE INPUTS:  
         */
        '/get-granted-group': [
            // ... chèn hàm tiền xử lý vào đây ví dụ: (req, res, next) => { console.log('In ra ip', req.clientIp); next() },
            // Gán đường dẫn chức năng kiểm tra phân quyền trả kết quả req.functionCode
            expHandlers.setRequestParameter('/get-granted-group', 'functionCode'),
            // Chuỗi hàm yêu cầu ĐƯỢC PHÂN QUYỀN đầu vào là req.functionCode
            ...verifyGrantedChain,
            userRightsHandler.getGrantedGroup
            // kết quả của bộ xử lý Hander sẽ cho ra req.finalJson nếu thành công hoặc req.error là thất bại
            // bộ Util-Router sẽ tự trả kết quả dựa trên 2 tham số trên (ưu tiên req.error trước)
        ],

        /**
         * (4) GET /leader-direct/user-rights/get-granted-users
         * 
         * Lấy danh sách user được phân quyền
         * Trả về danh sách user được phân quyền
         * 
         * - Yêu cầu ĐƯỢC PHÂN QUYỀN
         * 
         * SAMPLE INPUTS:  
         */
        '/get-granted-users': [
            // ... chèn hàm tiền xử lý vào đây ví dụ: (req, res, next) => { console.log('In ra ip', req.clientIp); next() },
            // Gán đường dẫn chức năng kiểm tra phân quyền trả kết quả req.functionCode
            expHandlers.setRequestParameter('/get-granted-users', 'functionCode'),
            // Chuỗi hàm yêu cầu ĐƯỢC PHÂN QUYỀN đầu vào là req.functionCode
            ...verifyGrantedChain,
            userRightsHandler.getGrantedUsers
            // kết quả của bộ xử lý Hander sẽ cho ra req.finalJson nếu thành công hoặc req.error là thất bại
            // bộ Util-Router sẽ tự trả kết quả dựa trên 2 tham số trên (ưu tiên req.error trước)
        ],

        /**
         * (5) GET /leader-direct/user-rights/get-granted-user
         * 
         * Lấy quyền của một user
         * Trả về quyền của một user
         * 
         * - Yêu cầu ĐƯỢC PHÂN QUYỀN
         * 
         * SAMPLE INPUTS:  
         */
        '/get-granted-user': [
            // ... chèn hàm tiền xử lý vào đây ví dụ: (req, res, next) => { console.log('In ra ip', req.clientIp); next() },
            // Gán đường dẫn chức năng kiểm tra phân quyền trả kết quả req.functionCode
            expHandlers.setRequestParameter('/get-granted-user', 'functionCode'),
            // Chuỗi hàm yêu cầu ĐƯỢC PHÂN QUYỀN đầu vào là req.functionCode
            ...verifyGrantedChain,
            userRightsHandler.getGrantedUser
            // kết quả của bộ xử lý Hander sẽ cho ra req.finalJson nếu thành công hoặc req.error là thất bại
            // bộ Util-Router sẽ tự trả kết quả dựa trên 2 tham số trên (ưu tiên req.error trước)
        ],

        /**
         * (9) GET /leader-direct/user-rights/get-api-routers
         * 
         * Lấy danh sách các nhóm api router
         * Trả về danh sách các nhóm chức năng API
         * 
         * - Yêu cầu CÓ TOKEN
         * 
         * SAMPLE INPUTS:  
         */
        '/get-api-routers': [
            // ... chèn hàm tiền xử lý vào đây ví dụ: (req, res, next) => { console.log('In ra ip', req.clientIp); next() },
            // 

            // Chuỗi hàm yêu cầu CÓ TOKEN
            ...verifyTokenChain,
            userRightsHandler.getApiRouters
            // kết quả của bộ xử lý Hander sẽ cho ra req.finalJson nếu thành công hoặc req.error là thất bại
            // bộ Util-Router sẽ tự trả kết quả dựa trên 2 tham số trên (ưu tiên req.error trước)
        ],

        /**
         * (50) GET /leader-direct/user-rights/get-online-tokens
         * 
         * Lấy danh sách token đang online
         * Trả về danh sách token đang online không cần xác thực máy chủ xác thực
         * 
         * - Yêu cầu ĐƯỢC PHÂN QUYỀN
         * 
         * SAMPLE INPUTS:  
         */
        '/get-online-tokens': [
            // ... chèn hàm tiền xử lý vào đây ví dụ: (req, res, next) => { console.log('In ra ip', req.clientIp); next() },
            // Gán đường dẫn chức năng kiểm tra phân quyền trả kết quả req.functionCode
            expHandlers.setRequestParameter('/get-online-tokens', 'functionCode'),
            // Chuỗi hàm yêu cầu ĐƯỢC PHÂN QUYỀN đầu vào là req.functionCode
            ...verifyGrantedChain,
            userRightsHandler.getOnlineTokens
            // kết quả của bộ xử lý Hander sẽ cho ra req.finalJson nếu thành công hoặc req.error là thất bại
            // bộ Util-Router sẽ tự trả kết quả dựa trên 2 tham số trên (ưu tiên req.error trước)
        ],

    },

    // Các lệnh POST của /user-rights này:

    POST: {
        /**
         * (6) POST /leader-direct/user-rights/grant-functions-2-group
         * 
         * Gán các chức năng cho nhóm quyền
         * Phân quyền chức năng cho nhóm quyền
         * 
         * - Yêu cầu ĐƯỢC PHÂN QUYỀN
         * 
         * SAMPLE INPUTS:  
         */
        '/grant-functions-2-group': [
            // ... chèn hàm tiền xử lý vào đây ví dụ: (req, res, next) => { console.log('In ra ip', req.clientIp); next() },
            // Gán đường dẫn chức năng kiểm tra phân quyền trả kết quả req.functionCode
            expHandlers.setRequestParameter('/grant-functions-2-group', 'functionCode'),
            // Chuỗi hàm yêu cầu ĐƯỢC PHÂN QUYỀN đầu vào là req.functionCode
            ...verifyGrantedChain,// Hàm xử lý POST json data trả về req.json_data
            postHandler.jsonProcess,
            userRightsHandler.grantFunctions2Group
            // kết quả của bộ xử lý Hander sẽ cho ra req.finalJson nếu thành công hoặc req.error là thất bại
            // bộ Util-Router sẽ tự trả kết quả dựa trên 2 tham số trên (ưu tiên req.error trước)
        ],

        /**
         * (7) POST /leader-direct/user-rights/grant-groups-2-user
         * 
         * Gán nhóm quyền cho user
         * Phân quyền cho user theo nhóm quyền
         * 
         * - Yêu cầu ĐƯỢC PHÂN QUYỀN
         * 
         * SAMPLE INPUTS:  
         */
        '/grant-groups-2-user': [
            // ... chèn hàm tiền xử lý vào đây ví dụ: (req, res, next) => { console.log('In ra ip', req.clientIp); next() },
            // Gán đường dẫn chức năng kiểm tra phân quyền trả kết quả req.functionCode
            expHandlers.setRequestParameter('/grant-groups-2-user', 'functionCode'),
            // Chuỗi hàm yêu cầu ĐƯỢC PHÂN QUYỀN đầu vào là req.functionCode
            ...verifyGrantedChain,// Hàm xử lý POST json data trả về req.json_data
            postHandler.jsonProcess,
            userRightsHandler.grantGroups2User
            // kết quả của bộ xử lý Hander sẽ cho ra req.finalJson nếu thành công hoặc req.error là thất bại
            // bộ Util-Router sẽ tự trả kết quả dựa trên 2 tham số trên (ưu tiên req.error trước)
        ],

        /**
         * (8) POST /leader-direct/user-rights/grant-functions-2-user
         * 
         * Gán các chức năng cho user
         * Phân quyền cho user theo chức năng đơn lẻ
         * 
         * - Yêu cầu ĐƯỢC PHÂN QUYỀN
         * 
         * SAMPLE INPUTS:  
         */
        '/grant-functions-2-user': [
            // ... chèn hàm tiền xử lý vào đây ví dụ: (req, res, next) => { console.log('In ra ip', req.clientIp); next() },
            // Gán đường dẫn chức năng kiểm tra phân quyền trả kết quả req.functionCode
            expHandlers.setRequestParameter('/grant-functions-2-user', 'functionCode'),
            // Chuỗi hàm yêu cầu ĐƯỢC PHÂN QUYỀN đầu vào là req.functionCode
            ...verifyGrantedChain,// Hàm xử lý POST json data trả về req.json_data
            postHandler.jsonProcess,
            userRightsHandler.grantFunctions2User
            // kết quả của bộ xử lý Hander sẽ cho ra req.finalJson nếu thành công hoặc req.error là thất bại
            // bộ Util-Router sẽ tự trả kết quả dựa trên 2 tham số trên (ưu tiên req.error trước)
        ],

        /**
         * (10) POST /leader-direct/user-rights/add-function-2-group
         * 
         * Bổ sung 1 quyền cho group API
         * User chỉ gửi api_function và method yêu cầu add vào group id
         * 
         * - Yêu cầu ĐƯỢC PHÂN QUYỀN
         * 
         * SAMPLE INPUTS:  
         */
        '/add-function-2-group': [
            // ... chèn hàm tiền xử lý vào đây ví dụ: (req, res, next) => { console.log('In ra ip', req.clientIp); next() },
            // Gán đường dẫn chức năng kiểm tra phân quyền trả kết quả req.functionCode
            expHandlers.setRequestParameter('/add-function-2-group', 'functionCode'),
            // Chuỗi hàm yêu cầu ĐƯỢC PHÂN QUYỀN đầu vào là req.functionCode
            ...verifyGrantedChain,// Hàm xử lý POST json data trả về req.json_data
            postHandler.jsonProcess,
            userRightsHandler.addFunction2Group
            // kết quả của bộ xử lý Hander sẽ cho ra req.finalJson nếu thành công hoặc req.error là thất bại
            // bộ Util-Router sẽ tự trả kết quả dựa trên 2 tham số trên (ưu tiên req.error trước)
        ],

        /**
         * (11) POST /leader-direct/user-rights/remove-function-2-group
         * 
         * Thu hồi 1 quyền cho group API
         * User chỉ gửi api_function và method yêu cầu remove khỏi group_id
         * 
         * - Yêu cầu ĐƯỢC PHÂN QUYỀN
         * 
         * SAMPLE INPUTS:  
         */
        '/remove-function-2-group': [
            // ... chèn hàm tiền xử lý vào đây ví dụ: (req, res, next) => { console.log('In ra ip', req.clientIp); next() },
            // Gán đường dẫn chức năng kiểm tra phân quyền trả kết quả req.functionCode
            expHandlers.setRequestParameter('/remove-function-2-group', 'functionCode'),
            // Chuỗi hàm yêu cầu ĐƯỢC PHÂN QUYỀN đầu vào là req.functionCode
            ...verifyGrantedChain,// Hàm xử lý POST json data trả về req.json_data
            postHandler.jsonProcess,
            userRightsHandler.removeFunction2Group
            // kết quả của bộ xử lý Hander sẽ cho ra req.finalJson nếu thành công hoặc req.error là thất bại
            // bộ Util-Router sẽ tự trả kết quả dựa trên 2 tham số trên (ưu tiên req.error trước)
        ],

        /**
         * (12) POST /leader-direct/user-rights/add-function-2-user
         * 
         * Bổ sung 1 quyền API cho user
         * User chỉ gửi api_function và method yêu cầu add vào function_apis của user
         * 
         * - Yêu cầu ĐƯỢC PHÂN QUYỀN
         * 
         * SAMPLE INPUTS:  
         */
        '/add-function-2-user': [
            // ... chèn hàm tiền xử lý vào đây ví dụ: (req, res, next) => { console.log('In ra ip', req.clientIp); next() },
            // Gán đường dẫn chức năng kiểm tra phân quyền trả kết quả req.functionCode
            expHandlers.setRequestParameter('/add-function-2-user', 'functionCode'),
            // Chuỗi hàm yêu cầu ĐƯỢC PHÂN QUYỀN đầu vào là req.functionCode
            ...verifyGrantedChain,// Hàm xử lý POST json data trả về req.json_data
            postHandler.jsonProcess,
            userRightsHandler.addFunction2User
            // kết quả của bộ xử lý Hander sẽ cho ra req.finalJson nếu thành công hoặc req.error là thất bại
            // bộ Util-Router sẽ tự trả kết quả dựa trên 2 tham số trên (ưu tiên req.error trước)
        ],

        /**
         * (13) POST /leader-direct/user-rights/remove-function-2-user
         * 
         * Thu hồi 1 quyền API cho user
         * User chỉ gửi api_function và method yêu cầu remove khỏi function_aps của user
         * 
         * - Yêu cầu ĐƯỢC PHÂN QUYỀN
         * 
         * SAMPLE INPUTS:  
         */
        '/remove-function-2-user': [
            // ... chèn hàm tiền xử lý vào đây ví dụ: (req, res, next) => { console.log('In ra ip', req.clientIp); next() },
            // Gán đường dẫn chức năng kiểm tra phân quyền trả kết quả req.functionCode
            expHandlers.setRequestParameter('/remove-function-2-user', 'functionCode'),
            // Chuỗi hàm yêu cầu ĐƯỢC PHÂN QUYỀN đầu vào là req.functionCode
            ...verifyGrantedChain,// Hàm xử lý POST json data trả về req.json_data
            postHandler.jsonProcess,
            userRightsHandler.removeFunction2User
            // kết quả của bộ xử lý Hander sẽ cho ra req.finalJson nếu thành công hoặc req.error là thất bại
            // bộ Util-Router sẽ tự trả kết quả dựa trên 2 tham số trên (ưu tiên req.error trước)
        ],

        /**
         * (14) POST /leader-direct/user-rights/grant-function-root-2-user
         * 
         * Gán quyền root API cho user
         * Select toàn bộ has_granted bổ sung vào function_groups id =99 tất cả các quyền. Sau đó gán cho user ở trường function_groups
         * 
         * - Yêu cầu ĐƯỢC PHÂN QUYỀN
         * 
         * SAMPLE INPUTS:  
         */
        '/grant-function-root-2-user': [
            // ... chèn hàm tiền xử lý vào đây ví dụ: (req, res, next) => { console.log('In ra ip', req.clientIp); next() },
            // Gán đường dẫn chức năng kiểm tra phân quyền trả kết quả req.functionCode
            expHandlers.setRequestParameter('/grant-function-root-2-user', 'functionCode'),
            // Chuỗi hàm yêu cầu ĐƯỢC PHÂN QUYỀN đầu vào là req.functionCode
            ...verifyGrantedChain,// Hàm xử lý POST json data trả về req.json_data
            postHandler.jsonProcess,
            userRightsHandler.grantFunctionRoot2User
            // kết quả của bộ xử lý Hander sẽ cho ra req.finalJson nếu thành công hoặc req.error là thất bại
            // bộ Util-Router sẽ tự trả kết quả dựa trên 2 tham số trên (ưu tiên req.error trước)
        ],

        /**
         * (15) POST /leader-direct/user-rights/revoke-function-root-2-user
         * 
         * Thu hồi quyền root của user
         * Thu hồi nhóm quyền root (tức là xóa nhóm 99 trong user)
         * 
         * - Yêu cầu ĐƯỢC PHÂN QUYỀN
         * 
         * SAMPLE INPUTS:  
         */
        '/revoke-function-root-2-user': [
            // ... chèn hàm tiền xử lý vào đây ví dụ: (req, res, next) => { console.log('In ra ip', req.clientIp); next() },
            // Gán đường dẫn chức năng kiểm tra phân quyền trả kết quả req.functionCode
            expHandlers.setRequestParameter('/revoke-function-root-2-user', 'functionCode'),
            // Chuỗi hàm yêu cầu ĐƯỢC PHÂN QUYỀN đầu vào là req.functionCode
            ...verifyGrantedChain,// Hàm xử lý POST json data trả về req.json_data
            postHandler.jsonProcess,
            userRightsHandler.revokeFunctionRoot2User
            // kết quả của bộ xử lý Hander sẽ cho ra req.finalJson nếu thành công hoặc req.error là thất bại
            // bộ Util-Router sẽ tự trả kết quả dựa trên 2 tham số trên (ưu tiên req.error trước)
        ],

        /**
         * (16) POST /leader-direct/user-rights/import-function-apis
         * 
         * Import danh sách Api mới
         * Khi có Api mới - csdl không cần tạo lại, chỉ cần import danh sách api mới là đc
         * 
         * - Yêu cầu ĐƯỢC PHÂN QUYỀN
         * 
         * SAMPLE INPUTS:  
         */
        '/import-function-apis': [
            // ... chèn hàm tiền xử lý vào đây ví dụ: (req, res, next) => { console.log('In ra ip', req.clientIp); next() },
            // Gán đường dẫn chức năng kiểm tra phân quyền trả kết quả req.functionCode
            expHandlers.setRequestParameter('/import-function-apis', 'functionCode'),
            // Chuỗi hàm yêu cầu ĐƯỢC PHÂN QUYỀN đầu vào là req.functionCode
            ...verifyGrantedChain,// Hàm xử lý POST json data trả về req.json_data
            postHandler.jsonProcess,
            userRightsHandler.importFunctionApis
            // kết quả của bộ xử lý Hander sẽ cho ra req.finalJson nếu thành công hoặc req.error là thất bại
            // bộ Util-Router sẽ tự trả kết quả dựa trên 2 tham số trên (ưu tiên req.error trước)
        ],

        /**
         * (51) POST /leader-direct/user-rights/get-function-group
         * 
         * 
         * 
         * 
         * - Yêu cầu ĐƯỢC PHÂN QUYỀN
         * 
         * SAMPLE INPUTS:  
         */
        '/get-function-group': [
            // ... chèn hàm tiền xử lý vào đây ví dụ: (req, res, next) => { console.log('In ra ip', req.clientIp); next() },
            // Gán đường dẫn chức năng kiểm tra phân quyền trả kết quả req.functionCode
            expHandlers.setRequestParameter('/get-function-group', 'functionCode'),
            // Chuỗi hàm yêu cầu ĐƯỢC PHÂN QUYỀN đầu vào là req.functionCode
            ...verifyGrantedChain,// Hàm xử lý POST json data trả về req.json_data
            postHandler.jsonProcess,
            userRightsHandler.getFunctionGroup
            // kết quả của bộ xử lý Hander sẽ cho ra req.finalJson nếu thành công hoặc req.error là thất bại
            // bộ Util-Router sẽ tự trả kết quả dựa trên 2 tham số trên (ưu tiên req.error trước)
        ],

        /**
         * (52) POST /leader-direct/user-rights/create-function-group
         * 
         * 
         * 
         * 
         * - Yêu cầu ĐƯỢC PHÂN QUYỀN
         * 
         * SAMPLE INPUTS:  
         */
        '/create-function-group': [
            // ... chèn hàm tiền xử lý vào đây ví dụ: (req, res, next) => { console.log('In ra ip', req.clientIp); next() },
            // Gán đường dẫn chức năng kiểm tra phân quyền trả kết quả req.functionCode
            expHandlers.setRequestParameter('/create-function-group', 'functionCode'),
            // Chuỗi hàm yêu cầu ĐƯỢC PHÂN QUYỀN đầu vào là req.functionCode
            ...verifyGrantedChain,// Hàm xử lý POST json data trả về req.json_data
            postHandler.jsonProcess,
            userRightsHandler.createFunctionGroup
            // kết quả của bộ xử lý Hander sẽ cho ra req.finalJson nếu thành công hoặc req.error là thất bại
            // bộ Util-Router sẽ tự trả kết quả dựa trên 2 tham số trên (ưu tiên req.error trước)
        ],

        /**
         * (53) POST /leader-direct/user-rights/update-function-group
         * 
         * 
         * 
         * 
         * - Yêu cầu ĐƯỢC PHÂN QUYỀN
         * 
         * SAMPLE INPUTS:  
         */
        '/update-function-group': [
            // ... chèn hàm tiền xử lý vào đây ví dụ: (req, res, next) => { console.log('In ra ip', req.clientIp); next() },
            // Gán đường dẫn chức năng kiểm tra phân quyền trả kết quả req.functionCode
            expHandlers.setRequestParameter('/update-function-group', 'functionCode'),
            // Chuỗi hàm yêu cầu ĐƯỢC PHÂN QUYỀN đầu vào là req.functionCode
            ...verifyGrantedChain,// Hàm xử lý POST json data trả về req.json_data
            postHandler.jsonProcess,
            userRightsHandler.updateFunctionGroup
            // kết quả của bộ xử lý Hander sẽ cho ra req.finalJson nếu thành công hoặc req.error là thất bại
            // bộ Util-Router sẽ tự trả kết quả dựa trên 2 tham số trên (ưu tiên req.error trước)
        ],

        /**
         * (54) POST /leader-direct/user-rights/get-menu-api
         * 
         * 
         * 
         * 
         * - Yêu cầu ĐƯỢC PHÂN QUYỀN
         * 
         * SAMPLE INPUTS:  
         */
        '/get-menu-api': [
            // ... chèn hàm tiền xử lý vào đây ví dụ: (req, res, next) => { console.log('In ra ip', req.clientIp); next() },
            // Gán đường dẫn chức năng kiểm tra phân quyền trả kết quả req.functionCode
            expHandlers.setRequestParameter('/get-menu-api', 'functionCode'),
            // Chuỗi hàm yêu cầu ĐƯỢC PHÂN QUYỀN đầu vào là req.functionCode
            ...verifyGrantedChain,// Hàm xử lý POST json data trả về req.json_data
            postHandler.jsonProcess,
            userRightsHandler.getMenuApi
            // kết quả của bộ xử lý Hander sẽ cho ra req.finalJson nếu thành công hoặc req.error là thất bại
            // bộ Util-Router sẽ tự trả kết quả dựa trên 2 tham số trên (ưu tiên req.error trước)
        ],

        /**
         * (55) POST /leader-direct/user-rights/create-menu-api
         * 
         * 
         * 
         * 
         * - Yêu cầu ĐƯỢC PHÂN QUYỀN
         * 
         * SAMPLE INPUTS:  
         */
        '/create-menu-api': [
            // ... chèn hàm tiền xử lý vào đây ví dụ: (req, res, next) => { console.log('In ra ip', req.clientIp); next() },
            // Gán đường dẫn chức năng kiểm tra phân quyền trả kết quả req.functionCode
            expHandlers.setRequestParameter('/create-menu-api', 'functionCode'),
            // Chuỗi hàm yêu cầu ĐƯỢC PHÂN QUYỀN đầu vào là req.functionCode
            ...verifyGrantedChain,// Hàm xử lý POST json data trả về req.json_data
            postHandler.jsonProcess,
            userRightsHandler.createMenuApi
            // kết quả của bộ xử lý Hander sẽ cho ra req.finalJson nếu thành công hoặc req.error là thất bại
            // bộ Util-Router sẽ tự trả kết quả dựa trên 2 tham số trên (ưu tiên req.error trước)
        ],

        /**
         * (56) POST /leader-direct/user-rights/update-menu-api
         * 
         * 
         * 
         * 
         * - Yêu cầu ĐƯỢC PHÂN QUYỀN
         * 
         * SAMPLE INPUTS:  
         */
        '/update-menu-api': [
            // ... chèn hàm tiền xử lý vào đây ví dụ: (req, res, next) => { console.log('In ra ip', req.clientIp); next() },
            // Gán đường dẫn chức năng kiểm tra phân quyền trả kết quả req.functionCode
            expHandlers.setRequestParameter('/update-menu-api', 'functionCode'),
            // Chuỗi hàm yêu cầu ĐƯỢC PHÂN QUYỀN đầu vào là req.functionCode
            ...verifyGrantedChain,// Hàm xử lý POST json data trả về req.json_data
            postHandler.jsonProcess,
            userRightsHandler.updateMenuApi
            // kết quả của bộ xử lý Hander sẽ cho ra req.finalJson nếu thành công hoặc req.error là thất bại
            // bộ Util-Router sẽ tự trả kết quả dựa trên 2 tham số trên (ưu tiên req.error trước)
        ],

        /**
         * (57) POST /leader-direct/user-rights/get-function-granted
         * 
         * 
         * 
         * 
         * - Yêu cầu ĐƯỢC PHÂN QUYỀN
         * 
         * SAMPLE INPUTS:  
         */
        '/get-function-granted': [
            // ... chèn hàm tiền xử lý vào đây ví dụ: (req, res, next) => { console.log('In ra ip', req.clientIp); next() },
            // Gán đường dẫn chức năng kiểm tra phân quyền trả kết quả req.functionCode
            expHandlers.setRequestParameter('/get-function-granted', 'functionCode'),
            // Chuỗi hàm yêu cầu ĐƯỢC PHÂN QUYỀN đầu vào là req.functionCode
            ...verifyGrantedChain,// Hàm xử lý POST json data trả về req.json_data
            postHandler.jsonProcess,
            userRightsHandler.getFunctionGranted
            // kết quả của bộ xử lý Hander sẽ cho ra req.finalJson nếu thành công hoặc req.error là thất bại
            // bộ Util-Router sẽ tự trả kết quả dựa trên 2 tham số trên (ưu tiên req.error trước)
        ],

        /**
         * (58) POST /leader-direct/user-rights/get-organizations
         * 
         * 
         * 
         * 
         * - Yêu cầu ĐƯỢC PHÂN QUYỀN
         * 
         * SAMPLE INPUTS:  
         */
        '/get-organizations': [
            // ... chèn hàm tiền xử lý vào đây ví dụ: (req, res, next) => { console.log('In ra ip', req.clientIp); next() },
            // Gán đường dẫn chức năng kiểm tra phân quyền trả kết quả req.functionCode
            expHandlers.setRequestParameter('/get-organizations', 'functionCode'),
            // Chuỗi hàm yêu cầu ĐƯỢC PHÂN QUYỀN đầu vào là req.functionCode
            ...verifyGrantedChain,// Hàm xử lý POST json data trả về req.json_data
            postHandler.jsonProcess,
            userRightsHandler.getOrganizations
            // kết quả của bộ xử lý Hander sẽ cho ra req.finalJson nếu thành công hoặc req.error là thất bại
            // bộ Util-Router sẽ tự trả kết quả dựa trên 2 tham số trên (ưu tiên req.error trước)
        ],

        /**
         * (59) POST /leader-direct/user-rights/create-organization
         * 
         * 
         * 
         * 
         * - Yêu cầu ĐƯỢC PHÂN QUYỀN
         * 
         * SAMPLE INPUTS:  
         */
        '/create-organization': [
            // ... chèn hàm tiền xử lý vào đây ví dụ: (req, res, next) => { console.log('In ra ip', req.clientIp); next() },
            // Gán đường dẫn chức năng kiểm tra phân quyền trả kết quả req.functionCode
            expHandlers.setRequestParameter('/create-organization', 'functionCode'),
            // Chuỗi hàm yêu cầu ĐƯỢC PHÂN QUYỀN đầu vào là req.functionCode
            ...verifyGrantedChain,// Hàm xử lý POST json data trả về req.json_data
            postHandler.jsonProcess,
            userRightsHandler.createOrganization
            // kết quả của bộ xử lý Hander sẽ cho ra req.finalJson nếu thành công hoặc req.error là thất bại
            // bộ Util-Router sẽ tự trả kết quả dựa trên 2 tham số trên (ưu tiên req.error trước)
        ],

        /**
         * (60) POST /leader-direct/user-rights/update-organization
         * 
         * 
         * 
         * 
         * - Yêu cầu ĐƯỢC PHÂN QUYỀN
         * 
         * SAMPLE INPUTS:  
         */
        '/update-organization': [
            // ... chèn hàm tiền xử lý vào đây ví dụ: (req, res, next) => { console.log('In ra ip', req.clientIp); next() },
            // Gán đường dẫn chức năng kiểm tra phân quyền trả kết quả req.functionCode
            expHandlers.setRequestParameter('/update-organization', 'functionCode'),
            // Chuỗi hàm yêu cầu ĐƯỢC PHÂN QUYỀN đầu vào là req.functionCode
            ...verifyGrantedChain,// Hàm xử lý POST json data trả về req.json_data
            postHandler.jsonProcess,
            userRightsHandler.updateOrganization
            // kết quả của bộ xử lý Hander sẽ cho ra req.finalJson nếu thành công hoặc req.error là thất bại
            // bộ Util-Router sẽ tự trả kết quả dựa trên 2 tham số trên (ưu tiên req.error trước)
        ],

    },
};
module.exports = (new Router(funcPaths, API)).getExpressRouter();