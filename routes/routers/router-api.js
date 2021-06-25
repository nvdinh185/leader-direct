// Đây là thủ tục tạo tự động từ ./test/create-api-functions/x-create-api-routers-handlers.js by cuong.dq
// Dữ liệu gốc từ file excel ./db/excel/api-function-granted-users-cdld.xlsx
// Được tạo và lúc 2021-05-31 15:44:25

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
        // '/get-file/:fileName': [
        //     apiHandler.getFile
        // ],
    },

    // Các lệnh POST của /api này:

    POST: {
        /**
         * (101) POST /leader-direct/api/get-meeting
         * 
         * 
         * 
         * 
         * - Yêu cầu ĐƯỢC PHÂN QUYỀN
         * 
         * SAMPLE INPUTS:  
         */
        '/get-meeting': [
            // ... chèn hàm tiền xử lý vào đây ví dụ: (req, res, next) => { console.log('In ra ip', req.clientIp); next() },
            // Gán đường dẫn chức năng kiểm tra phân quyền trả kết quả req.functionCode
            expHandlers.setRequestParameter('/get-meeting', 'functionCode'),
            // Chuỗi hàm yêu cầu ĐƯỢC PHÂN QUYỀN đầu vào là req.functionCode
            ...verifyGrantedChain,// Hàm xử lý POST json data trả về req.json_data
            postHandler.jsonProcess,
            apiHandler.getMeeting
            // kết quả của bộ xử lý Hander sẽ cho ra req.finalJson nếu thành công hoặc req.error là thất bại
            // bộ Util-Router sẽ tự trả kết quả dựa trên 2 tham số trên (ưu tiên req.error trước)
        ],

        /**
         * (102) POST /leader-direct/api/create-meeting
         * 
         * 
         * 
         * 
         * - Yêu cầu ĐƯỢC PHÂN QUYỀN
         * 
         * SAMPLE INPUTS:  
         */
        '/create-meeting': [
            // ... chèn hàm tiền xử lý vào đây ví dụ: (req, res, next) => { console.log('In ra ip', req.clientIp); next() },
            // Gán đường dẫn chức năng kiểm tra phân quyền trả kết quả req.functionCode
            expHandlers.setRequestParameter('/create-meeting', 'functionCode'),
            // Chuỗi hàm yêu cầu ĐƯỢC PHÂN QUYỀN đầu vào là req.functionCode
            ...verifyGrantedChain,// Hàm xử lý POST json data trả về req.json_data
            postHandler.formProcess,
            apiHandler.createAttachments,
            apiHandler.createMeeting
            // kết quả của bộ xử lý Hander sẽ cho ra req.finalJson nếu thành công hoặc req.error là thất bại
            // bộ Util-Router sẽ tự trả kết quả dựa trên 2 tham số trên (ưu tiên req.error trước)
        ],

        /**
         * (103) POST /leader-direct/api/update-meeting
         * 
         * 
         * 
         * 
         * - Yêu cầu ĐƯỢC PHÂN QUYỀN
         * 
         * SAMPLE INPUTS:  
         */
        '/update-meeting': [
            // ... chèn hàm tiền xử lý vào đây ví dụ: (req, res, next) => { console.log('In ra ip', req.clientIp); next() },
            // Gán đường dẫn chức năng kiểm tra phân quyền trả kết quả req.functionCode
            expHandlers.setRequestParameter('/update-meeting', 'functionCode'),
            // Chuỗi hàm yêu cầu ĐƯỢC PHÂN QUYỀN đầu vào là req.functionCode
            ...verifyGrantedChain,// Hàm xử lý POST json data trả về req.json_data
            postHandler.jsonProcess,
            apiHandler.updateMeeting
            // kết quả của bộ xử lý Hander sẽ cho ra req.finalJson nếu thành công hoặc req.error là thất bại
            // bộ Util-Router sẽ tự trả kết quả dựa trên 2 tham số trên (ưu tiên req.error trước)
        ],

        /**
         * (104) POST /leader-direct/api/get-direct
         * 
         * 
         * 
         * 
         * - Yêu cầu ĐƯỢC PHÂN QUYỀN
         * 
         * SAMPLE INPUTS:  
         */
        '/get-direct': [
            // ... chèn hàm tiền xử lý vào đây ví dụ: (req, res, next) => { console.log('In ra ip', req.clientIp); next() },
            // Gán đường dẫn chức năng kiểm tra phân quyền trả kết quả req.functionCode
            expHandlers.setRequestParameter('/get-direct', 'functionCode'),
            // Chuỗi hàm yêu cầu ĐƯỢC PHÂN QUYỀN đầu vào là req.functionCode
            ...verifyGrantedChain,// Hàm xử lý POST json data trả về req.json_data
            postHandler.jsonProcess,
            apiHandler.getDirect
            // kết quả của bộ xử lý Hander sẽ cho ra req.finalJson nếu thành công hoặc req.error là thất bại
            // bộ Util-Router sẽ tự trả kết quả dựa trên 2 tham số trên (ưu tiên req.error trước)
        ],

        /**
         * (105) POST /leader-direct/api/get-direct-by-cat
         * 
         * Lấy Direct theo Cat -> Truyền cat-id vào
         * 
         * 
         * - Yêu cầu ĐƯỢC PHÂN QUYỀN
         * 
         * SAMPLE INPUTS:  
         */
        '/get-direct-by-cat': [
            // ... chèn hàm tiền xử lý vào đây ví dụ: (req, res, next) => { console.log('In ra ip', req.clientIp); next() },
            // Gán đường dẫn chức năng kiểm tra phân quyền trả kết quả req.functionCode
            expHandlers.setRequestParameter('/get-direct-by-cat', 'functionCode'),
            // Chuỗi hàm yêu cầu ĐƯỢC PHÂN QUYỀN đầu vào là req.functionCode
            ...verifyGrantedChain,// Hàm xử lý POST json data trả về req.json_data
            postHandler.jsonProcess,
            apiHandler.getDirectByCat
            // kết quả của bộ xử lý Hander sẽ cho ra req.finalJson nếu thành công hoặc req.error là thất bại
            // bộ Util-Router sẽ tự trả kết quả dựa trên 2 tham số trên (ưu tiên req.error trước)
        ],

        /**
         * (106) POST /leader-direct/api/create-direct
         * 
         * 
         * 
         * 
         * - Yêu cầu ĐƯỢC PHÂN QUYỀN
         * 
         * SAMPLE INPUTS:  
         */
        '/create-direct': [
            // ... chèn hàm tiền xử lý vào đây ví dụ: (req, res, next) => { console.log('In ra ip', req.clientIp); next() },
            // Gán đường dẫn chức năng kiểm tra phân quyền trả kết quả req.functionCode
            expHandlers.setRequestParameter('/create-direct', 'functionCode'),
            // Chuỗi hàm yêu cầu ĐƯỢC PHÂN QUYỀN đầu vào là req.functionCode
            ...verifyGrantedChain,// Hàm xử lý POST json data trả về req.json_data
            postHandler.formProcess,
            apiHandler.createAttachments,
            apiHandler.createDirect
            // kết quả của bộ xử lý Hander sẽ cho ra req.finalJson nếu thành công hoặc req.error là thất bại
            // bộ Util-Router sẽ tự trả kết quả dựa trên 2 tham số trên (ưu tiên req.error trước)
        ],

        /**
         * (107) POST /leader-direct/api/update-direct
         * 
         * 
         * 
         * 
         * - Yêu cầu ĐƯỢC PHÂN QUYỀN
         * 
         * SAMPLE INPUTS:  
         */
        '/update-direct': [
            // ... chèn hàm tiền xử lý vào đây ví dụ: (req, res, next) => { console.log('In ra ip', req.clientIp); next() },
            // Gán đường dẫn chức năng kiểm tra phân quyền trả kết quả req.functionCode
            expHandlers.setRequestParameter('/update-direct', 'functionCode'),
            // Chuỗi hàm yêu cầu ĐƯỢC PHÂN QUYỀN đầu vào là req.functionCode
            ...verifyGrantedChain,// Hàm xử lý POST json data trả về req.json_data
            postHandler.jsonProcess,
            apiHandler.updateDirect
            // kết quả của bộ xử lý Hander sẽ cho ra req.finalJson nếu thành công hoặc req.error là thất bại
            // bộ Util-Router sẽ tự trả kết quả dựa trên 2 tham số trên (ưu tiên req.error trước)
        ],

        /**
         * (108) POST /leader-direct/api/get-direct-org
         * 
         * 
         * 
         * 
         * - Yêu cầu ĐƯỢC PHÂN QUYỀN
         * 
         * SAMPLE INPUTS:  
         */
        '/get-direct-org': [
            // ... chèn hàm tiền xử lý vào đây ví dụ: (req, res, next) => { console.log('In ra ip', req.clientIp); next() },
            // Gán đường dẫn chức năng kiểm tra phân quyền trả kết quả req.functionCode
            expHandlers.setRequestParameter('/get-direct-org', 'functionCode'),
            // Chuỗi hàm yêu cầu ĐƯỢC PHÂN QUYỀN đầu vào là req.functionCode
            ...verifyGrantedChain,// Hàm xử lý POST json data trả về req.json_data
            postHandler.jsonProcess,
            apiHandler.getDirectOrg
            // kết quả của bộ xử lý Hander sẽ cho ra req.finalJson nếu thành công hoặc req.error là thất bại
            // bộ Util-Router sẽ tự trả kết quả dựa trên 2 tham số trên (ưu tiên req.error trước)
        ],

        /**
         * (109) POST /leader-direct/api/get-direct-by-org
         * 
         * Lấy Chỉ Đạo Đơn Vị Theo Mã Đơn Vị (organization-id)
         * 
         * 
         * - Yêu cầu ĐƯỢC PHÂN QUYỀN
         * 
         * SAMPLE INPUTS:  
         */
        '/get-direct-by-org': [
            // ... chèn hàm tiền xử lý vào đây ví dụ: (req, res, next) => { console.log('In ra ip', req.clientIp); next() },
            // Gán đường dẫn chức năng kiểm tra phân quyền trả kết quả req.functionCode
            expHandlers.setRequestParameter('/get-direct-by-org', 'functionCode'),
            // Chuỗi hàm yêu cầu ĐƯỢC PHÂN QUYỀN đầu vào là req.functionCode
            ...verifyGrantedChain,// Hàm xử lý POST json data trả về req.json_data
            postHandler.jsonProcess,
            apiHandler.getDirectByOrg
            // kết quả của bộ xử lý Hander sẽ cho ra req.finalJson nếu thành công hoặc req.error là thất bại
            // bộ Util-Router sẽ tự trả kết quả dựa trên 2 tham số trên (ưu tiên req.error trước)
        ],

        /**
         * (110) POST /leader-direct/api/get-direct-org-all
         * 
         * 
         * 
         * 
         * - Yêu cầu ĐƯỢC PHÂN QUYỀN
         * 
         * SAMPLE INPUTS:  
         */
        '/get-direct-org-all': [
            // ... chèn hàm tiền xử lý vào đây ví dụ: (req, res, next) => { console.log('In ra ip', req.clientIp); next() },
            // Gán đường dẫn chức năng kiểm tra phân quyền trả kết quả req.functionCode
            expHandlers.setRequestParameter('/get-direct-org-all', 'functionCode'),
            // Chuỗi hàm yêu cầu ĐƯỢC PHÂN QUYỀN đầu vào là req.functionCode
            ...verifyGrantedChain,// Hàm xử lý POST json data trả về req.json_data
            postHandler.jsonProcess,
            apiHandler.getDirectOrgAll
            // kết quả của bộ xử lý Hander sẽ cho ra req.finalJson nếu thành công hoặc req.error là thất bại
            // bộ Util-Router sẽ tự trả kết quả dựa trên 2 tham số trên (ưu tiên req.error trước)
        ],

        /**
         * (111) POST /leader-direct/api/create-direct-org
         * 
         * 
         * 
         * 
         * - Yêu cầu ĐƯỢC PHÂN QUYỀN
         * 
         * SAMPLE INPUTS:  
         */
        '/create-direct-org': [
            // ... chèn hàm tiền xử lý vào đây ví dụ: (req, res, next) => { console.log('In ra ip', req.clientIp); next() },
            // Gán đường dẫn chức năng kiểm tra phân quyền trả kết quả req.functionCode
            expHandlers.setRequestParameter('/create-direct-org', 'functionCode'),
            // Chuỗi hàm yêu cầu ĐƯỢC PHÂN QUYỀN đầu vào là req.functionCode
            ...verifyGrantedChain,// Hàm xử lý POST json data trả về req.json_data
            postHandler.jsonProcess,
            apiHandler.createDirectOrg
            // kết quả của bộ xử lý Hander sẽ cho ra req.finalJson nếu thành công hoặc req.error là thất bại
            // bộ Util-Router sẽ tự trả kết quả dựa trên 2 tham số trên (ưu tiên req.error trước)
        ],

        /**
         * (112) POST /leader-direct/api/update-direct-org
         * 
         * 
         * 
         * 
         * - Yêu cầu ĐƯỢC PHÂN QUYỀN
         * 
         * SAMPLE INPUTS:  
         */
        '/update-direct-org': [
            // ... chèn hàm tiền xử lý vào đây ví dụ: (req, res, next) => { console.log('In ra ip', req.clientIp); next() },
            // Gán đường dẫn chức năng kiểm tra phân quyền trả kết quả req.functionCode
            expHandlers.setRequestParameter('/update-direct-org', 'functionCode'),
            // Chuỗi hàm yêu cầu ĐƯỢC PHÂN QUYỀN đầu vào là req.functionCode
            ...verifyGrantedChain,// Hàm xử lý POST json data trả về req.json_data
            postHandler.jsonProcess,
            apiHandler.updateDirectOrg
            // kết quả của bộ xử lý Hander sẽ cho ra req.finalJson nếu thành công hoặc req.error là thất bại
            // bộ Util-Router sẽ tự trả kết quả dựa trên 2 tham số trên (ưu tiên req.error trước)
        ],

        /**
         * (113) POST /leader-direct/api/get-direct-exe
         * 
         * 
         * 
         * 
         * - Yêu cầu ĐƯỢC PHÂN QUYỀN
         * 
         * SAMPLE INPUTS:  
         */
        '/get-direct-exe': [
            // ... chèn hàm tiền xử lý vào đây ví dụ: (req, res, next) => { console.log('In ra ip', req.clientIp); next() },
            // Gán đường dẫn chức năng kiểm tra phân quyền trả kết quả req.functionCode
            expHandlers.setRequestParameter('/get-direct-exe', 'functionCode'),
            // Chuỗi hàm yêu cầu ĐƯỢC PHÂN QUYỀN đầu vào là req.functionCode
            ...verifyGrantedChain,// Hàm xử lý POST json data trả về req.json_data
            postHandler.jsonProcess,
            apiHandler.getDirectExe
            // kết quả của bộ xử lý Hander sẽ cho ra req.finalJson nếu thành công hoặc req.error là thất bại
            // bộ Util-Router sẽ tự trả kết quả dựa trên 2 tham số trên (ưu tiên req.error trước)
        ],

        /**
         * (114) POST /leader-direct/api/create-direct-exe
         * 
         * 
         * 
         * 
         * - Yêu cầu ĐƯỢC PHÂN QUYỀN
         * 
         * SAMPLE INPUTS:  
         */
        '/create-direct-exe': [
            // ... chèn hàm tiền xử lý vào đây ví dụ: (req, res, next) => { console.log('In ra ip', req.clientIp); next() },
            // Gán đường dẫn chức năng kiểm tra phân quyền trả kết quả req.functionCode
            expHandlers.setRequestParameter('/create-direct-exe', 'functionCode'),
            // Chuỗi hàm yêu cầu ĐƯỢC PHÂN QUYỀN đầu vào là req.functionCode
            ...verifyGrantedChain,// Hàm xử lý POST json data trả về req.json_data
            postHandler.formProcess,
            apiHandler.createAttachments,
            apiHandler.createDirectExe
            // kết quả của bộ xử lý Hander sẽ cho ra req.finalJson nếu thành công hoặc req.error là thất bại
            // bộ Util-Router sẽ tự trả kết quả dựa trên 2 tham số trên (ưu tiên req.error trước)
        ],

        /**
         * (115) POST /leader-direct/api/update-direct-exe
         * 
         * 
         * 
         * 
         * - Yêu cầu ĐƯỢC PHÂN QUYỀN
         * 
         * SAMPLE INPUTS:  
         */
        '/update-direct-exe': [
            // ... chèn hàm tiền xử lý vào đây ví dụ: (req, res, next) => { console.log('In ra ip', req.clientIp); next() },
            // Gán đường dẫn chức năng kiểm tra phân quyền trả kết quả req.functionCode
            expHandlers.setRequestParameter('/update-direct-exe', 'functionCode'),
            // Chuỗi hàm yêu cầu ĐƯỢC PHÂN QUYỀN đầu vào là req.functionCode
            ...verifyGrantedChain,// Hàm xử lý POST json data trả về req.json_data
            postHandler.jsonProcess,
            apiHandler.updateDirectExe
            // kết quả của bộ xử lý Hander sẽ cho ra req.finalJson nếu thành công hoặc req.error là thất bại
            // bộ Util-Router sẽ tự trả kết quả dựa trên 2 tham số trên (ưu tiên req.error trước)
        ],

        /**
         * (116) POST /leader-direct/api/get-category
         * 
         * 
         * 
         * 
         * - Yêu cầu ĐƯỢC PHÂN QUYỀN
         * 
         * SAMPLE INPUTS:  
         */
        '/get-category': [
            // ... chèn hàm tiền xử lý vào đây ví dụ: (req, res, next) => { console.log('In ra ip', req.clientIp); next() },
            // Gán đường dẫn chức năng kiểm tra phân quyền trả kết quả req.functionCode
            expHandlers.setRequestParameter('/get-category', 'functionCode'),
            // Chuỗi hàm yêu cầu ĐƯỢC PHÂN QUYỀN đầu vào là req.functionCode
            ...verifyGrantedChain,// Hàm xử lý POST json data trả về req.json_data
            postHandler.jsonProcess,
            apiHandler.getCategory
            // kết quả của bộ xử lý Hander sẽ cho ra req.finalJson nếu thành công hoặc req.error là thất bại
            // bộ Util-Router sẽ tự trả kết quả dựa trên 2 tham số trên (ưu tiên req.error trước)
        ],

        /**
         * (117) POST /leader-direct/api/create-category
         * 
         * 
         * 
         * 
         * - Yêu cầu ĐƯỢC PHÂN QUYỀN
         * 
         * SAMPLE INPUTS:  
         */
        '/create-category': [
            // ... chèn hàm tiền xử lý vào đây ví dụ: (req, res, next) => { console.log('In ra ip', req.clientIp); next() },
            // Gán đường dẫn chức năng kiểm tra phân quyền trả kết quả req.functionCode
            expHandlers.setRequestParameter('/create-category', 'functionCode'),
            // Chuỗi hàm yêu cầu ĐƯỢC PHÂN QUYỀN đầu vào là req.functionCode
            ...verifyGrantedChain,// Hàm xử lý POST json data trả về req.json_data
            postHandler.jsonProcess,
            apiHandler.createCategory
            // kết quả của bộ xử lý Hander sẽ cho ra req.finalJson nếu thành công hoặc req.error là thất bại
            // bộ Util-Router sẽ tự trả kết quả dựa trên 2 tham số trên (ưu tiên req.error trước)
        ],

        /**
         * (118) POST /leader-direct/api/update-category
         * 
         * 
         * 
         * 
         * - Yêu cầu ĐƯỢC PHÂN QUYỀN
         * 
         * SAMPLE INPUTS:  
         */
        '/update-category': [
            // ... chèn hàm tiền xử lý vào đây ví dụ: (req, res, next) => { console.log('In ra ip', req.clientIp); next() },
            // Gán đường dẫn chức năng kiểm tra phân quyền trả kết quả req.functionCode
            expHandlers.setRequestParameter('/update-category', 'functionCode'),
            // Chuỗi hàm yêu cầu ĐƯỢC PHÂN QUYỀN đầu vào là req.functionCode
            ...verifyGrantedChain,// Hàm xử lý POST json data trả về req.json_data
            postHandler.jsonProcess,
            apiHandler.updateCategory
            // kết quả của bộ xử lý Hander sẽ cho ra req.finalJson nếu thành công hoặc req.error là thất bại
            // bộ Util-Router sẽ tự trả kết quả dựa trên 2 tham số trên (ưu tiên req.error trước)
        ],

        /**
         * (119) POST /leader-direct/api/get-statuses
         * 
         * 
         * 
         * 
         * - Yêu cầu ĐƯỢC PHÂN QUYỀN
         * 
         * SAMPLE INPUTS:  
         */
        '/get-statuses': [
            // ... chèn hàm tiền xử lý vào đây ví dụ: (req, res, next) => { console.log('In ra ip', req.clientIp); next() },
            // Gán đường dẫn chức năng kiểm tra phân quyền trả kết quả req.functionCode
            expHandlers.setRequestParameter('/get-statuses', 'functionCode'),
            // Chuỗi hàm yêu cầu ĐƯỢC PHÂN QUYỀN đầu vào là req.functionCode
            ...verifyGrantedChain,// Hàm xử lý POST json data trả về req.json_data
            postHandler.jsonProcess,
            apiHandler.getStatuses
            // kết quả của bộ xử lý Hander sẽ cho ra req.finalJson nếu thành công hoặc req.error là thất bại
            // bộ Util-Router sẽ tự trả kết quả dựa trên 2 tham số trên (ưu tiên req.error trước)
        ],

        /**
         * (120) POST /leader-direct/api/get-status-by-cat-id
         * 
         * 
         * 
         * 
         * - Yêu cầu ĐƯỢC PHÂN QUYỀN
         * 
         * SAMPLE INPUTS:  
         */
        '/get-status-by-cat-id': [
            // ... chèn hàm tiền xử lý vào đây ví dụ: (req, res, next) => { console.log('In ra ip', req.clientIp); next() },
            // Gán đường dẫn chức năng kiểm tra phân quyền trả kết quả req.functionCode
            expHandlers.setRequestParameter('/get-status-by-cat-id', 'functionCode'),
            // Chuỗi hàm yêu cầu ĐƯỢC PHÂN QUYỀN đầu vào là req.functionCode
            ...verifyGrantedChain,// Hàm xử lý POST json data trả về req.json_data
            postHandler.jsonProcess,
            apiHandler.getStatusByCatId
            // kết quả của bộ xử lý Hander sẽ cho ra req.finalJson nếu thành công hoặc req.error là thất bại
            // bộ Util-Router sẽ tự trả kết quả dựa trên 2 tham số trên (ưu tiên req.error trước)
        ],

        /**
         * (121) POST /leader-direct/api/create-status
         * 
         * 
         * 
         * 
         * - Yêu cầu ĐƯỢC PHÂN QUYỀN
         * 
         * SAMPLE INPUTS:  
         */
        '/create-status': [
            // ... chèn hàm tiền xử lý vào đây ví dụ: (req, res, next) => { console.log('In ra ip', req.clientIp); next() },
            // Gán đường dẫn chức năng kiểm tra phân quyền trả kết quả req.functionCode
            expHandlers.setRequestParameter('/create-status', 'functionCode'),
            // Chuỗi hàm yêu cầu ĐƯỢC PHÂN QUYỀN đầu vào là req.functionCode
            ...verifyGrantedChain,// Hàm xử lý POST json data trả về req.json_data
            postHandler.jsonProcess,
            apiHandler.createStatus
            // kết quả của bộ xử lý Hander sẽ cho ra req.finalJson nếu thành công hoặc req.error là thất bại
            // bộ Util-Router sẽ tự trả kết quả dựa trên 2 tham số trên (ưu tiên req.error trước)
        ],

        /**
         * (122) POST /leader-direct/api/update-status
         * 
         * 
         * 
         * 
         * - Yêu cầu ĐƯỢC PHÂN QUYỀN
         * 
         * SAMPLE INPUTS:  
         */
        '/update-status': [
            // ... chèn hàm tiền xử lý vào đây ví dụ: (req, res, next) => { console.log('In ra ip', req.clientIp); next() },
            // Gán đường dẫn chức năng kiểm tra phân quyền trả kết quả req.functionCode
            expHandlers.setRequestParameter('/update-status', 'functionCode'),
            // Chuỗi hàm yêu cầu ĐƯỢC PHÂN QUYỀN đầu vào là req.functionCode
            ...verifyGrantedChain,// Hàm xử lý POST json data trả về req.json_data
            postHandler.jsonProcess,
            apiHandler.updateStatus
            // kết quả của bộ xử lý Hander sẽ cho ra req.finalJson nếu thành công hoặc req.error là thất bại
            // bộ Util-Router sẽ tự trả kết quả dựa trên 2 tham số trên (ưu tiên req.error trước)
        ],

        /**
         * (123) POST /leader-direct/api/get-users
         * 
         * 
         * 
         * 
         * - Yêu cầu ĐƯỢC PHÂN QUYỀN
         * 
         * SAMPLE INPUTS:  
         */
        '/get-users': [
            // ... chèn hàm tiền xử lý vào đây ví dụ: (req, res, next) => { console.log('In ra ip', req.clientIp); next() },
            // Gán đường dẫn chức năng kiểm tra phân quyền trả kết quả req.functionCode
            expHandlers.setRequestParameter('/get-users', 'functionCode'),
            // Chuỗi hàm yêu cầu ĐƯỢC PHÂN QUYỀN đầu vào là req.functionCode
            ...verifyGrantedChain,// Hàm xử lý POST json data trả về req.json_data
            postHandler.jsonProcess,
            apiHandler.getUsers
            // kết quả của bộ xử lý Hander sẽ cho ra req.finalJson nếu thành công hoặc req.error là thất bại
            // bộ Util-Router sẽ tự trả kết quả dựa trên 2 tham số trên (ưu tiên req.error trước)
        ],

        /**
         * (124) POST /leader-direct/api/create-user
         * 
         * 
         * 
         * 
         * - Yêu cầu ĐƯỢC PHÂN QUYỀN
         * 
         * SAMPLE INPUTS:  
         */
        '/create-user': [
            // ... chèn hàm tiền xử lý vào đây ví dụ: (req, res, next) => { console.log('In ra ip', req.clientIp); next() },
            // Gán đường dẫn chức năng kiểm tra phân quyền trả kết quả req.functionCode
            expHandlers.setRequestParameter('/create-user', 'functionCode'),
            // Chuỗi hàm yêu cầu ĐƯỢC PHÂN QUYỀN đầu vào là req.functionCode
            ...verifyGrantedChain,// Hàm xử lý POST json data trả về req.json_data
            postHandler.jsonProcess,
            apiHandler.createUser
            // kết quả của bộ xử lý Hander sẽ cho ra req.finalJson nếu thành công hoặc req.error là thất bại
            // bộ Util-Router sẽ tự trả kết quả dựa trên 2 tham số trên (ưu tiên req.error trước)
        ],

        /**
         * (125) POST /leader-direct/api/update-user
         * 
         * 
         * 
         * 
         * - Yêu cầu ĐƯỢC PHÂN QUYỀN
         * 
         * SAMPLE INPUTS:  
         */
        '/update-user': [
            // ... chèn hàm tiền xử lý vào đây ví dụ: (req, res, next) => { console.log('In ra ip', req.clientIp); next() },
            // Gán đường dẫn chức năng kiểm tra phân quyền trả kết quả req.functionCode
            expHandlers.setRequestParameter('/update-user', 'functionCode'),
            // Chuỗi hàm yêu cầu ĐƯỢC PHÂN QUYỀN đầu vào là req.functionCode
            ...verifyGrantedChain,// Hàm xử lý POST json data trả về req.json_data
            postHandler.jsonProcess,
            apiHandler.updateUser
            // kết quả của bộ xử lý Hander sẽ cho ra req.finalJson nếu thành công hoặc req.error là thất bại
            // bộ Util-Router sẽ tự trả kết quả dựa trên 2 tham số trên (ưu tiên req.error trước)
        ],

        /**
         * (126) POST /leader-direct/api/get-menus
         * 
         * 
         * 
         * 
         * - Yêu cầu ĐƯỢC PHÂN QUYỀN
         * 
         * SAMPLE INPUTS:  
         */
        '/get-menus': [
            // ... chèn hàm tiền xử lý vào đây ví dụ: (req, res, next) => { console.log('In ra ip', req.clientIp); next() },
            // Gán đường dẫn chức năng kiểm tra phân quyền trả kết quả req.functionCode
            expHandlers.setRequestParameter('/get-menus', 'functionCode'),
            // Chuỗi hàm yêu cầu ĐƯỢC PHÂN QUYỀN đầu vào là req.functionCode
            ...verifyGrantedChain,// Hàm xử lý POST json data trả về req.json_data
            postHandler.jsonProcess,
            apiHandler.getMenus
            // kết quả của bộ xử lý Hander sẽ cho ra req.finalJson nếu thành công hoặc req.error là thất bại
            // bộ Util-Router sẽ tự trả kết quả dựa trên 2 tham số trên (ưu tiên req.error trước)
        ],

        /**
         * (127) POST /leader-direct/api/create-menu
         * 
         * 
         * 
         * 
         * - Yêu cầu ĐƯỢC PHÂN QUYỀN
         * 
         * SAMPLE INPUTS:  
         */
        '/create-menu': [
            // ... chèn hàm tiền xử lý vào đây ví dụ: (req, res, next) => { console.log('In ra ip', req.clientIp); next() },
            // Gán đường dẫn chức năng kiểm tra phân quyền trả kết quả req.functionCode
            expHandlers.setRequestParameter('/create-menu', 'functionCode'),
            // Chuỗi hàm yêu cầu ĐƯỢC PHÂN QUYỀN đầu vào là req.functionCode
            ...verifyGrantedChain,// Hàm xử lý POST json data trả về req.json_data
            postHandler.jsonProcess,
            apiHandler.createMenu
            // kết quả của bộ xử lý Hander sẽ cho ra req.finalJson nếu thành công hoặc req.error là thất bại
            // bộ Util-Router sẽ tự trả kết quả dựa trên 2 tham số trên (ưu tiên req.error trước)
        ],

        /**
         * (128) POST /leader-direct/api/update-menu
         * 
         * 
         * 
         * 
         * - Yêu cầu ĐƯỢC PHÂN QUYỀN
         * 
         * SAMPLE INPUTS:  
         */
        '/update-menu': [
            // ... chèn hàm tiền xử lý vào đây ví dụ: (req, res, next) => { console.log('In ra ip', req.clientIp); next() },
            // Gán đường dẫn chức năng kiểm tra phân quyền trả kết quả req.functionCode
            expHandlers.setRequestParameter('/update-menu', 'functionCode'),
            // Chuỗi hàm yêu cầu ĐƯỢC PHÂN QUYỀN đầu vào là req.functionCode
            ...verifyGrantedChain,// Hàm xử lý POST json data trả về req.json_data
            postHandler.jsonProcess,
            apiHandler.updateMenu
            // kết quả của bộ xử lý Hander sẽ cho ra req.finalJson nếu thành công hoặc req.error là thất bại
            // bộ Util-Router sẽ tự trả kết quả dựa trên 2 tham số trên (ưu tiên req.error trước)
        ],

        /**
         * (129) POST /leader-direct/api/get-organizations
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
            apiHandler.getOrganizations
            // kết quả của bộ xử lý Hander sẽ cho ra req.finalJson nếu thành công hoặc req.error là thất bại
            // bộ Util-Router sẽ tự trả kết quả dựa trên 2 tham số trên (ưu tiên req.error trước)
        ],

        /**
         * (130) POST /leader-direct/api/create-organization
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
            apiHandler.createOrganization
            // kết quả của bộ xử lý Hander sẽ cho ra req.finalJson nếu thành công hoặc req.error là thất bại
            // bộ Util-Router sẽ tự trả kết quả dựa trên 2 tham số trên (ưu tiên req.error trước)
        ],

        /**
         * (131) POST /leader-direct/api/update-organization
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
            apiHandler.updateOrganization
            // kết quả của bộ xử lý Hander sẽ cho ra req.finalJson nếu thành công hoặc req.error là thất bại
            // bộ Util-Router sẽ tự trả kết quả dựa trên 2 tham số trên (ưu tiên req.error trước)
        ],

    },
};
module.exports = (new Router(funcPaths, API)).getExpressRouter();