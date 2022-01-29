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
    // "/get-attachment-by-id": [
    //   expHandlers.setRequestParameter("/get-attachment-by-id", "functionCode"),
    //   ...verifyGrantedChain, // Hàm xử lý POST json data trả về req.json_data
    //   postHandler.jsonProcess,
    //   apiHandler.getAttachmentById,
    // ],
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
      // expHandlers.setRequestParameter("/get-meeting", "functionCode"),
      // ...verifyGrantedChain, // Hàm xử lý POST json data trả về req.json_data
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
      // expHandlers.setRequestParameter("/create-meeting", "functionCode"),
      // ...verifyGrantedChain, // Hàm xử lý POST json data trả về req.json_data
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
  },
};
module.exports = new Router(funcPaths, API).getExpressRouter();
