/**
 * Hàm này xác thực token và thiết bị có phù hợp với đăng ký ở máy chủ không?
 * tuy vấn thông qua quyền của token proxy server
 */
const { VerifyToken } = require("client-socket-nodejs");

const socketConfig = require("./config");


// khởi tạo kết nối của proxy server (Hỏi admin để cấp các tham số (cặp key, user, và token của proxy trước))
let verifyToken = new VerifyToken(socketConfig);

// sau đó dùng thành phần này để xác thực token của client (nhúng vào máy chủ resource server)
// thông tin trong token sẽ chứa {username, device_id, iat, exp}

module.exports = verifyToken; //.verify(clientToken, clientDevicename)
