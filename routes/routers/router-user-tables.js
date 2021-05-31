// Đây là thủ tục tạo tự động từ ./test/create-api-functions/x-create-api-routers-handlers.js by cuong.dq
// Dữ liệu gốc từ file excel ./db/excel/api-function-granted-users-cdld.xlsx
// Được tạo và lúc 2021-05-31 15:44:25

"use strict";

// ĐÂY LÀ ĐƯỜNG DẪN API như nào  thì khai như thế
// (xem đường dẫn khai ở tham số path trong file ./routes/api-api-2.0-socket-token.js gọi đến router này)
//và khai đúng như vậy
const API = "/user-tables";


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
const { userTablesHandler } = require("../../handlers/logs-1.0");
// thực hiện viết các handler để xử lý dữ liệu, trả kết quả về cho các function của api

// gán req.finalJson = json để tự động trả kết quả, hoặc lỗi thì gán req.error = json
const funcPaths = {

    // Các lệnh GET của /user-tables này:

    GET: {
        /**
         * (26) GET /leader-direct/user-tables/get-granted-table-4-user
         * 
         * Lấy danh sách quyền tác động BẢNG của USER
         * Truy vấn bảng function_granted, join các chức năng lấy được các quyền { insert, select, update, delete} - CRUD
         * 
         * - Yêu cầu ĐƯỢC PHÂN QUYỀN
         * 
         * SAMPLE INPUTS:  
         */
        '/get-granted-table-4-user': [
            // ... chèn hàm tiền xử lý vào đây ví dụ: (req, res, next) => { console.log('In ra ip', req.clientIp); next() },
            // Gán đường dẫn chức năng kiểm tra phân quyền trả kết quả req.functionCode
            expHandlers.setRequestParameter('/get-granted-table-4-user', 'functionCode'),
            // Chuỗi hàm yêu cầu ĐƯỢC PHÂN QUYỀN đầu vào là req.functionCode
            ...verifyGrantedChain,
            userTablesHandler.getGrantedTable4User
            // kết quả của bộ xử lý Hander sẽ cho ra req.finalJson nếu thành công hoặc req.error là thất bại
            // bộ Util-Router sẽ tự trả kết quả dựa trên 2 tham số trên (ưu tiên req.error trước)
        ],

    },

    // Các lệnh POST của /user-tables này:

    POST: {
        /**
         * (17) POST /leader-direct/user-tables/edit-table-models/:model_name/:table_name
         * 
         * Sửa thông tin của Bảng và khóa mở truy cập
         * Sửa tên của bảng để theo dõi phân quyền cho dễ, và có thể khóa mở không cho phép truy cập insert/imporrt, update, delete
         * 
         * - Yêu cầu ĐƯỢC PHÂN QUYỀN
         * 
         * SAMPLE INPUTS:  
         */
        '/edit-table-models/:model_name/:table_name': [
            // ... chèn hàm tiền xử lý vào đây ví dụ: (req, res, next) => { console.log('In ra ip', req.clientIp); next() },
            // Gán đường dẫn chức năng kiểm tra phân quyền trả kết quả req.functionCode
            expHandlers.setRequestParameter('/edit-table-models/:model_name/:table_name', 'functionCode'),
            // Chuỗi hàm yêu cầu ĐƯỢC PHÂN QUYỀN đầu vào là req.functionCode
            ...verifyGrantedChain,// Hàm xử lý POST json data trả về req.json_data
            postHandler.jsonProcess,
            userTablesHandler.editTableModelsModelnameTablename
            // kết quả của bộ xử lý Hander sẽ cho ra req.finalJson nếu thành công hoặc req.error là thất bại
            // bộ Util-Router sẽ tự trả kết quả dựa trên 2 tham số trên (ưu tiên req.error trước)
        ],

        /**
         * (18) POST /leader-direct/user-tables/add-table-2-group
         * 
         * Bổ sung 1 quyền cho group Table
         * user chỉ gửi quyền CRUD - hoặc insert,select,update,delete cho  model_name, table_name cùng group_id, kiểm tra và bổ sung vào group_id quyền
         * 
         * - Yêu cầu ĐƯỢC PHÂN QUYỀN
         * 
         * SAMPLE INPUTS:  
         */
        '/add-table-2-group': [
            // ... chèn hàm tiền xử lý vào đây ví dụ: (req, res, next) => { console.log('In ra ip', req.clientIp); next() },
            // Gán đường dẫn chức năng kiểm tra phân quyền trả kết quả req.functionCode
            expHandlers.setRequestParameter('/add-table-2-group', 'functionCode'),
            // Chuỗi hàm yêu cầu ĐƯỢC PHÂN QUYỀN đầu vào là req.functionCode
            ...verifyGrantedChain,// Hàm xử lý POST json data trả về req.json_data
            postHandler.jsonProcess,
            userTablesHandler.addTable2Group
            // kết quả của bộ xử lý Hander sẽ cho ra req.finalJson nếu thành công hoặc req.error là thất bại
            // bộ Util-Router sẽ tự trả kết quả dựa trên 2 tham số trên (ưu tiên req.error trước)
        ],

        /**
         * (19) POST /leader-direct/user-tables/remove-table-2-group
         * 
         * Thu hồi 1 quyền cho group Table
         * user chỉ gửi quyền CRUD - hoặc insert,select,update,delete cho  model_name, table_name cùng group_id, kiểm tra và xóa khỏi group_id quyền
         * 
         * - Yêu cầu ĐƯỢC PHÂN QUYỀN
         * 
         * SAMPLE INPUTS:  
         */
        '/remove-table-2-group': [
            // ... chèn hàm tiền xử lý vào đây ví dụ: (req, res, next) => { console.log('In ra ip', req.clientIp); next() },
            // Gán đường dẫn chức năng kiểm tra phân quyền trả kết quả req.functionCode
            expHandlers.setRequestParameter('/remove-table-2-group', 'functionCode'),
            // Chuỗi hàm yêu cầu ĐƯỢC PHÂN QUYỀN đầu vào là req.functionCode
            ...verifyGrantedChain,// Hàm xử lý POST json data trả về req.json_data
            postHandler.jsonProcess,
            userTablesHandler.removeTable2Group
            // kết quả của bộ xử lý Hander sẽ cho ra req.finalJson nếu thành công hoặc req.error là thất bại
            // bộ Util-Router sẽ tự trả kết quả dựa trên 2 tham số trên (ưu tiên req.error trước)
        ],

        /**
         * (20) POST /leader-direct/user-tables/add-table-2-user
         * 
         * Bổ sung 1 quyền Table
         * user chỉ gửi quyền CRUD - hoặc insert,select,update,delete cho  model_name, table_name cùng username kiểm tra và bổ sung vào username quyền
         * 
         * - Yêu cầu ĐƯỢC PHÂN QUYỀN
         * 
         * SAMPLE INPUTS:  
         */
        '/add-table-2-user': [
            // ... chèn hàm tiền xử lý vào đây ví dụ: (req, res, next) => { console.log('In ra ip', req.clientIp); next() },
            // Gán đường dẫn chức năng kiểm tra phân quyền trả kết quả req.functionCode
            expHandlers.setRequestParameter('/add-table-2-user', 'functionCode'),
            // Chuỗi hàm yêu cầu ĐƯỢC PHÂN QUYỀN đầu vào là req.functionCode
            ...verifyGrantedChain,// Hàm xử lý POST json data trả về req.json_data
            postHandler.jsonProcess,
            userTablesHandler.addTable2User
            // kết quả của bộ xử lý Hander sẽ cho ra req.finalJson nếu thành công hoặc req.error là thất bại
            // bộ Util-Router sẽ tự trả kết quả dựa trên 2 tham số trên (ưu tiên req.error trước)
        ],

        /**
         * (21) POST /leader-direct/user-tables/remove-table-2-user
         * 
         * Thu hồi 1 quyền Table
         * user chỉ gửi quyền CRUD - hoặc insert,select,update,delete cho  model_name, table_name cùng username kiểm tra và xóa khỏi username quyền
         * 
         * - Yêu cầu ĐƯỢC PHÂN QUYỀN
         * 
         * SAMPLE INPUTS:  
         */
        '/remove-table-2-user': [
            // ... chèn hàm tiền xử lý vào đây ví dụ: (req, res, next) => { console.log('In ra ip', req.clientIp); next() },
            // Gán đường dẫn chức năng kiểm tra phân quyền trả kết quả req.functionCode
            expHandlers.setRequestParameter('/remove-table-2-user', 'functionCode'),
            // Chuỗi hàm yêu cầu ĐƯỢC PHÂN QUYỀN đầu vào là req.functionCode
            ...verifyGrantedChain,// Hàm xử lý POST json data trả về req.json_data
            postHandler.jsonProcess,
            userTablesHandler.removeTable2User
            // kết quả của bộ xử lý Hander sẽ cho ra req.finalJson nếu thành công hoặc req.error là thất bại
            // bộ Util-Router sẽ tự trả kết quả dựa trên 2 tham số trên (ưu tiên req.error trước)
        ],

        /**
         * (22) POST /leader-direct/user-tables/grant-table-root-2-user
         * 
         * Gán quyền root table cho user
         * Select toàn bộ id của table_models bổ sung vào table_groups id =99 tất cả các quyền. Sau đó gán cho user ở trường table_groups
         * 
         * - Yêu cầu ĐƯỢC PHÂN QUYỀN
         * 
         * SAMPLE INPUTS:  
         */
        '/grant-table-root-2-user': [
            // ... chèn hàm tiền xử lý vào đây ví dụ: (req, res, next) => { console.log('In ra ip', req.clientIp); next() },
            // Gán đường dẫn chức năng kiểm tra phân quyền trả kết quả req.functionCode
            expHandlers.setRequestParameter('/grant-table-root-2-user', 'functionCode'),
            // Chuỗi hàm yêu cầu ĐƯỢC PHÂN QUYỀN đầu vào là req.functionCode
            ...verifyGrantedChain,// Hàm xử lý POST json data trả về req.json_data
            postHandler.jsonProcess,
            userTablesHandler.grantTableRoot2User
            // kết quả của bộ xử lý Hander sẽ cho ra req.finalJson nếu thành công hoặc req.error là thất bại
            // bộ Util-Router sẽ tự trả kết quả dựa trên 2 tham số trên (ưu tiên req.error trước)
        ],

        /**
         * (23) POST /leader-direct/user-tables/revoke-table-root-2-user
         * 
         * Thu hồi quyền root table của user
         * Thu hồi nhóm quyền root (tức là xóa nhóm 99 trong user ở nhóm table)
         * 
         * - Yêu cầu ĐƯỢC PHÂN QUYỀN
         * 
         * SAMPLE INPUTS:  
         */
        '/revoke-table-root-2-user': [
            // ... chèn hàm tiền xử lý vào đây ví dụ: (req, res, next) => { console.log('In ra ip', req.clientIp); next() },
            // Gán đường dẫn chức năng kiểm tra phân quyền trả kết quả req.functionCode
            expHandlers.setRequestParameter('/revoke-table-root-2-user', 'functionCode'),
            // Chuỗi hàm yêu cầu ĐƯỢC PHÂN QUYỀN đầu vào là req.functionCode
            ...verifyGrantedChain,// Hàm xử lý POST json data trả về req.json_data
            postHandler.jsonProcess,
            userTablesHandler.revokeTableRoot2User
            // kết quả của bộ xử lý Hander sẽ cho ra req.finalJson nếu thành công hoặc req.error là thất bại
            // bộ Util-Router sẽ tự trả kết quả dựa trên 2 tham số trên (ưu tiên req.error trước)
        ],

        /**
         * (24) POST /leader-direct/user-tables/grant-table-groups-2-user
         * 
         * Gán các nhóm quyền tác động bảng đến user
         * Thực thi update quyền table_groups cho user [group_id…]
         * 
         * - Yêu cầu ĐƯỢC PHÂN QUYỀN
         * 
         * SAMPLE INPUTS:  
         */
        '/grant-table-groups-2-user': [
            // ... chèn hàm tiền xử lý vào đây ví dụ: (req, res, next) => { console.log('In ra ip', req.clientIp); next() },
            // Gán đường dẫn chức năng kiểm tra phân quyền trả kết quả req.functionCode
            expHandlers.setRequestParameter('/grant-table-groups-2-user', 'functionCode'),
            // Chuỗi hàm yêu cầu ĐƯỢC PHÂN QUYỀN đầu vào là req.functionCode
            ...verifyGrantedChain,// Hàm xử lý POST json data trả về req.json_data
            postHandler.jsonProcess,
            userTablesHandler.grantTableGroups2User
            // kết quả của bộ xử lý Hander sẽ cho ra req.finalJson nếu thành công hoặc req.error là thất bại
            // bộ Util-Router sẽ tự trả kết quả dựa trên 2 tham số trên (ưu tiên req.error trước)
        ],

        /**
         * (25) POST /leader-direct/user-tables/grant-table-models-2-user
         * 
         * Gán các quyền tác động đến bảng cho user
         * Thực thi update quyền table_models cho user {"C":[table_id,...],"R":[],"U":[],"D":[]}, tức phải liệt kê hết các quyền rồi tổ chức thêm vào
         * 
         * - Yêu cầu ĐƯỢC PHÂN QUYỀN
         * 
         * SAMPLE INPUTS:  
         */
        '/grant-table-models-2-user': [
            // ... chèn hàm tiền xử lý vào đây ví dụ: (req, res, next) => { console.log('In ra ip', req.clientIp); next() },
            // Gán đường dẫn chức năng kiểm tra phân quyền trả kết quả req.functionCode
            expHandlers.setRequestParameter('/grant-table-models-2-user', 'functionCode'),
            // Chuỗi hàm yêu cầu ĐƯỢC PHÂN QUYỀN đầu vào là req.functionCode
            ...verifyGrantedChain,// Hàm xử lý POST json data trả về req.json_data
            postHandler.jsonProcess,
            userTablesHandler.grantTableModels2User
            // kết quả của bộ xử lý Hander sẽ cho ra req.finalJson nếu thành công hoặc req.error là thất bại
            // bộ Util-Router sẽ tự trả kết quả dựa trên 2 tham số trên (ưu tiên req.error trước)
        ],

    },
};
module.exports = (new Router(funcPaths, API)).getExpressRouter();