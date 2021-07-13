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
const { apiHandler } = require("../../handlers/leader-direct-1.0");
// thực hiện viết các handler để xử lý dữ liệu, trả kết quả về cho các function của api

// gán req.finalJson = json để tự động trả kết quả, hoặc lỗi thì gán req.error = json
const funcPaths = {
  // Các lệnh GET của /api này:

  GET: {
    /**
     * (120) GET /leader-direct/api/get-attachment-by-id
     * - Yêu cầu ĐƯỢC PHÂN QUYỀN
     *
     * SAMPLE INPUTS:
     */
    "/get-attachment-by-id": [
      expHandlers.setRequestParameter("/get-attachment-by-id", "functionCode"),
      ...verifyGrantedChain, // Hàm xử lý POST json data trả về req.json_data
      postHandler.jsonProcess,
      apiHandler.getAttachmentById,
    ],
  },

  // Các lệnh POST của /api này:

  POST: {
    /**
     * (101) POST /leader-direct/api/get-meeting
     * - Yêu cầu ĐƯỢC PHÂN QUYỀN
     *
     * SAMPLE INPUTS:
     */
    "/get-meeting": [
      expHandlers.setRequestParameter("/get-meeting", "functionCode"),
      ...verifyGrantedChain, // Hàm xử lý POST json data trả về req.json_data
      postHandler.jsonProcess,
      apiHandler.getMeeting,
    ],

    /**
     * (102) POST /leader-direct/api/create-meeting
     * - Yêu cầu ĐƯỢC PHÂN QUYỀN
     *
     * SAMPLE INPUTS:
     */
    "/create-meeting": [
      expHandlers.setRequestParameter("/create-meeting", "functionCode"),
      ...verifyGrantedChain, // Hàm xử lý POST json data trả về req.json_data
      postHandler.formProcess,
      apiHandler.createAttachments,
      apiHandler.createMeeting,
    ],

    /**
     * (103) POST /leader-direct/api/update-meeting
     * - Yêu cầu ĐƯỢC PHÂN QUYỀN
     *
     * SAMPLE INPUTS:
     */
    "/update-meeting": [
      expHandlers.setRequestParameter("/update-meeting", "functionCode"),
      ...verifyGrantedChain, // Hàm xử lý POST json data trả về req.json_data
      postHandler.formProcess,
      apiHandler.updateAttachments,
      apiHandler.updateMeeting,
    ],

    /**
     * (104) POST /leader-direct/api/get-direct
     * - Yêu cầu ĐƯỢC PHÂN QUYỀN
     *
     * SAMPLE INPUTS:
     */
    "/get-direct": [
      expHandlers.setRequestParameter("/get-direct", "functionCode"),
      ...verifyGrantedChain, // Hàm xử lý POST json data trả về req.json_data
      postHandler.jsonProcess,
      apiHandler.getDirect,
    ],

    /**
     * (104) POST /leader-direct/api/get-filter-direct
     *
     *
     *
     *
     * - Yêu cầu ĐƯỢC PHÂN QUYỀN
     *
     * SAMPLE INPUTS:
     */
    "/get-filter-direct": [
      // ... chèn hàm tiền xử lý vào đây ví dụ: (req, res, next) => { console.log('In ra ip', req.clientIp); next() },
      // Gán đường dẫn chức năng kiểm tra phân quyền trả kết quả req.functionCode
      expHandlers.setRequestParameter("/get-filter-direct", "functionCode"),
      // Chuỗi hàm yêu cầu ĐƯỢC PHÂN QUYỀN đầu vào là req.functionCode
      ...verifyGrantedChain, // Hàm xử lý POST json data trả về req.json_data
      postHandler.jsonProcess,
      apiHandler.getFilterDirect,
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
    "/get-direct-by-cat": [
      expHandlers.setRequestParameter("/get-direct-by-cat", "functionCode"),
      ...verifyGrantedChain, // Hàm xử lý POST json data trả về req.json_data
      postHandler.jsonProcess,
      apiHandler.getDirectByCat,
    ],

    /**
     * (128) POST /leader-direct/api/get-direct-by-ids
     *
     * - Yêu cầu ĐƯỢC PHÂN QUYỀN
     *
     * SAMPLE INPUTS:
     */

    "/get-direct-by-ids": [
      // ... chèn hàm tiền xử lý vào đây ví dụ: (req, res, next) => { console.log('In ra ip', req.clientIp); next() },
      expHandlers.setRequestParameter("/get-direct-by-ids", "functionCode"),
      ...verifyGrantedChain, // Hàm xử lý POST json data trả về req.json_data
      postHandler.jsonProcess,
      apiHandler.getDirectByIds,
    ],

    /**
     * (106) POST /leader-direct/api/create-direct
     * - Yêu cầu ĐƯỢC PHÂN QUYỀN
     *
     * SAMPLE INPUTS:
     */
    "/create-direct": [
      expHandlers.setRequestParameter("/create-direct", "functionCode"),
      ...verifyGrantedChain, // Hàm xử lý POST json data trả về req.json_data
      postHandler.jsonProcess,
      // apiHandler.createAttachments,
      apiHandler.createDirect,
      apiHandler.updateMeetingDirect,
    ],

    /**
     * (107) POST /leader-direct/api/update-direct
     * - Yêu cầu ĐƯỢC PHÂN QUYỀN
     *
     * SAMPLE INPUTS:
     */
    "/update-direct": [
      expHandlers.setRequestParameter("/update-direct", "functionCode"),
      ...verifyGrantedChain, // Hàm xử lý POST json data trả về req.json_data
      postHandler.jsonProcess,
      apiHandler.updateDirect,
    ],

    /**
     * (108) POST /leader-direct/api/get-direct-org
     * - Yêu cầu ĐƯỢC PHÂN QUYỀN
     *
     * SAMPLE INPUTS:
     */
    "/get-direct-org": [
      expHandlers.setRequestParameter("/get-direct-org", "functionCode"),
      ...verifyGrantedChain, // Hàm xử lý POST json data trả về req.json_data
      postHandler.jsonProcess,
      apiHandler.getDirectOrg,
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
    "/get-direct-by-org": [
      expHandlers.setRequestParameter("/get-direct-by-org", "functionCode"),
      ...verifyGrantedChain, // Hàm xử lý POST json data trả về req.json_data
      postHandler.jsonProcess,
      apiHandler.getDirectByOrg,
    ],

    /**
     * (110) POST /leader-direct/api/get-direct-org-all
     * - Yêu cầu ĐƯỢC PHÂN QUYỀN
     *
     * SAMPLE INPUTS:
     */
    "/get-direct-org-all": [
      expHandlers.setRequestParameter("/get-direct-org-all", "functionCode"),
      ...verifyGrantedChain, // Hàm xử lý POST json data trả về req.json_data
      postHandler.jsonProcess,
      apiHandler.getDirectOrgAll,
    ],

    /**
     * (111) POST /leader-direct/api/create-direct-org
     * - Yêu cầu ĐƯỢC PHÂN QUYỀN
     *
     * SAMPLE INPUTS:
     */
    "/create-direct-org": [
      expHandlers.setRequestParameter("/create-direct-org", "functionCode"),
      ...verifyGrantedChain, // Hàm xử lý POST json data trả về req.json_data
      postHandler.jsonProcess,
      apiHandler.createDirectOrg,
    ],

    /**
     * (112) POST /leader-direct/api/update-direct-org
     * - Yêu cầu ĐƯỢC PHÂN QUYỀN
     *
     * SAMPLE INPUTS:
     */
    "/update-direct-org": [
      expHandlers.setRequestParameter("/update-direct-org", "functionCode"),
      ...verifyGrantedChain, // Hàm xử lý POST json data trả về req.json_data
      postHandler.jsonProcess,
      apiHandler.updateDirectOrg,
    ],

    /**
     * (113) POST /leader-direct/api/get-direct-exe
     * - Yêu cầu ĐƯỢC PHÂN QUYỀN
     *
     * SAMPLE INPUTS:
     */
    "/get-direct-exe": [
      expHandlers.setRequestParameter("/get-direct-exe", "functionCode"),
      ...verifyGrantedChain, // Hàm xử lý POST json data trả về req.json_data
      postHandler.jsonProcess,
      apiHandler.getDirectExe,
    ],

    /**
     * (114) POST /leader-direct/api/create-direct-exe
     * - Yêu cầu ĐƯỢC PHÂN QUYỀN
     *
     * SAMPLE INPUTS:
     */
    "/create-direct-exe": [
      expHandlers.setRequestParameter("/create-direct-exe", "functionCode"),
      ...verifyGrantedChain, // Hàm xử lý POST json data trả về req.json_data
      postHandler.formProcess,
      apiHandler.createAttachments,
      apiHandler.createDirectExe,
    ],

    /**
     * (115) POST /leader-direct/api/update-direct-exe
     * - Yêu cầu ĐƯỢC PHÂN QUYỀN
     *
     * SAMPLE INPUTS:
     */
    "/update-direct-exe": [
      expHandlers.setRequestParameter("/update-direct-exe", "functionCode"),
      ...verifyGrantedChain, // Hàm xử lý POST json data trả về req.json_data
      postHandler.jsonProcess,
      apiHandler.updateDirectExe,
    ],

    /**
     * (116) POST /leader-direct/api/get-category
     * - Yêu cầu ĐƯỢC PHÂN QUYỀN
     *
     * SAMPLE INPUTS:
     */
    "/get-category": [
      expHandlers.setRequestParameter("/get-category", "functionCode"),
      ...verifyGrantedChain, // Hàm xử lý POST json data trả về req.json_data
      postHandler.jsonProcess,
      apiHandler.getCategory,
    ],

    /**
     * (117) POST /leader-direct/api/create-category
     * - Yêu cầu ĐƯỢC PHÂN QUYỀN
     *
     * SAMPLE INPUTS:
     */
    "/create-category": [
      expHandlers.setRequestParameter("/create-category", "functionCode"),
      ...verifyGrantedChain, // Hàm xử lý POST json data trả về req.json_data
      postHandler.jsonProcess,
      apiHandler.createCategory,
    ],

    /**
     * (118) POST /leader-direct/api/update-category
     * - Yêu cầu ĐƯỢC PHÂN QUYỀN
     *
     * SAMPLE INPUTS:
     */
    "/update-category": [
      expHandlers.setRequestParameter("/update-category", "functionCode"),
      ...verifyGrantedChain, // Hàm xử lý POST json data trả về req.json_data
      postHandler.jsonProcess,
      apiHandler.updateCategory,
    ],

    /**
     * (121) POST /leader-direct/api/get-attachment-by-ids
     * - Yêu cầu ĐƯỢC PHÂN QUYỀN
     *
     * SAMPLE INPUTS:
     */
    "/get-attachment-by-ids": [
      expHandlers.setRequestParameter("/get-attachment-by-ids", "functionCode"),
      ...verifyGrantedChain, // Hàm xử lý POST json data trả về req.json_data
      postHandler.jsonProcess,
      apiHandler.getAttachmentByIds,
    ],

    /**
     * (122) POST /leader-direct/api/get-attachments
     * - Yêu cầu ĐƯỢC PHÂN QUYỀN
     *
     * SAMPLE INPUTS:
     */
    "/get-attachments": [
      expHandlers.setRequestParameter("/get-attachments", "functionCode"),
      ...verifyGrantedChain, // Hàm xử lý POST json data trả về req.json_data
      postHandler.jsonProcess,
      apiHandler.getAttachments,
    ],

    /**
     * (123) POST /leader-direct/api/create-menu
     * - Yêu cầu ĐƯỢC PHÂN QUYỀN
     *
     * SAMPLE INPUTS:
     */
    "/create-menu": [
      expHandlers.setRequestParameter("/create-menu", "functionCode"),
      ...verifyGrantedChain, // Hàm xử lý POST json data trả về req.json_data
      postHandler.jsonProcess,
      apiHandler.createMenu,
    ],

    /**
     * (124) POST /leader-direct/api/update-attachment
     * - Yêu cầu ĐƯỢC PHÂN QUYỀN
     *
     * SAMPLE INPUTS:
     */
    "/update-menu": [
      expHandlers.setRequestParameter("/update-menu", "functionCode"),
      ...verifyGrantedChain, // Hàm xử lý POST json data trả về req.json_data
      postHandler.jsonProcess,
      apiHandler.updateMenu,
    ],

    /**
     * (125) POST /leader-direct/api/get-file
     * - Yêu cầu ĐƯỢC PHÂN QUYỀN
     *
     * SAMPLE INPUTS:
     */

    "/get-file": [
      expHandlers.setRequestParameter("/get-file", "functionCode"),
      ...verifyGrantedChain, // Hàm xử lý POST json data trả về req.json_data
      postHandler.jsonProcess,
      apiHandler.getFile,
    ],

    /**
     * (126) POST /leader-direct/api/get-direct-loops
     * - Yêu cầu ĐƯỢC PHÂN QUYỀN
     *
     * SAMPLE INPUTS:
     */

    "/get-direct-loops": [
      expHandlers.setRequestParameter("/get-direct-loops", "functionCode"),
      ...verifyGrantedChain, // Hàm xử lý POST json data trả về req.json_data
      postHandler.jsonProcess,
      apiHandler.getDirectLoops,
    ],

    /**
     * (127) POST /leader-direct/api/update-direct-loop
     * - Yêu cầu ĐƯỢC PHÂN QUYỀN
     *
     * SAMPLE INPUTS:
     */

    "/update-direct-loop": [
      expHandlers.setRequestParameter("/update-direct-loop", "functionCode"),
      ...verifyGrantedChain, // Hàm xử lý POST json data trả về req.json_data
      postHandler.jsonProcess,
      apiHandler.updateDirectLoop,
    ],

    /**
     * (128) POST /leader-direct/api/get-direct-by-ids
     *
     * - Yêu cầu ĐƯỢC PHÂN QUYỀN
     *
     * SAMPLE INPUTS:
     */

    "/get-direct-by-ids": [
      expHandlers.setRequestParameter("/get-direct-by-ids", "functionCode"),
      ...verifyGrantedChain, // Hàm xử lý POST json data trả về req.json_data
      postHandler.jsonProcess,
      apiHandler.getDirectByIds,
    ],

    /**
     * (129) POST /leader-direct/api/get-filter-direct
     * - Yêu cầu ĐƯỢC PHÂN QUYỀN
     *
     * SAMPLE INPUTS:
     */
    "/get-filter-direct": [
      expHandlers.setRequestParameter("/get-filter-direct", "functionCode"),
      ...verifyGrantedChain, // Hàm xử lý POST json data trả về req.json_data
      postHandler.jsonProcess,
      apiHandler.getFilterDirect,
    ],

    /**
     * (130) POST /leader-direct/api/get-meeting-by-id
     * - Yêu cầu ĐƯỢC PHÂN QUYỀN
     *
     * SAMPLE INPUTS:
     */

    "/get-meeting-by-id": [
      expHandlers.setRequestParameter("/get-meeting-by-id", "functionCode"),
      ...verifyGrantedChain, // Hàm xử lý POST json data trả về req.json_data
      postHandler.jsonProcess,
      apiHandler.getMeetingById,
    ],
  },
};
module.exports = new Router(funcPaths, API).getExpressRouter();
