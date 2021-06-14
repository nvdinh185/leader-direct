// Đây là cấu hình máy chủ API tự đông được tạo từ ./test/create-api-functions/create-routers-handlers/x-create-api-routers-handlers.js

"use strict";

/**
 * Thủ tục test này dùng để khai báo máy chủ web API một cách nhanh chóng
 */

// công việc khai báo máy chủ chỉ còn có các bước sau:
const expressCfg = {
  // cổng dịch vụ
  port: 9232,
  // trang lỗi trả về không mặt định

  // ,default404Page: `<h1>Máy chủ api</h1>
  // <p>Xin lỗi trang bạn yêu cầu không tìm thấy. Vui lòng liên hệ quản trị hệ thống</p>`

  // đường dẫn phụ của máy chủ
  baseDirectory: "/leader-direct",
  // đường dẫn trỏ khi truy cập không có router/function được khai báo
  redirectUrl: "/",

  // đường dẫn trỏ web tĩnh root
  staticRoot: __dirname + "/client-test-apis",

  // đường dẫn trỏ web tĩnh theo duong dan baseDirectory tren
  staticHtml: __dirname + "/client-www-sample",

  // in ra các dòng debug để dev phát hiện lỗi
  isDebug: true,

  // các domain cho phép truy cập API này mà không báo lỗi cors
  domainIncludeCors: ["localhost"],
};

// khai báo phòng chống tấn công ddos
const ddosUse = null; //= require('./ddos/ddos-config').express('ip', 'path');

// khai báo các router cho các chức năng nghiệp vụ riêng
// Lưu ý mẫu khai router theo cách mới cũng sẽ đơn giản và gọn nhẹ hơn
const apiRoutes = require("./routes/apis-route-logs-1.0.js");

// nhúng lớp thành phần khai báo máy chủ đơn giản
const { ExpressServer } = require("cng-node-js-utils");

// khai báo cấu hình chống tấn công dò quét url_path
// nếu một client cố tình quét các api không có trong hệ thống quá số lần thì block trả về lỗi 403
// default block là 2 phiên, ta dùng client web thì phải tăng số này lên tùy chọn
const failCfg = {
  checkInterval: 5000, // trong thời gian kiểm tra này mà
  maxCountFail4Block: 20, // số lần gõ địa chỉ bị sai quá 20 lần sẽ bị block
};

// máy chủ socketIo
const socketIoCfg = null; // require("./server-socketio");

// theo dõi log các sự kiện của truy cập máy chủ
const logViewer = null; // require("./logs-viewer");

// tạo lớp máy chủ
const expressServer = new ExpressServer(
  expressCfg,
  ddosUse,
  apiRoutes,
  socketIoCfg,
  failCfg,
  logViewer
);

// và cho chạy máy chủ
expressServer.start();
