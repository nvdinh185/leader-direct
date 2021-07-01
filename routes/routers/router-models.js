// Đây là thủ tục tạo tự động từ ./test/create-api-functions/x-create-api-routers-handlers.js by cuong.dq
// Dữ liệu gốc từ file excel ./db/excel/api-function-granted-users-cdld.xlsx
// Được tạo và lúc 2021-05-31 15:44:25

"use strict";

// ĐÂY LÀ ĐƯỜNG DẪN API như nào  thì khai như thế
// (xem đường dẫn khai ở tham số path trong file ./routes/api-api-2.0-socket-token.js gọi đến router này)
//và khai đúng như vậy
const API = "/models";

// bộ xử lý dữ liệu postHandler = post + getToken để trả về req.token, req.json_data, json.form_data
const { postHandler, Router, expHandlers } = require("cng-node-js-utils");

// ----- PHÂN QUYỀN --- //
// nhúng bộ xác thực token proxy, nhằm yêu cầu chức năng có token mới thực hiện
const { verifyToken } = require("../../midlewares/verify-token");
// chuỗi kiểm tra token hợp lệ như sau
const verifyTokenChain = [
  // Hàm tự động lấy token trên các lệnh POST, GET, OPTIONS và trả về req.token
  // (tiếp đầu ngữ thường dùng mặt định là Bear trên header)
  postHandler.getToken,
  // thực hiện kiểm tra tính hợp lệ của token và trả về req.user nếu thành công hoặc req.error nếu thất bại
  // phương thức xác thực bằng socketClient - nhớ định nghĩa kênh liên lạc socket
  verifyToken,
  // nếu thất bại - có lỗi trong phân quyền, trả kết quả ngay cho client
  // sử dụng hàm khai sẵn luôn đỡ mất công
  expHandlers.checkErrorBeforeResource,
];

// nhúng bộ phân quyền chức năng của user, user được cấp quyền mới được truy vấn api
const { checkRight } = require("../../midlewares/granted-users");
// chuỗi kiểm tra quyền hợp lệ như sau:
const verifyGrantedChain = [
  ...verifyTokenChain,
  // trả kết quả req.functionCode = req.path
  // (thay thế bằng hàm setRequestParameter bên trong (utils 0.0.26))
  // , expHandlers.setFunctionFromPath
  // chuẩn bị các tham số để xác thực quyền
  checkRight(API),
  // nếu thất bại - có lỗi trong phân quyền, trả kết quả ngay cho client
  // sử dụng hàm khai sẵn luôn đỡ mất công
  expHandlers.checkErrorBeforeResource,
];

// ----- END PHÂN QUYỀN --- //

// bộ xử lý máy chủ trả kết quả xử lý hander
const { modelsHandler } = require("../../handlers/leader-direct-1.0");
// thực hiện viết các handler để xử lý dữ liệu, trả kết quả về cho các function của api

// gán req.finalJson = json để tự động trả kết quả, hoặc lỗi thì gán req.error = json
const funcPaths = {
  // Các lệnh GET của /models này:

  GET: {
    /**
     * (27) GET /leader-direct/models/get-models
     *
     * Lấy danh sách mô hình tất cả trong csdl
     * Đọc bảng models trả danh sách theo trang, phục vụ cho client biết để tao tác với từng mô hình
     *
     * - Yêu cầu ĐƯỢC PHÂN QUYỀN
     *
     * SAMPLE INPUTS:
     */
    "/get-models": [
      // ... chèn hàm tiền xử lý vào đây ví dụ: (req, res, next) => { console.log('In ra ip', req.clientIp); next() },
      // Gán đường dẫn chức năng kiểm tra phân quyền trả kết quả req.functionCode
      expHandlers.setRequestParameter("/get-models", "functionCode"),
      // Chuỗi hàm yêu cầu ĐƯỢC PHÂN QUYỀN đầu vào là req.functionCode
      ...verifyGrantedChain,
      modelsHandler.getModels,
      // kết quả của bộ xử lý Hander sẽ cho ra req.finalJson nếu thành công hoặc req.error là thất bại
      // bộ Util-Router sẽ tự trả kết quả dựa trên 2 tham số trên (ưu tiên req.error trước)
    ],

    /**
     * (28) GET /leader-direct/models/get-detail-model/:model_name
     *
     * Lấy danh sách cấu trúc csdl của mô hình cụ thể
     * Đọc bảng mô cấu trúc mô hình, trả danh sách cấu trúc csdl (để export lưu trữ, backup, chỉnh sửa, thêm bớt, ...). Trả về theo trang
     *
     * - Yêu cầu ĐƯỢC PHÂN QUYỀN
     *
     * SAMPLE INPUTS:
     */
    "/get-detail-model/:model_name": [
      // ... chèn hàm tiền xử lý vào đây ví dụ: (req, res, next) => { console.log('In ra ip', req.clientIp); next() },
      // Gán đường dẫn chức năng kiểm tra phân quyền trả kết quả req.functionCode
      expHandlers.setRequestParameter("/get-detail-model/:model_name", "functionCode"),
      // Chuỗi hàm yêu cầu ĐƯỢC PHÂN QUYỀN đầu vào là req.functionCode
      ...verifyGrantedChain,
      modelsHandler.getDetailModelModelname,
      // kết quả của bộ xử lý Hander sẽ cho ra req.finalJson nếu thành công hoặc req.error là thất bại
      // bộ Util-Router sẽ tự trả kết quả dựa trên 2 tham số trên (ưu tiên req.error trước)
    ],

    /**
     * (34) GET /leader-direct/models/get-page/:model_name/:table_name
     *
     * Lấy từng trang dữ liệu của các mô hình
     * Trả về trang danh sách các dòng dữ liệu của từng bảng của mô hình
     *
     * - Yêu cầu ĐƯỢC PHÂN QUYỀN
     *
     * SAMPLE INPUTS:
     */
    "/get-page/:model_name/:table_name": [
      // ... chèn hàm tiền xử lý vào đây ví dụ: (req, res, next) => { console.log('In ra ip', req.clientIp); next() },
      // Gán đường dẫn chức năng kiểm tra phân quyền trả kết quả req.functionCode
      expHandlers.setRequestParameter("/get-page/:model_name/:table_name", "functionCode"),
      // Chuỗi hàm yêu cầu ĐƯỢC PHÂN QUYỀN đầu vào là req.functionCode
      ...verifyGrantedChain,
      modelsHandler.getPageModelnameTablename,
      // kết quả của bộ xử lý Hander sẽ cho ra req.finalJson nếu thành công hoặc req.error là thất bại
      // bộ Util-Router sẽ tự trả kết quả dựa trên 2 tham số trên (ưu tiên req.error trước)
    ],

    /**
     * (35) GET /leader-direct/models/get-1-record/:model_name/:table_name
     *
     * Lấy một tài liệu (1 dòng)
     * Trả về một dòng dữ liệu
     *
     * - Yêu cầu ĐƯỢC PHÂN QUYỀN
     *
     * SAMPLE INPUTS:
     */
    "/get-1-record/:model_name/:table_name": [
      // ... chèn hàm tiền xử lý vào đây ví dụ: (req, res, next) => { console.log('In ra ip', req.clientIp); next() },
      // Gán đường dẫn chức năng kiểm tra phân quyền trả kết quả req.functionCode
      expHandlers.setRequestParameter("/get-1-record/:model_name/:table_name", "functionCode"),
      // Chuỗi hàm yêu cầu ĐƯỢC PHÂN QUYỀN đầu vào là req.functionCode
      ...verifyGrantedChain,
      modelsHandler.get1RecordModelnameTablename,
      // kết quả của bộ xử lý Hander sẽ cho ra req.finalJson nếu thành công hoặc req.error là thất bại
      // bộ Util-Router sẽ tự trả kết quả dựa trên 2 tham số trên (ưu tiên req.error trước)
    ],

    /**
     * (42) GET /leader-direct/models/get-table-models/:model_name
     *
     * Lấy danh sách mô hình đã khởi tạo
     * Đọc bảng table_models theo model_name, trả về danh sách tất cả theo trang mặt định là 100 bảng, sử dụng để phân quyền mức bảng hoặc lọc để import dữ liệu từ client
     *
     * - Yêu cầu ĐƯỢC PHÂN QUYỀN
     *
     * SAMPLE INPUTS:
     */
    "/get-table-models/:model_name": [
      // ... chèn hàm tiền xử lý vào đây ví dụ: (req, res, next) => { console.log('In ra ip', req.clientIp); next() },
      // Gán đường dẫn chức năng kiểm tra phân quyền trả kết quả req.functionCode
      expHandlers.setRequestParameter("/get-table-models/:model_name", "functionCode"),
      // Chuỗi hàm yêu cầu ĐƯỢC PHÂN QUYỀN đầu vào là req.functionCode
      ...verifyGrantedChain,
      modelsHandler.getTableModelsModelname,
      // kết quả của bộ xử lý Hander sẽ cho ra req.finalJson nếu thành công hoặc req.error là thất bại
      // bộ Util-Router sẽ tự trả kết quả dựa trên 2 tham số trên (ưu tiên req.error trước)
    ],

    /**
     * (44) GET /leader-direct/models/get-model-structure
     *
     * Trả cấu trúc thiết kế mô hình
     * Trả về một đối tượng định nghĩa cấu trúc để thiết kế mô hình csdl, cho tất cả để thiét kế bảng mô hình trước khi upload lên
     *
     *
     *
     * SAMPLE INPUTS:
     */
    "/get-model-structure": [
      // ... chèn hàm tiền xử lý vào đây ví dụ: (req, res, next) => { console.log('In ra ip', req.clientIp); next() },

      modelsHandler.getModelStructure,
      // kết quả của bộ xử lý Hander sẽ cho ra req.finalJson nếu thành công hoặc req.error là thất bại
      // bộ Util-Router sẽ tự trả kết quả dựa trên 2 tham số trên (ưu tiên req.error trước)
    ],

    /**
     * (45) GET /leader-direct/models/get-table-structure/:model_name/:table_name
     *
     * Trả cấu trúc của bảng đã load lên
     * Trả về json cấu trúc bảng gồm tên cột, unique, ... Để hỗ trợ mô hình động tổ chức bảng trên web
     *
     * - Yêu cầu ĐƯỢC PHÂN QUYỀN
     *
     * SAMPLE INPUTS:
     */
    "/get-table-structure/:model_name/:table_name": [
      // ... chèn hàm tiền xử lý vào đây ví dụ: (req, res, next) => { console.log('In ra ip', req.clientIp); next() },
      // Gán đường dẫn chức năng kiểm tra phân quyền trả kết quả req.functionCode
      expHandlers.setRequestParameter("/get-table-structure/:model_name/:table_name", "functionCode"),
      // Chuỗi hàm yêu cầu ĐƯỢC PHÂN QUYỀN đầu vào là req.functionCode
      ...verifyGrantedChain,
      modelsHandler.getTableStructureModelnameTablename,
      // kết quả của bộ xử lý Hander sẽ cho ra req.finalJson nếu thành công hoặc req.error là thất bại
      // bộ Util-Router sẽ tự trả kết quả dựa trên 2 tham số trên (ưu tiên req.error trước)
    ],

    /**
     * (47) GET /leader-direct/models/convert-params-2-json
     *
     * Kiểm tra chuyển ?wheres={key_name:{$like:*n*}}
     * Hỗ trợ kiểm tra chuyển một chuỗi giả json để tạo ra một json chuẩn. Nếu chuyển được thì sử dụng mệnh đề đó đưa vào request
     *
     *
     *
     * SAMPLE INPUTS:
     */
    "/convert-params-2-json": [
      // ... chèn hàm tiền xử lý vào đây ví dụ: (req, res, next) => { console.log('In ra ip', req.clientIp); next() },

      modelsHandler.convertParams2Json,
      // kết quả của bộ xử lý Hander sẽ cho ra req.finalJson nếu thành công hoặc req.error là thất bại
      // bộ Util-Router sẽ tự trả kết quả dựa trên 2 tham số trên (ưu tiên req.error trước)
    ],

    /**
     * (49) GET /leader-direct/models/convert-params-2-where-clause
     *
     * Chuyển đổi mệnh đề where paramS sang sql
     * Giúp kiểm tra khai báo mệnh đề where hợp lý khi đưa tham số vào để xác định mệnh đề where đúng cho csdl RDMS
     *
     *
     *
     * SAMPLE INPUTS:
     */
    "/convert-params-2-where-clause": [
      // ... chèn hàm tiền xử lý vào đây ví dụ: (req, res, next) => { console.log('In ra ip', req.clientIp); next() },

      modelsHandler.convertParams2WhereClause,
      // kết quả của bộ xử lý Hander sẽ cho ra req.finalJson nếu thành công hoặc req.error là thất bại
      // bộ Util-Router sẽ tự trả kết quả dựa trên 2 tham số trên (ưu tiên req.error trước)
    ],
  },

  // Các lệnh POST của /models này:

  POST: {
    /**
     * (29) POST /leader-direct/models/create-model/:model_name
     *
     * Tạo một mô hình mới (chỉ kiểm tra kết nối csdl)
     * Thực hiện tạo cấu trúc của mô hình (bảng chứa mô hình dữ liệu thật - chưa có danh sách các mô hình thật) - nhằm kiểm tra kết nối csdl của mô hình thật có đúng không? Nếu kết nối đúng thì cho phép tạo bảng để chứa các mô hình. Ví dụ, post lên một json yêu cầu tạo một giao tiếp csdl sqlite3
     *
     * - Yêu cầu ĐƯỢC PHÂN QUYỀN
     *
     * SAMPLE INPUTS:
     */
    "/create-model/:model_name": [
      // ... chèn hàm tiền xử lý vào đây ví dụ: (req, res, next) => { console.log('In ra ip', req.clientIp); next() },
      // Gán đường dẫn chức năng kiểm tra phân quyền trả kết quả req.functionCode
      expHandlers.setRequestParameter("/create-model/:model_name", "functionCode"),
      // Chuỗi hàm yêu cầu ĐƯỢC PHÂN QUYỀN đầu vào là req.functionCode
      ...verifyGrantedChain, // Hàm xử lý POST json data trả về req.json_data
      postHandler.jsonProcess,
      modelsHandler.createModelModelname,
      // kết quả của bộ xử lý Hander sẽ cho ra req.finalJson nếu thành công hoặc req.error là thất bại
      // bộ Util-Router sẽ tự trả kết quả dựa trên 2 tham số trên (ưu tiên req.error trước)
    ],

    /**
     * (30) POST /leader-direct/models/edit-model/:model_name
     *
     * Sửa một mô hình (cập nhập kết nối csdl mới)
     * Thực hiện sửa mô hình (là chỉnh sửa kết nối csdl mới hoặc cập nhập thông tin của mô hình thôi
     *
     * - Yêu cầu ĐƯỢC PHÂN QUYỀN
     *
     * SAMPLE INPUTS:
     */
    "/edit-model/:model_name": [
      // ... chèn hàm tiền xử lý vào đây ví dụ: (req, res, next) => { console.log('In ra ip', req.clientIp); next() },
      // Gán đường dẫn chức năng kiểm tra phân quyền trả kết quả req.functionCode
      expHandlers.setRequestParameter("/edit-model/:model_name", "functionCode"),
      // Chuỗi hàm yêu cầu ĐƯỢC PHÂN QUYỀN đầu vào là req.functionCode
      ...verifyGrantedChain, // Hàm xử lý POST json data trả về req.json_data
      postHandler.jsonProcess,
      modelsHandler.editModelModelname,
      // kết quả của bộ xử lý Hander sẽ cho ra req.finalJson nếu thành công hoặc req.error là thất bại
      // bộ Util-Router sẽ tự trả kết quả dựa trên 2 tham số trên (ưu tiên req.error trước)
    ],

    /**
     * (31) POST /leader-direct/models/delete-model/:model_name
     *
     * Xóa một mô hình
     * Thực hiện xóa luôn mô hình và cấu trúc bảng csdl của nó luôn
     *
     * - Yêu cầu ĐƯỢC PHÂN QUYỀN
     *
     * SAMPLE INPUTS:
     */
    "/delete-model/:model_name": [
      // ... chèn hàm tiền xử lý vào đây ví dụ: (req, res, next) => { console.log('In ra ip', req.clientIp); next() },
      // Gán đường dẫn chức năng kiểm tra phân quyền trả kết quả req.functionCode
      expHandlers.setRequestParameter("/delete-model/:model_name", "functionCode"),
      // Chuỗi hàm yêu cầu ĐƯỢC PHÂN QUYỀN đầu vào là req.functionCode
      ...verifyGrantedChain, // Hàm xử lý POST json data trả về req.json_data
      postHandler.jsonProcess,
      modelsHandler.deleteModelModelname,
      // kết quả của bộ xử lý Hander sẽ cho ra req.finalJson nếu thành công hoặc req.error là thất bại
      // bộ Util-Router sẽ tự trả kết quả dựa trên 2 tham số trên (ưu tiên req.error trước)
    ],

    /**
     * (32) POST /leader-direct/models/import-model/:model_name
     *
     * Import cấu trúc csdl cho mô hình
     * Ví dụ import một danh sách data trích từ excel được, cho mô hình có tên là granted_users, nếu trùng thì update dùng mệnh đề where là table_name và field_name
     *
     * - Yêu cầu ĐƯỢC PHÂN QUYỀN
     *
     * SAMPLE INPUTS:
     */
    "/import-model/:model_name": [
      // ... chèn hàm tiền xử lý vào đây ví dụ: (req, res, next) => { console.log('In ra ip', req.clientIp); next() },
      // Gán đường dẫn chức năng kiểm tra phân quyền trả kết quả req.functionCode
      expHandlers.setRequestParameter("/import-model/:model_name", "functionCode"),
      // Chuỗi hàm yêu cầu ĐƯỢC PHÂN QUYỀN đầu vào là req.functionCode
      ...verifyGrantedChain, // Hàm xử lý POST json data trả về req.json_data
      postHandler.jsonProcess,
      modelsHandler.importModelModelname,
      // kết quả của bộ xử lý Hander sẽ cho ra req.finalJson nếu thành công hoặc req.error là thất bại
      // bộ Util-Router sẽ tự trả kết quả dựa trên 2 tham số trên (ưu tiên req.error trước)
    ],

    /**
     * (33) POST /leader-direct/models/sync-model/:model_name
     *
     * Đồng bộ mô hình  (tạo bảng csdl chính)
     * Thực chất là tạo (các) bảng theo cấu trúc được load (import structure)
     *
     * - Yêu cầu ĐƯỢC PHÂN QUYỀN
     *
     * SAMPLE INPUTS:
     */
    "/sync-model/:model_name": [
      // ... chèn hàm tiền xử lý vào đây ví dụ: (req, res, next) => { console.log('In ra ip', req.clientIp); next() },
      // Gán đường dẫn chức năng kiểm tra phân quyền trả kết quả req.functionCode
      expHandlers.setRequestParameter("/sync-model/:model_name", "functionCode"),
      // Chuỗi hàm yêu cầu ĐƯỢC PHÂN QUYỀN đầu vào là req.functionCode
      ...verifyGrantedChain, // Hàm xử lý POST json data trả về req.json_data
      postHandler.jsonProcess,
      modelsHandler.syncModelModelname,
      // kết quả của bộ xử lý Hander sẽ cho ra req.finalJson nếu thành công hoặc req.error là thất bại
      // bộ Util-Router sẽ tự trả kết quả dựa trên 2 tham số trên (ưu tiên req.error trước)
    ],

    /**
     * (36) POST /leader-direct/models/post-page/:model_name/:table_name
     *
     * Lấy trang dữ liệu phương thức POST
     * Trả về trang danh sách các dòng dữ liệu của từng bảng của mô hình
     *
     * - Yêu cầu ĐƯỢC PHÂN QUYỀN
     *
     * SAMPLE INPUTS:
     */
    "/post-page/:model_name/:table_name": [
      // ... chèn hàm tiền xử lý vào đây ví dụ: (req, res, next) => { console.log('In ra ip', req.clientIp); next() },
      // Gán đường dẫn chức năng kiểm tra phân quyền trả kết quả req.functionCode
      expHandlers.setRequestParameter("/post-page/:model_name/:table_name", "functionCode"),
      // Chuỗi hàm yêu cầu ĐƯỢC PHÂN QUYỀN đầu vào là req.functionCode
      ...verifyGrantedChain, // Hàm xử lý POST json data trả về req.json_data
      postHandler.jsonProcess,
      modelsHandler.postPageModelnameTablename,
      // kết quả của bộ xử lý Hander sẽ cho ra req.finalJson nếu thành công hoặc req.error là thất bại
      // bộ Util-Router sẽ tự trả kết quả dựa trên 2 tham số trên (ưu tiên req.error trước)
    ],

    /**
     * (37) POST /leader-direct/models/post-1-record/:model_name/:table_name
     *
     * Lấy 1 dòng dữ liệu phương thức POST
     * Trả về một dòng dữ liệu theo mệnh đề where
     *
     * - Yêu cầu ĐƯỢC PHÂN QUYỀN
     *
     * SAMPLE INPUTS:
     */
    "/post-1-record/:model_name/:table_name": [
      // ... chèn hàm tiền xử lý vào đây ví dụ: (req, res, next) => { console.log('In ra ip', req.clientIp); next() },
      // Gán đường dẫn chức năng kiểm tra phân quyền trả kết quả req.functionCode
      expHandlers.setRequestParameter("/post-1-record/:model_name/:table_name", "functionCode"),
      // Chuỗi hàm yêu cầu ĐƯỢC PHÂN QUYỀN đầu vào là req.functionCode
      ...verifyGrantedChain, // Hàm xử lý POST json data trả về req.json_data
      postHandler.jsonProcess,
      modelsHandler.post1RecordModelnameTablename,
      // kết quả của bộ xử lý Hander sẽ cho ra req.finalJson nếu thành công hoặc req.error là thất bại
      // bộ Util-Router sẽ tự trả kết quả dựa trên 2 tham số trên (ưu tiên req.error trước)
    ],

    /**
     * (38) POST /leader-direct/models/insert/:model_name/:table_name
     *
     * Chèn một bảng ghi vào mô hình
     * Chèn vào mô hình một bảng ghi
     *
     * - Yêu cầu ĐƯỢC PHÂN QUYỀN
     *
     * SAMPLE INPUTS:
     */
    "/insert/:model_name/:table_name": [
      // ... chèn hàm tiền xử lý vào đây ví dụ: (req, res, next) => { console.log('In ra ip', req.clientIp); next() },
      // Gán đường dẫn chức năng kiểm tra phân quyền trả kết quả req.functionCode
      expHandlers.setRequestParameter("/insert/:model_name/:table_name", "functionCode"),
      // Chuỗi hàm yêu cầu ĐƯỢC PHÂN QUYỀN đầu vào là req.functionCode
      ...verifyGrantedChain, // Hàm xử lý POST json data trả về req.json_data
      postHandler.jsonProcess,
      modelsHandler.insertModelnameTablename,
      // kết quả của bộ xử lý Hander sẽ cho ra req.finalJson nếu thành công hoặc req.error là thất bại
      // bộ Util-Router sẽ tự trả kết quả dựa trên 2 tham số trên (ưu tiên req.error trước)
    ],

    /**
     * (39) POST /leader-direct/models/import/:model_name/:table_name
     *
     * Import một danh sách vào mô hình
     * Các dữ liệu từ client được tổ chức  các bảng ghi, mô hình sẽ import vào, nếu trùng key thì nó sẽ báo trùng, nếu có mệnh đề where_keys là một mảng thì tự update theo tập khóa này
     *
     * - Yêu cầu ĐƯỢC PHÂN QUYỀN
     *
     * SAMPLE INPUTS:
     */
    "/import/:model_name/:table_name": [
      // ... chèn hàm tiền xử lý vào đây ví dụ: (req, res, next) => { console.log('In ra ip', req.clientIp); next() },
      // Gán đường dẫn chức năng kiểm tra phân quyền trả kết quả req.functionCode
      expHandlers.setRequestParameter("/import/:model_name/:table_name", "functionCode"),
      // Chuỗi hàm yêu cầu ĐƯỢC PHÂN QUYỀN đầu vào là req.functionCode
      ...verifyGrantedChain, // Hàm xử lý POST json data trả về req.json_data
      postHandler.jsonProcess,
      modelsHandler.importModelnameTablename,
      // kết quả của bộ xử lý Hander sẽ cho ra req.finalJson nếu thành công hoặc req.error là thất bại
      // bộ Util-Router sẽ tự trả kết quả dựa trên 2 tham số trên (ưu tiên req.error trước)
    ],

    /**
     * (40) POST /leader-direct/models/update/:model_name/:table_name
     *
     * Cập nhập các bảng ghi trong mô hình
     * Cập nhập vào mô hình các bảng ghi có đủ điều kiện where
     *
     * - Yêu cầu ĐƯỢC PHÂN QUYỀN
     *
     * SAMPLE INPUTS:
     */
    "/update/:model_name/:table_name": [
      // ... chèn hàm tiền xử lý vào đây ví dụ: (req, res, next) => { console.log('In ra ip', req.clientIp); next() },
      // Gán đường dẫn chức năng kiểm tra phân quyền trả kết quả req.functionCode
      expHandlers.setRequestParameter("/update/:model_name/:table_name", "functionCode"),
      // Chuỗi hàm yêu cầu ĐƯỢC PHÂN QUYỀN đầu vào là req.functionCode
      ...verifyGrantedChain, // Hàm xử lý POST json data trả về req.json_data
      postHandler.jsonProcess,
      modelsHandler.updateModelnameTablename,
      // kết quả của bộ xử lý Hander sẽ cho ra req.finalJson nếu thành công hoặc req.error là thất bại
      // bộ Util-Router sẽ tự trả kết quả dựa trên 2 tham số trên (ưu tiên req.error trước)
    ],

    /**
     * (41) POST /leader-direct/models/delete/:model_name/:table_name
     *
     * Xóa các bảng ghi trong mô hình
     * Xóa các bảng ghi trong mô hình
     *
     * - Yêu cầu ĐƯỢC PHÂN QUYỀN
     *
     * SAMPLE INPUTS:
     */
    "/delete/:model_name/:table_name": [
      // ... chèn hàm tiền xử lý vào đây ví dụ: (req, res, next) => { console.log('In ra ip', req.clientIp); next() },
      // Gán đường dẫn chức năng kiểm tra phân quyền trả kết quả req.functionCode
      expHandlers.setRequestParameter("/delete/:model_name/:table_name", "functionCode"),
      // Chuỗi hàm yêu cầu ĐƯỢC PHÂN QUYỀN đầu vào là req.functionCode
      ...verifyGrantedChain, // Hàm xử lý POST json data trả về req.json_data
      postHandler.jsonProcess,
      modelsHandler.deleteModelnameTablename,
      // kết quả của bộ xử lý Hander sẽ cho ra req.finalJson nếu thành công hoặc req.error là thất bại
      // bộ Util-Router sẽ tự trả kết quả dựa trên 2 tham số trên (ưu tiên req.error trước)
    ],

    /**
     * (43) POST /leader-direct/models/reload-model/:model_name
     *
     * Thực hiện làm mới cấu trúc mô hình từ xa
     * Khi có thay đổi csdl, thay đổi cấu trúc csdl, định nghĩa mới một bảng, xóa một mô hình thì ta phải reload lại
     *
     * - Yêu cầu ĐƯỢC PHÂN QUYỀN
     *
     * SAMPLE INPUTS:
     */
    "/reload-model/:model_name": [
      // ... chèn hàm tiền xử lý vào đây ví dụ: (req, res, next) => { console.log('In ra ip', req.clientIp); next() },
      // Gán đường dẫn chức năng kiểm tra phân quyền trả kết quả req.functionCode
      expHandlers.setRequestParameter("/reload-model/:model_name", "functionCode"),
      // Chuỗi hàm yêu cầu ĐƯỢC PHÂN QUYỀN đầu vào là req.functionCode
      ...verifyGrantedChain, // Hàm xử lý POST json data trả về req.json_data
      postHandler.jsonProcess,
      modelsHandler.reloadModelModelname,
      // kết quả của bộ xử lý Hander sẽ cho ra req.finalJson nếu thành công hoặc req.error là thất bại
      // bộ Util-Router sẽ tự trả kết quả dựa trên 2 tham số trên (ưu tiên req.error trước)
    ],

    /**
     * (46) POST /leader-direct/models/convert-json-2-params
     *
     * Chuyển post json sang tham số ?param req
     * Hỗ trợ chuyển json sang tham số string để truyền sau dấu? Dùng để hỗ trợ việc truy vấn mệnh đề wheres
     *
     *
     *
     * SAMPLE INPUTS:
     */
    "/convert-json-2-params": [
      // ... chèn hàm tiền xử lý vào đây ví dụ: (req, res, next) => { console.log('In ra ip', req.clientIp); next() },
      // Hàm xử lý POST json data trả về req.json_data
      postHandler.jsonProcess,
      modelsHandler.convertJson2Params,
      // kết quả của bộ xử lý Hander sẽ cho ra req.finalJson nếu thành công hoặc req.error là thất bại
      // bộ Util-Router sẽ tự trả kết quả dựa trên 2 tham số trên (ưu tiên req.error trước)
    ],

    /**
     * (48) POST /leader-direct/models/convert-json-2-where-clause
     *
     * Kiểm tra chuyển đổi where mongo cho sql
     * Hỗ trợ kiểm tra mệnh đề where sử dụng cho các csdl RDMS
     *
     *
     *
     * SAMPLE INPUTS:
     */
    "/convert-json-2-where-clause": [
      // ... chèn hàm tiền xử lý vào đây ví dụ: (req, res, next) => { console.log('In ra ip', req.clientIp); next() },
      // Hàm xử lý POST json data trả về req.json_data
      postHandler.jsonProcess,
      modelsHandler.convertJson2WhereClause,
      // kết quả của bộ xử lý Hander sẽ cho ra req.finalJson nếu thành công hoặc req.error là thất bại
      // bộ Util-Router sẽ tự trả kết quả dựa trên 2 tham số trên (ưu tiên req.error trước)
    ],
  },
};
module.exports = new Router(funcPaths, API).getExpressRouter();
